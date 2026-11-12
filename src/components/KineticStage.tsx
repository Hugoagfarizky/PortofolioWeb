import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Layers, Sparkles, Sliders, Eye } from 'lucide-react';

interface KineticStageProps {
  onExploreWork: () => void;
  onSelectFeaturedProject: (projectId: string) => void;
}

export const KineticStage: React.FC<KineticStageProps> = ({
  onSelectFeaturedProject,
}) => {
  const [harmonicMode, setHarmonicMode] = useState<'orbital' | 'prism' | 'architectural'>('orbital');
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  const { scrollYProgress } = useScroll();
  const ringRotate = useTransform(scrollYProgress, [0, 0.4], [0, 75]);
  const counterRingRotate = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const floatY = useTransform(scrollYProgress, [0, 0.35], [0, -28]);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setPointerOffset({ x: normX, y: normY });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative w-full h-full min-h-[480px] lg:min-h-[540px] rounded-2xl overflow-hidden border border-[#0A0A0C]/10 bg-[#EFECE6] flex flex-col justify-between p-6 md:p-8 select-none group"
    >
      {/* Subtle Architectural Grid Overlay */}
      <div className="absolute inset-0 architectural-grid-bg opacity-80 pointer-events-none" />

      {/* Background Artwork with Parallax */}
      <motion.div
        style={{
          y: floatY,
          x: pointerOffset.x * -0.6,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {!imageError ? (
          <img
            src="/src/assets/images/portfolio_motion_3d_1794464327849.jpg"
            alt="Simulasi optik kaca kristal dan cincin aluminium anodisa"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              harmonicMode === 'orbital'
                ? 'scale-105 opacity-90'
                : harmonicMode === 'prism'
                ? 'scale-110 opacity-80 contrast-105'
                : 'scale-100 opacity-70 grayscale'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#F8F7F4] via-[#E5E0D5] to-[#D4CFC3]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4]/90 via-transparent to-[#F8F7F4]/40" />
      </motion.div>

      {/* Interactive SVG Kinetic Geometry Layer */}
      <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none my-4">
        <motion.div
          style={{
            x: pointerOffset.x,
            y: pointerOffset.y,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
        >
          {/* Outer Scroll-Linked Kinetic Ring */}
          <motion.svg
            style={{ rotate: ringRotate }}
            viewBox="0 0 320 320"
            className="absolute inset-0 w-full h-full"
          >
            <circle
              cx="160"
              cy="160"
              r="146"
              fill="none"
              stroke="rgba(10, 10, 12, 0.16)"
              strokeWidth="1"
              strokeDasharray={harmonicMode === 'architectural' ? '4 6' : '12 8'}
            />
            <circle
              cx="160"
              cy="14"
              r="4"
              fill="#1D4ED8"
            />
            <circle
              cx="160"
              cy="306"
              r="3"
              fill="#0A0A0C"
            />
            {harmonicMode === 'architectural' && (
              <>
                <line x1="14" y1="160" x2="306" y2="160" stroke="rgba(10,10,12,0.12)" strokeWidth="1" />
                <line x1="160" y1="14" x2="160" y2="306" stroke="rgba(10,10,12,0.12)" strokeWidth="1" />
              </>
            )}
          </motion.svg>

          {/* Counter-Rotating Inner Geometric Frame */}
          <motion.svg
            style={{ rotate: counterRingRotate }}
            viewBox="0 0 260 260"
            className="absolute w-52 h-52 md:w-64 md:h-64"
          >
            <ellipse
              cx="130"
              cy="130"
              rx={harmonicMode === 'prism' ? '112' : '96'}
              ry={harmonicMode === 'prism' ? '64' : '96'}
              fill="none"
              stroke="rgba(29, 78, 216, 0.35)"
              strokeWidth="1.25"
            />
            <rect
              x="58"
              y="58"
              width="144"
              height="144"
              rx={harmonicMode === 'orbital' ? '72' : '16'}
              fill="none"
              stroke="rgba(10, 10, 12, 0.22)"
              strokeWidth="1"
            />
          </motion.svg>

          {/* Center Floating Frosted-Crystal Lens Card */}
          <motion.div
            animate={{
              scale: harmonicMode === 'prism' ? 1.06 : 1,
              rotate: harmonicMode === 'architectural' ? 45 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-36 h-36 md:w-44 md:h-44 rounded-full frosted-crystal flex flex-col items-center justify-center text-center p-4 shadow-lg"
          >
            <motion.div
              animate={{ rotate: harmonicMode === 'architectural' ? -45 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="font-mono-num text-[11px] text-[#1D4ED8] tracking-wider">
                {harmonicMode === 'orbital'
                  ? 'IOR 1.52 · OPTIK'
                  : harmonicMode === 'prism'
                  ? 'DISPERSI · 60FPS'
                  : 'GRID SWISS · 1:1.618'}
              </span>
              <p className="font-display text-sm md:text-base font-bold text-[#0A0A0C] mt-1 leading-tight">
                {harmonicMode === 'orbital'
                  ? 'Kinetik & Scroll'
                  : harmonicMode === 'prism'
                  ? 'Refraksi Kristal'
                  : 'Presisi Tipografi'}
              </p>
              <span className="text-[11px] text-[#52525B] mt-1">
                Gerakkan kursor / gulir
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Top Glass Header Strip inside Stage */}
      <div className="relative z-20 order-first flex flex-wrap items-center justify-between gap-2">
        <div className="frosted-crystal px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs text-[#0A0A0C]">
          <Layers className="w-3.5 h-3.5 text-[#1D4ED8]" />
          <span className="font-medium">Kanvas Interaktif</span>
          <span aria-hidden="true" className="text-[#52525B]">·</span>
          <span className="font-mono-num text-[#52525B]">Eksperimen 03</span>
        </div>

        {/* Interactive Mode Switcher */}
        <div
          role="group"
          aria-label="Mode visualisasi motion graphic"
          className="frosted-crystal p-1 rounded-xl flex items-center gap-1"
        >
          <button
            type="button"
            onClick={() => setHarmonicMode('orbital')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              harmonicMode === 'orbital'
                ? 'bg-[#0A0A0C] text-white'
                : 'text-[#52525B] hover:text-[#0A0A0C]'
            }`}
          >
            Orbital
          </button>
          <button
            type="button"
            onClick={() => setHarmonicMode('prism')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              harmonicMode === 'prism'
                ? 'bg-[#0A0A0C] text-white'
                : 'text-[#52525B] hover:text-[#0A0A0C]'
            }`}
          >
            Prisma
          </button>
          <button
            type="button"
            onClick={() => setHarmonicMode('architectural')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              harmonicMode === 'architectural'
                ? 'bg-[#0A0A0C] text-white'
                : 'text-[#52525B] hover:text-[#0A0A0C]'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Bottom Frosted Case Study Quick Card */}
      <div className="relative z-20 frosted-crystal rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#52525B]">
            <span className="font-mono-num text-[#0A0A0C] font-medium">03</span>
            <span aria-hidden="true">·</span>
            <span>Motion Design & 3D Visual</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-num">2026</span>
          </div>
          <h2 className="font-display text-base md:text-lg font-bold text-[#0A0A0C] mt-0.5">
            Kronos — Kinetic Optics Showreel
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onSelectFeaturedProject('kronos-optical-sculpture')}
          className="px-4 py-2 rounded-lg bg-[#0A0A0C] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors flex items-center gap-2 self-start sm:self-center whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Bedah Karya</span>
        </button>
      </div>
    </div>
  );
};
