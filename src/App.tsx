import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  Search,
  LayoutGrid,
  List,
  Compass,
  MoveRight,
  X,
} from 'lucide-react';
import {
  PORTFOLIO_CATEGORIES,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
} from './data/portfolioData';
import { KineticStage } from './components/KineticStage';
import { BeforeAfterInspector } from './components/BeforeAfterInspector';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ScopeEstimator } from './components/ScopeEstimator';

export default function App() {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [galleryView, setGalleryView] = useState<'bento' | 'index'>('bento');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [referencedProject, setReferencedProject] =
    useState<ProjectItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [fontPairing, setFontPairing] = useState<'geometric' | 'avant' | 'monograph'>('geometric');

  // Smooth scroll progress bar at top of viewport
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === 'Semua' ||
        project.category === activeCategory ||
        project.secondaryCategories.includes(activeCategory);

      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Count per category for filter buttons
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      Semua: PROJECTS.length,
      'UI/UX': 0,
      'Brand Identity': 0,
      'Motion Design': 0,
      Editorial: 0,
      'Desain Grafis': 0,
      'Web Design': 0,
      '3D Visual': 0,
    };

    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      p.secondaryCategories.forEach((sec) => {
        counts[sec] = (counts[sec] || 0) + 1;
      });
    });

    return counts;
  }, []);

  const handleSelectProjectById = (id: string) => {
    const found = PROJECTS.find((p) => p.id === id);
    if (found) setSelectedProject(found);
  };

  const handleUseProjectAsReference = (project: ProjectItem) => {
    setReferencedProject(project);
    const el = document.getElementById('kolaborasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fontThemeClass =
    fontPairing === 'avant'
      ? 'font-theme-avant'
      : fontPairing === 'monograph'
      ? 'font-theme-monograph'
      : '';

  return (
    <div className={`min-h-screen bg-[#F8F7F4] text-[#0A0A0C] relative ${fontThemeClass}`}>
      {/* Scroll Progress Hairline Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#1D4ED8] origin-left z-50 pointer-events-none"
      />

      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 frosted-crystal border-b border-[#0A0A0C]/8">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (single text element, one line) */}
          <a
            href="#"
            className="font-display text-lg font-bold tracking-tight text-[#0A0A0C] whitespace-nowrap shrink-0"
          >
            Atelier Kinetik
          </a>

          {/* Zone 2: 4 Single-Line Navigation Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#52525B]"
          >
            <a
              href="#karya"
              className="hover:text-[#0A0A0C] transition-colors whitespace-nowrap shrink-0"
            >
              Karya Pilihan
            </a>
            <a
              href="#proses"
              className="hover:text-[#0A0A0C] transition-colors whitespace-nowrap shrink-0"
            >
              Anatomi Proses
            </a>
            <a
              href="#filosofi"
              className="hover:text-[#0A0A0C] transition-colors whitespace-nowrap shrink-0"
            >
              Filosofi Studio
            </a>
            <a
              href="#kolaborasi"
              className="hover:text-[#0A0A0C] transition-colors whitespace-nowrap shrink-0"
            >
              Estimasi Scope
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('kolaborasi')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0A0A0C] hover:bg-[#1D4ED8] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Mulai Proyek
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION — Split-Screen Desktop Architecture */}
        <section className="pt-10 md:pt-16 pb-16">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Typographic Hierarchy & Primary Anchor (7 Cols) */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col justify-between py-2"
              >
                <div>
                  {/* Quiet Editorial Kicker (Unboxed, no pill) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B] mb-5">
                    <span className="font-mono-num font-semibold text-[#0A0A0C]">
                      EDISI MONOGRAF 2026
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Direksi Kreatif, Sistem Produk & Motion</span>
                    <span aria-hidden="true">·</span>
                    <span>Jakarta & Zurich</span>
                  </div>

                  {/* Bold Architectural Display Headline */}
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-[#0A0A0C] leading-[1.06] [text-wrap:balance]">
                    Merancang Sistem Visual yang{' '}
                    <span className="font-editorial italic font-normal text-[#1D4ED8]">
                      Bernapas
                    </span>{' '}
                    Melalui Tipografi Bold & Gerak Presisi.
                  </h1>

                  {/* Lead Prose */}
                  <p className="text-base md:text-lg text-[#52525B] mt-6 max-w-2xl leading-relaxed">
                    Portofolio kuratorial karya lintas disiplin—memadukan ketegasan
                    grid arsitektural Swiss, kedalaman optik{' '}
                    <span className="text-[#0A0A0C] font-medium">
                      frosted-crystal glassmorphism
                    </span>
                    , serta interaksi berbasis scroll yang halus untuk merek dan
                    produk digital ambisius.
                  </p>

                  {/* Interactive Typography Pairing Selector */}
                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-medium text-[#52525B]">
                      Karakter Tipografi:
                    </span>
                    <div
                      role="group"
                      aria-label="Pilih pasangan tipografi portofolio"
                      className="frosted-crystal p-1 rounded-xl inline-flex flex-wrap items-center gap-1"
                    >
                      <button
                        type="button"
                        onClick={() => setFontPairing('geometric')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          fontPairing === 'geometric'
                            ? 'bg-[#0A0A0C] text-white shadow-sm'
                            : 'text-[#52525B] hover:text-[#0A0A0C]'
                        }`}
                      >
                        Outfit + Playfair
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontPairing('avant')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          fontPairing === 'avant'
                            ? 'bg-[#0A0A0C] text-white shadow-sm'
                            : 'text-[#52525B] hover:text-[#0A0A0C]'
                        }`}
                      >
                        Syne Avant-Garde
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontPairing('monograph')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                          fontPairing === 'monograph'
                            ? 'bg-[#0A0A0C] text-white shadow-sm'
                            : 'text-[#52525B] hover:text-[#0A0A0C]'
                        }`}
                      >
                        Playfair Monograph
                      </button>
                    </div>
                  </div>
                </div>

                {/* CTA Row & Discipline Index Preview */}
                <div className="mt-10 pt-8 border-t border-[#0A0A0C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToSection('karya')}
                      className="px-6 py-3.5 rounded-xl bg-[#0A0A0C] hover:bg-[#1D4ED8] text-white text-xs md:text-sm font-semibold transition-colors flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Jelajahi Galeri Karya</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('proses')}
                      className="px-5 py-3.5 rounded-xl frosted-crystal hover:bg-white text-[#0A0A0C] text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Inspeksi Before / After
                    </button>
                  </div>

                  <div className="text-xs text-[#52525B]">
                    <span className="block font-mono-num text-[#0A0A0C] font-semibold">
                      7 Disiplin Terintegrasi
                    </span>
                    <span>UI/UX · Brand · Motion · 3D · Editorial</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Interactive Motion Stage (5 Cols) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex"
              >
                <KineticStage
                  onExploreWork={() => scrollToSection('karya')}
                  onSelectFeaturedProject={handleSelectProjectById}
                />
              </motion.div>
            </div>

            {/* Full-Width Quantitative Impact Strip Below Hero Split */}
            <div className="mt-12 pt-8 border-t border-[#0A0A0C]/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <span className="font-mono-num text-2xl md:text-3xl font-bold text-[#0A0A0C] block">
                  42+ Produk
                </span>
                <span className="text-xs text-[#52525B] mt-1 block">
                  Sistem antarmuka & identitas merek diluncurkan secara global
                </span>
              </div>
              <div>
                <span className="font-mono-num text-2xl md:text-3xl font-bold text-[#0A0A0C] block">
                  +164% Konversi
                </span>
                <span className="text-xs text-[#52525B] mt-1 block">
                  Rata-rata peningkatan metrik keterlibatan pasca desain ulang
                </span>
              </div>
              <div>
                <span className="font-mono-num text-2xl md:text-3xl font-bold text-[#0A0A0C] block">
                  18 Penghargaan
                </span>
                <span className="text-xs text-[#52525B] mt-1 block">
                  Pengakuan internasional di bidang tipografi, web & motion
                </span>
              </div>
              <div>
                <span className="font-mono-num text-2xl md:text-3xl font-bold text-[#1D4ED8] block">
                  60 FPS Murni
                </span>
                <span className="text-xs text-[#52525B] mt-1 block">
                  Koreografi interaksi berbasis compositor tanpa beban layout
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Editorial Marquee Ribbon Divider */}
        <div
          aria-hidden="true"
          className="py-3.5 border-y border-[#0A0A0C]/10 bg-white/50 overflow-hidden select-none"
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono-num text-[#52525B] uppercase tracking-widest">
            {[...Array(2)].map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <span>Karya Pilihan 2025—2026</span>
                <span>·</span>
                <span className="text-[#0A0A0C] font-semibold">
                  UI/UX Architecture
                </span>
                <span>·</span>
                <span>Brand Identity Systems</span>
                <span>·</span>
                <span className="text-[#1D4ED8] font-semibold">
                  Kinetic Motion & Scroll
                </span>
                <span>·</span>
                <span>Swiss Editorial Monograph</span>
                <span>·</span>
                <span>Desain Grafis & Kemasan</span>
                <span>·</span>
                <span className="text-[#0A0A0C] font-semibold">
                  3D Optical Look-Dev
                </span>
                <span>·</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* SECTION 01: INTERACTIVE BENTO PROJECT GALLERY & MULTI-CATEGORY FILTER */}
        <section
          id="karya"
          className="py-20 md:py-28"
          aria-labelledby="gallery-heading"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-[#52525B] mb-3">
                  <span className="font-mono-num text-[#0A0A0C] font-semibold">
                    01. Kurasi Karya Pilihan
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Arsip Interaktif Lintas Disiplin</span>
                </div>
                <h2
                  id="gallery-heading"
                  className="font-display text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0A0A0C] leading-[1.12] [text-wrap:balance]"
                >
                  Eksplorasi Proyek Berdasarkan{' '}
                  <span className="font-editorial italic font-normal">
                    Disiplin & Dampak
                  </span>
                </h2>
              </div>

              {/* Search & View Switcher Toolbar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#52525B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari karya atau klien..."
                    aria-label="Cari proyek portofolio"
                    className="pl-9 pr-8 py-2 rounded-xl frosted-crystal text-xs text-[#0A0A0C] placeholder:text-[#52525B] focus:outline-none focus:border-[#1D4ED8] w-52 sm:w-60"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Bersihkan pencarian"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-[#0A0A0C] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Layout Mode Toggle (Bento Grid vs Editorial Index) */}
                <div
                  role="group"
                  aria-label="Mode tampilan galeri"
                  className="frosted-crystal p-1 rounded-xl flex items-center gap-1"
                >
                  <button
                    type="button"
                    onClick={() => setGalleryView('bento')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      galleryView === 'bento'
                        ? 'bg-[#0A0A0C] text-white'
                        : 'text-[#52525B] hover:text-[#0A0A0C]'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Bento</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryView('index')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      galleryView === 'index'
                        ? 'bg-[#0A0A0C] text-white'
                        : 'text-[#52525B] hover:text-[#0A0A0C]'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Indeks</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Segmented Category Filter Bar */}
            <div
              role="tablist"
              aria-label="Filter proyek berdasarkan kategori"
              className="frosted-crystal p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-10"
            >
              {PORTFOLIO_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#0A0A0C] text-white shadow-sm'
                        : 'text-[#52525B] hover:text-[#0A0A0C] hover:bg-white/60'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`font-mono-num text-[11px] ${
                        isActive ? 'text-[#60A5FA]' : 'text-[#52525B]/70'
                      }`}
                    >
                      {categoryCounts[category]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Empty State if search filters out everything */}
            {filteredProjects.length === 0 ? (
              <div className="frosted-crystal rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
                <Compass className="w-8 h-8 text-[#1D4ED8] mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-[#0A0A0C]">
                  Tidak ada proyek yang cocok dengan filter saat ini
                </h3>
                <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
                  Coba gunakan kata kunci pencarian lain atau kembalikan filter
                  kategori ke Semua Karya.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('Semua');
                    setSearchQuery('');
                  }}
                  className="mt-5 px-4 py-2 rounded-xl bg-[#0A0A0C] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Reset Filter Galeri
                </button>
              </div>
            ) : galleryView === 'bento' ? (
              /* DYNAMIC BENTO GRID VIEW */
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, idx) => {
                    const isWide =
                      project.bentoSpan === 'featured' &&
                      activeCategory === 'Semua' &&
                      !searchQuery;

                    return (
                      <motion.article
                        layout
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                          duration: 0.35,
                          delay: idx * 0.04,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onClick={() => setSelectedProject(project)}
                        className={`group rounded-2xl overflow-hidden frosted-crystal flex flex-col justify-between cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${
                          isWide ? 'md:col-span-2' : 'col-span-1'
                        }`}
                      >
                        {/* Image Container with Measured Scrim & Hover Zoom */}
                        <div
                          className={`relative w-full overflow-hidden bg-[#E6E3DC] ${
                            isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'
                          }`}
                        >
                          {!failedImages[project.id] ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              referrerPolicy="no-referrer"
                              onError={() =>
                                setFailedImages((prev) => ({
                                  ...prev,
                                  [project.id]: true,
                                }))
                              }
                              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#EFECE6] to-[#DCD7CD] flex items-center justify-center p-6">
                              <span className="font-display text-lg font-bold text-[#0A0A0C]">
                                {project.title}
                              </span>
                            </div>
                          )}

                          {/* Subtle Top-Right Action Affordance on Hover */}
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-xl frosted-crystal flex items-center justify-center text-[#0A0A0C] group-hover:bg-[#0A0A0C] group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>

                          {/* Bottom Frosted Impact Strip over Media */}
                          <div className="absolute bottom-3 left-3 right-3 frosted-crystal px-3.5 py-2 rounded-xl flex items-center justify-between gap-2 text-xs">
                            <span className="font-medium text-[#0A0A0C] truncate">
                              {project.client}
                            </span>
                            <span className="font-mono-num font-bold text-[#1D4ED8] whitespace-nowrap shrink-0">
                              {project.impactMetric}
                            </span>
                          </div>
                        </div>

                        {/* Card Text Body — Zero-Pill Unboxed Metadata */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B]">
                              <span className="font-mono-num font-bold text-[#0A0A0C]">
                                {project.index}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#1D4ED8] font-medium">
                                {project.category}
                              </span>
                              {project.secondaryCategories.map((sec) => (
                                <React.Fragment key={sec}>
                                  <span aria-hidden="true">·</span>
                                  <span>{sec}</span>
                                </React.Fragment>
                              ))}
                              <span aria-hidden="true">·</span>
                              <span className="font-mono-num">{project.year}</span>
                            </div>

                            <h3 className="font-display text-xl md:text-2xl font-bold text-[#0A0A0C] mt-2 group-hover:text-[#1D4ED8] transition-colors">
                              {project.title}
                            </h3>

                            <p className="text-sm text-[#52525B] mt-2 leading-relaxed line-clamp-2">
                              {project.subtitle}
                            </p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#0A0A0C]/8 flex items-center justify-between text-xs font-semibold text-[#0A0A0C]">
                            <span>Buka Studi Kasus & Blueprint</span>
                            <MoveRight className="w-4 h-4 text-[#1D4ED8] transition-transform duration-200 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* EDITORIAL MONOGRAPH INDEX VIEW */
              <div className="frosted-crystal rounded-2xl divide-y divide-[#0A0A0C]/10 overflow-hidden">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="p-5 md:p-6 hover:bg-white/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-start md:items-center gap-4 md:gap-6">
                      <span className="font-mono-num text-sm font-bold text-[#52525B] group-hover:text-[#1D4ED8]">
                        {project.index}
                      </span>
                      <div>
                        <h3 className="font-display text-lg md:text-xl font-bold text-[#0A0A0C] group-hover:text-[#1D4ED8] transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B] mt-1">
                          <span>{project.client}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#0A0A0C] font-medium">
                            {project.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-num">{project.year}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <span className="font-mono-num text-xs font-semibold text-[#0A0A0C]">
                        {project.impactMetric}
                      </span>
                      <span className="w-9 h-9 rounded-xl bg-[#0A0A0C]/5 group-hover:bg-[#0A0A0C] group-hover:text-white flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 02: INTERACTIVE BEFORE/AFTER DESIGN CRAFT INSPECTOR */}
        <BeforeAfterInspector />

        {/* SECTION 03: STUDIO PHILOSOPHY & ATTRIBUTABLE CLIENT PROOF */}
        <section
          id="filosofi"
          className="py-20 md:py-28 border-t border-[#0A0A0C]/10"
          aria-labelledby="philosophy-heading"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 5 Cols: Architectural Manifesto */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 text-xs text-[#52525B] mb-3">
                  <span className="font-mono-num text-[#0A0A0C] font-semibold">
                    03. Filosofi & Prinsip Kerja
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Disiplin Anti-Ornamen</span>
                </div>
                <h2
                  id="philosophy-heading"
                  className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#0A0A0C] leading-[1.12] [text-wrap:balance]"
                >
                  Keindahan Muncul Saat Struktur Tipografi Bertemu{' '}
                  <span className="font-editorial italic font-normal">
                    Ketahanan Fungsi
                  </span>
                  .
                </h2>
                <p className="text-sm md:text-base text-[#52525B] mt-4 leading-relaxed">
                  Kami menolak estetika templat instan yang ramai namun kosong.
                  Setiap piksel, kurva gerak, dan lapisan kaca dirancang untuk
                  memperjelas hierarki informasi serta memperkuat kredibilitas
                  merek Anda.
                </p>
              </div>

              {/* Right 7 Cols: 3 Core Principles + Attributable Client Endorsement */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="frosted-crystal rounded-2xl p-6">
                    <span className="font-mono-num text-xs font-bold text-[#1D4ED8]">
                      01. Tipografi Arsitektural
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#0A0A0C] mt-2">
                      Kontras & Keterbacaan
                    </h3>
                    <p className="text-xs text-[#52525B] mt-2 leading-relaxed">
                      Skala tipografi tegas dan angka tabular yang menjaga ritme
                      baca di berbagai ukuran layar tanpa distorsi visual.
                    </p>
                  </div>

                  <div className="frosted-crystal rounded-2xl p-6">
                    <span className="font-mono-num text-xs font-bold text-[#1D4ED8]">
                      02. Kaca Optik Taktil
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#0A0A0C] mt-2">
                      Frosted-Crystal Depth
                    </h3>
                    <p className="text-xs text-[#52525B] mt-2 leading-relaxed">
                      Permukaan translusen terukur yang memisahkan konteks
                      navigasi dan modal tanpa menutupi karya utama.
                    </p>
                  </div>

                  <div className="frosted-crystal rounded-2xl p-6">
                    <span className="font-mono-num text-xs font-bold text-[#1D4ED8]">
                      03. Koreografi Kinetik
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#0A0A0C] mt-2">
                      Respons Mikro &lt;200ms
                    </h3>
                    <p className="text-xs text-[#52525B] mt-2 leading-relaxed">
                      Transisi berbasis fisika pegas yang memberikan umpan balik
                      instan dan memandu mata pengguna secara alami.
                    </p>
                  </div>
                </div>

                {/* Attributable Client Testimonial adjacent to claims */}
                <blockquote className="frosted-crystal rounded-2xl p-6 md:p-8">
                  <p className="font-display text-base md:text-lg font-medium text-[#0A0A0C] leading-relaxed">
                    “Transformasi antarmuka Nova Wealth OS mengubah produk
                    perbankan kami yang sebelumnya rumit menjadi pengalaman
                    digital paling tenang dan presisi di kelasnya. Waktu
                    penyelesaian transaksi valuta asing nasabah kami terpangkas
                    64% sejak minggu pertama peluncuran.”
                  </p>
                  <footer className="mt-4 pt-4 border-t border-[#0A0A0C]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <strong className="text-[#0A0A0C] font-semibold">
                        Lukas Vance
                      </strong>
                      <span aria-hidden="true" className="mx-1.5 text-[#52525B]">
                        ·
                      </span>
                      <span className="text-[#52525B]">
                        VP of Digital Product, Nova Financial Zurich
                      </span>
                    </div>
                    <span className="font-mono-num text-[#1D4ED8] font-medium">
                      Studi Kasus 01 · Terverifikasi
                    </span>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: INTERACTIVE SCOPE ESTIMATOR & COLLABORATION BRIEF */}
        <ScopeEstimator
          referencedProject={referencedProject}
          onClearReference={() => setReferencedProject(null)}
        />
      </main>

      {/* Minimalist Architectural Footer */}
      <footer className="border-t border-[#0A0A0C]/10 bg-white/60 py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-[#52525B]">
          <div>
            <span className="font-display text-sm font-bold text-[#0A0A0C]">
              Atelier Kinetik
            </span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <span>Monograf Portofolio Desain & Motion Interaktif</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#karya" className="hover:text-[#0A0A0C] transition-colors">
              Karya
            </a>
            <a href="#proses" className="hover:text-[#0A0A0C] transition-colors">
              Before/After
            </a>
            <a
              href="#filosofi"
              className="hover:text-[#0A0A0C] transition-colors"
            >
              Filosofi
            </a>
            <a
              href="#kolaborasi"
              className="hover:text-[#0A0A0C] transition-colors"
            >
              Kolaborasi
            </a>
            <span className="font-mono-num text-[#0A0A0C]">© 2026</span>
          </div>
        </div>
      </footer>

      {/* Deep-Dive Case Study Lightbox Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(proj) => setSelectedProject(proj)}
        allProjects={PROJECTS}
        onUseProjectAsReference={handleUseProjectAsReference}
      />
    </div>
  );
}
