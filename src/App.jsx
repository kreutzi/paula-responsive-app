import { useEffect, useLayoutEffect, useState } from 'react';
import { useNav } from './nav/useNav';
import { useStore } from './store/useStore';
import Toaster from './components/Toaster';
import Sheets from './components/Sheets';

import { Splash, Login, SSO } from './screens/auth';
import { Home } from './screens/home';
import { FarmSelect, Scan, VisitOverview } from './screens/visit';
import { Signs, Lesions, Medication, Camera, PhotoReview, Notes, Summary, Confirm } from './screens/observe';
import { Queue, History, Detail } from './screens/records';
import { Prediction, TestResults } from './screens/paula';
import { Settings, Notifications, ErrorState, UserConfig } from './screens/system';
import { Vaccination } from './screens/clinical';

const ROUTES = {
  splash: Splash, login: Login, sso: SSO, home: Home,
  farmSelect: FarmSelect, scan: Scan, visitOverview: VisitOverview,
  signs: Signs, lesions: Lesions, medication: Medication, camera: Camera, photoReview: PhotoReview, notes: Notes, summary: Summary, confirm: Confirm,
  queue: Queue, visits: History, alerts: Notifications, settings: Settings, detail: Detail,
  prediction: Prediction, testResults: TestResults, error: ErrorState, userConfig: UserConfig,
  vaccination: Vaccination,
};

const NAT_W = 402, NAT_H = 866;

export default function App() {
  const stack = useNav((s) => s.stack);
  const dir = useNav((s) => s.dir);
  const lang = useStore((s) => s.settings.lang);

  const top = stack[stack.length - 1];
  const route = top.route;
  const Comp = ROUTES[route] || Home;

  const [scale, setScale] = useState(1);
  const [mobile, setMobile] = useState(false);

  // language + document direction
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // responsive device scaling (full-screen on small viewports)
  useLayoutEffect(() => {
    const mq = window.matchMedia('(max-width: 480px), (max-height: 700px)');
    const fit = () => {
      if (mq.matches) { setMobile(true); setScale(1); return; }
      setMobile(false);
      const s = Math.min(1, (window.innerHeight - 28) / NAT_H, (window.innerWidth - 28) / NAT_W);
      setScale(s > 0 ? s : 1);
    };
    fit();
    window.addEventListener('resize', fit);
    if (mq.addEventListener) mq.addEventListener('change', fit);
    return () => { window.removeEventListener('resize', fit); if (mq.removeEventListener) mq.removeEventListener('change', fit); };
  }, []);

  const device = (
    <div className="device" style={mobile ? undefined : { transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <span className="device-btn mute" /><span className="device-btn vol-up" />
      <span className="device-btn vol-dn" /><span className="device-btn power" />
      <div className="device-viewport">
        <div className={dir === 'back' ? 'screen-anim-back' : 'screen-anim-fwd'} key={route + ':' + stack.length} style={{ height: '100%' }}>
          <Comp />
        </div>
        <Toaster />
        <Sheets />
      </div>
    </div>
  );

  return (
    <div className="stage">
      {mobile ? device : (
        <div className="device-fit" style={{ width: NAT_W * scale, height: NAT_H * scale }}>{device}</div>
      )}
      {!mobile && (
        <div className="stage-hint">
          Paula · Field Veterinarian App — interactive demo · <b>{lang === 'ar' ? 'العربية (RTL)' : 'English'}</b>
        </div>
      )}
    </div>
  );
}
