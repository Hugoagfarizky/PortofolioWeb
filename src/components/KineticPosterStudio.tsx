import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Type,
  Download,
  Pause,
  Play,
  Grid,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface PosterPreset {
  id: string;
  label: string;
  line1: string;
  line2: string;
  line3: string;
  kicker: string;
  tracking: number;
  waveSpeed: number;
  accentHex: string;
}

const POSTER_PRESETS: PosterPreset[] = [
  {
    id: 'swiss-kinetik',
    label: '01 · Form Follows Motion',
    line1: 'LA FORME',
    line2: 'SUIT LE',
    line3: 'MOUVEMENT',
    kicker: 'ZURICH · JAKARTA DESIGN BIENNALE 2026',
    tracking: -3,
    waveSpeed: 1.0,
    accentHex: '#1D4ED8',
  },
  {
    id: 'optical-crystal',
    label: '02 · Arsitektur Optik',
    line1: 'CAHAYA',
    line2: 'KRISTAL &',
    line3: 'TIPOGRAFI',
    kicker: 'MONOGRAF SISTEM VISUAL · IOR 1.52',
    tracking: -2,
    waveSpeed: 1.4,
    accentHex: '#0A0A0C',
  },
  {
    id: 'brutalist-grid',
    label: '03 · Grid & Proporsi',
    line1: 'RASIO',
    line2: 'EMAS',
    line3: '1 : 1.618',
    kicker: 'KONSTRUKSI MODULAR SWISS · EDISI 04',
    tracking: 2,
    waveSpeed: 0.7,
    accentHex: '#B91C1C',
  },
];

export const KineticPosterStudio: React.FC = () => {
  const [line1, setLine1] = useState('LA FORME');
  const [line2, setLine2] = useState('SUIT LE');
  const [line3, setLine3] = useState('MOUVEMENT');
  const [kicker, setKicker] = useState('ZURICH · JAKARTA DESIGN BIENNALE 2026');
  const [trackingPx, setTrackingPx] = useState<number>(-3);
  const [fontSizeScale, setFontSizeScale] = useState<number>(100);
  const [gridCols, setGridCols] = useState<4 | 8 | 12>(8);
  const [accentHex, setAccentHex] = useState<string>('#1D4ED8');
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [activePresetId, setActivePresetId] = useState<string>('swiss-kinetik');

  const applyPreset = (preset: PosterPreset) => {
    soundEngine.playTick(1.1);
    setActivePresetId(preset.id);
    setLine1(preset.line1);
    setLine2(preset.line2);
    setLine3(preset.line3);
    setKicker(preset.kicker);
    setTrackingPx(preset.tracking);
    setAccentHex(preset.accentHex);
  };

  // Export Poster as scalable SVG file
  const handleDownloadSvgPoster = () => {
    soundEngine.playChime();
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#F8F7F4" />
  <g stroke="rgba(10,10,12,0.08)" stroke-width="1">
    <line x1="60" y1="0" x2="60" y2="1000" />
    <line x1="400" y1="0" x2="400" y2="1000" />
    <line x1="740" y1="0" x2="740" y2="1000" />
    <line x1="0" y1="120" x2="800" y2="120" />
    <line x1="0" y1="880" x2="800" y2="880" />
  </g>
  <text x="60" y="80" font-family="monospace" font-size="14" fill="#52525B" letter-spacing="2">${kicker}</text>
  <circle cx="715" cy="74" r="14" fill="${accentHex}" />
  <text x="60" y="340" font-family="sans-serif" font-weight="800" font-size="${Math.round(92 * (fontSizeScale / 100))}" fill="#0A0A0C" letter-spacing="${trackingPx}">${line1}</text>
  <text x="60" y="510" font-family="Georgia, serif" font-style="italic" font-size="${Math.round(96 * (fontSizeScale / 100))}" fill="${accentHex}" letter-spacing="${trackingPx}">${line2}</text>
  <text x="60" y="680" font-family="sans-serif" font-weight="800" font-size="${Math.round(92 * (fontSizeScale / 100))}" fill="#0A0A0C" letter-spacing="${trackingPx}">${line3}</text>
  <text x="60" y="930" font-family="monospace" font-size="13" fill="#0A0A0C">ATELIER KINETIK // SWISS POSTER SPECIMEN 2026</text>
  <text x="560" y="930" font-family="monospace" font-size="13" fill="${accentHex}">GRID ${gridCols}-COL · RATIO 4:5</text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Atelier-Kinetik-Poster-${activePresetId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="poster-studio"
      className="py-20 md:py-28 border-t border-[#0A0A0C]/10"
      aria-labelledby="poster-studio-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#52525B] mb-3">
              <span className="font-mono-num text-[#0A0A0C] font-semibold">
                04. Kinetic Type & Poster Studio
              </span>
              <span aria-hidden="true">·</span>
              <span>Eksperimen Tipografi Variabel & Ekspor SVG</span>
            </div>
            <h2
              id="poster-studio-heading"
              className="font-display text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0A0A0C] leading-[1.12] [text-wrap:balance]"
            >
              Komposisi Poster Kinetik Berbasis{' '}
              <span className="font-editorial italic font-normal text-[#1D4ED8]">
                Grid Modular Swiss
              </span>
            </h2>
          </div>

          {/* Preset Selector */}
          <div className="frosted-crystal p-1.5 rounded-xl flex flex-wrap items-center gap-1 self-start lg:self-end">
            {POSTER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activePresetId === preset.id
                    ? 'bg-[#0A0A0C] text-white'
                    : 'text-[#52525B] hover:text-[#0A0A0C]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Cols: Typographic & Grid Controls */}
          <div className="lg:col-span-5 frosted-crystal rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-[#0A0A0C]">
                  Kontrol Spesimen Poster
                </h3>
                <button
                  type="button"
                  onClick={() => applyPreset(POSTER_PRESETS[0])}
                  className="text-xs text-[#52525B] hover:text-[#0A0A0C] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Editable Lines */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] mb-1">
                    Baris 01 (Display)
                  </label>
                  <input
                    type="text"
                    maxLength={14}
                    value={line1}
                    onChange={(e) => setLine1(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl bg-white/90 border border-[#0A0A0C]/15 text-xs font-bold text-[#0A0A0C] focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] mb-1">
                    Baris 02 (Editorial)
                  </label>
                  <input
                    type="text"
                    maxLength={14}
                    value={line2}
                    onChange={(e) => setLine2(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl bg-white/90 border border-[#0A0A0C]/15 text-xs font-bold text-[#1D4ED8] focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] mb-1">
                    Baris 03 (Display)
                  </label>
                  <input
                    type="text"
                    maxLength={14}
                    value={line3}
                    onChange={(e) => setLine3(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl bg-white/90 border border-[#0A0A0C]/15 text-xs font-bold text-[#0A0A0C] focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              {/* Scale & Tracking Sliders */}
              <div className="space-y-4 pt-2 border-t border-[#0A0A0C]/10">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="poster-scale" className="font-medium text-[#0A0A0C]">
                      Skala Proporsi Huruf
                    </label>
                    <span className="font-mono-num font-semibold text-[#1D4ED8]">
                      {fontSizeScale}%
                    </span>
                  </div>
                  <input
                    id="poster-scale"
                    type="range"
                    min={75}
                    max={120}
                    value={fontSizeScale}
                    onChange={(e) => setFontSizeScale(Number(e.target.value))}
                    className="w-full accent-[#1D4ED8] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="poster-tracking" className="font-medium text-[#0A0A0C]">
                      Letter Spacing (Tracking)
                    </label>
                    <span className="font-mono-num font-semibold text-[#1D4ED8]">
                      {trackingPx}px
                    </span>
                  </div>
                  <input
                    id="poster-tracking"
                    type="range"
                    min={-6}
                    max={8}
                    value={trackingPx}
                    onChange={(e) => setTrackingPx(Number(e.target.value))}
                    className="w-full accent-[#1D4ED8] cursor-pointer"
                  />
                </div>
              </div>

              {/* Grid Columns & Accent Color Swatches */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#0A0A0C]/10">
                <div>
                  <span className="block text-xs font-medium text-[#0A0A0C] mb-2">
                    Subdivisi Grid Swiss
                  </span>
                  <div className="flex items-center gap-1.5">
                    {([4, 8, 12] as const).map((cols) => (
                      <button
                        key={cols}
                        type="button"
                        onClick={() => {
                          soundEngine.playTick();
                          setGridCols(cols);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono-num font-semibold transition-colors cursor-pointer ${
                          gridCols === cols
                            ? 'bg-[#0A0A0C] text-white'
                            : 'bg-white/80 text-[#52525B] hover:text-[#0A0A0C]'
                        }`}
                      >
                        {cols} Col
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#0A0A0C] mb-2">
                    Aksen Tinta Cetak
                  </span>
                  <div className="flex items-center gap-2">
                    {[
                      { hex: '#1D4ED8', name: 'Electric Cobalt' },
                      { hex: '#0A0A0C', name: 'Obsidian Ink' },
                      { hex: '#B91C1C', name: 'Swiss Vermilion' },
                      { hex: '#047857', name: 'Alpine Emerald' },
                    ].map((sw) => (
                      <button
                        key={sw.hex}
                        type="button"
                        onClick={() => {
                          soundEngine.playTick();
                          setAccentHex(sw.hex);
                        }}
                        aria-label={sw.name}
                        style={{ backgroundColor: sw.hex }}
                        className={`w-7 h-7 rounded-full cursor-pointer transition-transform ${
                          accentHex === sw.hex
                            ? 'scale-110 ring-2 ring-offset-2 ring-[#0A0A0C]'
                            : 'opacity-75 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-4 border-t border-[#0A0A0C]/10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTick();
                  setIsAnimating((v) => !v);
                }}
                className="px-4 py-2.5 rounded-xl frosted-crystal-subtle hover:bg-white text-xs font-semibold text-[#0A0A0C] flex items-center gap-2 transition-colors cursor-pointer"
              >
                {isAnimating ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>Jeda Osilasi</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>Putar Osilasi</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadSvgPoster}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#0A0A0C] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Poster Vektor (.SVG)</span>
              </button>
            </div>
          </div>

          {/* Right 7 Cols: Live Interactive Swiss Kinetic Poster Canvas */}
          <div className="lg:col-span-7 rounded-2xl border border-[#0A0A0C]/15 bg-[#F4F2ED] relative overflow-hidden p-6 md:p-10 flex flex-col justify-between min-h-[460px] select-none">
            {/* Dynamic Swiss Column Grid Overlay */}
            <div
              style={{
                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
              }}
              className="absolute inset-0 grid px-6 md:px-10 pointer-events-none"
            >
              {[...Array(gridCols)].map((_, i) => (
                <div
                  key={i}
                  className="border-x border-[#0A0A0C]/[0.05] h-full"
                />
              ))}
            </div>

            {/* Top Poster Spec Bar */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[#0A0A0C]/15 text-xs font-mono-num">
              <span className="text-[#52525B] truncate">{kicker}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[#0A0A0C] font-semibold">
                  DIN A0 · {gridCols}-COL
                </span>
                <span
                  style={{ backgroundColor: accentHex }}
                  className="w-3.5 h-3.5 rounded-full inline-block"
                />
              </div>
            </div>

            {/* Center Kinetic Typography Composition */}
            <div className="relative z-10 my-auto py-8 space-y-2 overflow-hidden">
              <motion.div
                animate={
                  isAnimating
                    ? { x: [0, 14, -8, 0] }
                    : { x: 0 }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  letterSpacing: `${trackingPx}px`,
                  fontSize: `clamp(2.4rem, ${4.8 * (fontSizeScale / 100)}vw, 4.75rem)`,
                }}
                className="font-display font-extrabold text-[#0A0A0C] leading-[0.98] tracking-tight"
              >
                {line1 || 'LA FORME'}
              </motion.div>

              <motion.div
                animate={
                  isAnimating
                    ? { x: [0, -18, 12, 0] }
                    : { x: 0 }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  color: accentHex,
                  letterSpacing: `${trackingPx}px`,
                  fontSize: `clamp(2.5rem, ${5.1 * (fontSizeScale / 100)}vw, 5rem)`,
                }}
                className="font-editorial italic font-normal leading-[0.98] pl-4 md:pl-12"
              >
                {line2 || 'SUIT LE'}
              </motion.div>

              <motion.div
                animate={
                  isAnimating
                    ? { x: [0, 10, -14, 0] }
                    : { x: 0 }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  letterSpacing: `${trackingPx}px`,
                  fontSize: `clamp(2.4rem, ${4.8 * (fontSizeScale / 100)}vw, 4.75rem)`,
                }}
                className="font-display font-extrabold text-[#0A0A0C] leading-[0.98] text-right pr-2"
              >
                {line3 || 'MOUVEMENT'}
              </motion.div>
            </div>

            {/* Bottom Poster Colophon */}
            <div className="relative z-10 pt-4 border-t border-[#0A0A0C]/15 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono-num text-[#52525B]">
              <span>ATELIER KINETIK // SPECIMEN ARCHIVE 2026</span>
              <span>
                SCALE {fontSizeScale}% · TRACKING {trackingPx}PX · VECTOR READY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
