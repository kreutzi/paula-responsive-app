import { FARM_BY_ID, HOUSE_BY_ID, SIGN_BY_ID, LESION_BY_ID, MED_BY_ID, VACCINE_BY_ID, ROUTE_BY_ID } from './seed';
import { toArDigits } from '../i18n/useT';

export const farmName = (id, lang) => { const f = FARM_BY_ID[id]; return f ? (lang === 'ar' ? f.nameAr : f.name) : ''; };
export const farmRegion = (id, lang) => { const f = FARM_BY_ID[id]; return f ? (lang === 'ar' ? f.regionAr : f.region) : ''; };
export const houseNo = (id) => { const h = HOUSE_BY_ID[id]; return h ? h.n : ''; };
export const house = (id) => HOUSE_BY_ID[id];
export const signName = (id, lang) => { const s = SIGN_BY_ID[id]; return s ? (lang === 'ar' ? s.ar : s.en) : id; };
export const lesionName = (id, lang) => { const l = LESION_BY_ID[id]; return l ? (lang === 'ar' ? l.ar : l.en) : id; };
export const medName = (id, lang) => { const m = MED_BY_ID[id]; return m ? (lang === 'ar' ? m.ar : m.en) : id; };
export const vaccineName = (id, lang) => { const v = VACCINE_BY_ID[id]; return v ? (lang === 'ar' ? v.ar : v.en) : id; };
export const routeName = (id, lang) => { const r = ROUTE_BY_ID[id]; return r ? (lang === 'ar' ? r.ar : r.en) : id; };
export const digits = (s, lang) => (lang === 'ar' ? toArDigits(String(s)) : String(s));

// localize relative date strings ("Today, 08:14" → "اليوم، ٠٨:١٤")
const AR_MONTH = { Jan: 'يناير', Feb: 'فبراير', Mar: 'مارس', Apr: 'أبريل', May: 'مايو', Jun: 'يونيو', Jul: 'يوليو', Aug: 'أغسطس', Sep: 'سبتمبر', Oct: 'أكتوبر', Nov: 'نوفمبر', Dec: 'ديسمبر' };
export const relTime = (when, t, lang) => {
  let s = String(when).replace('Today', t('today')).replace('Yesterday', t('yesterday'));
  if (lang === 'ar') {
    s = s.replace(/\b(May|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, (m) => AR_MONTH[m] || m);
    s = s.replace(',', '،');
    s = toArDigits(s);
  }
  return s;
};

export const placeLabel = (farmId, houseId, t, lang) =>
  `${farmName(farmId, lang)} · ${t('houseN', { n: houseNo(houseId) })}`;

export const notifTime = (n, t) =>
  n.minAgo != null ? t('minAgo', { n: n.minAgo })
  : n.hrAgo != null ? t('hrAgo', { n: n.hrAgo })
  : n.yesterday ? t('yesterday') : '';
