import { useState } from 'react';
import { Screen, Header, Button, Chip, Stepper } from '../components/ui';
import Icon from '../components/Icon';
import { useT } from '../i18n/useT';
import { useStore } from '../store/useStore';
import { useNav } from '../nav/useNav';
import { FARMS, ROUTES } from '../data/seed';
import { farmName, vaccineName } from '../data/helpers';
import { downloadSheet, pickSheet } from '../data/excel';

/* ===== 23. Vaccination Program (doctor-only, farm-level) ===== */
export function Vaccination() {
  const { t, lang, num } = useT();
  const { openSheet } = useNav();
  const vaccinations = useStore((s) => s.vaccinations);
  const visit = useStore((s) => s.visit);
  const addVaccination = useStore((s) => s.addVaccination);
  const updateVaccination = useStore((s) => s.updateVaccination);
  const removeVaccination = useStore((s) => s.removeVaccination);
  const importVaccinations = useStore((s) => s.importVaccinations);
  const saveVaccinations = useStore((s) => s.saveVaccinations);
  const toast = useStore((s) => s.toast);
  const [farmId, setFarmId] = useState(visit?.farmId || FARMS[0].id);

  const rows = vaccinations[farmId] || [];

  const onUpload = () => pickSheet((r) => {
    if (!r.length) { toast('t_nothingImported', 'info'); return; }
    importVaccinations(farmId, r); toast('t_imported', 'ok', { n: r.length });
  });
  const onDownload = () => downloadSheet('vaccination-program-' + farmId, ['vaccine', 'ageDay', 'route'],
    rows.length ? rows.map((r) => ({ vaccine: r.vaccineId ? vaccineName(r.vaccineId, 'en') : (r.vaccineName || ''), ageDay: r.ageDay, route: r.routeId }))
      : [{ vaccine: 'Newcastle (ND)', ageDay: 7, route: 'eye' }]);

  return (
    <Screen>
      <Header title={t('vaccination')} sub={t('vaccinationSub')} back
        right={<span className="pa-cap nowrap" style={{ fontWeight: 700, color: 'var(--color-primary)', cursor: 'pointer' }} onClick={saveVaccinations}>{t('save')}</span>} />
      <div className="body pad">
        <div className="body-inner">
          <div className="chips-scroll" style={{ marginBottom: 12 }}>
            {FARMS.map((f) => <Chip key={f.id} on={farmId === f.id} icon="farm" onClick={() => setFarmId(f.id)}>{farmName(f.id, lang)}</Chip>)}
          </div>

          <div className="card card-pad row" style={{ gap: 10, marginBottom: 12, background: 'var(--color-blue-tint)', borderColor: 'var(--color-blue)' }}>
            <Icon name="shield" size={20} color="var(--color-blue)" />
            <div className="pa-cap" style={{ color: 'var(--color-blue-700)', fontWeight: 600 }}>{t('addManualOrExcel')}</div>
          </div>
          <div className="row" style={{ gap: 8, marginBottom: 12 }}>
            <button className="btn btn-outline btn-sm grow" onClick={onDownload}><Icon name="download" size={16} />{t('downloadExcel')}</button>
            <button className="btn btn-outline btn-sm grow" onClick={onUpload}><Icon name="file-text" size={16} />{t('uploadExcel')}</button>
          </div>

          {rows.length === 0 && <div className="pa-cap" style={{ textAlign: 'center', padding: '4px 0 14px' }}>{t('noVaccines')}</div>}

          {rows.map((r) => (
            <div key={r.uid} className="card card-pad" style={{ padding: 14, marginBottom: 10 }}>
              <div className="between" style={{ marginBottom: 10 }}>
                <span className="pa-eyebrow">{t('vaccine')}</span>
                <button className="iconbtn ghost" style={{ width: 28, height: 28 }} onClick={() => removeVaccination(farmId, r.uid)}><Icon name="trash" size={17} color="var(--color-text-tertiary)" /></button>
              </div>
              <button className="input" style={{ height: 44, width: '100%', cursor: 'pointer', marginBottom: 10 }} onClick={() => openSheet('vaccine', { farmId, uid: r.uid })}>
                <span className="grow" style={{ fontWeight: 600, textAlign: 'start', color: (r.vaccineId || r.vaccineName) ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>{r.vaccineId ? vaccineName(r.vaccineId, lang) : (r.vaccineName || t('selectVaccine'))}</span>
                <Icon name="chevron-down" size={18} color="var(--color-text-tertiary)" />
              </button>
              <div className="between" style={{ marginBottom: 10 }}>
                <div><div className="pa-eyebrow" style={{ marginBottom: 5 }}>{t('ageDays')}</div><Stepper value={r.ageDay} min={0} onChange={(v) => updateVaccination(farmId, r.uid, { ageDay: v })} /></div>
              </div>
              <div className="pa-eyebrow" style={{ marginBottom: 5 }}>{t('routeOfAdmin')}</div>
              <div className="chips-scroll">
                {ROUTES.map((rt) => <Chip key={rt.id} on={r.routeId === rt.id} onClick={() => updateVaccination(farmId, r.uid, { routeId: rt.id })}>{lang === 'ar' ? rt.ar : rt.en}</Chip>)}
              </div>
            </div>
          ))}

          <button className="btn btn-secondary" style={{ height: 46 }} onClick={() => addVaccination(farmId)}><Icon name="plus" size={19} stroke={2.4} />{t('addVaccine')}</button>
        </div>
      </div>
      <div className="fab-area">
        <div className="between" style={{ marginBottom: 10, fontSize: 12.5 }}>
          <span className="row pa-muted" style={{ gap: 6 }}><Icon name="farm" size={15} color="var(--color-blue)" />{t('vaccForFarm', { farm: farmName(farmId, lang) })}</span>
          <span className="badge badge-blue">{t('vaccinesN', { n: num(rows.length) })}</span>
        </div>
        <Button icon="check" onClick={saveVaccinations}>{t('save')}</Button>
      </div>
    </Screen>
  );
}
