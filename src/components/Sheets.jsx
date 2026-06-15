import { Button } from './ui';
import Icon from './Icon';
import { useT } from '../i18n/useT';
import { useStore } from '../store/useStore';
import { useNav } from '../nav/useNav';
import { LESION_ORGANS, FARMS } from '../data/seed';
import { farmName } from '../data/helpers';

export default function Sheets() {
  const sheet = useNav((s) => s.sheet);
  const closeSheet = useNav((s) => s.closeSheet);
  if (!sheet) return null;
  const stop = (e) => e.stopPropagation();
  return (
    <div className={'overlay' + (sheet.type === 'deleteSub' ? ' center' : '')} onClick={closeSheet}>
      <div onClick={stop} style={{ display: 'contents' }}>
        {sheet.type === 'lesionType' && <LesionTypeSheet params={sheet.params} />}
        {sheet.type === 'deleteSub' && <DeleteDialog params={sheet.params} />}
        {sheet.type === 'historyFilter' && <HistoryFilterSheet />}
      </div>
    </div>
  );
}

function LesionTypeSheet({ params }) {
  const { t, lang } = useT();
  const updateLesion = useStore((s) => s.updateLesion);
  const closeSheet = useNav((s) => s.closeSheet);
  const draft = useStore((s) => s.draft);
  const entry = draft?.lesions.find((l) => l.uid === params.uid);
  const organ = LESION_ORGANS.find((o) => o.key === params.organ) || LESION_ORGANS[0];
  return (
    <div className="sheet" onClick={(e) => e.stopPropagation()}>
      <div className="sheet-grip" />
      <div className="between" style={{ marginBottom: 8 }}>
        <span className="pa-h3">{t('selectLesionType')} · {t('org_' + organ.key)}</span>
        <button className="iconbtn ghost" onClick={closeSheet}><Icon name="x" size={20} /></button>
      </div>
      <div style={{ overflowY: 'auto' }}>
        {organ.items.map((it) => {
          const on = entry?.lesionId === it.id;
          return (
            <div key={it.id} className="lrow" style={{ cursor: 'pointer' }} onClick={() => { updateLesion(params.uid, { lesionId: it.id }); closeSheet(); }}>
              <div className="center" style={{ width: 22, height: 22, borderRadius: 11, border: '2px solid ' + (on ? 'var(--color-primary)' : 'var(--color-border-strong)'), background: on ? 'var(--color-primary)' : 'transparent', flex: '0 0 auto' }}>{on && <Icon name="check" size={13} stroke={3} color="#fff" />}</div>
              <div className="grow">
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{lang === 'ar' ? it.ar : it.en}</div>
                <div className="pa-cap" dir={lang === 'ar' ? 'ltr' : 'rtl'}>{lang === 'ar' ? it.en : it.ar}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeleteDialog({ params }) {
  const { t } = useT();
  const deleteSubmission = useStore((s) => s.deleteSubmission);
  const closeSheet = useNav((s) => s.closeSheet);
  return (
    <div className="dialog" onClick={(e) => e.stopPropagation()}>
      <div className="center" style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--color-risk-critical-bg)', margin: '0 auto 14px' }}>
        <Icon name="trash" size={28} color="var(--color-risk-critical)" />
      </div>
      <div className="pa-h3" style={{ marginBottom: 6 }}>{t('deleteQTitle')}</div>
      <p className="pa-cap" style={{ marginBottom: 18 }}>{t('deleteQDesc')}</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={closeSheet}>{t('cancel')}</button>
        <Button variant="destructive" style={{ flex: 1 }} icon="trash" onClick={() => { deleteSubmission(params.id); closeSheet(); }}>{t('delete')}</Button>
      </div>
    </div>
  );
}

function HistoryFilterSheet() {
  const { t, lang } = useT();
  const filter = useStore((s) => s.historyFilter);
  const setHistoryFilter = useStore((s) => s.setHistoryFilter);
  const submissions = useStore((s) => s.submissions);
  const closeSheet = useNav((s) => s.closeSheet);

  const vets = Array.from(new Set(submissions.map((s) => s.vet)));
  const Seg = ({ label, value, options }) => (
    <div style={{ marginBottom: 16 }}>
      <div className="pa-eyebrow" style={{ marginBottom: 8 }}>{label}</div>
      <div className="chips-scroll">{options.map((o) => (
        <button key={o.key} className={'chip' + (value === o.key ? ' on' : '')} onClick={o.onClick}>{o.label}</button>
      ))}</div>
    </div>
  );

  return (
    <div className="sheet" onClick={(e) => e.stopPropagation()}>
      <div className="sheet-grip" />
      <div className="between" style={{ marginBottom: 14 }}>
        <span className="pa-h3">{t('filters')}</span>
        <button className="iconbtn ghost" onClick={closeSheet}><Icon name="x" size={20} /></button>
      </div>
      <Seg label={t('dateRange')} value={filter.range} options={[
        { key: '30', label: t('last30'), onClick: () => setHistoryFilter({ range: '30' }) },
        { key: 'all', label: t('all'), onClick: () => setHistoryFilter({ range: 'all' }) },
      ]} />
      <Seg label={t('farm')} value={filter.farm} options={[
        { key: 'all', label: t('allFarmsF'), onClick: () => setHistoryFilter({ farm: 'all' }) },
        ...FARMS.map((f) => ({ key: f.id, label: farmName(f.id, lang), onClick: () => setHistoryFilter({ farm: f.id }) })),
      ]} />
      <Seg label={t('vet')} value={filter.vet} options={[
        { key: 'all', label: t('allVets'), onClick: () => setHistoryFilter({ vet: 'all' }) },
        ...vets.map((v) => ({ key: v, label: v, onClick: () => setHistoryFilter({ vet: v }) })),
      ]} />
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button className="btn btn-outline" style={{ flex: '0 0 120px' }} onClick={() => setHistoryFilter({ farm: 'all', vet: 'all', range: '30' })}>{t('reset')}</button>
        <Button onClick={closeSheet} style={{ flex: 1 }}>{t('apply')}</Button>
      </div>
    </div>
  );
}
