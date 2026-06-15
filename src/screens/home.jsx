import { Screen, Header, TabBar, RiskBadge } from '../components/ui';
import Icon from '../components/Icon';
import { useT } from '../i18n/useT';
import { useStore, selPendingCount, selUnreadCount } from '../store/useStore';
import { useNav } from '../nav/useNav';
import { VET } from '../data/seed';
import { farmName, houseNo, notifTime, placeLabel, digits, relTime } from '../data/helpers';

export function Home() {
  const { t, lang, num } = useT();
  const { push, switchTab } = useNav();
  const submissions = useStore((s) => s.submissions);
  const notifications = useStore((s) => s.notifications);
  const draft = useStore((s) => s.draft);
  const pending = useStore(selPendingCount);
  const unread = useStore(selUnreadCount);

  const recent = [...submissions].sort((a, b) => b.ts - a.ts).slice(0, 3);
  const alerts = notifications.filter((n) => n.level !== 'low').slice(0, 2);
  const firstName = (lang === 'ar' ? VET.nameAr : VET.name).split(' ').slice(0, 2).join(' ');

  return (
    <Screen>
      <div className="body">
        <div style={{ padding: '6px 20px 14px' }}>
          <div className="between">
            <div>
              <div className="pa-cap" style={{ fontWeight: 600 }}>{lang === 'ar' ? 'الثلاثاء، ١٢ مايو' : 'Tuesday, 12 May'}</div>
              <div className="pa-h1" style={{ marginTop: 2 }}>{t('greeting', { name: firstName })}</div>
            </div>
            <div style={{ width: 46, height: 46, borderRadius: 23, background: 'var(--color-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 800, fontSize: 17 }}>{VET.initials}</div>
          </div>
        </div>

        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }} className="body-inner">
          <button className="btn btn-primary" style={{ height: 60 }} onClick={() => push('farmSelect')}>
            <Icon name="plus" size={22} stroke={2.6} />{t('startVisit')}
          </button>

          {draft && (
            <div className="card card-pad card-tap row" style={{ gap: 12, borderColor: 'var(--color-primary)', background: 'var(--color-primary-tint)' }} onClick={() => push('signs')}>
              <div className="rowicon" style={{ background: 'var(--color-primary)', color: '#fff' }}><Icon name="edit" size={19} /></div>
              <div className="grow">
                <div style={{ fontWeight: 700, fontSize: 14 }}>{placeLabel(draft.farmId, draft.houseId, t, lang)}</div>
                <div className="pa-cap">{t('resumeDraftTitle')} · {num(Object.keys(draft.signs).length)} {t('signs')} · {num(draft.lesions.length)} {t('lesions')}</div>
              </div>
              <Icon name="chevron-right" size={18} color="var(--color-primary)" />
            </div>
          )}

          {pending > 0 ? (
            <div className="sync-banner sync-pending" onClick={() => push('queue')}>
              <Icon name="sync" size={19} stroke={2.2} />
              <span className="grow">{t('pendingSync', { n: pending })}</span>
              <Icon name="chevron-right" size={18} />
            </div>
          ) : (
            <div className="sync-banner sync-ok" style={{ cursor: 'default' }}>
              <Icon name="check-circle" size={19} stroke={2.2} />
              <span className="grow">{t('allSynced')}</span>
            </div>
          )}

          {/* Paula Alerts */}
          <div className="card card-pad card-tap" onClick={() => switchTab('alerts')}>
            <div className="between" style={{ marginBottom: 4 }}>
              <div className="row gap8"><Icon name="alert" size={18} color="var(--color-risk-high)" /><span className="pa-h3">{t('paulaAlerts')}</span></div>
              <span className="badge badge-neutral">{t('activeCount', { n: unread })}</span>
            </div>
            {alerts.map((n, i) => (
              <div key={n.id}>
                {i > 0 && <div className="divider" />}
                <div className="lrow" style={{ padding: '12px 0' }}>
                  <span style={{ width: 6, height: 38, borderRadius: 3, background: `var(--color-risk-${n.level})`, flex: '0 0 auto' }} />
                  <div className="grow">
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{farmName(n.farmId, lang)} · {t('houseN', { n: houseNo(n.houseId) })}</div>
                    <div className="pa-cap">{notifTime(n, t)}</div>
                  </div>
                  <RiskBadge level={n.level} />
                </div>
              </div>
            ))}
          </div>

          {/* Recent submissions */}
          <div className="card card-pad">
            <div className="between" style={{ marginBottom: 2 }}>
              <span className="pa-h3">{t('recentSubs')}</span>
              <span className="pa-link" style={{ fontSize: 13 }} onClick={(e) => { e.stopPropagation(); switchTab('visits'); }}>{t('seeAll')}</span>
            </div>
            {recent.length === 0 && <div className="pa-cap" style={{ padding: '12px 0' }}>{t('noRecent')}</div>}
            {recent.map((sub, i) => (
              <div key={sub.id}>
                {i > 0 && <div className="divider" />}
                <div className="lrow card-tap" style={{ padding: '12px 0', cursor: 'pointer' }} onClick={() => push('detail', { id: sub.id })}>
                  <div className="rowicon"><Icon name="clipboard" size={20} /></div>
                  <div className="grow">
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{farmName(sub.farmId, lang)} · {t('houseN', { n: houseNo(sub.houseId) })}</div>
                    <div className="pa-cap">{relTime(sub.when, t, lang)}</div>
                  </div>
                  <span className={'badge ' + (sub.status === 'synced' ? 'badge-synced' : 'badge-offline')}>
                    <Icon name={sub.status === 'synced' ? 'check-circle' : 'clock'} size={13} stroke={2.4} />{sub.status === 'synced' ? t('synced') : t('queued')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar active="home" />
    </Screen>
  );
}
