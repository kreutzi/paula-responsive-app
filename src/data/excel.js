// Lightweight, dependency-free Excel I/O for the demo.
// Uses CSV — which Excel / Google Sheets open and save natively — so the
// "download template → fill in Excel → upload" loop works with no extra libs.
// In the production app this is the seam where SheetJS (xlsx) would slot in.

function escapeCell(v) {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

// rows: array of plain objects keyed by the header names.
export function toCSV(headers, rows) {
  const head = headers.map(escapeCell).join(',');
  const body = rows.map((r) => headers.map((h) => escapeCell(r[h])).join(',')).join('\n');
  return body ? head + '\n' + body : head + '\n';
}

export function downloadSheet(filename, headers, rows = []) {
  const csv = '﻿' + toCSV(headers, rows); // BOM so Excel reads UTF-8 (Arabic) correctly
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : filename + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Minimal CSV parser (handles quoted fields + escaped quotes).
export function parseCSV(text) {
  const clean = text.replace(/^﻿/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rows = [];
  let row = [], cell = '', inQ = false;
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    if (inQ) {
      if (c === '"') { if (clean[i + 1] === '"') { cell += '"'; i++; } else inQ = false; }
      else cell += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1)
    .filter((r) => r.some((v) => v.trim() !== ''))
    .map((r) => { const o = {}; headers.forEach((h, i) => { o[h] = (r[i] || '').trim(); }); return o; });
}

// Opens a file picker, parses the chosen CSV, and calls onRows(arrayOfObjects).
export function pickSheet(onRows) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv,.xlsx,.xls,text/csv';
  input.onchange = () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { try { onRows(parseCSV(String(reader.result))); } catch { onRows([]); } };
    reader.readAsText(file);
  };
  input.click();
}
