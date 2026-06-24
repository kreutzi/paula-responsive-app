// Bilingual UI strings. Data (farm names, clinical terms) carry their own {en,ar}.
export const STRINGS = {
  en: {
    // common
    next: 'Next', back: 'Back', skip: 'Skip', done: 'Done', save: 'Save', saveDraft: 'Save draft',
    submit: 'Submit', cancel: 'Cancel', delete: 'Delete', confirm: 'Confirm', edit: 'Edit',
    expand: 'Expand', seeAll: 'See all', viewData: 'View Data', retry: 'Try again',
    continueOffline: 'Continue offline', markAllRead: 'Mark all read', selectAll: 'Select all',
    searchPh: 'Search…', today: 'Today', yesterday: 'Yesterday', online: 'Online', offline: 'Offline',
    synced: 'Synced', queued: 'Queued', addPhoto: 'Add photo', photos: 'photos', signs: 'signs',
    lesions: 'lesions', none: 'None', close: 'Close', apply: 'Apply', reset: 'Reset', remove: 'Remove',

    // tabs
    tabHome: 'Home', tabVisits: 'Visits', tabAlerts: 'Alerts', tabSettings: 'Settings',

    // splash
    appKicker: 'FIELD VETERINARIAN · v1.0', workingOffline: 'Working offline — {n} items pending sync',
    tapToContinue: 'Tap to continue',

    // login
    welcome: 'Welcome back',
    loginSub: 'Sign in with your Cairo3A account to start recording field observations.',
    signInCairo: 'Sign in with Cairo3A', or: 'or',
    ssoSignIn: 'Sign in', ssoTo: 'to continue to Paula', ssoIdentity: 'Identity Platform',
    emailLabel: 'Work email', passwordLabel: 'Password', forgotPw: 'Forgot password?',
    ssoSecured: 'Secured by Cairo3A Single Sign-On', authenticating: 'Authenticating…',
    ssoHint: 'Use your Cairo3A corporate account', emailPh: 'name@cairo3apoultry.com', pwPh: 'Enter your password',
    keepSignedIn: 'Keep me signed in', ssoErr: 'Incorrect email or password',
    offlineTitle: 'You appear to be offline', offlineDesc: 'Continue if you signed in here before.',
    language: 'Language', english: 'English', arabic: 'العربية',

    // home
    greeting: 'Hi, {name}', startVisit: 'Start New Visit',
    pendingSync: '{n} submissions pending sync', allSynced: 'All submissions synced',
    paulaAlerts: 'Paula Alerts', activeCount: '{n} active', recentSubs: 'Recent Submissions',
    noRecent: 'No submissions yet — start your first visit.',

    // farm select
    selectFarmHouse: 'Select Farm & House', selectStays: 'This stays selected for the whole visit',
    scanTag: 'Scan QR / NFC tag', searchFarms: 'Search farms…',
    confirmSel: 'Confirm', selectAHouse: 'Select a house to continue',
    noFarms: 'No farms assigned', noFarmsDesc: 'Contact your admin to assign farms to your account.',
    all: 'All', broiler: 'Broiler', breeder: 'Breeder', houseN: 'House {n}',
    flockBroiler: 'broiler', flockBreeder: 'breeder',

    // scan
    scanTitle: 'Scan House Tag',
    scanInstruction: 'Point at the QR code on the house entrance, or tap your phone to the NFC tag.',
    nfcReady: 'NFC ready — hold near tag', selectManually: 'Select manually instead',
    scanning: 'Scanning…', scanSuccess: 'House detected',

    // visit overview
    visitStarted: 'Visit started {time} · {date}', serviceDay: 'Service day', age: 'Age', breed: 'Breed',
    placed: 'Placed', paulaMortality: 'PAULA MORTALITY DATA', dayMortality: '7-day mortality',
    updatedAgo: 'Updated {t}', lastTests: 'Last Test Results', lastVisit: 'Last visit · {date}',
    signsLesionsRec: '{s} signs · {l} lesions recorded', startObservation: 'Start Observation',
    noLastVisit: 'No previous visit on record',

    // signs
    inHouseSigns: 'In-House Signs', noneObserved: 'None observed', recordClean: 'Record a clean observation',
    nextLesions: 'Next: Lesions', selectedN: '{n} selected', photosN: '{n} photos',
    cat_Respiratory: 'Respiratory', cat_Digestive: 'Digestive', cat_Neuro: 'Neuro',
    cat_Behavioral: 'Behavioral', cat_Integument: 'Integument',

    // lesions
    pmLesions: 'Post-Mortem Lesions', lesionType: 'Lesion type', severity: 'Severity', count: 'Count',
    addAnother: 'Add another lesion', noLesions: 'No lesions found', nextNotes: 'Next: Notes',
    selectLesionType: 'Select lesion type', addLesionPrompt: 'Add a lesion to continue, or mark none found',
    org_Respiratory: 'Respiratory', org_Digestive: 'Digestive', org_Cardiac: 'Cardiac',
    org_Nervous: 'Nervous', org_Musculo: 'Musculoskeletal',

    // camera
    photoFor: 'Photo for: {name}', capture: 'Capture', photoLimit: '{n} / 5',

    // photo review
    photosFor: 'Photos · {name}', photoHint: '{n} of 5 · tap to view, long-press to delete',
    addMore: 'Add more', compressNote: 'Photos are compressed on-device (max 1.5 MB) and uploaded when you sync.',
    donePhotos: 'Done · {n} photos',

    // notes
    notes: 'Notes', optional: 'Optional', voiceToText: 'Voice to text', review: 'Review',
    notesPh: 'Add an open-ended note in English or Arabic…', charCount: '{n} / 1,000',

    // summary
    reviewObs: 'Review Observation', notesLabel: 'Notes', showMore: 'show more', showLess: 'show less',
    willQueue: 'Will queue', willSubmit: 'Will submit now', offlineSize: 'Offline · ~{size}',
    onlineSize: 'Online · ~{size}', noNotes: 'No notes added', emptyObs: 'Select at least one sign or lesion.',

    // confirm
    submittedTitle: 'Submitted', queuedTitle: 'Saved & Queued',
    submittedDesc: 'Your observation has been sent to Paula and will appear on the dashboard shortly.',
    queuedDesc: 'Your observation is stored safely and will sync automatically when connectivity returns.',
    goHome: 'Home', newVisit: 'New visit', refId: 'ID {id} · {time}',
    signLabel: 'Signs', lesionLabel: 'Lesions', photoLabel: 'Photos',

    // queue
    offlineQueue: 'Offline Queue', waitingN: '{n} submissions waiting', syncNow: 'Sync now',
    syncing: 'Syncing…', swipeDelete: 'Swipe an item to delete it', queueEmpty: 'All submissions synced',
    queueEmptyDesc: 'Nothing is waiting to sync right now.', deleteQTitle: 'Delete this submission?',
    deleteQDesc: 'This queued observation will be permanently removed from this device.',

    // history
    visitHistory: 'Visit History', last30: 'Last 30 days', allFarmsF: 'All farms', allVets: 'All vets',
    pullRefresh: 'Pull to refresh', refreshing: 'Refreshing…', noVisits: 'No visits found',
    noVisitsDesc: 'Try adjusting your filters or start a new visit.', filters: 'Filters',
    dateRange: 'Date range', farm: 'Farm', vet: 'Vet',

    // detail
    submissionDetail: 'Submission Detail', exportPdf: 'Export to PDF', location: 'Location',
    notesSection: 'Notes',

    // prediction
    mortalityData: 'Mortality Data', predicted7: 'Predicted 7-day mortality · updated {t}',
    dayData: '7-Day Data', worsening: 'Worsening', improving: 'Improving', stable: 'Stable',
    contributing: 'Top Contributing Factors', backToVisit: 'Back to Visit',

    // test results
    lastTestResults: 'Last Test Results', sampled: 'Sampled {date}', flagged: 'Flagged',
    normal: 'Normal', critical: 'Critical', titer: 'Titer · reference {r}',
    viewFullHistory: 'View full test history on Paula web →', positive: 'Positive', negative: 'Negative',
    noTest: 'No recent result for this test type.',

    // settings
    settings: 'Settings', fieldVetRole: 'Field Veterinarian', farmsAssigned: '{n} farms assigned',
    pushNotifications: 'Push notifications', alertThresholds: 'Alert thresholds', perFarm: 'Per farm',
    offlineStorage: 'Offline storage', aboutPaula: 'About Paula', signOut: 'Sign out',
    appVersion: 'App 1.0 · Platform 6.2', connectivity: 'Connectivity (demo)',
    connSub: 'Simulate going offline to test queueing', clearCache: 'Clear synced cache',
    resetDemo: 'Reset demo data',

    // notifications
    alerts: 'Alerts', noAlertsTitle: 'No active alerts',
    noAlertsDesc: "You're all caught up. New Paula alerts will appear here.",
    unread: 'Unread',

    // error
    noConnection: 'No connection',
    noConnDesc: "We couldn't reach Paula. Don't worry — you can keep recording observations and everything will sync automatically when you're back online.",
    savedSafely: '{n} submissions are saved safely on this device.', syncFailedTimeout: 'Sync failed — request timed out',

    // user config
    userConfig: 'User Configuration', assignCoverage: 'Assign coverage', roleLabel: 'Role',
    roleFieldVet: 'Field Vet', roleSupervisor: 'Supervisor', roleAdmin: 'Admin',
    locationLabel: 'Location', selectedCount: '{n} selected', farmsHouses: 'Farms & Houses',
    coverageScope: 'Coverage scope', scopeSummary: '{f} farms · {h} houses', saveAssignment: 'Save assignment',
    ofHouses: '{a} of {t} houses',

    // roles
    signInAs: 'Sign in as', roleFarm: 'Farm staff', roleDoctor: 'Doctor', doctorsOnly: 'Doctors only',
    roleFarmDesc: 'Records in-house signs', roleDoctorDesc: 'Lesions, medication & vaccination',
    roleFarmScope: 'Farm observations', roleDoctorScope: 'Lesion observations',
    routeOfAdmin: 'Route',

    // daily medication (doctor)
    dailyMeds: 'Daily Medication', medsLabel: 'Medication', nextMeds: 'Next: Medication',
    addMed: 'Add medication', addMedPrompt: 'Add a medication, or mark none given',
    noMedsGiven: 'No medication given', drug: 'Drug', selectDrug: 'Select drug',
    dose: 'Dose', dosePh: 'e.g. 1 mg / L', durationDays: 'Duration (days)', medsN: '{n} medications',

    // vaccination program (doctor, farm-level)
    vaccination: 'Vaccination Program', vaccinationSub: 'Farm-level immunisation schedule',
    vaccine: 'Vaccine', selectVaccine: 'Select vaccine', ageDays: 'Age (days)',
    addVaccine: 'Add vaccine row', noVaccines: 'No vaccination rows yet — add one or import Excel.',
    vaccForFarm: 'Program · {farm}', vaccinesN: '{n} vaccines',

    // excel import / export
    addManualOrExcel: 'Add manually, or download / upload an Excel file.',
    downloadExcel: 'Download Excel', uploadExcel: 'Upload Excel',

    // toasts
    t_submitted: 'Observation submitted to Paula', t_queued: 'Saved offline — will sync later',
    t_syncComplete: 'All submissions synced', t_draftSaved: 'Draft saved', t_photoAdded: 'Photo added',
    t_signedOut: 'Signed out', t_markedRead: 'All alerts marked read', t_deleted: 'Submission deleted',
    t_nowOffline: "You're offline — observations will queue", t_nowOnline: 'Back online',
    t_saved: 'Assignment saved', t_cacheCleared: 'Synced cache cleared', t_reset: 'Demo data reset',
    t_resumeDraft: 'Resumed your saved draft', t_vaccSaved: 'Vaccination program saved',
    t_imported: '{n} rows imported from Excel', t_nothingImported: 'No rows found in that file',

    // severity / risk / misc
    sev_Mild: 'Mild', sev_Moderate: 'Moderate', sev_Severe: 'Severe', sev_Gross: 'Gross',
    risk_low: 'Low Risk', risk_medium: 'Medium Risk', risk_high: 'High Risk', risk_critical: 'Critical',
    rs_low: 'Low', rs_medium: 'Medium', rs_high: 'High', rs_critical: 'Critical',
    minAgo: '{n} min ago', hrAgo: '{n} hr ago', resumeDraftTitle: 'Resume draft?',
    resumeDraftDesc: 'You have an unfinished observation for {place}. Continue where you left off?',
    discard: 'Discard', resume: 'Resume',
  },

  ar: {
    next: 'التالي', back: 'رجوع', skip: 'تخطٍّ', done: 'تم', save: 'حفظ', saveDraft: 'حفظ كمسودة',
    submit: 'إرسال', cancel: 'إلغاء', delete: 'حذف', confirm: 'تأكيد', edit: 'تعديل',
    expand: 'عرض', seeAll: 'الكل', viewData: 'عرض البيانات', retry: 'إعادة المحاولة',
    continueOffline: 'المتابعة دون اتصال', markAllRead: 'تعليم الكل كمقروء', selectAll: 'تحديد الكل',
    searchPh: 'بحث…', today: 'اليوم', yesterday: 'أمس', online: 'متصل', offline: 'غير متصل',
    synced: 'تمت المزامنة', queued: 'بالانتظار', addPhoto: 'إضافة صورة', photos: 'صور', signs: 'أعراض',
    lesions: 'آفات', none: 'لا شيء', close: 'إغلاق', apply: 'تطبيق', reset: 'إعادة تعيين', remove: 'إزالة',

    tabHome: 'الرئيسية', tabVisits: 'الزيارات', tabAlerts: 'التنبيهات', tabSettings: 'الإعدادات',

    appKicker: 'الطبيب البيطري الميداني · الإصدار ١٫٠', workingOffline: 'العمل دون اتصال — {n} عناصر بانتظار المزامنة',
    tapToContinue: 'اضغط للمتابعة',

    welcome: 'مرحباً بعودتك',
    loginSub: 'سجّل الدخول بحساب Cairo3A لبدء تسجيل الملاحظات الميدانية.',
    signInCairo: 'تسجيل الدخول عبر Cairo3A', or: 'أو',
    ssoSignIn: 'تسجيل الدخول', ssoTo: 'للمتابعة إلى Paula', ssoIdentity: 'منصة الهوية',
    emailLabel: 'البريد الإلكتروني للعمل', passwordLabel: 'كلمة المرور', forgotPw: 'هل نسيت كلمة المرور؟',
    ssoSecured: 'محميّ بنظام الدخول الموحّد من Cairo3A', authenticating: 'جارٍ المصادقة…',
    ssoHint: 'استخدم حساب Cairo3A المؤسسي', emailPh: 'name@cairo3apoultry.com', pwPh: 'أدخل كلمة المرور',
    keepSignedIn: 'إبقائي مسجّلاً', ssoErr: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    offlineTitle: 'يبدو أنك غير متصل', offlineDesc: 'تابع إذا سبق لك تسجيل الدخول هنا.',
    language: 'اللغة', english: 'English', arabic: 'العربية',

    greeting: 'مرحباً، {name}', startVisit: 'بدء زيارة جديدة',
    pendingSync: '{n} عمليات إرسال بانتظار المزامنة', allSynced: 'تمت مزامنة كل العمليات',
    paulaAlerts: 'تنبيهات Paula', activeCount: '{n} نشطة', recentSubs: 'أحدث عمليات الإرسال',
    noRecent: 'لا توجد عمليات إرسال بعد — ابدأ زيارتك الأولى.',

    selectFarmHouse: 'اختر المزرعة والعنبر', selectStays: 'يبقى هذا الاختيار طوال الزيارة',
    scanTag: 'مسح رمز QR / NFC', searchFarms: 'بحث في المزارع…',
    confirmSel: 'تأكيد', selectAHouse: 'اختر عنبراً للمتابعة',
    noFarms: 'لا توجد مزارع مُسندة', noFarmsDesc: 'تواصل مع المسؤول لإسناد مزارع إلى حسابك.',
    all: 'الكل', broiler: 'تسمين', breeder: 'أمهات', houseN: 'عنبر {n}',
    flockBroiler: 'تسمين', flockBreeder: 'أمهات',

    scanTitle: 'مسح رمز العنبر',
    scanInstruction: 'وجّه الكاميرا إلى رمز QR عند مدخل العنبر، أو قرّب هاتفك من بطاقة NFC.',
    nfcReady: 'NFC جاهز — قرّب من البطاقة', selectManually: 'الاختيار يدوياً بدلاً من ذلك',
    scanning: 'جارٍ المسح…', scanSuccess: 'تم التعرف على العنبر',

    visitStarted: 'بدأت الزيارة {time} · {date}', serviceDay: 'يوم الخدمة', age: 'العمر', breed: 'السلالة',
    placed: 'المُسكَّن', paulaMortality: 'بيانات النفوق من PAULA', dayMortality: 'نفوق ٧ أيام',
    updatedAgo: 'حُدِّث {t}', lastTests: 'آخر نتائج الفحوصات', lastVisit: 'آخر زيارة · {date}',
    signsLesionsRec: '{s} أعراض · {l} آفات مسجلة', startObservation: 'بدء الملاحظة',
    noLastVisit: 'لا توجد زيارة سابقة مسجلة',

    inHouseSigns: 'الأعراض داخل العنبر', noneObserved: 'لا أعراض', recordClean: 'تسجيل ملاحظة سليمة',
    nextLesions: 'التالي: الآفات', selectedN: '{n} محددة', photosN: '{n} صور',
    cat_Respiratory: 'تنفسي', cat_Digestive: 'هضمي', cat_Neuro: 'عصبي',
    cat_Behavioral: 'سلوكي', cat_Integument: 'جلدي',

    pmLesions: 'آفات التشريح', lesionType: 'نوع الآفة', severity: 'الشدة', count: 'العدد',
    addAnother: 'إضافة آفة أخرى', noLesions: 'لا توجد آفات', nextNotes: 'التالي: الملاحظات',
    selectLesionType: 'اختر نوع الآفة', addLesionPrompt: 'أضف آفة للمتابعة، أو حدّد عدم وجود آفات',
    org_Respiratory: 'تنفسي', org_Digestive: 'هضمي', org_Cardiac: 'قلبي',
    org_Nervous: 'عصبي', org_Musculo: 'عضلي هيكلي',

    photoFor: 'صورة لـ: {name}', capture: 'التقاط', photoLimit: '{n} / ٥',

    photosFor: 'صور · {name}', photoHint: '{n} من ٥ · اضغط للعرض، اضغط مطولاً للحذف',
    addMore: 'إضافة المزيد', compressNote: 'تُضغط الصور على الجهاز (حد أقصى ١٫٥ ميجابايت) وتُرفع عند المزامنة.',
    donePhotos: 'تم · {n} صور',

    notes: 'ملاحظات', optional: 'اختياري', voiceToText: 'تحويل الصوت إلى نص', review: 'مراجعة',
    notesPh: 'أضف ملاحظة حرة بالعربية أو الإنجليزية…', charCount: '{n} / ١٠٠٠',

    reviewObs: 'مراجعة الملاحظة', notesLabel: 'ملاحظات', showMore: 'عرض المزيد', showLess: 'عرض أقل',
    willQueue: 'سيتم وضعها في الانتظار', willSubmit: 'سيتم الإرسال الآن', offlineSize: 'دون اتصال · ~{size}',
    onlineSize: 'متصل · ~{size}', noNotes: 'لم تُضف ملاحظات', emptyObs: 'حدّد عرضاً أو آفة واحدة على الأقل.',

    submittedTitle: 'تم الإرسال', queuedTitle: 'تم الحفظ والانتظار',
    submittedDesc: 'تم إرسال ملاحظتك إلى Paula وستظهر على لوحة التحكم قريباً.',
    queuedDesc: 'ملاحظتك محفوظة بأمان وستتم مزامنتها تلقائياً عند عودة الاتصال.',
    goHome: 'الرئيسية', newVisit: 'زيارة جديدة', refId: 'المعرّف {id} · {time}',
    signLabel: 'أعراض', lesionLabel: 'آفات', photoLabel: 'صور',

    offlineQueue: 'قائمة الانتظار', waitingN: '{n} عمليات إرسال منتظرة', syncNow: 'مزامنة الآن',
    syncing: 'جارٍ المزامنة…', swipeDelete: 'اسحب عنصراً لحذفه', queueEmpty: 'تمت مزامنة كل العمليات',
    queueEmptyDesc: 'لا شيء بانتظار المزامنة الآن.', deleteQTitle: 'حذف هذا الإرسال؟',
    deleteQDesc: 'سيتم حذف هذه الملاحظة المنتظرة نهائياً من هذا الجهاز.',

    visitHistory: 'سجل الزيارات', last30: 'آخر ٣٠ يوماً', allFarmsF: 'كل المزارع', allVets: 'كل الأطباء',
    pullRefresh: 'اسحب للتحديث', refreshing: 'جارٍ التحديث…', noVisits: 'لا توجد زيارات',
    noVisitsDesc: 'حاول تعديل عوامل التصفية أو ابدأ زيارة جديدة.', filters: 'التصفية',
    dateRange: 'النطاق الزمني', farm: 'المزرعة', vet: 'الطبيب',

    submissionDetail: 'تفاصيل الإرسال', exportPdf: 'تصدير PDF', location: 'الموقع',
    notesSection: 'ملاحظات',

    mortalityData: 'بيانات النفوق', predicted7: 'نفوق متوقع لـ ٧ أيام · حُدِّث {t}',
    dayData: 'بيانات ٧ أيام', worsening: 'يتدهور', improving: 'يتحسن', stable: 'مستقر',
    contributing: 'أهم العوامل المساهمة', backToVisit: 'العودة إلى الزيارة',

    lastTestResults: 'آخر نتائج الفحوصات', sampled: 'أُخذت العينة {date}', flagged: 'مُعلَّم',
    normal: 'طبيعي', critical: 'حرج', titer: 'العيار · المرجع {r}',
    viewFullHistory: 'عرض سجل الفحوصات كاملاً على Paula ←', positive: 'إيجابي', negative: 'سلبي',
    noTest: 'لا توجد نتيجة حديثة لهذا النوع.',

    settings: 'الإعدادات', fieldVetRole: 'طبيب بيطري ميداني', farmsAssigned: '{n} مزارع مُسندة',
    pushNotifications: 'الإشعارات الفورية', alertThresholds: 'حدود التنبيه', perFarm: 'لكل مزرعة',
    offlineStorage: 'التخزين دون اتصال', aboutPaula: 'حول Paula', signOut: 'تسجيل الخروج',
    appVersion: 'التطبيق ١٫٠ · المنصة ٦٫٢', connectivity: 'الاتصال (تجريبي)',
    connSub: 'محاكاة قطع الاتصال لاختبار قائمة الانتظار', clearCache: 'مسح الذاكرة المؤقتة',
    resetDemo: 'إعادة تعيين البيانات التجريبية',

    alerts: 'التنبيهات', noAlertsTitle: 'لا توجد تنبيهات نشطة',
    noAlertsDesc: 'كل شيء على ما يرام. ستظهر تنبيهات Paula الجديدة هنا.',
    unread: 'غير مقروء',

    noConnection: 'لا يوجد اتصال',
    noConnDesc: 'تعذّر الوصول إلى Paula. لا تقلق — يمكنك متابعة تسجيل الملاحظات وستتم مزامنة كل شيء تلقائياً عند عودة الاتصال.',
    savedSafely: '{n} عمليات إرسال محفوظة بأمان على هذا الجهاز.', syncFailedTimeout: 'فشلت المزامنة — انتهت مهلة الطلب',

    userConfig: 'إعداد المستخدم', assignCoverage: 'إسناد التغطية', roleLabel: 'الدور',
    roleFieldVet: 'طبيب ميداني', roleSupervisor: 'مشرف', roleAdmin: 'مسؤول',
    locationLabel: 'الموقع', selectedCount: '{n} محددة', farmsHouses: 'المزارع والعنابر',
    coverageScope: 'نطاق التغطية', scopeSummary: '{f} مزارع · {h} عنابر', saveAssignment: 'حفظ الإسناد',
    ofHouses: '{a} من {t} عنابر',

    // roles
    signInAs: 'تسجيل الدخول كـ', roleFarm: 'موظف المزرعة', roleDoctor: 'طبيب', doctorsOnly: 'للأطباء فقط',
    roleFarmDesc: 'تسجيل الأعراض داخل العنبر', roleDoctorDesc: 'الآفات والأدوية والتحصين',
    roleFarmScope: 'ملاحظات المزرعة', roleDoctorScope: 'ملاحظات الآفات',
    routeOfAdmin: 'طريقة الإعطاء',

    // daily medication (doctor)
    dailyMeds: 'الأدوية اليومية', medsLabel: 'الأدوية', nextMeds: 'التالي: الأدوية',
    addMed: 'إضافة دواء', addMedPrompt: 'أضف دواءً، أو حدّد عدم الإعطاء',
    noMedsGiven: 'لم تُعطَ أدوية', drug: 'الدواء', selectDrug: 'اختر الدواء',
    dose: 'الجرعة', dosePh: 'مثال: ١ مجم / لتر', durationDays: 'المدة (أيام)', medsN: '{n} أدوية',

    // vaccination program (doctor, farm-level)
    vaccination: 'برنامج التحصين', vaccinationSub: 'جدول التحصين على مستوى المزرعة',
    vaccine: 'اللقاح', selectVaccine: 'اختر اللقاح', ageDays: 'العمر (أيام)',
    addVaccine: 'إضافة صف لقاح', noVaccines: 'لا توجد صفوف تحصين بعد — أضف صفاً أو استورد ملف Excel.',
    vaccForFarm: 'البرنامج · {farm}', vaccinesN: '{n} لقاحات',

    // excel import / export
    addManualOrExcel: 'الإضافة يدوياً، أو تنزيل / رفع ملف Excel.',
    downloadExcel: 'تنزيل Excel', uploadExcel: 'رفع Excel',

    t_submitted: 'تم إرسال الملاحظة إلى Paula', t_queued: 'حُفظت دون اتصال — ستتم المزامنة لاحقاً',
    t_syncComplete: 'تمت مزامنة كل العمليات', t_draftSaved: 'تم حفظ المسودة', t_photoAdded: 'تمت إضافة الصورة',
    t_signedOut: 'تم تسجيل الخروج', t_markedRead: 'تم تعليم كل التنبيهات كمقروءة', t_deleted: 'تم حذف الإرسال',
    t_nowOffline: 'أنت غير متصل — ستُوضع الملاحظات في الانتظار', t_nowOnline: 'عاد الاتصال',
    t_saved: 'تم حفظ الإسناد', t_cacheCleared: 'تم مسح الذاكرة المؤقتة', t_reset: 'تمت إعادة تعيين البيانات',
    t_resumeDraft: 'تم استئناف مسودتك المحفوظة', t_vaccSaved: 'تم حفظ برنامج التحصين',
    t_imported: 'تم استيراد {n} صفوف من Excel', t_nothingImported: 'لم يتم العثور على صفوف في الملف',

    sev_Mild: 'خفيف', sev_Moderate: 'متوسط', sev_Severe: 'شديد', sev_Gross: 'جسيم',
    risk_low: 'خطر منخفض', risk_medium: 'خطر متوسط', risk_high: 'خطر مرتفع', risk_critical: 'حرج',
    rs_low: 'منخفض', rs_medium: 'متوسط', rs_high: 'مرتفع', rs_critical: 'حرج',
    minAgo: 'منذ {n} دقيقة', hrAgo: 'منذ {n} ساعة', resumeDraftTitle: 'استئناف المسودة؟',
    resumeDraftDesc: 'لديك ملاحظة غير مكتملة لـ {place}. هل تريد المتابعة من حيث توقفت؟',
    discard: 'تجاهل', resume: 'استئناف',
  },
};
