import { useState } from 'react';
import { Screen, Header, RiskBadge, Chip } from '../components/ui';
import Icon from '../components/Icon';
import { useT } from '../i18n/useT';
import { useStore } from '../store/useStore';
import { house as getHouse, placeLabel } from '../data/helpers';
import { TEST_TYPES } from '../data/seed';

/* ===== 17. Paula Prediction View ===== */
export function Prediction() {
  const { t, lang, num } = useT();
  const visit = useStore((s) => s.visit);
  if (!visit) return <Screen><Header title={t('mortalityData')} back /></Screen>;
  const h = getHouse(visit.houseId);
  const p = h.prediction;
  const max = Math.max(...p.forecast) + 0.4;
  const trendIcon = p.trend === 'improving' ? 'trend-down' : p.trend === 'stable' ? 'activity' : 'trend-up';
  const trendCls = p.trend === 'improving' ? 'risk-low' : p.trend === 'stable' ? 'badge-neutral' : 'risk-' + p.risk;

  return (
    <Screen>
      <Header title={t('mortalityData')} sub={placeLabel(visit.farmId, visit.houseId, t, lang)} back />
      <div className="body pad">
        <div className="body-inner">
          <div className="card card-pad" style={{ marginBottom: 10, textAlign: 'center', border: `1.5px solid var(--color-risk-${p.risk})` }}>
            <RiskBadge level={p.risk} />
            <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, color: `var(--color-risk-${p.risk})`, marginTop: 8 }}>{num(p.mortality)}%</div>
            <div className="pa-cap">{t('predicted7', { t: t('minAgo', { n: p.updatedMin }) })}</div>
          </div>

          <div className="card card-pad" style={{ marginBottom: 10 }}>
            <div className="between" style={{ marginBottom: 12 }}>
              <span className="pa-h3">{t('dayData')}</span>
              <span className={'badge ' + trendCls}><Icon name={trendIcon} size={13} stroke={2.6} />{t(p.trend)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
              {p.forecast.map((v, i) => {
                const lastIdx = p.forecast.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: i === lastIdx ? `var(--color-risk-${p.risk})` : 'var(--color-text-tertiary)' }}>{num(v)}</span>
                    <div style={{ width: '100%', height: (v / max * 100) + '%', borderRadius: 5, background: i === lastIdx ? `var(--color-risk-${p.risk})` : 'var(--color-blue)' }} />
                    <span className="pa-eyebrow" style={{ fontSize: 9 }}>D{num(i + 1)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {p.factors.length > 0 && (
            <div className="card card-pad">
              <div className="pa-h3" style={{ marginBottom: 10 }}>{t('contributing')}</div>
              {p.factors.map((f, i) => (
                <div key={i} className="between" style={{ padding: '7px 0' }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>{lang === 'ar' ? f.label.ar : f.label.en}</span>
                  <Icon name={f.dir === 'up' ? 'arrow-up' : 'arrow-down'} size={17} color={`var(--color-risk-${f.level})`} stroke={2.6} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}

/* ===== 18. Last Test Results ===== */
const TITER_PCT = (titer, ref) => {
  const m = String(ref).match(/[\d,]+/);
  const r = m ? +m[0].replace(/,/g, '') : 4000;
  return Math.max(8, Math.min(100, Math.round((titer / r) * 60)));
};

export function TestResults() {
  const { t, lang, num } = useT();
  const visit = useStore((s) => s.visit);
  const toast = useStore((s) => s.toast);
  const [tab, setTab] = useState('ELISA');
  if (!visit) return <Screen><Header title={t('lastTestResults')} back /></Screen>;
  const h = getHouse(visit.houseId);
  const test = h.tests[tab];
  const statusBadge = test.status === 'critical' ? ['risk-critical', t('critical')] : test.status === 'flagged' ? ['risk-medium', t('flagged')] : ['badge-synced', t('normal')];

  const sectionTitle = { ELISA: 'ELISA · Serology', HI: 'HI · Haemagglutination', PCR: 'PCR · Molecular', MICRO: 'Microbiology', SENS: 'Sensitivity', PM: 'PM Report' }[tab];

  return (
    <Screen>
      <Header title={t('lastTestResults')} sub={placeLabel(visit.farmId, visit.houseId, t, lang)} back />
      <div className="chips-scroll" style={{ padding: '0 20px 12px' }}>
        {TEST_TYPES.map((tt) => <Chip key={tt} on={tab === tt} onClick={() => setTab(tt)}>{tt}</Chip>)}
      </div>
      <div className="body pad">
        <div className="body-inner">
          <div className="between" style={{ marginBottom: 10 }}>
            <div><div className="pa-eyebrow">{sectionTitle}</div><div className="pa-cap">{t('sampled', { date: test.date })}</div></div>
            <span className={'badge ' + statusBadge[0]}><Icon name={test.status === 'normal' ? 'check-circle' : 'alert'} size={13} stroke={2.4} />{statusBadge[1]}</span>
          </div>

          {tab === 'ELISA' && test.items.map((it, i) => {
            const pct = TITER_PCT(it.titer, it.ref);
            return (
              <div key={i} className="card card-pad" style={{ marginBottom: 8, padding: '12px 14px' }}>
                <div className="between" style={{ marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{lang === 'ar' ? it.pathogen.ar : it.pathogen.en}</span>
                  <span className="pa-mono" style={{ fontWeight: 700, fontSize: 15, color: it.flag ? 'var(--color-risk-high)' : 'var(--color-text-primary)' }}>{num(it.titer.toLocaleString('en-US'))}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--color-surface-2)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', insetInlineStart: 0, top: 0, bottom: 0, width: pct + '%', background: it.flag ? 'var(--color-risk-high)' : 'var(--color-risk-low)', borderRadius: 3 }} />
                </div>
                <div className="pa-cap" style={{ marginTop: 5 }}>{t('titer', { r: it.ref })}</div>
              </div>
            );
          })}

          {tab === 'PCR' && test.items.map((it, i) => (
            <div key={i} className="card card-pad between" style={{ marginBottom: 8, padding: '12px 14px' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{lang === 'ar' ? it.pathogen.ar : it.pathogen.en}</span>
              <span className={'badge ' + (it.positive ? 'risk-critical' : 'badge-synced')}>{it.positive ? t('positive') : t('negative')}</span>
            </div>
          ))}

          {['HI', 'MICRO', 'SENS', 'PM'].includes(tab) && test.items.map((it, i) => (
            <div key={i} className="card card-pad between" style={{ marginBottom: 8, padding: '12px 14px' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{lang === 'ar' ? it.pathogen.ar : it.pathogen.en}</span>
              <span className="pa-cap" style={{ fontWeight: 700 }}>{lang === 'ar' ? it.result.ar : it.result.en}</span>
            </div>
          ))}

          <button className="btn btn-ghost" style={{ marginTop: 2 }} onClick={() => toast('viewFullHistory', 'info')}>{t('viewFullHistory')}</button>
        </div>
      </div>
    </Screen>
  );
}
