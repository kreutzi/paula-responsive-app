import Icon from './Icon';
import { useT } from '../i18n/useT';
import { useStore } from '../store/useStore';

const ICON = { ok: 'check-circle', error: 'alert', info: 'info' };

export default function Toaster() {
  const { t } = useT();
  const toasts = useStore((s) => s.toasts);
  const dismiss = useStore((s) => s.dismissToast);
  if (!toasts.length) return null;
  return (
    <div className="toast-wrap">
      {toasts.map((to) => (
        <div key={to.id} className={'toast toast-' + (to.kind || 'info')} onClick={() => dismiss(to.id)}>
          <Icon name={ICON[to.kind] || 'info'} size={18} />
          <span className="grow">{t(to.key, to.vars)}</span>
        </div>
      ))}
    </div>
  );
}
