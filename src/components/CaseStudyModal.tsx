import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  allProjects: ProjectItem[];
  onUseProjectAsReference: (project: ProjectItem) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  onUseProjectAsReference,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'final' | 'architecture'>('final');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setViewMode('final');
    setImgError(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1600);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0A0C]/55 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl frosted-crystal bg-[#F8F7F4]/95 border border-white/80 shadow-2xl p-6 md:p-10"
        >
          {/* Top Modal Header Bar */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#0A0A0C]/10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B]">
              <span className="font-mono-num font-bold text-[#0A0A0C]">
                STUDI KASUS {project.index}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#1D4ED8] font-medium">{project.category}</span>
              {project.secondaryCategories.map((sec) => (
                <React.Fragment key={sec}>
                  <span aria-hidden="true">·</span>
                  <span>{sec}</span>
                </React.Fragment>
              ))}
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">{project.year}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup panel studi kasus"
              className="w-10 h-10 rounded-xl bg-[#0A0A0C] text-white hover:bg-[#1D4ED8] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Lead Metadata */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <h2
                id="case-study-modal-title"
                className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0C] tracking-tight leading-tight"
              >
                {project.title}
              </h2>
              <p className="text-base text-[#52525B] mt-2 leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end gap-2 lg:text-right text-xs text-[#52525B]">
              <div>
                <span className="text-[#52525B]">Klien: </span>
                <span className="font-semibold text-[#0A0A0C]">{project.client}</span>
              </div>
              <div>
                <span className="text-[#52525B]">Peran: </span>
                <span className="font-medium text-[#0A0A0C]">{project.role}</span>
              </div>
              <div>
                <span className="text-[#52525B]">Durasi: </span>
                <span className="font-mono-num font-medium text-[#0A0A0C]">{project.duration}</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Frame with Architecture Spec Toggle */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#52525B]">
                Mode Tampilan Visual:
              </span>
              <div className="frosted-crystal-subtle p-1 rounded-xl flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewMode('final')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    viewMode === 'final'
                      ? 'bg-[#0A0A0C] text-white'
                      : 'text-[#52525B] hover:text-[#0A0A0C]'
                  }`}
                >
                  Hasil Akhir Produksi
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('architecture')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    viewMode === 'architecture'
                      ? 'bg-[#0A0A0C] text-white'
                      : 'text-[#52525B] hover:text-[#0A0A0C]'
                  }`}
                >
                  Spesifikasi Grid & Motion
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#0A0A0C]/10 bg-[#EAE7E0]">
              {viewMode === 'final' ? (
                <>
                  {!imgError ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <span className="font-display text-xl font-bold text-[#0A0A0C]">
                        {project.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 frosted-crystal px-4 py-2.5 rounded-xl text-xs">
                    <span className="text-[#0A0A0C] font-medium">
                      {project.wireframeSpec.afterCaption}
                    </span>
                    <span className="font-mono-num font-bold text-[#1D4ED8]">
                      {project.impactMetric}
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full architectural-grid-bg bg-[#F4F2ED] p-6 md:p-10 flex flex-col justify-between">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0A0A0C]/15 pb-4">
                    <span className="font-mono-num text-xs font-bold text-[#0A0A0C]">
                      ARCHITECTURAL BLUEPRINT // {project.index}
                    </span>
                    <span className="font-mono-num text-xs text-[#1D4ED8]">
                      {project.wireframeSpec.gridColumns}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-4">
                    <div className="frosted-crystal p-4 rounded-xl">
                      <span className="font-mono-num text-[11px] text-[#52525B] block">
                        SISTEM GRID
                      </span>
                      <p className="font-display text-sm font-bold text-[#0A0A0C] mt-1">
                        {project.wireframeSpec.gridColumns}
                      </p>
                    </div>
                    <div className="frosted-crystal p-4 rounded-xl">
                      <span className="font-mono-num text-[11px] text-[#52525B] block">
                        SKALA TIPOGRAFI
                      </span>
                      <p className="font-display text-sm font-bold text-[#0A0A0C] mt-1">
                        {project.wireframeSpec.typographyScale}
                      </p>
                    </div>
                    <div className="frosted-crystal p-4 rounded-xl">
                      <span className="font-mono-num text-[11px] text-[#52525B] block">
                        KURVA MOTION
                      </span>
                      <p className="font-mono-num text-xs font-bold text-[#1D4ED8] mt-1">
                        {project.wireframeSpec.motionCurve}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#52525B] border-t border-[#0A0A0C]/15 pt-4">
                    {project.wireframeSpec.beforeCaption}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 3-Column Deep-Dive Narrative */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white/75 border border-[#0A0A0C]/8">
              <span className="font-mono-num text-xs font-semibold text-[#52525B]">
                01. Tantangan Desain
              </span>
              <p className="text-sm text-[#0A0A0C] mt-2 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/75 border border-[#0A0A0C]/8">
              <span className="font-mono-num text-xs font-semibold text-[#1D4ED8]">
                02. Arsitektur Solusi
              </span>
              <p className="text-sm text-[#0A0A0C] mt-2 leading-relaxed">
                {project.architectureSolution}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/75 border border-[#0A0A0C]/8">
              <span className="font-mono-num text-xs font-semibold text-[#0A0A0C]">
                03. Hasil & Dampak Bisnis
              </span>
              <p className="font-display text-base font-bold text-[#1D4ED8] mt-2">
                {project.impactMetric}
              </p>
              <p className="text-sm text-[#52525B] mt-1.5 leading-relaxed">
                {project.impactDetail}
              </p>
            </div>
          </div>

          {/* Deliverables & Color System Row */}
          <div className="mt-8 pt-6 border-t border-[#0A0A0C]/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Deliverables */}
            <div className="lg:col-span-6">
              <h3 className="text-xs font-semibold text-[#0A0A0C] mb-3">
                Ruang Lingkup & Deliverables Utama
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs text-[#0A0A0C] py-1.5 border-b border-[#0A0A0C]/8"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Color Tokens */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-[#0A0A0C]">
                  Sistem Palet & Material Proyek (Klik untuk salin HEX)
                </h3>
                {copiedHex && (
                  <span className="font-mono-num text-[11px] text-[#1D4ED8] font-medium">
                    Disalin: {copiedHex}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {project.palette.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => handleCopyHex(swatch.hex)}
                    className="group p-2.5 rounded-xl bg-white/80 border border-[#0A0A0C]/10 hover:border-[#0A0A0C]/30 transition-all text-left cursor-pointer"
                  >
                    <div
                      style={{ backgroundColor: swatch.hex }}
                      className="w-full h-8 rounded-lg border border-black/10 mb-2 flex items-center justify-end p-1.5"
                    >
                      {copiedHex === swatch.hex ? (
                        <Check className="w-3 h-3 text-white mix-blend-difference" />
                      ) : (
                        <Copy className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 mix-blend-difference transition-opacity" />
                      )}
                    </div>
                    <span className="block text-[11px] font-medium text-[#0A0A0C] truncate">
                      {swatch.name}
                    </span>
                    <span className="block font-mono-num text-[10px] text-[#52525B]">
                      {swatch.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer: Prev/Next Navigation & Reference Action */}
          <div className="mt-8 pt-6 border-t border-[#0A0A0C]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="px-3.5 py-2 rounded-xl frosted-crystal-subtle hover:bg-white text-xs font-medium text-[#0A0A0C] flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya ({prevProject.index})</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="px-3.5 py-2 rounded-xl frosted-crystal-subtle hover:bg-white text-xs font-medium text-[#0A0A0C] flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Berikutnya ({nextProject.index})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                onUseProjectAsReference(project);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#0A0A0C] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Jadikan Referensi Kolaborasi</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
