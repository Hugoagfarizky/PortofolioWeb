import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  ArrowUpRight,
  Presentation,
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Type,
  Compass,
} from 'lucide-react';
import {
  ProjectItem,
  ProjectCategory,
  PORTFOLIO_CATEGORIES,
} from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onSelectCategory: (category: ProjectCategory) => void;
  onChangeFontPairing: (pairing: 'geometric' | 'avant' | 'monograph') => void;
  onOpenPitchMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onSelectCategory,
  onChangeFontPairing,
  onOpenPitchMode,
  soundEnabled,
  onToggleSound,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const matchedProjects = projects.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette Navigasi Cepat"
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0A0C]/45 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl rounded-2xl frosted-crystal bg-[#F8F7F4]/95 border border-white shadow-2xl overflow-hidden"
        >
          {/* Search Input Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#0A0A0C]/10">
            <Search className="w-4 h-4 text-[#1D4ED8] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik nama proyek, klien, kategori, atau perintah studio..."
              className="w-full bg-transparent text-sm text-[#0A0A0C] placeholder:text-[#52525B] focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 rounded-md bg-[#0A0A0C]/8 text-[11px] font-mono-num text-[#52525B] hover:text-[#0A0A0C] cursor-pointer"
            >
              ESC
            </button>
          </div>

          <div className="max-h-[68vh] overflow-y-auto p-4 space-y-6">
            {/* Quick Studio Actions */}
            <div>
              <span className="px-2 font-mono-num text-[11px] font-semibold text-[#52525B] block mb-2">
                UTILITAS STUDIO & PRESENTASI
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playChime();
                    onClose();
                    onOpenPitchMode();
                  }}
                  className="p-3 rounded-xl bg-white/80 hover:bg-[#0A0A0C] hover:text-white border border-[#0A0A0C]/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Presentation className="w-4 h-4 text-[#1D4ED8] group-hover:text-[#60A5FA]" />
                    <div>
                      <span className="text-xs font-bold block">
                        Buka Mode Presentasi Klien
                      </span>
                      <span className="text-[11px] opacity-75">
                        Layar penuh dengan catatan rasional desain
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onToggleSound();
                  }}
                  className="p-3 rounded-xl bg-white/80 hover:bg-[#0A0A0C] hover:text-white border border-[#0A0A0C]/10 flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-[#1D4ED8] group-hover:text-[#60A5FA]" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-[#52525B]" />
                    )}
                    <div>
                      <span className="text-xs font-bold block">
                        Audio Taktil Akustik: {soundEnabled ? 'Aktif' : 'Mati'}
                      </span>
                      <span className="text-[11px] opacity-75">
                        Sintesis suara mikro Web Audio API
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Matched Projects */}
            <div>
              <span className="px-2 font-mono-num text-[11px] font-semibold text-[#52525B] block mb-2">
                STUDI KASUS PROYEK ({matchedProjects.length})
              </span>
              <div className="space-y-1">
                {matchedProjects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playTick(1.1);
                      onClose();
                      onSelectProject(proj);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-[#0A0A0C] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono-num text-xs font-bold text-[#1D4ED8] group-hover:text-[#60A5FA]">
                        {proj.index}
                      </span>
                      <span className="font-display text-sm font-bold truncate">
                        {proj.title}
                      </span>
                      <span className="text-xs opacity-65 truncate hidden sm:inline">
                        · {proj.client}
                      </span>
                    </div>
                    <span className="font-mono-num text-xs opacity-75 shrink-0 ml-2">
                      {proj.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Quick Filter */}
            <div>
              <span className="px-2 font-mono-num text-[11px] font-semibold text-[#52525B] block mb-2">
                FILTER KATEGORI CEPAT
              </span>
              <div className="flex flex-wrap gap-1.5 px-1">
                {PORTFOLIO_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      soundEngine.playTick();
                      onSelectCategory(cat);
                      onClose();
                      document
                        .getElementById('karya')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-[#0A0A0C] hover:text-white border border-[#0A0A0C]/10 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Presets */}
            <div>
              <span className="px-2 font-mono-num text-[11px] font-semibold text-[#52525B] block mb-2">
                PASANGAN TIPOGRAFI STUDIO
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'geometric', label: 'Outfit + Playfair' },
                  { id: 'avant', label: 'Syne Avant-Garde' },
                  { id: 'monograph', label: 'Playfair Monograph' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playTick();
                      onChangeFontPairing(
                        item.id as 'geometric' | 'avant' | 'monograph'
                      );
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-white/80 hover:bg-[#0A0A0C] hover:text-white border border-[#0A0A0C]/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Type className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface ClientPitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  shortlistedIds: string[];
  onToggleShortlist: (projectId: string) => void;
}

export const ClientPitchDeckModal: React.FC<ClientPitchDeckModalProps> = ({
  isOpen,
  onClose,
  projects,
  shortlistedIds,
  onToggleShortlist,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        soundEngine.playTick(1.1);
        setSlideIndex((i) => (i + 1) % projects.length);
      }
      if (e.key === 'ArrowLeft') {
        soundEngine.playTick(0.9);
        setSlideIndex((i) => (i - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, projects.length]);

  if (!isOpen) return null;

  const activeProject = projects[slideIndex] || projects[0];
  const isShortlisted = shortlistedIds.includes(activeProject.id);

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mode Presentasi Rapat Klien"
        className="fixed inset-0 z-50 bg-[#F8F7F4] text-[#0A0A0C] flex flex-col justify-between p-5 md:p-10 overflow-y-auto"
      >
        {/* Top Deck Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#0A0A0C]/10">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-[#0A0A0C]">
              ATELIER KINETIK // CLIENT PITCH DECK
            </span>
            <span aria-hidden="true" className="text-[#52525B]">
              ·
            </span>
            <span className="font-mono-num text-xs font-semibold text-[#1D4ED8]">
              SLIDE 0{slideIndex + 1} / 0{projects.length}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowSpeakerNotes((v) => !v)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                showSpeakerNotes
                  ? 'bg-[#0A0A0C] text-white'
                  : 'frosted-crystal text-[#0A0A0C]'
              }`}
            >
              {showSpeakerNotes
                ? 'Sembunyikan Catatan Rasional'
                : 'Tampilkan Catatan Rasional'}
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playChime();
                onToggleShortlist(activeProject.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isShortlisted
                  ? 'bg-[#1D4ED8] text-white'
                  : 'frosted-crystal text-[#0A0A0C]'
              }`}
            >
              {isShortlisted ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersimpan di Shortlist</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Simpan ke Shortlist</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Keluar dari mode presentasi"
              className="w-10 h-10 rounded-xl bg-[#0A0A0C] text-white hover:bg-[#1D4ED8] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Slide Body */}
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-[1360px] mx-auto w-full"
        >
          {/* Slide Image Showcase (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#0A0A0C]/12 bg-[#EAE7DF] shadow-lg">
              {!imgError[activeProject.id] ? (
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setImgError((prev) => ({
                      ...prev,
                      [activeProject.id]: true,
                    }))
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8">
                  <span className="font-display text-2xl font-bold">
                    {activeProject.title}
                  </span>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 frosted-crystal px-4 py-3 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#0A0A0C]">
                  Klien: {activeProject.client} ({activeProject.year})
                </span>
                <span className="font-mono-num font-bold text-[#1D4ED8]">
                  {activeProject.impactMetric}
                </span>
              </div>
            </div>
          </div>

          {/* Slide Narrative & Speaker Notes (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs text-[#52525B]">
              <span className="font-mono-num font-bold text-[#0A0A0C]">
                KARYA {activeProject.index}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#1D4ED8] font-semibold">
                {activeProject.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">{activeProject.duration}</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0A0A0C] leading-tight">
              {activeProject.title}
            </h2>

            <p className="text-sm md:text-base text-[#52525B] leading-relaxed">
              {activeProject.subtitle}
            </p>

            {showSpeakerNotes && (
              <div className="frosted-crystal rounded-2xl p-5 space-y-3 border border-[#0A0A0C]/10">
                <span className="font-mono-num text-[11px] font-bold text-[#1D4ED8] block">
                  CATATAN RASIONAL DESAIN (SPEAKER NOTES)
                </span>
                <p className="text-xs text-[#0A0A0C] leading-relaxed">
                  <strong>Masalah Utama:</strong> {activeProject.challenge}
                </p>
                <p className="text-xs text-[#0A0A0C] leading-relaxed">
                  <strong>Solusi Arsitektural:</strong>{' '}
                  {activeProject.architectureSolution}
                </p>
                <p className="text-xs font-semibold text-[#1D4ED8]">
                  Hasil: {activeProject.impactDetail}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Bottom Deck Navigation Controls */}
        <div className="pt-5 border-t border-[#0A0A0C]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  soundEngine.playTick();
                  setSlideIndex(idx);
                }}
                aria-label={`Lompat ke slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === slideIndex
                    ? 'w-8 bg-[#1D4ED8]'
                    : 'w-2 bg-[#0A0A0C]/20 hover:bg-[#0A0A0C]/40'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#52525B] mr-2 hidden sm:inline">
              Gunakan tombol panah ← → pada keyboard
            </span>
            <button
              type="button"
              onClick={() => {
                soundEngine.playTick(0.9);
                setSlideIndex(
                  (i) => (i - 1 + projects.length) % projects.length
                );
              }}
              className="px-4 py-2 rounded-xl frosted-crystal hover:bg-[#0A0A0C] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Slide Sebelumnya</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playTick(1.1);
                setSlideIndex((i) => (i + 1) % projects.length);
              }}
              className="px-4 py-2 rounded-xl bg-[#0A0A0C] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Slide Berikutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
