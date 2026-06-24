import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_SUBMISSIONS, NOTIFICATIONS, HOUSE_BY_ID, FARM_BY_ID, INITIAL_VACCINATIONS } from '../data/seed';

let _idn = 1000;
function genId() {
  _idn += 7;
  const block = (n) => Math.abs((n * 2654435761) % 9000 + 1000).toString(36).toUpperCase().slice(0, 4);
  return 'OBS-' + block(_idn) + '-' + String((_idn % 1200) + 100);
}

function nowLabel() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `Today, ${hh}:${mm}`;
}
function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function freshDraft(farmId, houseId) {
  return {
    farmId, houseId, startedAt: Date.now(), startedTime: nowTime(),
    noneSigns: false, signs: {},
    noneLesions: false, lesions: [],
    noneMeds: false, medications: [], // doctor-only daily medication (house-level)
    notes: '',
  };
}

function placeName(farmId, houseId) {
  const f = FARM_BY_ID[farmId]; const h = HOUSE_BY_ID[houseId];
  return f && h ? `${f.name} · House ${h.n}` : '';
}

const initial = {
  session: { signedIn: false, role: null }, // role: 'farm' | 'doctor'
  settings: { lang: 'en', notifications: true, alertThreshold: 'perFarm' },
  online: false, // start offline to match the splash "pending sync" story
  submissions: INITIAL_SUBMISSIONS,
  notifications: NOTIFICATIONS,
  vaccinations: INITIAL_VACCINATIONS, // { [farmId]: [ {uid, vaccineId, ageDay, routeId} ] }
  visit: null,        // { farmId, houseId }
  draft: null,        // observation in progress
  lastSubmission: null,
  cameraCtx: null,    // { kind:'sign'|'lesion', refId }
  historyFilter: { farm: 'all', vet: 'all', range: '30' },
};

export const useStore = create(
  persist(
    (set, get) => ({
      ...initial,
      toasts: [],

      // ---- toasts ----
      toast: (key, kind = 'info', vars) => {
        const id = Date.now() + Math.floor(performance.now());
        set((s) => ({ toasts: [...s.toasts, { id, key, kind, vars }] }));
        setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 2600);
      },
      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

      // ---- session ----
      signIn: (role = 'farm') => set({ session: { signedIn: true, role } }),
      signOut: () => { set({ session: { signedIn: false, role: null }, visit: null, draft: null }); get().toast('t_signedOut', 'info'); },

      // ---- settings / connectivity ----
      setLang: (lang) => set((s) => ({ settings: { ...s.settings, lang } })),
      setNotifPref: (on) => set((s) => ({ settings: { ...s.settings, notifications: on } })),
      setOnline: (on) => {
        set({ online: on });
        get().toast(on ? 't_nowOnline' : 't_nowOffline', on ? 'ok' : 'info');
      },

      // ---- visit selection ----
      selectHouse: (farmId, houseId) => set({ visit: { farmId, houseId } }),

      // ---- draft lifecycle ----
      startDraft: () => {
        const v = get().visit; if (!v) return;
        const existing = get().draft;
        if (existing && existing.houseId === v.houseId) return; // keep resume
        set({ draft: freshDraft(v.farmId, v.houseId) });
      },
      ensureDraft: () => { if (!get().draft && get().visit) get().startDraft(); },
      discardDraft: () => set({ draft: null }),
      saveDraft: () => { get().toast('t_draftSaved', 'ok'); },

      // ---- signs ----
      toggleNoneSigns: () => set((s) => ({ draft: { ...s.draft, noneSigns: !s.draft.noneSigns, signs: !s.draft.noneSigns ? {} : s.draft.signs } })),
      toggleSign: (id) => set((s) => {
        const signs = { ...s.draft.signs };
        if (signs[id]) delete signs[id]; else signs[id] = { sev: 'Moderate', photos: 0 };
        return { draft: { ...s.draft, signs, noneSigns: false } };
      }),
      setSignSev: (id, sev) => set((s) => ({ draft: { ...s.draft, signs: { ...s.draft.signs, [id]: { ...s.draft.signs[id], sev } } } })),

      // ---- lesions ----
      toggleNoneLesions: () => set((s) => ({ draft: { ...s.draft, noneLesions: !s.draft.noneLesions, lesions: !s.draft.noneLesions ? [] : s.draft.lesions } })),
      addLesion: (organ = 'Respiratory') => set((s) => {
        const uid = 'lx' + (s.draft.lesions.length + 1) + '-' + Date.now() % 100000;
        return { draft: { ...s.draft, noneLesions: false, lesions: [...s.draft.lesions, { uid, organ, lesionId: null, sev: 'Moderate', count: 1, photos: 0 }] } };
      }),
      updateLesion: (uid, patch) => set((s) => ({ draft: { ...s.draft, lesions: s.draft.lesions.map((l) => (l.uid === uid ? { ...l, ...patch } : l)) } })),
      removeLesion: (uid) => set((s) => ({ draft: { ...s.draft, lesions: s.draft.lesions.filter((l) => l.uid !== uid) } })),

      // ---- notes ----
      setNotes: (notes) => set((s) => ({ draft: { ...s.draft, notes: notes.slice(0, 1000) } })),

      // ---- daily medication (doctor-only, house-level) ----
      toggleNoneMeds: () => set((s) => ({ draft: { ...s.draft, noneMeds: !s.draft.noneMeds, medications: !s.draft.noneMeds ? [] : s.draft.medications } })),
      addMedication: () => set((s) => {
        const uid = 'mx' + (s.draft.medications.length + 1) + '-' + (Date.now() % 100000);
        return { draft: { ...s.draft, noneMeds: false, medications: [...s.draft.medications, { uid, drugId: null, dose: '', routeId: 'water', days: 1 }] } };
      }),
      updateMedication: (uid, patch) => set((s) => ({ draft: { ...s.draft, medications: s.draft.medications.map((m) => (m.uid === uid ? { ...m, ...patch } : m)) } })),
      removeMedication: (uid) => set((s) => ({ draft: { ...s.draft, medications: s.draft.medications.filter((m) => m.uid !== uid) } })),
      importMedications: (rows) => set((s) => {
        const meds = rows.map((r, i) => ({
          uid: 'mi' + i + '-' + (Date.now() % 100000),
          drugId: r.drugId || null, drugName: r.drug || r.drugName || '',
          dose: r.dose || '', routeId: r.routeId || r.route || 'water', days: +(r.days || r.duration || 1) || 1,
        }));
        return { draft: { ...s.draft, noneMeds: false, medications: [...s.draft.medications, ...meds] } };
      }),

      // ---- camera / photos ----
      setCameraCtx: (ctx) => set({ cameraCtx: ctx }),
      capturePhoto: () => set((s) => {
        const ctx = s.cameraCtx; if (!ctx || !s.draft) return {};
        if (ctx.kind === 'sign') {
          const cur = s.draft.signs[ctx.refId]; if (!cur) return {};
          const photos = Math.min(5, (cur.photos || 0) + 1);
          return { draft: { ...s.draft, signs: { ...s.draft.signs, [ctx.refId]: { ...cur, photos } } } };
        }
        return { draft: { ...s.draft, lesions: s.draft.lesions.map((l) => (l.uid === ctx.refId ? { ...l, photos: Math.min(5, (l.photos || 0) + 1) } : l)) } };
      }),
      removePhoto: () => set((s) => {
        const ctx = s.cameraCtx; if (!ctx || !s.draft) return {};
        if (ctx.kind === 'sign') {
          const cur = s.draft.signs[ctx.refId]; if (!cur) return {};
          return { draft: { ...s.draft, signs: { ...s.draft.signs, [ctx.refId]: { ...cur, photos: Math.max(0, cur.photos - 1) } } } };
        }
        return { draft: { ...s.draft, lesions: s.draft.lesions.map((l) => (l.uid === ctx.refId ? { ...l, photos: Math.max(0, l.photos - 1) } : l)) } };
      }),

      // ---- submit ----
      submitVisit: () => {
        const { draft, online, submissions, session } = get();
        if (!draft) return null;
        const signs = Object.entries(draft.signs).map(([id, v]) => ({ id, sev: v.sev, photos: v.photos }));
        const lesions = draft.lesions.filter((l) => l.lesionId).map((l) => ({ id: l.lesionId, organ: l.organ, sev: l.sev, count: l.count, photos: l.photos }));
        const meds = (draft.medications || []).filter((m) => m.drugId || m.drugName).map((m) => ({ drugId: m.drugId, drugName: m.drugName || '', dose: m.dose, routeId: m.routeId, days: m.days }));
        const photoCount = signs.reduce((a, s) => a + (s.photos || 0), 0) + lesions.reduce((a, l) => a + (l.photos || 0), 0);
        const sizeMB = +(0.4 + photoCount * 0.45).toFixed(1);
        const sub = {
          id: genId(), farmId: draft.farmId, houseId: draft.houseId, vet: 'Dr. Hossam Fawzy', vetAr: 'د. حسام فوزي',
          when: nowLabel(), time: nowTime(), ts: Date.now(), role: session.role || 'farm',
          status: online ? 'synced' : 'queued', signs, lesions, meds, notes: draft.notes, photoCount, sizeMB,
        };
        set({ submissions: [sub, ...submissions], lastSubmission: sub, draft: null });
        get().toast(online ? 't_submitted' : 't_queued', online ? 'ok' : 'info');
        return sub;
      },

      // ---- queue / sync ----
      syncNow: () => {
        const queued = get().submissions.filter((s) => s.status === 'queued');
        if (!queued.length || !get().online) return;
        set((s) => ({ submissions: s.submissions.map((x) => (x.status === 'queued' ? { ...x, status: 'synced', when: x.when } : x)) }));
        get().toast('t_syncComplete', 'ok');
      },
      deleteSubmission: (id) => { set((s) => ({ submissions: s.submissions.filter((x) => x.id !== id) })); get().toast('t_deleted', 'info'); },

      // ---- history filter ----
      setHistoryFilter: (patch) => set((s) => ({ historyFilter: { ...s.historyFilter, ...patch } })),

      // ---- notifications ----
      markAllRead: () => { set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, unread: false })) })); get().toast('t_markedRead', 'ok'); },
      markRead: (id) => set((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, unread: false } : n)) })),

      // ---- vaccination program (doctor-only, farm-level) ----
      addVaccination: (farmId) => set((s) => {
        const rows = s.vaccinations[farmId] || [];
        const uid = 'vx-' + farmId + '-' + (rows.length + 1) + '-' + (Date.now() % 100000);
        return { vaccinations: { ...s.vaccinations, [farmId]: [...rows, { uid, vaccineId: null, ageDay: 1, routeId: 'water' }] } };
      }),
      updateVaccination: (farmId, uid, patch) => set((s) => ({
        vaccinations: { ...s.vaccinations, [farmId]: (s.vaccinations[farmId] || []).map((r) => (r.uid === uid ? { ...r, ...patch } : r)) },
      })),
      removeVaccination: (farmId, uid) => set((s) => ({
        vaccinations: { ...s.vaccinations, [farmId]: (s.vaccinations[farmId] || []).filter((r) => r.uid !== uid) },
      })),
      importVaccinations: (farmId, rows) => set((s) => {
        const mapped = rows.map((r, i) => ({
          uid: 'vi-' + farmId + '-' + i + '-' + (Date.now() % 100000),
          vaccineId: r.vaccineId || null, vaccineName: r.vaccine || r.vaccineName || '',
          ageDay: +(r.ageDay || r.age || 1) || 1, routeId: r.routeId || r.route || 'water',
        }));
        return { vaccinations: { ...s.vaccinations, [farmId]: [...(s.vaccinations[farmId] || []), ...mapped] } };
      }),
      saveVaccinations: () => get().toast('t_vaccSaved', 'ok'),

      // ---- maintenance ----
      clearSyncedCache: () => { set((s) => ({ submissions: s.submissions.filter((x) => x.status !== 'synced') })); get().toast('t_cacheCleared', 'info'); },
      resetDemo: () => { set({ ...initial, session: { signedIn: true, role: get().session.role || 'doctor' }, toasts: [] }); get().toast('t_reset', 'info'); },
    }),
    {
      name: 'paula-field-vet-v2', // bumped: session now carries a role
      partialize: (s) => ({
        session: s.session, settings: s.settings, online: s.online,
        submissions: s.submissions, notifications: s.notifications, vaccinations: s.vaccinations,
        visit: s.visit, draft: s.draft,
      }),
    }
  )
);

// derived selectors
export const selPendingCount = (s) => s.submissions.filter((x) => x.status === 'queued').length;
export const selUnreadCount = (s) => s.notifications.filter((n) => n.unread).length;
export const selRole = (s) => s.session.role || 'farm';
export const selIsDoctor = (s) => (s.session.role || 'farm') === 'doctor';
export const placeNameFor = placeName;
