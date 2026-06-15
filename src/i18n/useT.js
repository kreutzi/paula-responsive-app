import { useStore } from '../store/useStore';
import { STRINGS } from './strings';

function interp(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : `{${k}}`));
}

// Western digits → Arabic-Indic for nicer AR rendering of numbers.
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
export function toArDigits(s) {
  return String(s).replace(/\d/g, (d) => AR_DIGITS[+d]);
}

export function useT() {
  const lang = useStore((s) => s.settings.lang);
  const dict = STRINGS[lang] || STRINGS.en;
  const t = (key, vars) => {
    let out = dict[key] != null ? dict[key] : (STRINGS.en[key] != null ? STRINGS.en[key] : key);
    out = interp(out, vars);
    if (lang === 'ar') out = toArDigits(out);
    return out;
  };
  // localise a {en, ar} data object
  const loc = (obj) => {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] != null ? obj[lang] : obj.en;
  };
  // number formatting (Arabic-Indic in AR)
  const num = (n) => (lang === 'ar' ? toArDigits(n) : String(n));
  return { t, loc, num, lang, dir: lang === 'ar' ? 'rtl' : 'ltr' };
}
