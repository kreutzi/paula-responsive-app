import { useEffect, useState } from 'react';
import { Screen, Header, Button, Steps, Severity, Switch, Chip, Stepper } from '../components/ui';
import Icon from '../components/Icon';
import { useT } from '../i18n/useT';
import { useStore } from '../store/useStore';
import { useNav } from '../nav/useNav';
import { SIGN_CATEGORIES, LESION_ORGANS } from '../data/seed';
import { placeLabel, signName, lesionName } from '../data/helpers';

const SEV_RISK = { Mild: 'low', Moderate: 'medium', Severe: 'high', Gross: 'critical' };
const SIGN_CAT_KEYS = SIGN_CATEGORIES.map((c) => c.key);
const ORGAN_KEYS = LESION_ORGANS.map((o) => o.key);

function SaveDraftBtn() {
  const { t } = useT();
  const saveDraft = useStore((s) => s.saveDraft);
  return <span className="pa-cap nowrap" style={{ fontWeight: 700, cursor: 'pointer' }} onClick={saveDraft}>{t('saveDraft')}</span>;
}

/* ===== 7. In-House Signs ===== */
function SignRow({ sign, state, onToggle, onSev, onPhoto }) {
  const { t, lang, num } = useT();
  const on = !!state;
  const primary = lang === 'ar' ? sign.ar : sign.en;
  const sub = lang === 'ar' ? sign.en : sign.ar;
  return (
    <div style={{ padding: '12px 0', borderTop: '1px solid var(--color-border)' }}>
      <div className="lrow" style={{ padding: 0, cursor: 'pointer' }} onClick={onToggle}>
        <div style={{ width: 24, height: 24, borderRadius: 7, flex: '0 0 auto', border: '2px solid ' + (on ? 'var(--color-primary)' : 'var(--color-border-strong)'), background: on ? 'var(--color-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <Icon name="check" size={15} stroke={3} color="#fff" />}</div>
        <div className="grow"><div style={{ fontWeight: 700, fontSize: 14.5 }}>{primary}</div><div className="pa-cap" dir={lang === 'ar' ? 'ltr' : 'rtl'}>{sub}</div></div>
      </div>
      {on && (
        <div style={{ paddingInlineStart: 36, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <Severity value={state.sev} onChange={(v) => onSev(v)} />
          <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }} onClick={onPhoto}>
            <Icon name="camera" size={16} />{state.photos ? t('photosN', { n: state.photos }) : t('addPhoto')}
          </button>
        </div>
      )}
    </div>
  );
}

export function Signs() {
  const { t, num } = useT();
  const { push } = useNav();
  const draft = useStore((s) => s.draft);
  const ensureDraft = useStore((s) => s.ensureDraft);
  const toggleSign = useStore((s) => s.toggleSign);
  const setSignSev = useStore((s) => s.setSignSev);
  const toggleNoneSigns = useStore((s) => s.toggleNoneSigns);
  const setCameraCtx = useStore((s) => s.setCameraCtx);
  const [cat, setCat] = useState('Respiratory');
  useEffect(() => { ensureDraft(); }, [ensureDraft]);
  if (!draft) return <Screen><Header title={t('inHouseSigns')} back /></Screen>;

  const selectedCount = Object.keys(draft.signs).length;
  const items = SIGN_CATEGORIES.find((c) => c.key === cat).items;
  const goPhoto = (id) => { setCameraCtx({ kind: 'sign', refId: id }); push('camera'); };

  return (
    <Screen>
      <Header title={t('inHouseSigns')} back right={<SaveDraftBtn />} />
      <div style={{ padding: '0 20px 10px' }}><Steps current={0} /></div>
      <div className="body pad">
        <div className="body-inner">
          <div className="card card-pad between" style={{ marginBottom: 12, padding: '12px 16px' }}>
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>{t('noneObserved')}</div><div className="pa-cap">{t('recordClean')}</div></div>
            <Switch on={draft.noneSigns} onChange={toggleNoneSigns} />
          </div>

          <div style={{ opacity: draft.noneSigns ? 0.4 : 1, pointerEvents: draft.noneSigns ? 'none' : 'auto' }}>
            <div className="chips-scroll" style={{ marginBottom: 10 }}>
              {SIGN_CAT_KEYS.map((k) => <Chip key={k} on={cat === k} onClick={() => setCat(k)}>{t('cat_' + k)}</Chip>)}
            </div>
            <div className="card" style={{ padding: '2px 16px 8px' }}>
              {items.map((s) => (
                <SignRow key={s.id} sign={s} state={draft.signs[s.id]} onToggle={() => toggleSign(s.id)} onSev={(v) => setSignSev(s.id, v)} onPhoto={() => goPhoto(s.id)} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fab-area" style={{ display: 'flex', gap: 10 }}>
        <span className="badge badge-neutral" style={{ alignSelf: 'center', padding: '8px 12px' }}>{t('selectedN', { n: selectedCount })}</span>
        <Button iconRight="arrow-right" style={{ flex: 1 }} onClick={() => push('lesions')}>{t('nextLesions')}</Button>
      </div>
    </Screen>
  );
}

/* ===== 8. Post-Mortem Lesions ===== */
function LesionEntry({ entry, onPickType, onSev, onCount, onPhoto, onDelete }) {
  const { t, lang, num } = useT();
  const typeName = entry.lesionId ? lesionName(entry.lesionId, lang) : null;
  const typeSub = entry.lesionId ? (lang === 'ar' ? lesionName(entry.lesionId, 'en') : lesionName(entry.lesionId, 'ar')) : null;
  return (
    <div className="card card-pad" style={{ padding: 14, marginBottom: 10 }}>
      <div className="between" style={{ marginBottom: 10 }}>
        <span className="badge badge-neutral">{t('org_' + entry.organ)}</span>
        <button className="iconbtn ghost" style={{ width: 28, height: 28 }} onClick={onDelete}><Icon name="trash" size={17} color="var(--color-text-tertiary)" /></button>
      </div>
      <div style={{ marginBottom: 10 }}>
        <div className="pa-eyebrow" style={{ marginBottom: 4 }}>{t('lesionType')}</div>
        <button className="input" style={{ height: 44, width: '100%', cursor: 'pointer' }} onClick={onPickType}>
          <span className="grow" style={{ fontWeight: 600, textAlign: 'start', color: typeName ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>{typeName || t('selectLesionType')}</span>
          <Icon name="chevron-down" size={18} color="var(--color-text-tertiary)" />
        </button>
        {typeSub && <div className="pa-cap" dir={lang === 'ar' ? 'ltr' : 'rtl'} style={{ marginTop: 3 }}>{typeSub}</div>}
      </div>
      <div className="between" style={{ gap: 12 }}>
        <div className="grow"><div className="pa-eyebrow" style={{ marginBottom: 5 }}>{t('severity')}</div><Severity value={entry.sev} gross onChange={onSev} /></div>
        <div><div className="pa-eyebrow" style={{ marginBottom: 5 }}>{t('count')}</div><Stepper value={entry.count} min={1} onChange={onCount} /></div>
      </div>
      <button className="btn btn-outline btn-sm" style={{ marginTop: 11 }} onClick={onPhoto}>
        <Icon name="camera" size={16} />{entry.photos ? t('photosN', { n: entry.photos }) : t('addPhoto')}
      </button>
    </div>
  );
}

export function Lesions() {
  const { t } = useT();
  const { push, openSheet } = useNav();
  const draft = useStore((s) => s.draft);
  const addLesion = useStore((s) => s.addLesion);
  const updateLesion = useStore((s) => s.updateLesion);
  const removeLesion = useStore((s) => s.removeLesion);
  const toggleNoneLesions = useStore((s) => s.toggleNoneLesions);
  const setCameraCtx = useStore((s) => s.setCameraCtx);
  const [organ, setOrgan] = useState('Respiratory');
  if (!draft) return <Screen><Header title={t('pmLesions')} back /></Screen>;

  const goPhoto = (uid) => { setCameraCtx({ kind: 'lesion', refId: uid }); push('camera'); };

  return (
    <Screen>
      <Header title={t('pmLesions')} back right={<SaveDraftBtn />} />
      <div style={{ padding: '0 20px 10px' }}><Steps current={1} /></div>
      <div className="chips-scroll" style={{ padding: '0 20px 12px' }}>
        {ORGAN_KEYS.map((k) => <Chip key={k} on={organ === k} onClick={() => setOrgan(k)}>{t('org_' + k)}</Chip>)}
      </div>
      <div className="body pad">
        <div className="body-inner">
          <div className="card card-pad between" style={{ marginBottom: 12, padding: '12px 16px' }}>
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>{t('noLesions')}</div><div className="pa-cap">{t('recordClean')}</div></div>
            <Switch on={draft.noneLesions} onChange={toggleNoneLesions} />
          </div>
          <div style={{ opacity: draft.noneLesions ? 0.4 : 1, pointerEvents: draft.noneLesions ? 'none' : 'auto' }}>
            {draft.lesions.length === 0 && <div className="pa-cap" style={{ textAlign: 'center', padding: '4px 0 14px' }}>{t('addLesionPrompt')}</div>}
            {draft.lesions.map((e) => (
              <LesionEntry key={e.uid} entry={e}
                onPickType={() => openSheet('lesionType', { uid: e.uid, organ: e.organ })}
                onSev={(v) => updateLesion(e.uid, { sev: v })}
                onCount={(v) => updateLesion(e.uid, { count: v })}
                onPhoto={() => goPhoto(e.uid)}
                onDelete={() => removeLesion(e.uid)} />
            ))}
            <button className="btn btn-secondary" style={{ height: 46 }} onClick={() => addLesion(organ)}><Icon name="plus" size={19} stroke={2.4} />{t('addAnother')}</button>
          </div>
        </div>
      </div>
      <div className="fab-area"><Button iconRight="arrow-right" onClick={() => push('notes')}>{t('nextNotes')}</Button></div>
    </Screen>
  );
}

/* ===== 9. Photo Capture ===== */
export function Camera() {
  const { t, num } = useT();
  const { pop, push } = useNav();
  const ctx = useStore((s) => s.cameraCtx);
  const draft = useStore((s) => s.draft);
  const capture = useStore((s) => s.capturePhoto);
  const [flash, setFlash] = useState(false);

  let label = ''; let count = 0;
  if (ctx?.kind === 'sign' && draft) { label = signName(ctx.refId, useT().lang); count = draft.signs[ctx.refId]?.photos || 0; }
  else if (ctx?.kind === 'lesion' && draft) { const l = draft.lesions.find((x) => x.uid === ctx.refId); label = l?.lesionId ? lesionName(l.lesionId, useT().lang) : t('lesions'); count = l?.photos || 0; }

  const shoot = () => { if (count < 5) { setFlash(true); setTimeout(() => setFlash(false), 130); capture(); } };

  return (
    <Screen light statusBg="transparent" noHome>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#10201A,#0A1512)' }} />
      {flash && <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 9, animation: 'flash .13s' }} />}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 20px' }}>
          <button className="center" onClick={pop} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.14)', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="chevron-left" size={20} /></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.14)', color: '#fff', padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
            <Icon name="bug" size={16} color="var(--color-blue)" />{t('photoFor', { name: label })}
          </div>
          <span style={{ width: 40 }} />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '8% 14%', border: '1.5px dashed rgba(255,255,255,.25)', borderRadius: 18 }} />
          <Icon name="paw" size={70} color="rgba(255,255,255,.14)" />
        </div>
        <div onClick={() => push('photoReview')} style={{ display: 'flex', gap: 8, padding: '0 20px 14px', cursor: 'pointer' }}>
          {Array.from({ length: Math.max(count, 1) }).map((_, i) => (
            <div key={i} className="center" style={{ width: 52, height: 52, borderRadius: 10, background: i < count ? 'rgba(46,124,214,.3)' : 'rgba(255,255,255,.12)', border: '1.5px solid rgba(255,255,255,.25)' }}>
              <Icon name="image" size={18} color="rgba(255,255,255,.7)" />
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,.6)', fontSize: 12, fontWeight: 600, marginInlineStart: 4 }}>{t('photoLimit', { n: count })}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 36px 22px' }}>
          <button className="center" onClick={() => setFlash(false)} style={{ width: 48, height: 48, borderRadius: 24, background: 'rgba(255,255,255,.14)', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="zap" size={22} /></button>
          <button onClick={shoot} className="center" style={{ width: 74, height: 74, borderRadius: 37, border: '4px solid rgba(255,255,255,.5)', background: 'none', cursor: count < 5 ? 'pointer' : 'not-allowed' }}><div style={{ width: 58, height: 58, borderRadius: 29, background: count < 5 ? '#fff' : 'rgba(255,255,255,.4)' }} /></button>
          <button className="center" style={{ width: 48, height: 48, borderRadius: 24, background: 'rgba(255,255,255,.14)', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="sync" size={22} /></button>
        </div>
        <div style={{ textAlign: 'center', paddingBottom: 10 }}><button onClick={pop} style={{ color: 'var(--color-blue)', fontWeight: 700, fontSize: 15, background: 'none', border: 'none', cursor: 'pointer' }}>{t('done')}</button></div>
      </div>
      <style>{`@keyframes flash{from{opacity:.9}to{opacity:0}}`}</style>
    </Screen>
  );
}

/* ===== 10. Photo Review ===== */
export function PhotoReview() {
  const { t, num, lang } = useT();
  const { pop, popTo } = useNav();
  const ctx = useStore((s) => s.cameraCtx);
  const draft = useStore((s) => s.draft);
  const removePhoto = useStore((s) => s.removePhoto);

  let label = ''; let count = 0; let backTo = 'signs';
  if (ctx?.kind === 'sign' && draft) { label = signName(ctx.refId, lang); count = draft.signs[ctx.refId]?.photos || 0; backTo = 'signs'; }
  else if (ctx?.kind === 'lesion' && draft) { const l = draft.lesions.find((x) => x.uid === ctx.refId); label = l?.lesionId ? lesionName(l.lesionId, lang) : t('lesions'); count = l?.photos || 0; backTo = 'lesions'; }

  return (
    <Screen>
      <Header title={t('photosFor', { name: label })} sub={t('photoHint', { n: count })} back
        right={<span className="pa-cap nowrap" style={{ fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer' }} onClick={() => popTo(backTo)}>{t('done')}</span>} />
      <div className="body pad">
        <div className="body-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="thumb" style={{ aspectRatio: '3/4', background: 'linear-gradient(135deg,#dfeaf4,#eef3f8)' }}>
                <Icon name="image" size={26} />
                <button onClick={removePhoto} className="center" style={{ position: 'absolute', top: 7, insetInlineEnd: 7, width: 24, height: 24, borderRadius: 12, background: 'var(--color-risk-critical)', border: 'none', cursor: 'pointer' }}><Icon name="x" size={14} stroke={2.6} color="#fff" /></button>
              </div>
            ))}
            {count < 5 && (
              <button className="thumb" style={{ aspectRatio: '3/4', borderStyle: 'dashed', borderColor: 'var(--color-border-strong)', flexDirection: 'column', gap: 6, color: 'var(--color-primary)', background: 'var(--color-surface)', cursor: 'pointer' }} onClick={pop}>
                <Icon name="plus" size={24} stroke={2.4} /><span style={{ fontSize: 12, fontWeight: 700 }}>{t('addMore')}</span>
              </button>
            )}
          </div>
          <div className="card card-pad" style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center', background: 'var(--color-blue-tint)', borderColor: 'var(--color-blue)' }}>
            <Icon name="shield" size={20} color="var(--color-blue)" />
            <div className="pa-cap" style={{ color: 'var(--color-blue-700)', fontWeight: 600 }}>{t('compressNote')}</div>
          </div>
        </div>
      </div>
      <div className="fab-area"><Button onClick={() => popTo(backTo)}>{t('donePhotos', { n: count })}</Button></div>
    </Screen>
  );
}

/* ===== 11. Free-Text Notes ===== */
export function Notes() {
  const { t, num, lang } = useT();
  const { push } = useNav();
  const draft = useStore((s) => s.draft);
  const setNotes = useStore((s) => s.setNotes);
  const toast = useStore((s) => s.toast);
  const [inputLang, setInputLang] = useState(lang);
  if (!draft) return <Screen><Header title={t('notes')} back /></Screen>;

  return (
    <Screen>
      <Header title={t('notes')} sub={t('optional')} back />
      <div style={{ padding: '0 20px 12px' }}><Steps current={2} /></div>
      <div className="body pad">
        <div className="body-inner" style={{ display: 'flex', flexDirection: 'column', minHeight: 320 }}>
          <div className="segmented" style={{ marginBottom: 12 }}>
            <button className={inputLang === 'en' ? 'on' : ''} onClick={() => setInputLang('en')} style={{ height: 36 }}>EN · English</button>
            <button className={inputLang === 'ar' ? 'on' : ''} onClick={() => setInputLang('ar')} style={{ height: 36 }}>AR · العربية</button>
          </div>
          <div className="card" style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', minHeight: 220 }}>
            <textarea className="ta" dir={inputLang === 'ar' ? 'rtl' : 'ltr'} placeholder={t('notesPh')} value={draft.notes} onChange={(e) => setNotes(e.target.value)} style={{ minHeight: 150 }} />
            <div className="between" style={{ marginTop: 10 }}>
              <button className="btn btn-sm" style={{ background: 'var(--color-blue-soft)', color: 'var(--color-blue-700)' }} onClick={() => toast('voiceToText', 'info')}><Icon name="mic" size={16} />{t('voiceToText')}</button>
              <span className="pa-cap">{t('charCount', { n: draft.notes.length })}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="fab-area" style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-outline" style={{ flex: '0 0 110px' }} onClick={() => push('summary')}>{t('skip')}</button>
        <Button iconRight="arrow-right" style={{ flex: 1 }} onClick={() => push('summary')}>{t('review')}</Button>
      </div>
    </Screen>
  );
}

/* ===== 12. Observation Summary ===== */
function SumSection({ icon, title, count, editTo, children }) {
  const { t, num } = useT();
  const { popTo } = useNav();
  return (
    <div className="card card-pad" style={{ marginBottom: 10 }}>
      <div className="between" style={{ marginBottom: 10 }}>
        <div className="row gap8"><Icon name={icon} size={18} color="var(--color-primary)" /><span className="pa-h3">{title}</span>{count != null && <span className="badge badge-neutral">{num(count)}</span>}</div>
        {editTo && <span className="row nowrap" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }} onClick={() => popTo(editTo)}><Icon name="edit" size={15} />{t('edit')}</span>}
      </div>
      {children}
    </div>
  );
}

export function Summary() {
  const { t, num, lang } = useT();
  const { push } = useNav();
  const draft = useStore((s) => s.draft);
  const online = useStore((s) => s.online);
  const submitVisit = useStore((s) => s.submitVisit);
  const saveDraft = useStore((s) => s.saveDraft);
  const [showFull, setShowFull] = useState(false);
  if (!draft) return <Screen><Header title={t('reviewObs')} back /></Screen>;

  const signEntries = Object.entries(draft.signs);
  const lesionEntries = draft.lesions.filter((l) => l.lesionId);
  const photoCount = signEntries.reduce((a, [, v]) => a + (v.photos || 0), 0) + lesionEntries.reduce((a, l) => a + (l.photos || 0), 0);
  const sizeMB = (0.4 + photoCount * 0.45).toFixed(1);
  const hasContent = signEntries.length > 0 || lesionEntries.length > 0 || draft.noneSigns || draft.noneLesions;
  const note = draft.notes;
  const noteTrunc = note.length > 90 && !showFull ? note.slice(0, 90) + '… ' : note;

  const onSubmit = () => { const sub = submitVisit(); if (sub) push('confirm'); };

  return (
    <Screen>
      <Header title={t('reviewObs')} back />
      <div style={{ padding: '0 20px 12px' }}><Steps current={3} /></div>
      <div className="body pad">
        <div className="body-inner">
          <div className="card card-pad row" style={{ gap: 12, marginBottom: 10, background: 'var(--color-blue-tint)', borderColor: 'var(--color-blue)' }}>
            <div className="rowicon" style={{ background: 'var(--color-primary)', color: '#fff' }}><Icon name="house" size={20} /></div>
            <div className="grow"><div style={{ fontWeight: 800, fontSize: 15 }}>{placeLabel(draft.farmId, draft.houseId, t, lang)}</div><div className="pa-cap">{lang === 'ar' ? '١٢ مايو' : '12 May'} · {draft.startedTime} · {lang === 'ar' ? 'د. حسام' : 'Dr. Hossam'}</div></div>
          </div>

          <SumSection icon="activity" title={t('signLabel')} count={draft.noneSigns ? 0 : signEntries.length} editTo="signs">
            {draft.noneSigns && <div className="pa-cap">{t('noneObserved')}</div>}
            {!draft.noneSigns && signEntries.length === 0 && <div className="pa-cap">{t('none')}</div>}
            {!draft.noneSigns && signEntries.map(([id, v], i) => (
              <div key={id} className="between" style={{ marginTop: i ? 8 : 0 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{signName(id, lang)}</span>
                <span className="row gap8"><span className={'badge risk-' + SEV_RISK[v.sev]}>{t('sev_' + v.sev)}</span>{v.photos > 0 && <span className="pa-cap row" style={{ gap: 3 }}><Icon name="camera" size={14} />{num(v.photos)}</span>}</span>
              </div>
            ))}
          </SumSection>

          <SumSection icon="bug" title={t('lesionLabel')} count={draft.noneLesions ? 0 : lesionEntries.length} editTo="lesions">
            {draft.noneLesions && <div className="pa-cap">{t('noLesions')}</div>}
            {!draft.noneLesions && lesionEntries.length === 0 && <div className="pa-cap">{t('none')}</div>}
            {!draft.noneLesions && lesionEntries.map((l, i) => (
              <div key={l.uid} className="between" style={{ marginTop: i ? 8 : 0 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{lesionName(l.lesionId, lang)} <span className="pa-muted" style={{ fontWeight: 500 }}>· ×{num(l.count)}</span></span>
                <span className="row gap8"><span className={'badge risk-' + SEV_RISK[l.sev]}>{t('sev_' + l.sev)}</span>{l.photos > 0 && <span className="pa-cap row" style={{ gap: 3 }}><Icon name="camera" size={14} />{num(l.photos)}</span>}</span>
              </div>
            ))}
          </SumSection>

          <SumSection icon="file-text" title={t('notesLabel')} editTo="notes">
            {note ? (
              <div className="pa-cap" style={{ fontSize: 13.5, lineHeight: 1.5 }} dir="auto">{noteTrunc}{note.length > 90 && <span className="pa-link" onClick={() => setShowFull((v) => !v)}>{showFull ? t('showLess') : t('showMore')}</span>}</div>
            ) : <div className="pa-cap">{t('noNotes')}</div>}
          </SumSection>
        </div>
      </div>
      <div className="fab-area">
        {!hasContent && <div className="pa-cap" style={{ color: 'var(--color-risk-high)', marginBottom: 10, textAlign: 'center' }}>{t('emptyObs')}</div>}
        <div className="between" style={{ marginBottom: 10, fontSize: 12.5 }}>
          <span className="row pa-muted" style={{ gap: 6 }}><Icon name={online ? 'wifi' : 'wifi-off'} size={15} color={online ? 'var(--color-synced)' : 'var(--color-offline)'} />{online ? t('onlineSize', { size: sizeMB + ' MB' }) : t('offlineSize', { size: sizeMB + ' MB' })}</span>
          <span className={'badge ' + (online ? 'badge-synced' : 'badge-offline')}>{online ? t('willSubmit') : t('willQueue')}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" style={{ flex: '0 0 120px' }} onClick={saveDraft}>{t('saveDraft')}</button>
          <Button icon="check" style={{ flex: 1 }} disabled={!hasContent} onClick={onSubmit}>{t('submit')}</Button>
        </div>
      </div>
    </Screen>
  );
}

/* ===== 13. Submission Confirmation ===== */
export function Confirm() {
  const { t, num, lang } = useT();
  const { resetTo, push } = useNav();
  const sub = useStore((s) => s.lastSubmission);
  if (!sub) { return <Screen><div className="body center"><Button onClick={() => resetTo('home')}>{t('goHome')}</Button></div></Screen>; }
  const queued = sub.status === 'queued';
  const signCount = sub.signs.length, lesionCount = sub.lesions.length;

  const newVisit = () => { useStore.setState({ visit: null }); resetTo('home'); push('farmSelect'); };

  return (
    <Screen>
      <div className="body" style={{ background: 'var(--color-surface)', padding: '0 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="center" style={{ width: 92, height: 92, borderRadius: 46, background: queued ? 'var(--color-offline-bg)' : 'var(--color-synced-bg)', marginBottom: 22 }}>
          <Icon name={queued ? 'clock' : 'check-circle'} size={46} color={queued ? 'var(--color-offline)' : 'var(--color-synced)'} stroke={2.2} />
        </div>
        <div className="pa-h1" style={{ marginBottom: 8 }}>{queued ? t('queuedTitle') : t('submittedTitle')}</div>
        <p className="pa-muted" style={{ fontSize: 14.5, maxWidth: 280, marginBottom: 22 }}>{queued ? t('queuedDesc') : t('submittedDesc')}</p>
        <div className="card card-pad" style={{ width: '100%', textAlign: 'start' }}>
          <div className="between" style={{ paddingBottom: 10, borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontWeight: 800 }}>{placeLabel(sub.farmId, sub.houseId, t, lang)}</span>
            <span className={'badge ' + (queued ? 'badge-offline' : 'badge-synced')}>{queued ? t('queued') : t('synced')}</span>
          </div>
          <div className="row" style={{ gap: 18, padding: '12px 0' }}>
            {[[signCount, t('signLabel')], [lesionCount, t('lesionLabel')], [sub.photoCount, t('photoLabel')]].map(([n, l], i) => (
              <div key={i}><div style={{ fontWeight: 800, fontSize: 20 }}>{num(n)}</div><div className="pa-eyebrow">{l}</div></div>
            ))}
          </div>
          <div className="pa-cap pa-mono" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 10 }}>{t('refId', { id: sub.id, time: sub.time })}</div>
        </div>
      </div>
      <div className="fab-area" style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => resetTo('home')}>{t('goHome')}</button>
        <Button icon="plus" style={{ flex: 1 }} onClick={newVisit}>{t('newVisit')}</Button>
      </div>
    </Screen>
  );
}
