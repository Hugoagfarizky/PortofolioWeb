import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal, CheckCircle2 } from 'lucide-react';
import { TRANSFORMATION_STUDIES, TransformationStudy } from '../data/portfolioData';

export const BeforeAfterInspector: React.FC = () => {
  const [selectedStudyId, setSelectedStudyId] = useState<string>(TRANSFORMATION_STUDIES[0].id);
  const [sliderPercent, setSliderPercent] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeStudy: TransformationStudy =
    TRANSFORMATION_STUDIES.find((s) => s.id === selectedStudyId) || TRANSFORMATION_STUDIES[0];

  const updateSliderFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(4, Math.min(96, Math.round(rawPercent)));
    setSliderPercent(clamped);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <section
      id="proses"
      className="py-20 md:py-28 border-t border-[#0A0A0C]/10"
      aria-labelledby="craft-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#52525B] mb-3">
              <span className="font-mono-num text-[#0A0A0C] font-semibold">02. Anatomi Proses</span>
              <span aria-hidden="true">·</span>
              <span>Transformasi Arsitektur Desain</span>
            </div>
            <h2
              id="craft-heading"
              className="font-display text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0A0A0C] leading-[1.12] [text-wrap:balance]"
            >
              Dari Konstruksi Grid Mentah Menuju Eksekusi <span className="font-editorial italic font-normal">Frosted-Crystal</span>
            </h2>
          </div>

          {/* Study Selector Tabs */}
          <div
            role="tablist"
            aria-label="Pilih studi transformasi desain"
            className="frosted-crystal p-1.5 rounded-xl flex flex-wrap items-center gap-1 self-start lg:self-end"
          >
            {TRANSFORMATION_STUDIES.map((study) => {
              const isSelected = study.id === activeStudy.id;
              return (
                <button
                  key={study.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    setSelectedStudyId(study.id);
                    setSliderPercent(52);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A0A0C] text-white shadow-sm'
                      : 'text-[#52525B] hover:text-[#0A0A0C]'
                  }`}
                >
                  <span className="font-mono-num mr-1.5 opacity-70">{study.index}.</span>
                  {study.discipline}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Before/After Viewport (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              role="slider"
              aria-label="Penggeser perbandingan sebelum dan sesudah desain"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={sliderPercent}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setSliderPercent((p) => Math.max(4, p - 5));
                if (e.key === 'ArrowRight') setSliderPercent((p) => Math.min(96, p + 5));
              }}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#0A0A0C]/12 bg-[#ECEAE4] select-none cursor-ew-resize shadow-sm focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
            >
              {/* LAYER 1 (Full Width Underneath): AFTER — Final Polished Execution */}
              <div className="absolute inset-0 w-full h-full">
                {!imgError[activeStudy.id] ? (
                  <img
                    src={activeStudy.afterImage}
                    alt={activeStudy.afterLabel}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setImgError((prev) => ({ ...prev, [activeStudy.id]: true }))
                    }
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#EAE6DF] to-[#D6D1C7] flex items-center justify-center p-8 text-center">
                    <p className="font-display text-lg font-bold text-[#0A0A0C]">
                      {activeStudy.title}
                    </p>
                  </div>
                )}

                {/* After Label Overlay (Bottom Right) */}
                <div className="absolute bottom-4 right-4 z-10 frosted-crystal px-3 py-1.5 rounded-lg text-xs font-medium text-[#0A0A0C] pointer-events-none">
                  {activeStudy.afterLabel}
                </div>
              </div>

              {/* LAYER 2 (Clipped by sliderPercent): BEFORE — Architectural Wireframe Blueprint */}
              <div
                style={{ clipPath: `inset(0 ${100 - sliderPercent}% 0 0)` }}
                className="absolute inset-0 w-full h-full bg-[#F5F3EE] architectural-grid-bg flex flex-col justify-between p-6 md:p-8 pointer-events-none"
              >
                {/* Top Wireframe Blueprint Metadata Header */}
                <div className="flex items-center justify-between border-b border-[#0A0A0C]/15 pb-3">
                  <div className="flex items-center gap-3 text-[11px] font-mono-num text-[#0A0A0C]">
                    <span className="font-semibold">WIREFRAME SPEC // {activeStudy.index}</span>
                    <span>·</span>
                    <span>GRID: 12-COL SWISS</span>
                  </div>
                  <span className="font-mono-num text-[11px] text-[#1D4ED8] font-medium">
                    SCALE 1:1 · BASELINE 8PX
                  </span>
                </div>

                {/* Center Custom Architectural Wireframe Diagram matching the selected study */}
                <div className="my-auto py-4">
                  {activeStudy.wireframeMode === 'fintech-ui' && (
                    <div className="w-full max-w-xl mx-auto border border-[#0A0A0C]/25 rounded-xl p-4 bg-white/60">
                      <div className="flex items-center justify-between border-b border-dashed border-[#0A0A0C]/20 pb-2.5 mb-3">
                        <span className="font-mono-num text-[11px] text-[#0A0A0C] font-semibold">
                          NOVA | WEALTH OS — STRUCTURAL WIREFRAME
                        </span>
                        <span className="font-mono-num text-[10px] text-[#52525B]">
                          VIEWPORT 1440x900
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-3 border border-dashed border-[#0A0A0C]/25 rounded-lg p-2.5 flex flex-col justify-between h-40">
                          <span className="font-mono-num text-[10px] text-[#52525B]">NAV_RAIL</span>
                          <div className="space-y-1.5">
                            <div className="h-2.5 w-full bg-[#0A0A0C]/15 rounded" />
                            <div className="h-2.5 w-4/5 bg-[#0A0A0C]/10 rounded" />
                            <div className="h-2.5 w-3/5 bg-[#0A0A0C]/10 rounded" />
                          </div>
                          <span className="font-mono-num text-[9px] text-[#1D4ED8]">w: 220px</span>
                        </div>
                        <div className="col-span-6 border border-[#1D4ED8]/50 bg-[#1D4ED8]/[0.04] rounded-lg p-3 flex flex-col justify-between h-40">
                          <div>
                            <span className="font-mono-num text-[10px] text-[#1D4ED8] font-semibold">
                              PRIMARY_ANCHOR: ASSET_CURVE
                            </span>
                            <p className="font-mono-num text-base font-bold text-[#0A0A0C] mt-1">
                              $148,250.30
                            </p>
                          </div>
                          <svg viewBox="0 0 200 50" className="w-full h-14 overflow-visible">
                            <polyline
                              fill="none"
                              stroke="#1D4ED8"
                              strokeWidth="1.75"
                              strokeDasharray="3 3"
                              points="0,42 35,34 65,38 95,22 130,26 165,10 200,4"
                            />
                            <circle cx="165" cy="10" r="3" fill="#1D4ED8" />
                            <circle cx="200" cy="4" r="3.5" fill="#0A0A0C" />
                          </svg>
                        </div>
                        <div className="col-span-3 border border-dashed border-[#0A0A0C]/25 rounded-lg p-2.5 flex flex-col justify-between h-40">
                          <span className="font-mono-num text-[10px] text-[#52525B]">QUICK_ACT</span>
                          <div className="grid grid-cols-1 gap-1.5">
                            <div className="h-7 border border-[#0A0A0C]/20 rounded flex items-center justify-center font-mono-num text-[9px]">
                              BTN_PAY
                            </div>
                            <div className="h-7 border border-[#0A0A0C]/20 rounded flex items-center justify-center font-mono-num text-[9px]">
                              BTN_TRANSFER
                            </div>
                          </div>
                          <span className="font-mono-num text-[9px] text-[#52525B]">TABULAR_NUMS</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStudy.wireframeMode === 'brand-monograph' && (
                    <div className="w-full max-w-xl mx-auto border border-[#0A0A0C]/25 rounded-xl p-5 bg-white/60 flex items-center justify-around gap-6">
                      {/* Bottle Structural Schematic */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-7 border border-[#0A0A0C]/40 bg-[#0A0A0C]/10" />
                        <div className="w-24 h-32 border-2 border-[#0A0A0C]/50 flex flex-col items-center justify-center p-2 relative">
                          <span className="font-display text-xs font-bold tracking-widest text-[#0A0A0C]">
                            AETHEL
                          </span>
                          <span className="font-mono-num text-[9px] text-[#1D4ED8] mt-1">
                            R: 50ML · IOR 1.52
                          </span>
                        </div>
                      </div>
                      {/* Emboss Packaging Die-Line */}
                      <div className="w-36 h-44 border-2 border-dashed border-[#1D4ED8]/60 bg-[#1D4ED8]/[0.03] p-3 flex flex-col justify-between">
                        <div className="grid grid-cols-3 gap-1 border border-[#0A0A0C]/20 p-1.5">
                          <div className="h-4 border border-[#0A0A0C]/30" />
                          <div className="h-4 border border-[#0A0A0C]/30 rounded-full" />
                          <div className="h-4 border border-[#0A0A0C]/30" />
                        </div>
                        <div className="text-center">
                          <p className="font-display text-sm font-bold tracking-wider text-[#0A0A0C]">
                            AETHEL
                          </p>
                          <p className="font-mono-num text-[9px] text-[#52525B]">
                            DEBOSS DEPTH: 0.6MM
                          </p>
                        </div>
                        <div className="font-mono-num text-[9px] text-[#1D4ED8] text-center">
                          COTTON 450GSM · RATIO 1:1.618
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStudy.wireframeMode === 'optical-3d' && (
                    <div className="w-full max-w-xl mx-auto border border-[#0A0A0C]/25 rounded-xl p-5 bg-white/60 flex items-center justify-center">
                      <svg viewBox="0 0 420 170" className="w-full h-40">
                        <line
                          x1="20"
                          y1="145"
                          x2="400"
                          y2="25"
                          stroke="#1D4ED8"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <ellipse
                          cx="120"
                          cy="110"
                          rx="36"
                          ry="52"
                          fill="none"
                          stroke="#0A0A0C"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                        />
                        <ellipse
                          cx="210"
                          cy="85"
                          rx="48"
                          ry="68"
                          fill="rgba(29, 78, 216, 0.06)"
                          stroke="#1D4ED8"
                          strokeWidth="1.5"
                        />
                        <ellipse
                          cx="300"
                          cy="60"
                          rx="36"
                          ry="52"
                          fill="none"
                          stroke="#0A0A0C"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                        />
                        <text x="24" y="30" fill="#0A0A0C" className="font-mono-num text-[10px]">
                          AXIS: ISOMETRIC 35.264°
                        </text>
                        <text x="260" y="155" fill="#1D4ED8" className="font-mono-num text-[10px]">
                          CAUSTIC PHOTON PATH // 60FPS
                        </text>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Bottom Wireframe Label */}
                <div className="flex items-center justify-between">
                  <div className="frosted-crystal px-3 py-1.5 rounded-lg text-xs font-medium text-[#0A0A0C]">
                    {activeStudy.beforeLabel}
                  </div>
                </div>
              </div>

              {/* Vertical Divider Line & Tactile Frosted Handle */}
              <div
                style={{ left: `${sliderPercent}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-[#0A0A0C] z-20 pointer-events-none"
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full frosted-crystal border-2 border-[#0A0A0C] flex items-center justify-center shadow-lg">
                  <MoveHorizontal className="w-4 h-4 text-[#0A0A0C]" />
                </div>
              </div>
            </div>

            {/* Quick Preset Controls Bar below Slider */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#52525B]">
                <span>Posisi Inspeksi:</span>
                <span className="font-mono-num font-semibold text-[#0A0A0C]">
                  {sliderPercent}% Konstruksi Awal / {100 - sliderPercent}% Hasil Akhir
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSliderPercent(92)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    sliderPercent >= 85
                      ? 'bg-[#0A0A0C] text-white'
                      : 'frosted-crystal-subtle text-[#52525B] hover:text-[#0A0A0C]'
                  }`}
                >
                  Konsep Wireframe
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPercent(50)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    sliderPercent > 20 && sliderPercent < 85
                      ? 'bg-[#0A0A0C] text-white'
                      : 'frosted-crystal-subtle text-[#52525B] hover:text-[#0A0A0C]'
                  }`}
                >
                  50/50 Split
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPercent(8)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    sliderPercent <= 20
                      ? 'bg-[#0A0A0C] text-white'
                      : 'frosted-crystal-subtle text-[#52525B] hover:text-[#0A0A0C]'
                  }`}
                >
                  Eksekusi Final
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering & Craft Breakdown (4 cols) */}
          <motion.div
            key={activeStudy.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 frosted-crystal rounded-2xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-[#52525B]">
                <span className="font-mono-num text-[#1D4ED8] font-semibold">
                  STUDI {activeStudy.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeStudy.client}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">{activeStudy.year}</span>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-[#0A0A0C] mt-3 leading-snug">
                {activeStudy.title}
              </h3>

              <p className="text-sm text-[#52525B] mt-3 leading-relaxed">
                {activeStudy.summary}
              </p>

              <div className="mt-6 pt-6 border-t border-[#0A0A0C]/10">
                <p className="text-xs font-semibold text-[#0A0A0C] mb-3.5">
                  Keputusan Arsitektur & Detail Eksekusi:
                </p>
                <ul className="space-y-3">
                  {activeStudy.technicalNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#52525B] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#0A0A0C]/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#52525B] block">Dampak Terukur</span>
                <span className="font-mono-num text-sm font-bold text-[#0A0A0C]">
                  {activeStudy.metricBadge}
                </span>
              </div>
              <span className="font-mono-num text-xs text-[#1D4ED8] font-medium">
                Geser tuas ← →
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
