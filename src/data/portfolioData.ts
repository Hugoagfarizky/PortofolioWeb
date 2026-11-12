export type ProjectCategory =
  | 'Semua'
  | 'UI/UX'
  | 'Brand Identity'
  | 'Motion Design'
  | 'Editorial'
  | 'Desain Grafis'
  | 'Web Design'
  | '3D Visual';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  category: Exclude<ProjectCategory, 'Semua'>;
  secondaryCategories: Exclude<ProjectCategory, 'Semua'>[];
  bentoSpan: 'featured' | 'standard';
  image: string;
  impactMetric: string;
  impactDetail: string;
  duration: string;
  role: string;
  challenge: string;
  architectureSolution: string;
  outcomeSummary: string;
  deliverables: string[];
  palette: { name: string; hex: string }[];
  wireframeSpec: {
    gridColumns: string;
    typographyScale: string;
    motionCurve: string;
    beforeCaption: string;
    afterCaption: string;
  };
}

export interface TransformationStudy {
  id: string;
  index: string;
  title: string;
  discipline: Exclude<ProjectCategory, 'Semua'>;
  client: string;
  year: string;
  summary: string;
  metricBadge: string;
  beforeLabel: string;
  afterLabel: string;
  afterImage: string;
  wireframeMode: 'fintech-ui' | 'brand-monograph' | 'optical-3d';
  technicalNotes: string[];
}

export const PORTFOLIO_CATEGORIES: ProjectCategory[] = [
  'Semua',
  'UI/UX',
  'Brand Identity',
  'Motion Design',
  'Editorial',
  'Desain Grafis',
  'Web Design',
  '3D Visual',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'nova-private-banking',
    index: '01',
    title: 'Nova Private Wealth OS',
    subtitle: 'Arsitektur antarmuka manajemen aset lintas mata uang dengan sistem visual kaca kristal',
    client: 'Nova Financial Zurich',
    year: '2026',
    category: 'UI/UX',
    secondaryCategories: ['Web Design', 'Motion Design'],
    bentoSpan: 'featured',
    image: '/src/assets/images/portfolio_uiux_fintech_1794464324429.jpg',
    impactMetric: '+64% Kecepatan Eksekusi Portofolio',
    impactDetail: 'Waktu penyelesaian transaksi valuta asing turun dari 4,2 menit menjadi 88 detik pada 120.000 nasabah prioritas.',
    duration: '14 Minggu',
    role: 'Lead Product Designer & Design Systems Architect',
    challenge:
      'Platform perbankan privat warisan memiliki 48 layar terpisah dengan kepadatan tabel yang melelahkan mata dan alur otorisasi berlapis yang menghambat keputusan investasi harian.',
    architectureSolution:
      'Merancang ulang seluruh pengalaman ke dalam kanvas tunggal berbasis kartu kaca berlapis (Frosted-Crystal Workspace), tipografi numerik tabular presisi tinggi, serta transisi mikro 160ms yang memandu fokus visual tanpa jeda halaman.',
    outcomeSummary:
      'Adopsi fitur analitik mandiri meningkat 3,1x dalam kuartal pertama pasca peluncuran dan memenangkan penghargaan Gold Digital Craft 2026.',
    deliverables: [
      'Design System 140+ Komponen',
      'Prototipe Kinetik Interaktif',
      'Pedoman Motion Micro-interactions',
      'Arsitektur Informasi Multi-Aset',
    ],
    palette: [
      { name: 'Travertine Alabaster', hex: '#F4F2ED' },
      { name: 'Deep pine Slate', hex: '#143336' },
      { name: 'Obsidian Ink', hex: '#0A0A0C' },
      { name: 'Mint Telemetry', hex: '#2E7D5B' },
    ],
    wireframeSpec: {
      gridColumns: '12 Kolom Modular · Gap 24px',
      typographyScale: 'Bricolage Grotesque 36px / JetBrains Mono 14px',
      motionCurve: 'cubic-bezier(0.16, 1, 0.3, 1) · 180ms',
      beforeCaption: 'Wireframe struktural awal: pemetaan hierarki 3-zona dan kepadatan data aset sebelum penerapan permukaan optik.',
      afterCaption: 'Eksekusi produksi akhir: keseimbangan kontras WCAG AAA, grafik vektor bernapas, dan navigasi kontekstual.',
    },
  },
  {
    id: 'aethel-botanical-parfum',
    index: '02',
    title: 'Aethel — Edition One Voyage',
    subtitle: 'Identitas visual monolitik dan rekayasa kemasan kertas bertekstur buta (blind-emboss)',
    client: 'Maison Aethel Paris',
    year: '2026',
    category: 'Brand Identity',
    secondaryCategories: ['Desain Grafis', 'Editorial'],
    bentoSpan: 'standard',
    image: '/src/assets/images/portfolio_brand_packaging_1794464326613.jpg',
    impactMetric: '+210% Penjualan Edisi Kolektor',
    impactDetail: 'Seluruh 15.000 unit rilis perdana terjual habis di 8 butik flagship Eropa dalam 19 hari.',
    duration: '10 Minggu',
    role: 'Creative Director & Brand Designer',
    challenge:
      'Menciptakan bahasa visual rumah wewangian kontemporer yang menonjol di rak ritel mewah tanpa mengandalkan ornamen emas klise atau tipografi dekoratif berlebihan.',
    architectureSolution:
      'Mengembangkan sistem glif geometris modular yang dicetak timbul tanpa tinta (blind deboss) di atas kertas kapas 450gsm berwarna krem mineral, dipadukan tipografi sans-serif hitam pekat yang tegas.',
    outcomeSummary:
      'Kemasan menjadi ikon koleksi yang dipertahankan oleh 92% pembeli berdasarkan survei pasca-pembelian merek.',
    deliverables: [
      'Sistem Identitas & Logotype Kustom',
      'Struktur Kemasan Relief 3D',
      'Katalog Monograf Edisi Cetak',
      'Arahan Fotografi Produk Studio',
    ],
    palette: [
      { name: 'Raw Cotton Paper', hex: '#EAE5D9' },
      { name: 'Carbon Grotesque', hex: '#111113' },
      { name: 'Amber Distillate', hex: '#C8B085' },
      { name: 'Anodized Silver', hex: '#9FA3A8' },
    ],
    wireframeSpec: {
      gridColumns: 'Rasio Proporsi Emas 1 : 1.618',
      typographyScale: 'Tracking +0.08em · Relief Kedalaman 0.6mm',
      motionCurve: 'Transisi Bukaan Kemasan 420ms',
      beforeCaption: 'Garis die-line struktural dan konstruksi grid glif geometris di atas cetak biru kemasan.',
      afterCaption: 'Hasil akhir produksi fisik dengan kertas katun bertekstur dan botol kaca optik berat.',
    },
  },
  {
    id: 'kronos-optical-sculpture',
    index: '03',
    title: 'Kronos — Kinetic Optics Showreel',
    subtitle: 'Simulasi refraksi lensa kaca kristal dan koreografi cincin aluminium anodisa berbasis scroll',
    client: 'Kronos Acoustic & Optics Lab',
    year: '2026',
    category: 'Motion Design',
    secondaryCategories: ['3D Visual', 'Web Design'],
    bentoSpan: 'standard',
    image: '/src/assets/images/portfolio_motion_3d_1794464327849.jpg',
    impactMetric: '4,8 Menit Rata-Rata Durasi Sesi',
    impactDetail: 'Meningkatkan retensi pengunjung pada halaman peluncuran produk sebesar 185% dibanding halaman statis.',
    duration: '8 Minggu',
    role: 'Motion Director & 3D Visual Artist',
    challenge:
      'Menjelaskan presisi susunan 11 elemen akustik-optik internal tanpa membuat pengunjung merasa sedang membaca dokumen teknis yang membosankan.',
    architectureSolution:
      'Membangun sekuens ledakan komponen (exploded-view choreography) yang terikat langsung pada posisi scroll halaman dengan perhitungan pembiasan cahaya caustics yang lembut di atas latar belakang alabaster.',
    outcomeSummary:
      'Digunakan sebagai instalasi layar utama di pameran desain Milan dan meraih FWA of the Day.',
    deliverables: [
      'Sekuens Motion 60fps Berbasis Scroll',
      'Pencahayaan Caustics & Shader Kaca',
      'Aset Visual Kampanye Peluncuran',
      'Sistem Suara Mikro Interaktif',
    ],
    palette: [
      { name: 'Warm Alabaster Glow', hex: '#F3EFE6' },
      { name: 'Brushed Titanium', hex: '#C4C7CE' },
      { name: 'Prism Cobalt', hex: '#1D4ED8' },
      { name: 'Shadow Graphite', hex: '#3F3F46' },
    ],
    wireframeSpec: {
      gridColumns: 'Isometrik 35.264° · Kamera Orthographic',
      typographyScale: 'Bricolage Grotesque 44px / Mono 12px',
      motionCurve: 'Spring Physics (stiffness: 140, damping: 22)',
      beforeCaption: 'Jaring poligon wireframe 3D dan vektor lintasan orbit cincin sebelum proses rendering optik.',
      afterCaption: 'Render akhir dengan pembiasan kaca buram, dispersi cahaya tepi, dan bayangan kaustik.',
    },
  },
  {
    id: 'forme-brute-monograph',
    index: '04',
    title: 'La Forme Brute — Arsitektur & Cahaya',
    subtitle: 'Desain buku monograf arsitektur brutalist Swiss dan tata letak editorial skala besar',
    client: 'Fondation Architecture Lausanne',
    year: '2025',
    category: 'Editorial',
    secondaryCategories: ['Desain Grafis'],
    bentoSpan: 'standard',
    image: '/src/assets/images/portfolio_editorial_book_1794464329629.jpg',
    impactMetric: '3 Edisi Cetak Ulang Internasional',
    impactDetail: 'Didistribusikan ke 45 museum seni dan toko buku arsitektur kuratorial di Zurich, Tokyo, dan London.',
    duration: '12 Minggu',
    role: 'Editorial Art Director',
    challenge:
      'Menyeimbangkan fotografi beton monokromatik berdensitas berat dengan esai akademik dwibahasa sepanjang 320 halaman agar tetap memiliki ritme ruang napas yang elegan.',
    architectureSolution:
      'Menerapkan grid Swiss asimetris 9-kolom dengan kontras ekstrem antara judul bab bertipografi grotesque sangat tebal dan ruang margin luar yang lapang.',
    outcomeSummary:
      'Terpilih dalam daftar Best Book Design from All Over the World 2025 di Leipzig.',
    deliverables: [
      'Tata Letak Monograf 320 Halaman',
      'Sistem Grid Swiss 9-Kolom',
      'Kurasi Duotone Perak-Hitam',
      'Edisi Pembaca Web Interaktif',
    ],
    palette: [
      { name: 'Uncoated Stone Paper', hex: '#EFECE6' },
      { name: 'Archival Gravure Black', hex: '#09090B' },
      { name: 'Concrete Midtone', hex: '#71717A' },
      { name: 'Limestone Highlight', hex: '#D6D3CD' },
    ],
    wireframeSpec: {
      gridColumns: 'Grid Swiss 9-Kolom · Margin Proporsional 1:2:3',
      typographyScale: 'Headline 52pt · Body Prose 10.5/15pt',
      motionCurve: 'Transisi Balik Halaman Halus 300ms',
      beforeCaption: 'Konstruksi baseline grid Swiss dan blok alokasi ruang fotografi sebelum penempatan konten.',
      afterCaption: 'Cetakan akhir di atas kertas Munken Lynx kasar dengan tinta hitam pekat ganda.',
    },
  },
  {
    id: 'brutal-forms-web-exhibition',
    index: '05',
    title: 'Brutal Forms — Digital Archive',
    subtitle: 'Pengalaman web interaktif untuk arsip arsitektur monolitik dengan navigasi spasial',
    client: 'Kulturhaus Basel',
    year: '2026',
    category: 'Web Design',
    secondaryCategories: ['UI/UX', 'Motion Design'],
    bentoSpan: 'standard',
    image: '/src/assets/images/portfolio_web_architecture_1794464329753.jpg',
    impactMetric: '+142% Eksplorasi Katalog Pameran',
    impactDetail: 'Pengunjung menjelajahi rata-rata 9,4 bangunan per kunjungan disertai peningkatan pemesanan tiket 58%.',
    duration: '9 Minggu',
    role: 'Interactive Web Director',
    challenge:
      'Menerjemahkan skala monumental bangunan beton ke dalam layar browser desktop dan seluler tanpa kehilangan kesan bobot material dan ketegasan geometris.',
    architectureSolution:
      'Menggabungkan struktur garis pembatas rambut (hairline architectural dividers), pergeseran gambar paralaks halus saat kursor bergerak, dan sistem filter katalog instan tanpa reload.',
    outcomeSummary:
      'Menjadi rujukan arsip digital permanen untuk pameran tahunan arsitektur Eropa Tengah.',
    deliverables: [
      'Arsitektur Web Interaktif Responsif',
      'Sistem Filter Indeks Spasial',
      'Koreografi Transisi Halaman',
      'Integrasi Tiket & Reservasi Tur',
    ],
    palette: [
      { name: 'Monolith Charcoal', hex: '#18181B' },
      { name: 'Gallery White', hex: '#FAFAFA' },
      { name: 'Raw Aggregate', hex: '#A1A1AA' },
      { name: 'Cobalt Blueprint', hex: '#1D4ED8' },
    ],
    wireframeSpec: {
      gridColumns: 'Grid Asimetris 4-Zona · Hairline 1px',
      typographyScale: 'Display 64px · Metadata Monospace 12px',
      motionCurve: 'cubic-bezier(0.22, 1, 0.36, 1) · 200ms',
      beforeCaption: 'Kerangka blok antarmuka dan hierarki kartu arsip bangunan sebelum penerapan fotografi.',
      afterCaption: 'Tampilan web langsung dengan kontras dramatis dan navigasi indeks arsitektural.',
    },
  },
  {
    id: 'solaris-3d-material-lab',
    index: '06',
    title: 'Solaris — Glass & Alloy Specimen',
    subtitle: 'Eksplorasi visual 3D untuk pustaka material optik dan permukaan produk industri generasi baru',
    client: 'Solaris Industrial Design Tokyo',
    year: '2026',
    category: '3D Visual',
    secondaryCategories: ['Motion Design', 'Brand Identity'],
    bentoSpan: 'standard',
    image: '/src/assets/images/portfolio_motion_3d_1794464327849.jpg',
    impactMetric: '60% Pengurangan Prototipe Fisik',
    impactDetail: 'Memungkinkan tim rekayasa menyetujui 28 varian penyelesaian permukaan secara digital sebelum pencetakan cetakan baja.',
    duration: '7 Minggu',
    role: '3D Look-Dev Specialist & Visual Designer',
    challenge:
      'Menampilkan perbedaan mikroskopis antara kaca sandblasted, kristal safir, dan aluminium sikat pada presentasi dewan direksi beresolusi 8K.',
    architectureSolution:
      'Membangun studio pencahayaan virtual terkalibrasi secara fisik (PBR) dengan kontrol indeks bias (IOR 1.52–1.77) dan animasi putaran lambat yang menonjolkan pantulan tepi.',
    outcomeSummary:
      'Mempercepat siklus persetujuan desain perangkat keras selama 5 minggu penuh.',
    deliverables: [
      'Pustaka 28 Shader Material Fisik',
      'Render Stills 8K & Turntable 3D',
      'Panduan Pencahayaan Studio Virtual',
      'Dek Presentasi Interaktif',
    ],
    palette: [
      { name: 'Sapphire Clear', hex: '#E8EEF5' },
      { name: 'Anodized Alloy', hex: '#B8BDC6' },
      { name: 'Alabaster Stage', hex: '#F6F4EF' },
      { name: 'Deep Carbon', hex: '#121316' },
    ],
    wireframeSpec: {
      gridColumns: 'Matriks Spesimen 3x3 · Rasio 16:9',
      typographyScale: 'Spec Sheet Mono 13px · Heading 32px',
      motionCurve: 'Kecepatan Sudut Konstan 12°/detik',
      beforeCaption: 'Geometri nurbs mentah dan peta distribusi normal permukaan sebelum komposisi pencahayaan.',
      afterCaption: 'Visualisasi akhir dengan dispersi spektral nyata dan bayangan lembut alabaster.',
    },
  },
  {
    id: 'kinetika-typographic-posters',
    index: '07',
    title: 'Kinetika — Biennal Desain Grafis',
    subtitle: 'Sistem identitas poster generatif dan sinyal pameran berbasis algoritma grid Swiss',
    client: 'Jakarta & Zurich Design Biennale',
    year: '2025',
    category: 'Desain Grafis',
    secondaryCategories: ['Editorial', 'Motion Design'],
    bentoSpan: 'featured',
    image: '/src/assets/images/portfolio_editorial_book_1794464329629.jpg',
    impactMetric: '84.000+ Pengunjung Pameran Utama',
    impactDetail: 'Sistem identitas diterapkan secara kohesif pada 120 titik papan penunjuk arah, layar kinetik LED, dan katalog pameran.',
    duration: '11 Minggu',
    role: 'Principal Graphic & Kinetic Designer',
    challenge:
      'Menciptakan satu sistem bahasa desain grafis yang mampu beradaptasi pada poster cetak format besar (B0) sekaligus hidup sebagai grafik gerak di layar vertikal kota.',
    architectureSolution:
      'Merancang sistem tipografi variabel yang merespons kepadatan informasi acara—mengubah ketebalan huruf dan pembagian kolom secara otomatis sambil menjaga keterbacaan dari jarak 15 meter.',
    outcomeSummary:
      'Menjadi salah satu identitas festival desain paling banyak didokumentasikan oleh komunitas desain Asia Tenggara dan Eropa.',
    deliverables: [
      'Seri 24 Poster Cetak & Kinetik',
      'Sistem Wayfinding & Signage Pameran',
      'Generator Grid Tipografi Kustom',
      'Buku Panduan Identitas Visual',
    ],
    palette: [
      { name: 'Archive Alabaster', hex: '#F7F5F0' },
      { name: 'Exhibition Ink', hex: '#0A0A0C' },
      { name: 'Signal Cobalt', hex: '#1D4ED8' },
      { name: 'Warm Stone Grey', hex: '#78756E' },
    ],
    wireframeSpec: {
      gridColumns: 'Grid Modular 16-Sel · Proporsi DIN A0',
      typographyScale: 'Bricolage Grotesque 88pt · Subhead 18pt',
      motionCurve: 'Harmonic Oscillation 240ms',
      beforeCaption: 'Sumbu pembagian proporsi matematis dan jangkar tipografi sebelum komposisi kontras.',
      afterCaption: 'Eksekusi poster cetak dan monograf pameran dengan kontras editorial tajam.',
    },
  },
];

export const TRANSFORMATION_STUDIES: TransformationStudy[] = [
  {
    id: 'transform-fintech',
    index: '01',
    title: 'Nova Wealth OS — Dari Wireframe Tabel Padat ke Kanvas Frosted-Crystal',
    discipline: 'UI/UX',
    client: 'Nova Financial Zurich',
    year: '2026',
    summary:
      'Menyederhanakan 14 komponen tabel warisan menjadi satu ringkasan likuiditas berfokus tinggi dengan hierarki tipografi bold dan aksi cepat satu klik.',
    metricBadge: '-62% Beban Kognitif Visual',
    beforeLabel: 'Tahap 01 · Wireframe Arsitektur & Grid',
    afterLabel: 'Tahap 02 · Eksekusi UI Frosted-Crystal',
    afterImage: '/src/assets/images/portfolio_uiux_fintech_1794464324429.jpg',
    wireframeMode: 'fintech-ui',
    technicalNotes: [
      'Pengurangan titik fokus dari 9 panel setara menjadi 1 jangkar visual dominan (Total Assets & Kurva Performa).',
      'Penerapan tabular numerals pada seluruh nominal transaksi untuk kesejajaran vertikal instan.',
      'Permukaan kaca berlapis dengan delta kecerahan terukur (<7%) terhadap kanvas alabaster.',
    ],
  },
  {
    id: 'transform-packaging',
    index: '02',
    title: 'Maison Aethel — Dari Konstruksi Die-Line Geometris ke Kemasan Blind-Emboss',
    discipline: 'Brand Identity',
    client: 'Maison Aethel Paris',
    year: '2026',
    summary:
      'Transformasi cetak biru proporsi matematis dan sistem glif menjadi objek fisik bertekstur yang menggabungkan botol kaca optik dan kertas kapas tebal.',
    metricBadge: '100% Material Kertas Kapas Bebas Plastik',
    beforeLabel: 'Tahap 01 · Konstruksi Grid & Relief Glif',
    afterLabel: 'Tahap 02 · Fotografi Studio Produksi Akhir',
    afterImage: '/src/assets/images/portfolio_brand_packaging_1794464326613.jpg',
    wireframeMode: 'brand-monograph',
    technicalNotes: [
      'Kedalaman emboss 0.6mm dihitung agar memantulkan bayangan miring alami di bawah lampu galeri.',
      'Kontras tipografi hitam pekat di atas permukaan batu travertine dan kertas mineral tanpa laminasi mengilap.',
      'Keseimbangan proporsi antara siluet tutup aluminium sikat dan lebar bahu botol kaca.',
    ],
  },
  {
    id: 'transform-optics',
    index: '03',
    title: 'Kronos Lab — Dari Jaring Vektor Kinetik ke Simulasi Refraksi Kaca 3D',
    discipline: '3D Visual',
    client: 'Kronos Acoustic & Optics',
    year: '2026',
    summary:
      'Perubahan dari lintasan orbit vektor dan kerangka poligon menuju pencahayaan studio PBR dengan pembiasan cahaya kaustik dan dispersi tepi.',
    metricBadge: '60fps Koreografi Scroll Real-Time',
    beforeLabel: 'Tahap 01 · Lintasan Vektor & Wireframe 3D',
    afterLabel: 'Tahap 02 · Final Octane Caustics Render',
    afterImage: '/src/assets/images/portfolio_motion_3d_1794464327849.jpg',
    wireframeMode: 'optical-3d',
    technicalNotes: [
      'Setiap lensa diorientasikan pada sumbu isometrik 35,26° untuk menciptakan kedalaman berlapis saat digulir.',
      'Shader kaca memadukan kekasaran mikro (roughness 0.18) di bagian tengah dan tepi poles bening.',
      'Bayangan kaustik dipanggang ke dalam peta tekstur ringan agar tetap responsif di berbagai perangkat.',
    ],
  },
];

export interface DisciplineServiceOption {
  id: Exclude<ProjectCategory, 'Semua'>;
  label: string;
  baseWeeks: number;
  baseInvestmentIDR: number; // in millions IDR
  deliverableSummary: string;
}

export const SERVICE_OPTIONS: DisciplineServiceOption[] = [
  {
    id: 'UI/UX',
    label: 'UI/UX & Product Design System',
    baseWeeks: 4,
    baseInvestmentIDR: 32,
    deliverableSummary: 'Riset pengguna, arsitektur alur, sistem komponen Figma, & prototipe interaktif',
  },
  {
    id: 'Web Design',
    label: 'Interactive Web & Scroll Choreography',
    baseWeeks: 3,
    baseInvestmentIDR: 26,
    deliverableSummary: 'Desain web responsif, koreografi motion berbasis scroll, & optimasi performa',
  },
  {
    id: 'Brand Identity',
    label: 'Brand Identity & Visual System',
    baseWeeks: 4,
    baseInvestmentIDR: 28,
    deliverableSummary: 'Arah kreatif, logotype, tipografi korporat, palet warna, & buku pedoman merek',
  },
  {
    id: 'Motion Design',
    label: 'Motion Graphics & Kinetic Direction',
    baseWeeks: 3,
    baseInvestmentIDR: 22,
    deliverableSummary: 'Showreel produk, aset kinetik media sosial, & sistem animasi antarmuka',
  },
  {
    id: '3D Visual',
    label: '3D Visual & Optical Product Look-Dev',
    baseWeeks: 3,
    baseInvestmentIDR: 25,
    deliverableSummary: 'Pemodelan 3D presisi, pencahayaan studio PBR, & animasi produk beresolusi tinggi',
  },
  {
    id: 'Editorial',
    label: 'Editorial Monograph & Publication',
    baseWeeks: 3,
    baseInvestmentIDR: 18,
    deliverableSummary: 'Sistem grid Swiss, tata letak buku/laporan tahunan, & supervisi pracetak',
  },
  {
    id: 'Desain Grafis',
    label: 'Desain Grafis & Kemasan Taktil',
    baseWeeks: 2,
    baseInvestmentIDR: 16,
    deliverableSummary: 'Desain kemasan, sistem poster pameran, & materi kolateral cetak premium',
  },
];
