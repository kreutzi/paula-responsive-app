import { useState } from 'react';
import { Screen, Header, TabBar, Button, Chip, OfflineBanner, Empty } from '../components/ui';
import Icon from '../components/Icon';
import { useT } from '../i18n/useT';
import { useStore, selPendingCount } from '../store/useStore';
import { useNav } from '../nav/useNav';
import { farmName, houseNo, placeLabel, signName, lesionName, medName, routeName, digits, relTime } from '../data/helpers';

/* ===== 14. Offline Queue ===== */
function QueueItem({ sub, syncing, onDelete }) {
  const { t, lang, num } = useT();
  return (
    <div className="card card-pad" style={{ marginBottom: 10, padding: 14 }}>
      <div className="between">
        <div className="grow">
          <div style={{ fontWeight: 800, fontSize: 14.5 }}>{placeLabel(sub.farmId, sub.houseId, t, lang)}</div>
          <div className="pa-cap">{relTime(sub.when, t, lang)} · {num(sub.sizeMB || 1.0)} MB</div>
        </div>
        <div className="row gap8">
          {syncing
            ? <span className="badge badge-synced"><Icon name="sync" size={13} stroke={2.4} />{t('syncing')}</span>
            : <span className="badge badge-offline"><Icon name="clock" size={13} stroke={2.4} />{t('queued')}</span>}
          <button className="iconbtn ghost" style={{ width: 30, height: 30 }} onClick={onDelete}><Icon name="trash" size={17} color="var(--color-text-tertiary)" /></button>
        </div>
      </div>
      <div className="row" style={{ gap: 14, marginTop: 8 }}>
        <span className="pa-cap row" style={{ gap: 4 }}><Icon name="activity" size={14} />{num(sub.signs.length)} {t('signs')}</span>
        <span className="pa-cap row" style={{ gap: 4 }}><Icon name="bug" size={14} />{num(sub.lesions.length)} {t('lesions')}</span>
        <span className="pa-cap row" style={{ gap: 4 }}><Icon name="camera" size={14} />{num(sub.photoCount)}</span>
      </div>
      {syncing && <div style={{ marginTop: 10, height: 5, borderRadius: 3, background: 'var(--color-border)', overflow: 'hidden' }}><div style={{ width: '62%', height: '100%', background: 'var(--color-primary)', borderRadius: 3, animation: 'qsync 1.1s ease-in-out infinite' }} /></div>}
      <style>{`@keyframes qsync{0%{width:10%}50%{width:80%}100%{width:10%}}`}</style>
    </div>
  );
}

export function Queue() {
  const { t, num } = useT();
  const { openSheet, push } = useNav();
  const submissions = useStore((s) => s.submissions);
  const online = useStore((s) => s.online);
  const syncNow = useStore((s) => s.syncNow);
  const pending = useStore(selPendingCount);
  const [syncingIds, setSyncingIds] = useState([]);

  const queued = submissions.filter((s) => s.status === 'queued');

  const doSync = () => {
    if (!online || !queued.length) return;
    setSyncingIds(queued.map((q) => q.id));
    setTimeout(() => { syncNow(); setSyncingIds([]); }, 1300);
  };

  return (
    <Screen>
      <OfflineBanner onClick={() => push('error')} />
      <Header title={t('offlineQueue')} sub={t('waitingN', { n: pending })} back
        right={<Button sm variant={online && pending ? 'secondary' : 'disabled'} icon="sync" disabled={!online || !pending} onClick={doSync}>{t('syncNow')}</Button>} />
      <div className="body pad">
        <div className="body-inner">
          {queued.length === 0 ? (
            <Empty icon="check-circle" title={t('queueEmpty')} desc={t('queueEmptyDesc')} />
          ) : (
            <>
              {queued.map((q) => (
                <QueueItem key={q.id} sub={q} syncing={syncingIds.includes(q.id)} onDelete={() => openSheet('deleteSub', { id: q.id })} />
              ))}
              <div className="pa-cap row" style={{ gap: 7, justifyContent: 'center', marginTop: 6 }}>
                <Icon name="info" size={15} color="var(--color-text-tertiary)" />{t('swipeDelete')}
              </div>
            </>
          )}
        </div>
      </div>
    </Screen>
  );
}

/* ===== 15. Visit History ===== */
function HistoryItem({ sub, onOpen }) {
  const { t, lang, num } = useT();
  return (
    <div className="card card-pad card-tap" style={{ marginBottom: 10, padding: 14 }} onClick={onOpen}>
      <div className="between" style={{ marginBottom: 6 }}>
        <span style={{ fontWeight: 800, fontSize: 14.5 }}>{placeLabel(sub.farmId, sub.houseId, t, lang)}</span>
        <span className={'badge ' + (sub.status === 'synced' ? 'badge-synced' : 'badge-offline')}><Icon name={sub.status === 'synced' ? 'check-circle' : 'clock'} size={13} stroke={2.4} />{sub.status === 'synced' ? t('synced') : t('queued')}</span>
      </div>
      <div className="pa-cap" style={{ marginBottom: 8 }}>{relTime(sub.when, t, lang)} · {lang === 'ar' ? (sub.vetAr || sub.vet) : sub.vet}</div>
      <div className="row" style={{ gap: 14 }}>
        <span className="pa-cap row" style={{ gap: 4 }}><Icon name="activity" size={14} />{num(sub.signs.length)}</span>
        <span className="pa-cap row" style={{ gap: 4 }}><Icon name="bug" size={14} />{num(sub.lesions.length)}</span>
        <span className="pa-cap row" style={{ gap: 4 }}><Icon name="camera" size={14} />{num(sub.photoCount)}</span>
        <span className="grow" />
        <Icon name="chevron-right" size={18} color="var(--color-text-tertiary)" />
      </div>
    </div>
  );
}

export function History() {
  const { t, lang } = useT();
  const { push, openSheet } = useNav();
  const submissions = useStore((s) => s.submissions);
  const filter = useStore((s) => s.historyFilter);
  const [refreshing, setRefreshing] = useState(false);

  let list = [...submissions].sort((a, b) => b.ts - a.ts);
  if (filter.farm !== 'all') list = list.filter((s) => s.farmId === filter.farm);
  if (filter.vet !== 'all') list = list.filter((s) => s.vet === filter.vet);

  const refresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 900); };
  const fLabel = filter.farm === 'all' ? t('allFarmsF') : farmName(filter.farm, lang);
  const vLabel = filter.vet === 'all' ? t('allVets') : (lang === 'ar' && submissions.find((s) => s.vet === filter.vet)?.vetAr) || filter.vet;

  return (
    <Screen>
      <Header title={t('visitHistory')} right={<button className="iconbtn ghost" onClick={() => openSheet('historyFilter')}><Icon name="filter" size={20} /></button>} />
      <div className="chips-scroll" style={{ padding: '0 20px 12px' }}>
        <Chip on={filter.range !== 'all'} icon="calendar" onClick={() => openSheet('historyFilter')}>{t('last30')}</Chip>
        <Chip on={filter.farm !== 'all'} icon="farm" onClick={() => openSheet('historyFilter')}>{fLabel}</Chip>
        <Chip on={filter.vet !== 'all'} icon="user" onClick={() => openSheet('historyFilter')}>{vLabel}</Chip>
      </div>
      <div className="body pad">
        <div className="body-inner">
          <div className="pa-cap row" style={{ gap: 6, justifyContent: 'center', marginBottom: 10, color: 'var(--color-text-tertiary)', cursor: 'pointer' }} onClick={refresh}>
            <Icon name={refreshing ? 'sync' : 'arrow-down'} size={14} />{refreshing ? t('refreshing') : t('pullRefresh')}
          </div>
          {list.length === 0 ? (
            <Empty icon="clipboard" title={t('noVisits')} desc={t('noVisitsDesc')} />
          ) : list.map((sub) => <HistoryItem key={sub.id} sub={sub} onOpen={() => push('detail', { id: sub.id })} />)}
        </div>
      </div>
      <TabBar active="visits" />
    </Screen>
  );
}

/* ===== 16. Submission Detail ===== */
export function Detail() {
  const { t, lang, num } = useT();
  const { current } = useNav();
  const id = current().params.id;
  const submissions = useStore((s) => s.submissions);
  const toast = useStore((s) => s.toast);
  const sub = submissions.find((s) => s.id === id) || submissions[0];
  if (!sub) return <Screen><Header title={t('submissionDetail')} back /></Screen>;
  const queued = sub.status === 'queued';

  return (
    <Screen>
      <Header title={t('submissionDetail')} sub={sub.id} back
        right={<button className="iconbtn ghost" onClick={() => toast('exportPdf', 'info')}><Icon name="download" size={20} /></button>} />
      <div className="body pad">
        <div className="body-inner">
          <div className="card card-pad" style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{placeLabel(sub.farmId, sub.houseId, t, lang)}</div>
            <div className="pa-cap row" style={{ marginBottom: 10, gap: 6, flexWrap: 'wrap' }}>{relTime(sub.when, t, lang)} · {lang === 'ar' ? (sub.vetAr || sub.vet) : sub.vet} <span className={'badge ' + (queued ? 'badge-offline' : 'badge-synced')} style={{ padding: '1px 7px' }}>{queued ? t('queued') : t('synced')}</span></div>
            <div style={{ height: 96, borderRadius: 12, background: 'linear-gradient(135deg,#e4ecf5,#f1f5fa)', border: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }} className="center">
              <Icon name="map" size={30} color="var(--color-text-tertiary)" />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-100%)', color: 'var(--color-primary)' }}><Icon name="pin" size={26} solid /></div>
            </div>
          </div>

          {sub.signs.length > 0 && (
            <div className="card card-pad" style={{ marginBottom: 10 }}>
              <div className="pa-eyebrow" style={{ marginBottom: 8 }}>{t('signLabel')} · {num(sub.signs.length)}</div>
              {sub.signs.map((s, i) => (
                <div key={i} className="between" style={{ marginTop: i ? 8 : 0 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{signName(s.id, lang)}</span>
                  <span className="badge risk-medium">{t('sev_' + s.sev)}</span>
                </div>
              ))}
            </div>
          )}

          {sub.meds && sub.meds.length > 0 && (
            <div className="card card-pad" style={{ marginBottom: 10 }}>
              <div className="pa-eyebrow" style={{ marginBottom: 8 }}>{t('dailyMeds')} · {num(sub.meds.length)}</div>
              {sub.meds.map((m, i) => (
                <div key={i} className="between" style={{ marginTop: i ? 8 : 0 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{m.drugId ? medName(m.drugId, lang) : m.drugName}{m.dose ? ' · ' + m.dose : ''}</span>
                  <span className="pa-cap">{routeName(m.routeId, lang)} · {num(m.days)}d</span>
                </div>
              ))}
            </div>
          )}

          {sub.lesions.length > 0 && (
            <div className="card card-pad" style={{ marginBottom: 10 }}>
              <div className="pa-eyebrow" style={{ marginBottom: 8 }}>{t('lesionLabel')} · {num(sub.lesions.length)}</div>
              {sub.lesions.map((l, i) => (
                <div key={i} style={{ marginTop: i ? 10 : 0 }}>
                  <div className="between"><span style={{ fontWeight: 600, fontSize: 14 }}>{lesionName(l.id, lang)} · ×{num(l.count)}</span><span className="badge risk-high">{t('sev_' + l.sev)}</span></div>
                  {l.photos > 0 && <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>{Array.from({ length: l.photos }).map((_, j) => <div key={j} className="thumb" style={{ width: 56, height: 56, flex: '0 0 auto', background: 'linear-gradient(135deg,#dfeaf4,#eef3f8)' }}><Icon name="image" size={18} /></div>)}</div>}
                </div>
              ))}
            </div>
          )}

          {sub.notes && (
            <div className="card card-pad">
              <div className="pa-eyebrow" style={{ marginBottom: 8 }}>{t('notesSection')}</div>
              <div className="pa-cap" style={{ fontSize: 13.5, lineHeight: 1.5 }} dir="auto">{sub.notes}</div>
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}
