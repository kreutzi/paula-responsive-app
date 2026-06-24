import { useState } from 'react';
import { Screen, Header, TabBar, Button, Switch, Chip, RiskBadge, Empty } from '../components/ui';
import Icon from '../components/Icon';
import { useT } from '../i18n/useT';
import { useStore, selPendingCount, selUnreadCount, selRole } from '../store/useStore';
import { useNav } from '../nav/useNav';
import { VET, FARMS } from '../data/seed';
import { farmName, farmRegion, houseNo, notifTime } from '../data/helpers';

/* ===== 19. Settings ===== */
function SetRow({ icon, label, value, toggle, on, onToggle, danger, onClick, first }) {
  return (
    <div className="lrow" style={{ padding: '13px 16px', borderTop: first ? 'none' : '1px solid var(--color-border)', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <Icon name={icon} size={20} color={danger ? 'var(--color-risk-critical)' : 'var(--color-text-secondary)'} />
      <span className="grow" style={{ fontWeight: 600, fontSize: 14.5, color: danger ? 'var(--color-risk-critical)' : 'var(--color-text-primary)' }}>{label}</span>
      {value && <span className="pa-cap nowrap" style={{ fontWeight: 600 }}>{value}</span>}
      {toggle && <Switch on={on} onChange={onToggle} />}
      {!toggle && !value && onClick && <Icon name="chevron-right" size={18} color="var(--color-text-tertiary)" />}
    </div>
  );
}

export function Settings() {
  const { t, lang, num } = useT();
  const { push, resetTo } = useNav();
  const settings = useStore((s) => s.settings);
  const online = useStore((s) => s.online);
  const submissions = useStore((s) => s.submissions);
  const setLang = useStore((s) => s.setLang);
  const setNotifPref = useStore((s) => s.setNotifPref);
  const setOnline = useStore((s) => s.setOnline);
  const signOut = useStore((s) => s.signOut);
  const clearSyncedCache = useStore((s) => s.clearSyncedCache);
  const resetDemo = useStore((s) => s.resetDemo);
  const role = useStore(selRole);
  const isDoctor = role === 'doctor';

  const storage = (submissions.length * 6 + 12);

  return (
    <Screen>
      <Header title={t('settings')} />
      <div className="body pad">
        <div className="body-inner">
          <div className="card card-pad row" style={{ gap: 14, marginBottom: 14 }}>
            <div className="center" style={{ width: 54, height: 54, borderRadius: 27, background: 'var(--color-primary)', color: '#fff', fontWeight: 800, fontSize: 19, flex: '0 0 auto' }}>{VET.initials}</div>
            <div className="grow"><div style={{ fontWeight: 800, fontSize: 16 }}>{lang === 'ar' ? VET.nameAr : VET.name}</div><div className="pa-cap">{t(isDoctor ? 'roleDoctor' : 'roleFarm')} · {t(isDoctor ? 'roleDoctorScope' : 'roleFarmScope')}</div></div>
          </div>

          <div className="pa-eyebrow" style={{ margin: '2px 4px 8px' }}>{t('language')}</div>
          <div className="segmented on-surface" style={{ marginBottom: 14 }}>
            <button className={settings.lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} style={{ height: 42 }}>English</button>
            <button className={settings.lang === 'ar' ? 'on' : ''} onClick={() => setLang('ar')} style={{ height: 42 }}>العربية</button>
          </div>

          <div className="card" style={{ marginBottom: 14, overflow: 'hidden' }}>
            <SetRow first icon="bell" label={t('pushNotifications')} toggle on={settings.notifications} onToggle={setNotifPref} />
            <SetRow icon={online ? 'wifi' : 'wifi-off'} label={t('connectivity')} toggle on={online} onToggle={(v) => setOnline(v)} />
            <SetRow icon="activity" label={t('alertThresholds')} value={t('perFarm')} />
            <SetRow icon="database" label={t('offlineStorage')} value={`${num(storage)} MB`} />
          </div>

          {isDoctor && (
            <div className="card" style={{ marginBottom: 14, overflow: 'hidden' }}>
              <SetRow first icon="shield" label={t('vaccination')} value={t('doctorsOnly')} onClick={() => push('vaccination')} />
            </div>
          )}

          <div className="card" style={{ marginBottom: 14, overflow: 'hidden' }}>
            <SetRow first icon="user" label={t('userConfig')} onClick={() => push('userConfig')} />
            <SetRow icon="download" label={t('clearCache')} onClick={clearSyncedCache} />
            <SetRow icon="sync" label={t('resetDemo')} onClick={resetDemo} />
          </div>

          <div className="card" style={{ marginBottom: 14, overflow: 'hidden' }}>
            <SetRow first icon="info" label={t('aboutPaula')} value={t('appVersion')} />
            <SetRow icon="logout" label={t('signOut')} danger onClick={() => { signOut(); resetTo('login'); }} />
          </div>
        </div>
      </div>
      <TabBar active="settings" />
    </Screen>
  );
}

/* ===== 20. Notifications ===== */
export function Notifications() {
  const { t, lang } = useT();
  const { push, switchTab } = useNav();
  const notifications = useStore((s) => s.notifications);
  const markAllRead = useStore((s) => s.markAllRead);
  const markRead = useStore((s) => s.markRead);
  const selectHouse = useStore((s) => s.selectHouse);
  const unread = useStore(selUnreadCount);

  const open = (n) => { markRead(n.id); selectHouse(n.farmId, n.houseId); push('visitOverview'); };

  return (
    <Screen>
      <Header title={t('alerts')} right={unread > 0 ? <span className="pa-cap nowrap" style={{ fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer' }} onClick={markAllRead}>{t('markAllRead')}</span> : null} />
      <div className="body pad">
        <div className="body-inner">
          {notifications.length === 0 ? (
            <Empty icon="bell" title={t('noAlertsTitle')} desc={t('noAlertsDesc')} />
          ) : notifications.map((n) => {
            const c = `var(--color-risk-${n.level})`;
            return (
              <div key={n.id} className="card card-pad card-tap row" style={{ marginBottom: 10, gap: 12, padding: 14, borderInlineStart: `4px solid ${c}`, background: n.unread ? 'var(--color-surface)' : 'var(--color-surface-2)' }} onClick={() => open(n)}>
                <div className="center" style={{ width: 40, height: 40, borderRadius: 12, background: c + '22', color: c, flex: '0 0 auto' }}><Icon name="alert" size={19} /></div>
                <div className="grow">
                  <div className="row gap6"><span style={{ fontWeight: n.unread ? 800 : 600, fontSize: 14.5 }}>{farmName(n.farmId, lang)} · {t('houseN', { n: houseNo(n.houseId) })}</span>{n.unread && <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--color-primary)' }} />}</div>
                  <div className="pa-cap">{(lang === 'ar' ? n.type.ar : n.type.en)} · {notifTime(n, t)}</div>
                </div>
                <Icon name="chevron-right" size={18} color="var(--color-text-tertiary)" />
              </div>
            );
          })}
        </div>
      </div>
      <TabBar active="alerts" />
    </Screen>
  );
}

/* ===== 21. Error / No Connection ===== */
export function ErrorState() {
  const { t, num } = useT();
  const { pop } = useNav();
  const online = useStore((s) => s.online);
  const setOnline = useStore((s) => s.setOnline);
  const toast = useStore((s) => s.toast);
  const pending = useStore(selPendingCount);
  const [showToast, setShowToast] = useState(false);

  const tryAgain = () => {
    if (online) { pop(); return; }
    setShowToast(true);
    toast('syncFailedTimeout', 'error');
    setTimeout(() => setShowToast(false), 2600);
  };

  return (
    <Screen>
      <div className="offline-banner"><Icon name="wifi-off" size={16} stroke={2.2} /><span className="grow">{t('t_nowOffline')}</span></div>
      <div className="body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 30px' }}>
        <div className="center" style={{ width: 96, height: 96, borderRadius: 48, background: 'var(--color-offline-bg)', marginBottom: 22 }}>
          <Icon name="wifi-off" size={46} color="var(--color-offline)" stroke={2} />
        </div>
        <div className="pa-h1" style={{ marginBottom: 8 }}>{t('noConnection')}</div>
        <p className="pa-muted" style={{ fontSize: 14.5, maxWidth: 290, marginBottom: 8 }}>{t('noConnDesc')}</p>
        <div className="card card-pad" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0 22px' }}>
          <Icon name="shield" size={20} color="var(--color-primary)" />
          <div className="pa-cap" style={{ fontWeight: 600, textAlign: 'start' }}>{t('savedSafely', { n: pending })}</div>
        </div>
        <Button icon="sync" style={{ width: '100%' }} onClick={tryAgain}>{t('retry')}</Button>
        <button className="btn btn-ghost" style={{ marginTop: 6 }} onClick={() => setOnline(true)}>{t('online')} (demo)</button>
        <button className="btn btn-ghost" style={{ marginTop: 0 }} onClick={pop}>{t('continueOffline')}</button>
      </div>
    </Screen>
  );
}

/* ===== 22. User Configuration & Assignment ===== */
function AssignHouse({ h, checked, onToggle }) {
  const { t, num } = useT();
  return (
    <div className="lrow" style={{ padding: '9px 0', gap: 10, cursor: 'pointer' }} onClick={onToggle}>
      <div className="center" style={{ width: 22, height: 22, borderRadius: 6, flex: '0 0 auto', border: '2px solid ' + (checked ? 'var(--color-primary)' : 'var(--color-border-strong)'), background: checked ? 'var(--color-primary)' : 'transparent' }}>{checked && <Icon name="check" size={14} stroke={3} color="#fff" />}</div>
      <span style={{ fontWeight: 700, fontSize: 13.5 }}>{t('houseN', { n: h.n })}</span>
      <span className="grow" />
      <span className="pa-cap">{t(h.type === 'breeder' ? 'breeder' : 'broiler')} · {num(h.day)}d</span>
    </div>
  );
}

export function UserConfig() {
  const { t, lang, num } = useT();
  const { pop } = useNav();
  const toast = useStore((s) => s.toast);
  const [role, setRole] = useState('roleDoctor');
  const [locations, setLocations] = useState({ 'Beni Suef': true, 'Damietta': true, 'Giza': false });
  const [openFarm, setOpenFarm] = useState('wadi');
  const [selected, setSelected] = useState(() => new Set(['wadi-h2', 'wadi-h4', 'wadi-h6', ...FARMS.find((f) => f.id === 'nile').houses.map((h) => h.id)]));

  const toggleHouse = (id) => setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const farmState = (f) => {
    const ids = f.houses.map((h) => h.id);
    const sel = ids.filter((id) => selected.has(id)).length;
    return sel === 0 ? 'none' : sel === ids.length ? 'all' : 'some';
  };
  const toggleFarm = (f) => setSelected((prev) => {
    const n = new Set(prev); const ids = f.houses.map((h) => h.id);
    const all = ids.every((id) => n.has(id));
    ids.forEach((id) => (all ? n.delete(id) : n.add(id)));
    return n;
  });
  const selectAll = () => setSelected((prev) => {
    const all = FARMS.flatMap((f) => f.houses.map((h) => h.id));
    const isAll = all.every((id) => prev.has(id));
    return isAll ? new Set() : new Set(all);
  });

  const farmsCovered = FARMS.filter((f) => farmState(f) !== 'none').length;
  const housesCovered = selected.size;

  return (
    <Screen>
      <Header title={t('userConfig')} sub={t('assignCoverage')} back
        right={<span className="pa-cap nowrap" style={{ fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => { toast('t_saved', 'ok'); pop(); }}>{t('save')}</span>} />
      <div className="body pad">
        <div className="body-inner">
          <div className="card card-pad row" style={{ gap: 13, marginBottom: 12 }}>
            <div className="center" style={{ width: 50, height: 50, borderRadius: 25, background: 'var(--color-blue)', color: '#fff', fontWeight: 800, fontSize: 17, flex: '0 0 auto' }}>MA</div>
            <div className="grow"><div style={{ fontWeight: 800, fontSize: 15.5 }}>{lang === 'ar' ? 'د. منى عادل' : 'Dr. Mona Adel'}</div><div className="pa-cap">mona.adel@cairo3apoultry.com</div></div>
            <Icon name="edit" size={18} color="var(--color-text-tertiary)" />
          </div>

          <div className="pa-eyebrow" style={{ margin: '2px 2px 7px' }}>{t('roleLabel')}</div>
          <div className="segmented on-surface" style={{ marginBottom: 14 }}>
            {['roleFarm', 'roleDoctor'].map((r) => (
              <button key={r} className={role === r ? 'on' : ''} onClick={() => setRole(r)} style={{ height: 38, fontSize: 13 }}>{t(r)}</button>
            ))}
          </div>

          <div className="between" style={{ margin: '2px 2px 7px' }}>
            <span className="pa-eyebrow">{t('locationLabel')}</span>
            <span className="pa-cap" style={{ fontWeight: 700 }}>{t('selectedCount', { n: Object.values(locations).filter(Boolean).length })}</span>
          </div>
          <div className="chips-scroll" style={{ marginBottom: 16 }}>
            {Object.keys(locations).map((loc) => (
              <Chip key={loc} on={locations[loc]} icon="pin" onClick={() => setLocations((p) => ({ ...p, [loc]: !p[loc] }))}>{loc}</Chip>
            ))}
          </div>

          <div className="between" style={{ margin: '2px 2px 8px' }}>
            <span className="pa-eyebrow">{t('farmsHouses')}</span>
            <span className="pa-link" style={{ fontSize: 12.5 }} onClick={selectAll}>{t('selectAll')}</span>
          </div>
          {FARMS.map((f) => {
            const st = farmState(f); const open = openFarm === f.id; const sel = f.houses.filter((h) => selected.has(h.id)).length;
            return (
              <div key={f.id} className="card" style={{ overflow: 'hidden', marginBottom: 10 }}>
                <div className="lrow" style={{ padding: '12px 14px', gap: 11 }}>
                  <button className="center" style={{ width: 22, height: 22, borderRadius: 6, flex: '0 0 auto', border: '2px solid ' + (st !== 'none' ? 'var(--color-primary)' : 'var(--color-border-strong)'), background: st === 'all' ? 'var(--color-primary)' : st === 'some' ? 'var(--color-primary-soft)' : 'transparent', cursor: 'pointer' }} onClick={() => toggleFarm(f)}>
                    {st === 'all' && <Icon name="check" size={14} stroke={3} color="#fff" />}
                    {st === 'some' && <span style={{ width: 9, height: 2.5, borderRadius: 2, background: 'var(--color-primary)' }} />}
                  </button>
                  <div className="rowicon" style={{ width: 34, height: 34 }}><Icon name="farm" size={17} /></div>
                  <div className="grow" style={{ cursor: 'pointer' }} onClick={() => setOpenFarm(open ? null : f.id)}>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{farmName(f.id, lang)}</div>
                    <div className="pa-cap">{t('ofHouses', { a: sel, t: f.houses.length })} · {farmRegion(f.id, lang)}</div>
                  </div>
                  <Icon name={open ? 'chevron-up' : 'chevron-down'} size={19} color="var(--color-text-tertiary)" onClick={() => setOpenFarm(open ? null : f.id)} />
                </div>
                {open && (
                  <div style={{ padding: '4px 16px 12px', background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-border)' }}>
                    {f.houses.map((h) => <AssignHouse key={h.id} h={h} checked={selected.has(h.id)} onToggle={() => toggleHouse(h.id)} />)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="fab-area">
        <div className="between" style={{ marginBottom: 10, fontSize: 12.5 }}>
          <span className="row pa-muted" style={{ gap: 6 }}><Icon name="shield" size={15} color="var(--color-blue)" />{t('coverageScope')}</span>
          <span className="badge badge-blue">{t('scopeSummary', { f: num(farmsCovered), h: num(housesCovered) })}</span>
        </div>
        <Button icon="check" onClick={() => { toast('t_saved', 'ok'); pop(); }}>{t('saveAssignment')}</Button>
      </div>
    </Screen>
  );
}
