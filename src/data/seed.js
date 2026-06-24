// Mock data for the Paula field-vet demo. Clinical terms are bilingual {en, ar}.

export const VET = {
  name: 'Dr. Hossam Fawzy', nameAr: 'د. حسام فوزي', initials: 'HF',
  email: 'hossam.fawzy@cairo3apoultry.com', role: 'fieldVet',
};

const fc = (...v) => v; // forecast helper for readability

export const FARMS = [
  {
    id: 'wadi', name: 'Wadi Farm', nameAr: 'مزرعة الوادي', region: 'Beni Suef', regionAr: 'بني سويف',
    houses: [
      {
        id: 'wadi-h2', n: 2, type: 'broiler', day: 24, breed: 'Ross 308', placed: 21400,
        risk: 'low', lastVisit: '3d ago', lastVisitAr: 'منذ ٣ أيام',
        prediction: { mortality: 1.4, risk: 'low', trend: 'improving', delta: '-0.3', updatedMin: 40,
          forecast: fc(1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.4),
          factors: [
            { label: { en: 'Stable temperature', ar: 'استقرار الحرارة' }, dir: 'down', level: 'low' },
            { label: { en: 'Good water intake', ar: 'استهلاك ماء جيد' }, dir: 'down', level: 'low' },
            { label: { en: 'Ammonia within range', ar: 'الأمونيا ضمن الحد' }, dir: 'down', level: 'low' },
          ] },
        tests: testSet('low'), lastObs: { signs: 2, lesions: 1, date: 'Today, 08:14' },
      },
      {
        id: 'wadi-h4', n: 4, type: 'broiler', day: 31, breed: 'Ross 308', placed: 21400,
        risk: 'critical', lastVisit: 'Today', lastVisitAr: 'اليوم',
        prediction: { mortality: 4.8, risk: 'critical', trend: 'worsening', delta: '+1.6', updatedMin: 22,
          forecast: fc(2.9, 3.3, 3.6, 4.0, 4.4, 4.6, 4.8),
          factors: [
            { label: { en: 'Ammonia (NH₃) rising', ar: 'ارتفاع الأمونيا (NH₃)' }, dir: 'up', level: 'high' },
            { label: { en: 'Low water intake', ar: 'انخفاض استهلاك الماء' }, dir: 'up', level: 'high' },
            { label: { en: 'PCR: AIV positive', ar: 'PCR: إنفلونزا الطيور إيجابي' }, dir: 'up', level: 'critical' },
            { label: { en: 'Temperature variance', ar: 'تباين الحرارة' }, dir: 'down', level: 'low' },
          ] },
        tests: testSet('critical'), lastObs: { signs: 3, lesions: 2, date: '9 May' },
      },
      {
        id: 'wadi-h6', n: 6, type: 'breeder', day: 148, breed: 'Cobb 500', placed: 9800,
        risk: 'medium', lastVisit: '1w ago', lastVisitAr: 'منذ أسبوع',
        prediction: { mortality: 2.6, risk: 'medium', trend: 'stable', delta: '0.0', updatedMin: 90,
          forecast: fc(2.5, 2.6, 2.6, 2.5, 2.6, 2.6, 2.6),
          factors: [
            { label: { en: 'Mild litter moisture', ar: 'رطوبة فرشة خفيفة' }, dir: 'up', level: 'medium' },
            { label: { en: 'Stable intake', ar: 'استهلاك مستقر' }, dir: 'down', level: 'low' },
          ] },
        tests: testSet('medium'), lastObs: null,
      },
      {
        id: 'wadi-h7', n: 7, type: 'breeder', day: 155, breed: 'Cobb 500', placed: 9800,
        risk: 'low', lastVisit: '2w ago', lastVisitAr: 'منذ أسبوعين',
        prediction: { mortality: 1.1, risk: 'low', trend: 'stable', delta: '0.0', updatedMin: 120,
          forecast: fc(1.2, 1.1, 1.1, 1.0, 1.1, 1.1, 1.1), factors: [] },
        tests: testSet('low'), lastObs: null,
      },
    ],
  },
  {
    id: 'nile', name: 'Nile Delta', nameAr: 'دلتا النيل', region: 'Damietta', regionAr: 'دمياط',
    houses: [
      {
        id: 'nile-h7', n: 7, type: 'broiler', day: 28, breed: 'Ross 308', placed: 18900,
        risk: 'high', lastVisit: 'Yesterday', lastVisitAr: 'أمس',
        prediction: { mortality: 3.4, risk: 'high', trend: 'worsening', delta: '+0.9', updatedMin: 60,
          forecast: fc(2.2, 2.5, 2.7, 3.0, 3.1, 3.3, 3.4),
          factors: [
            { label: { en: 'E. coli detected', ar: 'اكتشاف إي كولاي' }, dir: 'up', level: 'high' },
            { label: { en: 'Rising mortality trend', ar: 'اتجاه نفوق متصاعد' }, dir: 'up', level: 'high' },
          ] },
        tests: testSet('high'), lastObs: { signs: 4, lesions: 3, date: 'Yesterday, 14:20' },
      },
      {
        id: 'nile-h3', n: 3, type: 'broiler', day: 15, breed: 'Ross 308', placed: 18900,
        risk: 'low', lastVisit: '5d ago', lastVisitAr: 'منذ ٥ أيام',
        prediction: { mortality: 1.0, risk: 'low', trend: 'stable', delta: '0.0', updatedMin: 75,
          forecast: fc(1.1, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), factors: [] },
        tests: testSet('low'), lastObs: null,
      },
    ],
  },
  {
    id: 'giza', name: 'Giza South', nameAr: 'جنوب الجيزة', region: 'Giza', regionAr: 'الجيزة',
    houses: [
      {
        id: 'giza-h5', n: 5, type: 'breeder', day: 132, breed: 'Cobb 500', placed: 8600,
        risk: 'medium', lastVisit: '9 May', lastVisitAr: '٩ مايو',
        prediction: { mortality: 2.2, risk: 'medium', trend: 'improving', delta: '-0.4', updatedMin: 180,
          forecast: fc(2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.2),
          factors: [{ label: { en: 'Recovering intake', ar: 'تعافي الاستهلاك' }, dir: 'down', level: 'low' }] },
        tests: testSet('medium'), lastObs: { signs: 3, lesions: 0, date: '9 May, 16:40' },
      },
      {
        id: 'giza-h3', n: 3, type: 'breeder', day: 140, breed: 'Cobb 500', placed: 8600,
        risk: 'medium', lastVisit: '12d ago', lastVisitAr: 'منذ ١٢ يوماً',
        prediction: { mortality: 2.4, risk: 'medium', trend: 'stable', delta: '0.0', updatedMin: 200,
          forecast: fc(2.3, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4), factors: [] },
        tests: testSet('medium'), lastObs: null,
      },
    ],
  },
];

// Build a lab-test set keyed by the house's overall risk.
function testSet(risk) {
  const flagged = risk === 'high' || risk === 'critical';
  return {
    ELISA: {
      date: '6 May', status: flagged ? 'flagged' : 'normal',
      items: [
        { pathogen: { en: 'Newcastle (NDV)', ar: 'نيوكاسل (NDV)' }, titer: 4820, ref: '< 4,000', flag: true },
        { pathogen: { en: 'Infectious Bronchitis', ar: 'الالتهاب الشعبي المعدي' }, titer: 3110, ref: '< 3,500', flag: false },
        { pathogen: { en: 'Avian Influenza H9', ar: 'إنفلونزا الطيور H9' }, titer: flagged ? 6540 : 3200, ref: '< 4,000', flag: flagged },
        { pathogen: { en: 'Gumboro (IBD)', ar: 'الجمبورو (IBD)' }, titer: 2250, ref: '< 3,000', flag: false },
      ],
    },
    HI: { date: '6 May', status: 'normal', key: { en: 'All titers within range', ar: 'كل العيارات ضمن الحد' },
      items: [
        { pathogen: { en: 'NDV HI', ar: 'NDV HI' }, result: { en: 'Log2 5.2', ar: 'Log2 ٥٫٢' } },
        { pathogen: { en: 'H9 HI', ar: 'H9 HI' }, result: { en: 'Log2 4.8', ar: 'Log2 ٤٫٨' } },
      ] },
    PCR: { date: '5 May', status: flagged ? 'critical' : 'normal',
      key: flagged ? { en: 'AIV positive', ar: 'إنفلونزا الطيور إيجابي' } : { en: 'All negative', ar: 'الكل سلبي' },
      items: [
        { pathogen: { en: 'Avian Influenza (AIV)', ar: 'إنفلونزا الطيور (AIV)' }, positive: flagged },
        { pathogen: { en: 'Newcastle (NDV)', ar: 'نيوكاسل (NDV)' }, positive: false },
        { pathogen: { en: 'Mycoplasma (MG)', ar: 'الميكوبلازما (MG)' }, positive: risk === 'critical' },
      ] },
    MICRO: { date: '4 May', status: flagged ? 'flagged' : 'normal',
      key: flagged ? { en: 'E. coli — heavy growth', ar: 'إي كولاي — نمو كثيف' } : { en: 'No significant growth', ar: 'لا نمو يُذكر' },
      items: [
        { pathogen: { en: 'E. coli', ar: 'إي كولاي' }, result: { en: flagged ? 'Heavy (3+)' : 'None', ar: flagged ? 'كثيف (٣+)' : 'لا شيء' } },
        { pathogen: { en: 'Salmonella', ar: 'السالمونيلا' }, result: { en: 'Not detected', ar: 'غير مكتشف' } },
      ] },
    SENS: { date: '4 May', status: 'normal',
      key: { en: 'Sensitive: Florfenicol, Colistin', ar: 'حساس: فلورفينيكول، كوليستين' },
      items: [
        { pathogen: { en: 'Florfenicol', ar: 'فلورفينيكول' }, result: { en: 'Sensitive', ar: 'حساس' } },
        { pathogen: { en: 'Enrofloxacin', ar: 'إنروفلوكساسين' }, result: { en: 'Intermediate', ar: 'متوسط' } },
        { pathogen: { en: 'Amoxicillin', ar: 'أموكسيسيلين' }, result: { en: 'Resistant', ar: 'مقاوم' } },
      ] },
    PM: { date: '3 May', status: flagged ? 'flagged' : 'normal',
      key: flagged ? { en: 'Airsacculitis, congestion', ar: 'التهاب أكياس هوائية واحتقان' } : { en: 'No notable lesions', ar: 'لا آفات ملحوظة' },
      items: [
        { pathogen: { en: 'Air sacs', ar: 'الأكياس الهوائية' }, result: { en: flagged ? 'Cloudy / thickened' : 'Clear', ar: flagged ? 'معكّرة / متثخّنة' : 'صافية' } },
        { pathogen: { en: 'Trachea', ar: 'القصبة الهوائية' }, result: { en: flagged ? 'Congested' : 'Normal', ar: flagged ? 'محتقنة' : 'طبيعية' } },
      ] },
  };
}

export const TEST_TYPES = ['ELISA', 'HI', 'PCR', 'MICRO', 'SENS', 'PM'];
export const TEST_LABEL = {
  ELISA: 'ELISA', HI: 'HI', PCR: 'PCR', MICRO: 'MICRO', SENS: 'SENS', PM: 'PM',
};

// ---- controlled vocabulary: in-house signs ----
export const SIGN_CATEGORIES = [
  { key: 'Respiratory', items: [
    { id: 'sig-rales', en: 'Tracheal rales', ar: 'حشرجة القصبة الهوائية' },
    { id: 'sig-nasal', en: 'Nasal discharge', ar: 'إفرازات أنفية' },
    { id: 'sig-sinus', en: 'Swollen sinuses', ar: 'تورم الجيوب الأنفية' },
    { id: 'sig-gasp', en: 'Gasping / open-mouth', ar: 'لهاث وفتح الفم' },
    { id: 'sig-cough', en: 'Coughing', ar: 'سعال' },
  ] },
  { key: 'Digestive', items: [
    { id: 'sig-diar', en: 'Watery diarrhoea', ar: 'إسهال مائي' },
    { id: 'sig-feed', en: 'Reduced feed intake', ar: 'انخفاض استهلاك العلف' },
    { id: 'sig-undig', en: 'Undigested feed', ar: 'علف غير مهضوم' },
  ] },
  { key: 'Neuro', items: [
    { id: 'sig-torti', en: 'Torticollis', ar: 'التواء الرقبة' },
    { id: 'sig-tremor', en: 'Tremors', ar: 'رعشات' },
    { id: 'sig-paral', en: 'Leg paralysis', ar: 'شلل الأرجل' },
  ] },
  { key: 'Behavioral', items: [
    { id: 'sig-leth', en: 'Lethargy / huddling', ar: 'خمول وتكدّس' },
    { id: 'sig-ruffle', en: 'Ruffled feathers', ar: 'ريش منتفش' },
  ] },
  { key: 'Integument', items: [
    { id: 'sig-cyan', en: 'Comb cyanosis', ar: 'ازرقاق العرف' },
    { id: 'sig-swell', en: 'Facial swelling', ar: 'تورم الوجه' },
  ] },
];

// ---- controlled vocabulary: post-mortem lesions by organ system ----
export const LESION_ORGANS = [
  { key: 'Respiratory', items: [
    { id: 'les-airsac', en: 'Airsacculitis', ar: 'التهاب الأكياس الهوائية' },
    { id: 'les-trach', en: 'Tracheal congestion', ar: 'احتقان القصبة الهوائية' },
    { id: 'les-pneu', en: 'Pneumonia', ar: 'التهاب رئوي' },
  ] },
  { key: 'Digestive', items: [
    { id: 'les-enter', en: 'Enteritis', ar: 'التهاب معوي' },
    { id: 'les-prov', en: 'Proventricular haemorrhage', ar: 'نزف المعدة الغدية' },
    { id: 'les-liver', en: 'Hepatic necrosis', ar: 'نخر كبدي' },
  ] },
  { key: 'Cardiac', items: [
    { id: 'les-peri', en: 'Pericarditis', ar: 'التهاب التامور' },
    { id: 'les-hydro', en: 'Hydropericardium', ar: 'استسقاء التامور' },
  ] },
  { key: 'Nervous', items: [
    { id: 'les-enceph', en: 'Encephalomalacia', ar: 'تلين الدماغ' },
  ] },
  { key: 'Musculo', items: [
    { id: 'les-myo', en: 'Muscle haemorrhage', ar: 'نزف عضلي' },
  ] },
];

// ---- user roles (confirmed 24 Jun: two distinct accounts) ----
// 'farm'   → farm staff, captures in-house signs (farm observations)
// 'doctor' → captures post-mortem lesions + doctor-only clinical inputs (vaccination, medication)
export const ROLES = ['farm', 'doctor'];

// ---- controlled vocabulary: administration routes (shared by meds + vaccines) ----
export const ROUTES = [
  { id: 'water', en: 'Drinking water', ar: 'ماء الشرب' },
  { id: 'inject', en: 'Injection', ar: 'حقن' },
  { id: 'spray', en: 'Spray', ar: 'رذاذ' },
  { id: 'eye', en: 'Eye / nostril drop', ar: 'تقطير بالعين/الأنف' },
  { id: 'feed', en: 'In feed', ar: 'في العلف' },
];

// ---- controlled vocabulary: medications (Daily Medication input, house-level) ----
export const MEDICATIONS = [
  { id: 'med-flor', en: 'Florfenicol', ar: 'فلورفينيكول' },
  { id: 'med-coli', en: 'Colistin', ar: 'كوليستين' },
  { id: 'med-amox', en: 'Amoxicillin', ar: 'أموكسيسيلين' },
  { id: 'med-enro', en: 'Enrofloxacin', ar: 'إنروفلوكساسين' },
  { id: 'med-tylo', en: 'Tylosin', ar: 'تايلوسين' },
  { id: 'med-vit', en: 'Vitamins / electrolytes', ar: 'فيتامينات / إلكتروليتات' },
];

// ---- controlled vocabulary: vaccines (Vaccination Program input, farm-level) ----
export const VACCINES = [
  { id: 'vac-nd', en: 'Newcastle (ND)', ar: 'نيوكاسل (ND)' },
  { id: 'vac-ib', en: 'Infectious Bronchitis (IB)', ar: 'الالتهاب الشعبي (IB)' },
  { id: 'vac-ndib', en: 'ND + IB combo', ar: 'ND + IB مدمج' },
  { id: 'vac-ibd', en: 'Gumboro (IBD)', ar: 'الجمبورو (IBD)' },
  { id: 'vac-ai', en: 'Avian Influenza H9', ar: 'إنفلونزا الطيور H9' },
];

// ---- initial vaccination programs, keyed by farm (doctor-maintained, farm-level) ----
export const INITIAL_VACCINATIONS = {
  wadi: [
    { uid: 'vx-w1', vaccineId: 'vac-ndib', ageDay: 7, routeId: 'eye' },
    { uid: 'vx-w2', vaccineId: 'vac-ibd', ageDay: 14, routeId: 'water' },
    { uid: 'vx-w3', vaccineId: 'vac-ai', ageDay: 21, routeId: 'inject' },
  ],
};

// ---- Paula alerts / notifications ----
export const NOTIFICATIONS = [
  { id: 'n1', farmId: 'wadi', houseId: 'wadi-h4', type: { en: 'Critical mortality risk', ar: 'خطر نفوق حرج' }, level: 'critical', minAgo: 22, unread: true },
  { id: 'n2', farmId: 'nile', houseId: 'nile-h7', type: { en: 'High risk threshold crossed', ar: 'تجاوز حد الخطر المرتفع' }, level: 'high', hrAgo: 1, unread: true },
  { id: 'n3', farmId: 'giza', houseId: 'giza-h3', type: { en: 'Medium risk — monitor', ar: 'خطر متوسط — للمراقبة' }, level: 'medium', hrAgo: 3, unread: true },
  { id: 'n4', farmId: 'wadi', houseId: 'wadi-h6', type: { en: 'Returned to low risk', ar: 'العودة لخطر منخفض' }, level: 'low', yesterday: true, unread: false },
];

// ---- initial submissions (history + offline queue) ----
export const INITIAL_SUBMISSIONS = [
  {
    id: 'OBS-7H2A-0509', farmId: 'giza', houseId: 'giza-h5', vet: VET.name, vetAr: VET.nameAr,
    when: '9 May, 16:40', ts: Date.parse('2026-05-09T16:40:00'), status: 'synced',
    signs: [{ id: 'sig-leth', sev: 'Mild', photos: 0 }, { id: 'sig-feed', sev: 'Moderate', photos: 1 }, { id: 'sig-diar', sev: 'Mild', photos: 1 }],
    lesions: [], notes: 'Flock recovering well after feed adjustment.', photoCount: 2,
  },
  {
    id: 'OBS-3K9C-0510', farmId: 'nile', houseId: 'nile-h7', vet: 'Dr. Mona Adel', vetAr: 'د. منى عادل',
    when: 'Yesterday, 14:20', ts: Date.parse('2026-06-14T14:20:00'), status: 'synced',
    signs: [{ id: 'sig-rales', sev: 'Moderate', photos: 1 }, { id: 'sig-nasal', sev: 'Mild', photos: 0 }],
    lesions: [{ id: 'les-airsac', organ: 'Respiratory', sev: 'Severe', count: 9, photos: 3 }],
    notes: 'E. coli suspected — samples sent to lab.', photoCount: 6,
  },
  {
    id: 'OBS-1B4D-0512', farmId: 'wadi', houseId: 'wadi-h2', vet: VET.name, vetAr: VET.nameAr,
    when: 'Today, 08:14', ts: Date.parse('2026-06-15T08:14:00'), status: 'synced',
    signs: [{ id: 'sig-cough', sev: 'Mild', photos: 0 }, { id: 'sig-ruffle', sev: 'Mild', photos: 0 }],
    lesions: [{ id: 'les-enter', organ: 'Digestive', sev: 'Mild', count: 2, photos: 3 }],
    notes: '', photoCount: 3,
  },
  // a queued (offline) one
  {
    id: 'OBS-9F2K-0509b', farmId: 'giza', houseId: 'giza-h5', vet: VET.name, vetAr: VET.nameAr,
    when: 'Yesterday, 16:40', ts: Date.parse('2026-06-14T16:40:00'), status: 'queued',
    signs: [{ id: 'sig-leth', sev: 'Mild', photos: 0 }, { id: 'sig-feed', sev: 'Mild', photos: 1 }, { id: 'sig-diar', sev: 'Mild', photos: 1 }],
    lesions: [], notes: '', photoCount: 2, sizeMB: 1.1,
  },
];

// flatten helpers
export const HOUSE_BY_ID = {};
export const FARM_BY_ID = {};
FARMS.forEach((f) => {
  FARM_BY_ID[f.id] = f;
  f.houses.forEach((h) => { HOUSE_BY_ID[h.id] = { ...h, farmId: f.id }; });
});

export const SIGN_BY_ID = {};
SIGN_CATEGORIES.forEach((c) => c.items.forEach((s) => { SIGN_BY_ID[s.id] = { ...s, category: c.key }; }));
export const LESION_BY_ID = {};
LESION_ORGANS.forEach((o) => o.items.forEach((l) => { LESION_BY_ID[l.id] = { ...l, organ: o.key }; }));

export const MED_BY_ID = {};
MEDICATIONS.forEach((m) => { MED_BY_ID[m.id] = m; });
export const VACCINE_BY_ID = {};
VACCINES.forEach((v) => { VACCINE_BY_ID[v.id] = v; });
export const ROUTE_BY_ID = {};
ROUTES.forEach((r) => { ROUTE_BY_ID[r.id] = r; });
