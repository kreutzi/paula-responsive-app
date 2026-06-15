import Icon from './Icon';
import { useT } from '../i18n/useT';
import { useNav } from '../nav/useNav';
import { useStore, selPendingCount, selUnreadCount } from '../store/useStore';

/* ---------- Screen shell (status bar + body + home indicator) ---------- */
export function StatusBar({ light, bg }) {
  return (
    <div className={'statusbar' + (light ? ' light' : '')} style={bg ? { background: bg } : undefined}>
      <span>9:41</span>
      <div className="island" />
      <div className="si">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
          <rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="4.5" width="3" height="7.5" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <Icon name="wifi" size={16} stroke={2.2} />
        <span className="battery"><i /></span>
      </div>
    </div>
  );
}

export function Screen({ children, light, statusBg, noHome }) {
  return (
    <div className="screen">
      <StatusBar light={light} bg={statusBg} />
      {children}
      {!noHome && <div className={'home-ind' + (light ? ' light' : '')} />}
    </div>
  );
}

/* ---------- Header ---------- */
export function Header({ title, sub, back, onBack, right, surface }) {
  const pop = useNav((s) => s.pop);
  return (
    <div className={'header' + (surface ? ' surface' : '')}>
      {back && (
        <button className="iconbtn" onClick={onBack || pop} aria-label="Back">
          <Icon name="chevron-left" size={22} />
        </button>
      )}
      <div className="grow">
        <div className="h-title">{title}</div>
        {sub && <div className="h-sub">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

/* ---------- Tab bar ---------- */
const TABS = [
  { key: 'home', icon: 'home', label: 'tabHome' },
  { key: 'visits', icon: 'clipboard', label: 'tabVisits' },
  { key: 'alerts', icon: 'bell', label: 'tabAlerts' },
  { key: 'settings', icon: 'settings', label: 'tabSettings' },
];
export function TabBar({ active }) {
  const { t, num } = useT();
  const switchTab = useNav((s) => s.switchTab);
  const pending = useStore(selPendingCount);
  const unread = useStore(selUnreadCount);
  const badges = { visits: pending, alerts: unread };
  return (
    <nav className="tabbar">
      {TABS.map((tb) => (
        <button key={tb.key} className={'tab' + (active === tb.key ? ' active' : '')} onClick={() => switchTab(tb.key)}>
          <span className="tb-ico">
            <Icon name={tb.icon} size={23} stroke={active === tb.key ? 2.4 : 2} />
            {badges[tb.key] ? <span className="tab-badge">{num(badges[tb.key])}</span> : null}
          </span>
          <span>{t(tb.label)}</span>
        </button>
      ))}
    </nav>
  );
}

/* ---------- Button ---------- */
export function Button({ children, variant = 'primary', icon, iconRight, sm, style, onClick, disabled }) {
  const v = disabled ? 'disabled' : variant;
  const cls = {
    primary: 'btn-primary', secondary: 'btn-secondary', ghost: 'btn-ghost',
    outline: 'btn-outline', destructive: 'btn-destructive', disabled: 'btn-disabled',
  }[v];
  return (
    <button className={'btn ' + cls + (sm ? ' btn-sm' : '')} style={style} onClick={disabled ? undefined : onClick} disabled={disabled}>
      {icon && <Icon name={icon} size={sm ? 17 : 20} stroke={2.4} />}
      {children}
      {iconRight && <Icon name={iconRight} size={sm ? 17 : 20} stroke={2.4} />}
    </button>
  );
}

/* ---------- Risk badge ---------- */
const RISK_DOT = { low: 'var(--color-risk-low)', medium: 'var(--color-risk-medium)', high: 'var(--color-risk-high)', critical: 'var(--color-risk-critical)' };
const RISK_CLS = { low: 'risk-low', medium: 'risk-medium', high: 'risk-high', critical: 'risk-critical' };
export function RiskBadge({ level = 'low', label }) {
  const { t } = useT();
  return (
    <span className={'badge ' + RISK_CLS[level]}>
      <span className="dot" style={{ background: RISK_DOT[level] }} />
      {label || t('risk_' + level)}
    </span>
  );
}
export { RISK_DOT };

/* ---------- Severity picker ---------- */
export function Severity({ value, gross, onChange }) {
  const { t } = useT();
  const opts = gross ? ['Mild', 'Moderate', 'Severe', 'Gross'] : ['Mild', 'Moderate', 'Severe'];
  return (
    <div className="sev">
      {opts.map((o) => (
        <button key={o} className={value === o ? 'on-' + o : ''} onClick={() => onChange && onChange(o)}>{t('sev_' + o)}</button>
      ))}
    </div>
  );
}

/* ---------- Stepper ---------- */
export function Stepper({ value, min = 1, max = 999, onChange }) {
  const { num } = useT();
  return (
    <div className="stepper">
      <button onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span className="stepval">{num(value)}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

/* ---------- Switch ---------- */
export function Switch({ on, onChange }) {
  return <button className={'switch' + (on ? ' on' : '')} onClick={() => onChange && onChange(!on)} aria-pressed={on} />;
}

/* ---------- Chip ---------- */
export function Chip({ children, on, icon, onClick }) {
  return (
    <button className={'chip' + (on ? ' on' : '')} onClick={onClick}>
      {icon && <Icon name={icon} size={15} />}{children}
    </button>
  );
}

/* ---------- Progress steps ---------- */
export function Steps({ current = 0 }) {
  const { t } = useT();
  const labels = [t('signLabel'), t('lesionLabel'), t('notesLabel'), t('review')];
  return (
    <div className="steps">
      {labels.map((l, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <div className={'step ' + (i < current ? 'done' : i === current ? 'current' : '')}>
            <span className="dotn">{i < current ? <Icon name="check" size={13} stroke={3} /> : (i + 1)}</span>
          </div>
          {i < labels.length - 1 && <div className={'step-line' + (i < current ? ' done' : '')} />}
        </span>
      ))}
    </div>
  );
}

/* ---------- Offline banner ---------- */
export function OfflineBanner({ onClick }) {
  const { t } = useT();
  const online = useStore((s) => s.online);
  if (online) return null;
  return (
    <div className="offline-banner" style={onClick ? { cursor: 'pointer' } : undefined} onClick={onClick}>
      <Icon name="wifi-off" size={16} stroke={2.2} />
      <span className="grow">{t('t_nowOffline')}</span>
      {onClick && <Icon name="chevron-right" size={16} />}
    </div>
  );
}

/* ---------- Flock pill + service-day tag ---------- */
export function FlockPill({ type = 'broiler', sm }) {
  const { t } = useT();
  const breeder = type === 'breeder';
  return (
    <span className="badge" style={{
      background: breeder ? 'rgba(139,92,246,.13)' : 'rgba(20,184,166,.14)',
      color: breeder ? '#7A3FE0' : '#0E8C7F', padding: sm ? '2px 8px' : '3px 10px', fontSize: sm ? 11 : 11.5, gap: 5,
    }}>
      <Icon name={breeder ? 'droplet' : 'paw'} size={sm ? 11 : 12} stroke={2.4} />
      {breeder ? t('flockBreeder') : t('flockBroiler')}
    </span>
  );
}
export function ServiceDay({ type = 'broiler', day, sm }) {
  const { t, num } = useT();
  const breeder = type === 'breeder';
  return (
    <span className="row" style={{ gap: 4, fontSize: sm ? 11.5 : 12.5, fontWeight: 700, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
      <Icon name="clock" size={sm ? 12 : 13} stroke={2.2} color="var(--color-text-tertiary)" />
      {(breeder ? t('serviceDay') : t('age'))} {num(day)}d
    </span>
  );
}

/* ---------- Empty state ---------- */
export function Empty({ icon = 'inbox', title, desc }) {
  return (
    <div className="empty">
      <div className="empty-ico"><Icon name={icon} size={34} stroke={1.8} /></div>
      <div className="pa-h3" style={{ color: 'var(--color-text-primary)' }}>{title}</div>
      {desc && <div className="pa-cap" style={{ maxWidth: 250 }}>{desc}</div>}
    </div>
  );
}
