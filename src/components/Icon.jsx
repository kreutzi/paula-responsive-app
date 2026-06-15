// Curated Lucide-style inline SVG icon set.
const P = {
  home: '<path d="M3 9.6 12 3l9 6.6V20a1 1 0 0 1-1 1h-5v-6.2H9V21H4a1 1 0 0 1-1-1z"/>',
  clipboard: '<rect x="6" y="4.5" width="12" height="16.5" rx="2.2"/><path d="M9 4.5V3.6a1.2 1.2 0 0 1 1.2-1.2h3.6A1.2 1.2 0 0 1 15 3.6v.9z"/><path d="M9 11h6M9 14.6h4.5"/>',
  bell: '<path d="M6 9a6 6 0 1 1 12 0c0 4.5 2 5.6 2 5.6H4S6 13.5 6 9"/><path d="M10.2 19.5a2 2 0 0 0 3.6 0"/>',
  settings: '<path d="M4 8h8M16.5 8H20M4 16h3.5M12 16h8"/><circle cx="14" cy="8" r="2.4"/><circle cx="9" cy="16" r="2.4"/>',
  'chevron-left': '<path d="M15 4.5 8 12l7 7.5"/>',
  'chevron-right': '<path d="M9 4.5 16 12l-7 7.5"/>',
  'chevron-down': '<path d="M5 9l7 7 7-7"/>',
  'chevron-up': '<path d="M5 15l7-7 7 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="M5 12.5 10 17.5 20 6.5"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-5.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.2-4.2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  scan: '<path d="M4 8.5V6a2 2 0 0 1 2-2h2.5M15.5 4H18a2 2 0 0 1 2 2v2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5M8.5 20H6a2 2 0 0 1-2-2v-2.5"/><path d="M4 12h16"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2.5v2.5M20 14v.01M14 20h6M20 17v3"/>',
  camera: '<path d="M3.5 8.2A2 2 0 0 1 5.5 6.3H7l1-2h8l1 2h1.5a2 2 0 0 1 2 1.9V17a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.4" r="3.3"/>',
  zap: '<path d="M13 2 4 13.5h6.5L10 22l9-11.5h-6.5z"/>',
  sync: '<path d="M3.5 12a8.5 8.5 0 0 1 14.3-6.2L21 8M21 3.5V8h-4.5M20.5 12a8.5 8.5 0 0 1-14.3 6.2L3 16M3 20.5V16h4.5"/>',
  'wifi-off': '<path d="M2 8.4a16 16 0 0 1 5-3.1M20.5 8.6a16 16 0 0 0-6.5-3.3M8.6 12.3a9.5 9.5 0 0 1 2.9-1.5M15.4 12.4a9.5 9.5 0 0 0-1.9-1.1M9 16.3a4.5 4.5 0 0 1 5.2-.4"/><path d="M12 20h.01"/><path d="M2.5 2.5l19 19"/>',
  wifi: '<path d="M2 8.4a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.6a6 6 0 0 1 7 0"/><path d="M12 19.5h.01"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.2"/><circle cx="9" cy="10" r="1.6"/><path d="M20.5 15.5 15.5 11 6 19.5"/>',
  trash: '<path d="M4 7h16M9 7V5.2a1.2 1.2 0 0 1 1.2-1.2h3.6A1.2 1.2 0 0 1 15 5.2V7M6.5 7l1 12.2a1.2 1.2 0 0 0 1.2 1.1h6.6a1.2 1.2 0 0 0 1.2-1.1L18 7M10 11v6M14 11v6"/>',
  edit: '<path d="M4 20h4L19.2 8.8a2 2 0 0 0-2.8-2.8L5 17.2z"/><path d="M14.5 6.5l3 3"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/>',
  activity: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
  flask: '<path d="M9 3h6M10 3v6.2L5.2 18a1.6 1.6 0 0 0 1.4 2.4h10.8a1.6 1.6 0 0 0 1.4-2.4L14 9.2V3"/><path d="M7.3 14h9.4"/>',
  microscope: '<path d="M6 20h12M9 20v-3M5 17h8a4 4 0 0 0-4-7"/><path d="M10 9l-2-2 2.5-2.5L13 7zM7.5 6.5 5 9"/>',
  alert: '<path d="M12 3.2 2.3 20.2a1 1 0 0 0 .9 1.5h17.6a1 1 0 0 0 .9-1.5z"/><path d="M12 9.5v5M12 17.7h.01"/>',
  'trend-up': '<path d="M3 17l6-6 4 4 8-8"/><path d="M16 7h5v5"/>',
  'trend-down': '<path d="M3 7l6 6 4-4 8 8"/><path d="M16 17h5v-5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8h.01"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16.5 14.5 12 10 7.5M14.5 12H3.5"/>',
  'more-v': '<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  filter: '<path d="M3.5 5.5h17l-6.5 7.5v5.5l-4-2v-3.5z"/>',
  farm: '<path d="M3 21V8.5l9-5 9 5V21"/><path d="M3 21h18M9 21v-6h6v6M9 11h6"/>',
  house: '<path d="M3.5 21h17M5 21V7l7-3.5L19 7v14M9.5 21v-4.5a2.5 2.5 0 0 1 5 0V21"/>',
  'file-text': '<path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z"/><path d="M14 3.5V8h4.5M9 13h6M9 16.5h6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  download: '<path d="M12 3.5v11.5M8 11l4 4 4-4M5 20.5h14"/>',
  shield: '<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  database: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  droplet: '<path d="M12 3s6.5 6.3 6.5 10.5a6.5 6.5 0 0 1-13 0C5.5 9.3 12 3 12 3z"/>',
  'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>',
  'arrow-up': '<path d="M12 19V5M6 11l6-6 6 6"/>',
  'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
  paw: '<circle cx="6.5" cy="11" r="2"/><circle cx="11" cy="7.5" r="2"/><circle cx="16" cy="9" r="2"/><path d="M12 13c-2.6 0-4.5 2-4.5 4 0 1.5 1.2 2.2 2.5 1.6 1.3-.6 2.7-.6 4 0 1.3.6 2.5-.1 2.5-1.6 0-2-1.9-4-4.5-4z"/>',
  bug: '<rect x="8" y="7" width="8" height="11" rx="4"/><path d="M8 11H4M20 11h-4M8 15H4.5M19.5 15H16M9 7l-1.5-2M15 7l1.5-2M12 7V4"/>',
  map: '<path d="M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13l-5.5 2zM9 4.5v13M15 6.5v13"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/>',
  moon: '<path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  play: '<path d="M7 5l11 7-11 7z"/>',
  inbox: '<path d="M3.5 13l3-8.2h11l3 8.2v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M3.5 13H8l1.2 2.5h5.6L16 13h4.5"/>',
};

const DIRECTIONAL = new Set(['chevron-left', 'chevron-right', 'arrow-right', 'logout']);

export default function Icon({ name, size = 22, stroke = 2, solid = false, color = 'currentColor', className = '', style }) {
  const inner = P[name];
  if (!inner) return null;
  const cls = (DIRECTIONAL.has(name) ? 'flip-rtl ' : '') + className;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={solid ? color : 'none'} stroke={solid ? 'none' : color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      className={cls} style={style} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
