import { useState } from 'react';
import { Screen, Header, Button, RiskBadge, FlockPill, ServiceDay, RISK_DOT, Empty } from '../components/ui';
import Icon from '../components/Icon';
import { useT } from '../i18n/useT';
import { useStore, selRole } from '../store/useStore';
import { useNav } from '../nav/useNav';
import { firstFlowRoute } from '../nav/flow';
import { FARMS } from '../data/seed';
import { farmName, farmRegion, house as getHouse, placeLabel, digits } from '../data/helpers';

/* ===== 4. Farm & House Selection ===== */
function HouseRow({ h, farmId, selected, onSelect }) {
  const { t, lang, num } = useT();
  return (
    <div className="lrow" onClick={() => onSelect(farmId, h.id)} style={{ padding: '11px 14px', cursor: 'pointer', borderRadius: 10, background: selected ? 'var(--color-primary-soft)' : 'transparent', border: selected ? '1.5px solid var(--color-primary)' : '1.5px solid transparent' }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: selected ? 'var(--color-primary)' : 'var(--color-surface-2)', color: selected ? '#fff' : 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flex: '0 0 auto' }}>{num(h.n)}</div>
      <div className="grow">
        <div className="row gap6" style={{ flexWrap: 'wrap' }}><span style={{ fontWeight: 700, fontSize: 14 }}>{t('houseN', { n: h.n })}</span><FlockPill type={h.type} sm /></div>
        <div className="row gap8" style={{ marginTop: 2 }}><ServiceDay type={h.type} day={h.day} sm /><span className="pa-cap">· {lang === 'ar' ? h.lastVisitAr : h.lastVisit}</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <span className="row gap6" style={{ fontSize: 11.5, fontWeight: 700, color: RISK_DOT[h.risk], whiteSpace: 'nowrap' }}><span className="dot" style={{ background: RISK_DOT[h.risk] }} />{t('rs_' + h.risk)}</span>
        {selected && <Icon name="check-circle" size={20} color="var(--color-primary)" solid />}
      </div>
    </div>
  );
}

export function FarmSelect() {
  const { t, lang } = useT();
  const { push } = useNav();
  const visit = useStore((s) => s.visit);
  const selectHouse = useStore((s) => s.selectHouse);
  const [query, setQuery] = useState('');
  const [flock, setFlock] = useState('all');
  const [openId, setOpenId] = useState(FARMS[0].id);

  const farms = FARMS.filter((f) => {
    const name = (lang === 'ar' ? f.nameAr : f.name).toLowerCase();
    return name.includes(query.trim().toLowerCase());
  });

  const housesOf = (f) => f.houses.filter((h) => flock === 'all' || h.type === flock);
  const selectedPlace = visit ? placeLabel(visit.farmId, visit.houseId, t, lang) : '';

  return (
    <Screen>
      <Header title={t('selectFarmHouse')} sub={t('selectStays')} back />
      <div className="body pad">
        <div className="body-inner">
          <div className="segmented on-surface" style={{ marginBottom: 12 }}>
            {[['all', t('all')], ['broiler', t('broiler')], ['breeder', t('breeder')]].map(([k, l]) => (
              <button key={k} className={flock === k ? 'on' : ''} onClick={() => setFlock(k)} style={{ height: 38 }}>{l}</button>
            ))}
          </div>
          <button className="btn btn-secondary" style={{ height: 46, marginBottom: 12 }} onClick={() => push('scan')}>
            <Icon name="qr" size={20} stroke={2.2} />{t('scanTag')}
          </button>
          <label className="input search" style={{ marginBottom: 12 }}>
            <Icon name="search" size={18} color="var(--color-text-tertiary)" />
            <input className="ta" style={{ height: '100%' }} placeholder={t('searchFarms')} value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>

          {farms.length === 0 && <Empty icon="farm" title={t('noFarms')} desc={t('noFarmsDesc')} />}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {farms.map((f) => {
              const open = openId === f.id;
              const houses = housesOf(f);
              const counts = { broiler: f.houses.filter((h) => h.type === 'broiler').length, breeder: f.houses.filter((h) => h.type === 'breeder').length };
              return (
                <div key={f.id} className="card" style={{ overflow: 'hidden' }}>
                  <div className="lrow" style={{ padding: '13px 16px', cursor: 'pointer' }} onClick={() => setOpenId(open ? null : f.id)}>
                    <div className="rowicon"><Icon name="farm" size={20} /></div>
                    <div className="grow">
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{farmName(f.id, lang)}</div>
                      <div className="pa-cap">{counts.broiler ? `${counts.broiler} ${t('broiler')}` : ''}{counts.broiler && counts.breeder ? ' · ' : ''}{counts.breeder ? `${counts.breeder} ${t('breeder')}` : ''} · {farmRegion(f.id, lang)}</div>
                    </div>
                    <Icon name={open ? 'chevron-up' : 'chevron-down'} size={20} color="var(--color-text-tertiary)" />
                  </div>
                  {open && houses.length > 0 && (
                    <>
                      <div className="divider" />
                      <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--color-surface-2)' }}>
                        {houses.map((h) => (
                          <HouseRow key={h.id} h={h} farmId={f.id} selected={visit && visit.houseId === h.id} onSelect={selectHouse} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="fab-area">
        <Button iconRight="arrow-right" disabled={!visit} onClick={() => push('visitOverview')}>
          {visit ? `${t('confirmSel')} · ${selectedPlace}` : t('selectAHouse')}
        </Button>
      </div>
    </Screen>
  );
}

/* ===== 5. QR / NFC Scan ===== */
export function Scan() {
  const { t } = useT();
  const { pop, push } = useNav();
  const selectHouse = useStore((s) => s.selectHouse);
  const [torch, setTorch] = useState(false);
  const [scanning, setScanning] = useState(false);

  const doScan = () => {
    setScanning(true);
    setTimeout(() => { selectHouse('wadi', 'wadi-h4'); push('visitOverview'); }, 900);
  };

  return (
    <Screen light statusBg="transparent">
      <div style={{ position: 'absolute', inset: 0, background: '#0E1614' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 38%, rgba(46,124,214,.12), transparent 60%)' }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '4px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
          <button className="center" onClick={pop} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="x" size={20} /></button>
          <span style={{ fontWeight: 700 }}>{t('scanTitle')}</span>
          <button className="center" onClick={() => setTorch((v) => !v)} style={{ width: 40, height: 40, borderRadius: 12, background: torch ? 'var(--color-primary)' : 'rgba(255,255,255,.12)', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="zap" size={20} /></button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26 }}>
          <div onClick={doScan} style={{ position: 'relative', width: 220, height: 220, cursor: 'pointer' }}>
            {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h], i) => (
              <span key={i} style={{ position: 'absolute', [v]: 0, [h]: 0, width: 44, height: 44, [`border${cap(v)}`]: '4px solid var(--color-blue)', [`border${cap(h)}`]: '4px solid var(--color-blue)', [`border${v}${cap(h)}Radius`]: 16 }} />
            ))}
            <div style={{ position: 'absolute', left: 18, right: 18, top: '50%', height: 2, background: 'var(--color-blue)', boxShadow: '0 0 14px var(--color-blue)', animation: scanning ? 'scanline 0.9s linear infinite' : 'none' }} />
            <Icon name="qr" size={92} color="rgba(255,255,255,.18)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,.78)', fontSize: 14, textAlign: 'center', maxWidth: 240, fontWeight: 500 }}>{scanning ? t('scanning') : t('scanInstruction')}</p>
        </div>
        <div style={{ padding: '0 24px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--color-blue)', fontSize: 13, fontWeight: 700 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--color-blue)' }} />{t('nfcReady')}</div>
          <button className="btn" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }} onClick={pop}><Icon name="list" size={19} />{t('selectManually')}</button>
        </div>
      </div>
      <style>{`@keyframes scanline{0%{top:14%}50%{top:86%}100%{top:14%}}`}</style>
    </Screen>
  );
}
const cap = (s) => s[0].toUpperCase() + s.slice(1);

/* ===== 6. Visit Overview ===== */
export function VisitOverview() {
  const { t, lang, num } = useT();
  const { push } = useNav();
  const visit = useStore((s) => s.visit);
  const startDraft = useStore((s) => s.startDraft);
  const role = useStore(selRole);
  if (!visit) return <Screen><Header title={t('selectFarmHouse')} back /></Screen>;
  const h = getHouse(visit.houseId);
  const p = h.prediction;
  const trendKey = p.trend; // worsening | improving | stable
  const trendIcon = p.trend === 'improving' ? 'trend-down' : 'trend-up';

  const start = () => { startDraft(); push(firstFlowRoute(role)); };
  const statusBadge = (st) => st === 'critical' ? ['risk-critical', t('critical')] : st === 'flagged' ? ['risk-medium', t('flagged')] : ['badge-synced', t('normal')];
  const tests = [['ELISA', 'var(--kpi-red)'], ['HI', 'var(--kpi-teal)'], ['PCR', 'var(--kpi-blue)'], ['MICRO', 'var(--kpi-orange)']];

  return (
    <Screen>
      <Header title={placeLabel(visit.farmId, visit.houseId, t, lang)} sub={t('visitStarted', { time: '09:41', date: lang === 'ar' ? '١٢ مايو' : '12 May' })} back
        right={<button className="iconbtn ghost"><Icon name="more-v" size={20} /></button>} />
      <div className="body pad">
        <div className="body-inner" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card card-pad row" style={{ gap: 10, padding: '12px 14px' }}>
            <FlockPill type={h.type} />
            <div className="divider" style={{ width: 1, height: 28, flex: '0 0 auto' }} />
            <div className="grow row" style={{ gap: 16 }}>
              <div><div className="pa-eyebrow">{h.type === 'breeder' ? t('serviceDay') : t('age')}</div><div style={{ fontWeight: 800, fontSize: 15 }}>{num(h.day)}</div></div>
              <div><div className="pa-eyebrow">{t('breed')}</div><div style={{ fontWeight: 800, fontSize: 15 }}>{h.breed}</div></div>
              <div><div className="pa-eyebrow">{t('placed')}</div><div style={{ fontWeight: 800, fontSize: 15 }}>{num(h.placed.toLocaleString('en-US'))}</div></div>
            </div>
          </div>

          <div className="card card-pad card-tap" style={{ border: `1.5px solid var(--color-risk-${p.risk})` }} onClick={() => push('prediction')}>
            <div className="between" style={{ marginBottom: 12 }}>
              <span className="pa-eyebrow">{t('paulaMortality')}</span>
              <RiskBadge level={p.risk} />
            </div>
            <div className="row" style={{ gap: 14, alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, color: `var(--color-risk-${p.risk})` }}>{num(p.mortality)}%</div>
                <div className="pa-cap" style={{ marginTop: 2 }}>{t('dayMortality')}</div>
              </div>
              <div className="grow" />
              {p.delta !== '0.0' && <span className={'badge risk-' + p.risk}><Icon name={trendIcon} size={14} stroke={2.6} />{num(p.delta)}%</span>}
            </div>
            <div className="divider" style={{ margin: '12px 0' }} />
            <div className="between">
              <span className="pa-cap">{t('updatedAgo', { t: t('minAgo', { n: p.updatedMin }) })}</span>
              <span className="pa-link row" style={{ fontSize: 13 }}>{t('viewData')}<Icon name="chevron-right" size={16} /></span>
            </div>
          </div>

          <div className="card card-pad card-tap" onClick={() => push('testResults')}>
            <div className="between" style={{ marginBottom: 10 }}>
              <div className="row gap8"><Icon name="flask" size={18} color="var(--color-primary)" /><span className="pa-h3">{t('lastTests')}</span></div>
              <span className="pa-link" style={{ fontSize: 13 }}>{t('expand')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {tests.map(([type, accent]) => {
                const [cls, label] = statusBadge(h.tests[type].status);
                return (
                  <div key={type} style={{ padding: '10px 12px', background: 'var(--color-surface-2)', borderRadius: 10, border: '1px solid var(--color-border)', borderInlineStart: '4px solid ' + accent }}>
                    <div className="pa-eyebrow">{type}</div>
                    <div style={{ marginTop: 3 }}><span className={'badge ' + cls} style={{ padding: '2px 8px' }}>{label}</span></div>
                  </div>
                );
              })}
            </div>
          </div>

          {h.lastObs ? (
            <div className="card card-pad row" style={{ gap: 12 }}>
              <div className="rowicon"><Icon name="clock" size={20} /></div>
              <div className="grow">
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t('lastVisit', { date: h.lastObs.date })}</div>
                <div className="pa-cap">{t('signsLesionsRec', { s: num(h.lastObs.signs), l: num(h.lastObs.lesions) })}</div>
              </div>
            </div>
          ) : (
            <div className="card card-pad row" style={{ gap: 12 }}>
              <div className="rowicon"><Icon name="clock" size={20} /></div>
              <div className="grow"><div className="pa-cap">{t('noLastVisit')}</div></div>
            </div>
          )}
        </div>
      </div>
      <div className="fab-area"><Button iconRight="arrow-right" onClick={start}>{t('startObservation')}</Button></div>
    </Screen>
  );
}
