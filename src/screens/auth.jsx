import { useEffect, useState } from 'react';
import { Screen, Button } from '../components/ui';
import Icon from '../components/Icon';
import { useT } from '../i18n/useT';
import { useStore, selPendingCount } from '../store/useStore';
import { useNav } from '../nav/useNav';
import { asset } from '../util';
import { VET } from '../data/seed';

export function Logo({ size = 168, light }) {
  return <img src={asset('paula-logo.png')} alt="Paula" style={{ width: size, height: 'auto', display: 'block', filter: light ? 'brightness(0) invert(1)' : 'none' }} />;
}

/* ===== 1. Splash / Loading ===== */
export function Splash() {
  const { t } = useT();
  const online = useStore((s) => s.online);
  const pending = useStore(selPendingCount);
  const signedIn = useStore((s) => s.session.signedIn);
  const { resetTo, replace } = useNav();

  const advance = () => (signedIn ? resetTo('home') : replace('login'));
  useEffect(() => {
    const id = setTimeout(advance, 1600);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen>
      <div onClick={advance} style={{ position: 'absolute', inset: 0, cursor: 'pointer', background: 'radial-gradient(115% 70% at 50% 30%, #FFFFFF 0%, #EEF3F8 58%, #E2EBF5 100%)' }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, pointerEvents: 'none' }}>
        <Logo size={250} />
        <div style={{ display: 'flex', gap: 7 }}>
          {[0, 1, 2].map((i) => <span key={i} className="splash-dot" style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--color-primary-soft)', animation: `splashDot 1s ${i * 0.18}s infinite` }} />)}
        </div>
      </div>
      {!online && (
        <div style={{ position: 'relative', padding: '0 24px 22px', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <div className="badge badge-offline" style={{ padding: '9px 16px', fontSize: 12.5 }}>
            <Icon name="wifi-off" size={15} stroke={2.2} /> {t('workingOffline', { n: pending })}
          </div>
        </div>
      )}
      <div style={{ position: 'relative', textAlign: 'center', paddingBottom: 8, color: 'var(--color-text-tertiary)', fontSize: 11, fontWeight: 600, letterSpacing: .5, pointerEvents: 'none' }}>{t('appKicker')}</div>
      <style>{`@keyframes splashDot{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.5);background:var(--color-primary)}}`}</style>
    </Screen>
  );
}

/* ===== 2. Login (SSO) ===== */
export function Login() {
  const { t, lang } = useT();
  const online = useStore((s) => s.online);
  const signIn = useStore((s) => s.signIn);
  const setLang = useStore((s) => s.setLang);
  const { resetTo, push } = useNav();

  const doLogin = () => { signIn(); resetTo('home'); };

  return (
    <Screen>
      <div className="body pad" style={{ background: 'var(--color-surface)', padding: '0 26px' }}>
        <div style={{ paddingTop: 40, paddingBottom: 26, display: 'flex', justifyContent: 'center' }}><Logo size={168} /></div>
        <div className="pa-h1" style={{ marginBottom: 8 }}>{t('welcome')}</div>
        <p className="pa-muted" style={{ fontSize: 15, marginBottom: 26 }}>{t('loginSub')}</p>
        <Button icon="shield" onClick={() => push('sso')}>{t('signInCairo')}</Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div className="divider grow" /><span className="pa-cap">{t('or')}</span><div className="divider grow" />
        </div>
        {!online && (
          <>
            <div className="card card-pad" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--color-offline-bg)', borderColor: '#F0DFB0' }}>
              <Icon name="wifi-off" size={20} color="#9A6B05" />
              <div className="grow">
                <div style={{ fontWeight: 700, fontSize: 13.5, color: '#8A5D06' }}>{t('offlineTitle')}</div>
                <div style={{ fontSize: 12, color: '#9A6B05' }}>{t('offlineDesc')}</div>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 12 }} onClick={doLogin}>{t('continueOffline')} →</button>
          </>
        )}
        <div style={{ marginTop: 'auto', paddingBottom: 18, paddingTop: 24 }}>
          <div className="pa-eyebrow" style={{ marginBottom: 8, textAlign: 'center' }}>{t('language')}</div>
          <div className="segmented">
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>English</button>
            <button className={lang === 'ar' ? 'on' : ''} onClick={() => setLang('ar')}>العربية</button>
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ===== Cairo3A SSO (identity provider) sign-in ===== */
export function SSO() {
  const { t } = useT();
  const signIn = useStore((s) => s.signIn);
  const { resetTo, pop } = useNav();
  const [email, setEmail] = useState(VET.email);
  const [pw, setPw] = useState('paula-demo');
  const [showPw, setShowPw] = useState(false);
  const [keep, setKeep] = useState(true);
  const [authing, setAuthing] = useState(false);
  const [error, setError] = useState('');

  const valid = /\S+@\S+\.\S+/.test(email) && pw.length >= 1;
  const submit = () => {
    if (!valid || authing) { setError(t('ssoErr')); return; }
    setError('');
    setAuthing(true);
    setTimeout(() => { signIn(); resetTo('home'); }, 1100);
  };

  return (
    <Screen>
      <div className="sso-screen" style={{ position: 'absolute', inset: 0 }} />
      <div className="body" style={{ position: 'relative', padding: '0 22px' }}>
        <div className="body-inner" style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          <div style={{ paddingTop: 4, paddingBottom: 18 }}>
            <button className="iconbtn" onClick={pop}><Icon name="chevron-left" size={20} /></button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 22 }}>
            <div className="sso-mark">C3A</div>
            <div>
              <div style={{ color: 'var(--color-text-primary)', fontWeight: 800, fontSize: 18, letterSpacing: -.3 }}>Cairo3A Poultry</div>
              <div className="pa-muted" style={{ fontSize: 12.5, fontWeight: 600 }}>{t('ssoIdentity')}</div>
            </div>
          </div>

          <div className="sso-card">
            <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: -.4 }}>{t('ssoSignIn')}</div>
            <div className="pa-muted" style={{ fontSize: 13.5, marginBottom: 18 }}>{t('ssoTo')}</div>

            <label className="sso-field">
              <span className="lab">{t('emailLabel')}</span>
              <div className="sso-input">
                <Icon name="user" size={18} color="var(--color-text-tertiary)" />
                <input type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('emailPh')} autoCapitalize="off" autoCorrect="off" />
              </div>
            </label>

            <label className="sso-field" style={{ marginBottom: 6 }}>
              <span className="lab">{t('passwordLabel')}</span>
              <div className="sso-input">
                <Icon name="shield" size={18} color="var(--color-text-tertiary)" />
                <input type={showPw ? 'text' : 'password'} dir="ltr" value={pw} onChange={(e) => setPw(e.target.value)} placeholder={t('pwPh')} onKeyDown={(e) => e.key === 'Enter' && submit()} />
                <button onClick={(e) => { e.preventDefault(); setShowPw((v) => !v); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', padding: 0 }}><Icon name="eye" size={18} /></button>
              </div>
            </label>

            {error && <div className="pa-cap" style={{ color: 'var(--color-risk-critical)', marginBottom: 8 }}>{error}</div>}

            <div className="between" style={{ margin: '10px 0 18px' }}>
              <button onClick={() => setKeep((v) => !v)} className="row gap8" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <span className="center" style={{ width: 20, height: 20, borderRadius: 6, border: '2px solid ' + (keep ? 'var(--color-primary)' : 'var(--color-border-strong)'), background: keep ? 'var(--color-primary)' : 'transparent' }}>{keep && <Icon name="check" size={12} stroke={3} color="#fff" />}</span>
                <span className="pa-cap" style={{ fontWeight: 600 }}>{t('keepSignedIn')}</span>
              </button>
              <span className="pa-link" style={{ fontSize: 12.5 }}>{t('forgotPw')}</span>
            </div>

            <button className="btn btn-primary" onClick={submit} disabled={authing}>
              {authing ? <><Icon name="sync" size={19} className="spin" />{t('authenticating')}</> : <>{t('ssoSignIn')}<Icon name="arrow-right" size={19} /></>}
            </button>
          </div>

          <div className="grow" />
          <div className="sso-foot" style={{ paddingTop: 22, paddingBottom: 6 }}>
            <Icon name="shield" size={14} />{t('ssoSecured')}
          </div>
        </div>
      </div>
    </Screen>
  );
}
