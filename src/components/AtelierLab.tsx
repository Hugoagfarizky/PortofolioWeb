import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  Play,
  Copy,
  Check,
  RotateCcw,
  Layers,
  Activity,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const AtelierLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'motion'>('tokens');

  // Tab 1: Glassmorphism & Design Token Inspector state
  const [blurPx, setBlurPx] = useState<number>(22);
  const [surfaceAlpha, setSurfaceAlpha] = useState<number>(74);
  const [radiusPx, setRadiusPx] = useState<number>(18);
  const [saturationPct, setSaturationPct] = useState<number>(180);
  const [copiedCss, setCopiedCss] = useState<boolean>(false);

  // Tab 2: Motion Choreography & Spring Physics state
  const [stiffness, setStiffness] = useState<number>(160);
  const [damping, setDamping] = useState<number>(22);
  const [mass, setMass] = useState<number>(1.0);
  const [motionStep, setMotionStep] = useState<'left' | 'right'>('right');
  const [presetName, setPresetName] = useState<string>('Micro-Feedback 160ms');

  const generatedCss = `.frosted-specimen {
  background: rgba(255, 255, 255, ${(surfaceAlpha / 100).toFixed(2)});
  backdrop-filter: blur(${blurPx}px) saturate(${saturationPct}%);
  border-radius: ${radiusPx}px;
  border: 1px solid rgba(255, 255, 255, 0.88);
  box-shadow: 0 12px 36px -8px rgba(10, 10, 12, 0.06);
}`;

  const handleCopyCss = () => {
    navigator.clipboard?.writeText(generatedCss);
    soundEngine.playChime();
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 1800);
  };

  const applyMotionPreset = (
    name: string,
    s: number,
    d: number,
    m: number
  ) => {
    soundEngine.playTick(1.1);
    setPresetName(name);
    setStiffness(s);
    setDamping(d);
    setMass(m);
    setMotionStep((prev) => (prev === 'left' ? 'right' : 'left'));
  };

  // Compute an approximate damped oscillation path for the SVG graph
  const springCurvePath = React.useMemo(() => {
    const points: string[] = [];
    const omega = Math.sqrt(stiffness / mass) * 0.09;
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));
    for (let i = 0; i <= 60; i++) {
      const t = i / 10;
      const x = (i / 60) * 360;
      let yVal = 1;
      if (zeta < 1) {
        const omegaD = omega * Math.sqrt(1 - zeta * zeta);
        yVal =
          1 -
          Math.exp(-zeta * omega * t) *
            (Math.cos(omegaD * t) +
              (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * t));
      } else {
        yVal = 1 - (1 + omega * t) * Math.exp(-omega * t);
      }
      const y = 95 - yVal * 65;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  }, [stiffness, damping, mass]);

  return (
    <section
      id="laboratorium"
      className="py-20 md:py-28 border-t border-[#0A0A0C]/10"
      aria-labelledby="lab-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#52525B] mb-3">
              <span className="font-mono-num text-[#0A0A0C] font-semibold">
                03. Atelier Design & Motion Lab
              </span>
              <span aria-hidden="true">·</span>
              <span>Eksperimen Sistem & Fisika Interaktif</span>
            </div>
            <h2
              id="lab-heading"
              className="font-display text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0A0A0C] leading-[1.12] [text-wrap:balance]"
            >
              Uji Langsung Sistem Token{' '}
              <span className="font-editorial italic font-normal text-[#1D4ED8]">
                Frosted-Crystal
              </span>{' '}
              & Koreografi Pegas
            </h2>
          </div>

          {/* Lab Mode Switcher */}
          <div
            role="tablist"
            aria-label="Pilih instrumen laboratorium desain"
            className="frosted-crystal p-1.5 rounded-xl flex items-center gap-1.5 self-start lg:self-end"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'tokens'}
              type="button"
              onClick={() => {
                soundEngine.playTick();
                setActiveTab('tokens');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'tokens'
                  ? 'bg-[#0A0A0C] text-white shadow-sm'
                  : 'text-[#52525B] hover:text-[#0A0A0C]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Glassmorphism & Token Lab</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'motion'}
              type="button"
              onClick={() => {
                soundEngine.playTick();
                setActiveTab('motion');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'motion'
                  ? 'bg-[#0A0A0C] text-white shadow-sm'
                  : 'text-[#52525B] hover:text-[#0A0A0C]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Motion & Easing Sandbox</span>
            </button>
          </div>
        </div>

        {activeTab === 'tokens' ? (
          /* TAB 1: GLASSMORPHISM & DESIGN SYSTEM TOKEN LAB */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Cols: Parameter Sliders & CSS Output */}
            <div className="lg:col-span-5 frosted-crystal rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-[#0A0A0C]">
                    Kalibrasi Material Optik
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playTick(0.9);
                      setBlurPx(22);
                      setSurfaceAlpha(74);
                      setRadiusPx(18);
                      setSaturationPct(180);
                    }}
                    className="text-xs text-[#52525B] hover:text-[#0A0A0C] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Default</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Blur Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <label htmlFor="slider-blur" className="font-medium text-[#0A0A0C]">
                        Optical Backdrop Blur
                      </label>
                      <span className="font-mono-num font-semibold text-[#1D4ED8]">
                        {blurPx}px
                      </span>
                    </div>
                    <input
                      id="slider-blur"
                      type="range"
                      min={4}
                      max={36}
                      value={blurPx}
                      onChange={(e) => setBlurPx(Number(e.target.value))}
                      className="w-full accent-[#1D4ED8] cursor-pointer"
                    />
                  </div>

                  {/* Surface Translucency Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <label htmlFor="slider-alpha" className="font-medium text-[#0A0A0C]">
                        Alabaster Surface Luminance
                      </label>
                      <span className="font-mono-num font-semibold text-[#1D4ED8]">
                        {surfaceAlpha}%
                      </span>
                    </div>
                    <input
                      id="slider-alpha"
                      type="range"
                      min={40}
                      max={95}
                      value={surfaceAlpha}
                      onChange={(e) => setSurfaceAlpha(Number(e.target.value))}
                      className="w-full accent-[#1D4ED8] cursor-pointer"
                    />
                  </div>

                  {/* Corner Radius Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <label htmlFor="slider-radius" className="font-medium text-[#0A0A0C]">
                        Nested Architectural Radius
                      </label>
                      <span className="font-mono-num font-semibold text-[#1D4ED8]">
                        {radiusPx}px
                      </span>
                    </div>
                    <input
                      id="slider-radius"
                      type="range"
                      min={6}
                      max={32}
                      value={radiusPx}
                      onChange={(e) => setRadiusPx(Number(e.target.value))}
                      className="w-full accent-[#1D4ED8] cursor-pointer"
                    />
                  </div>

                  {/* Refractive Saturation Slider */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <label htmlFor="slider-sat" className="font-medium text-[#0A0A0C]">
                        Refractive Color Saturation
                      </label>
                      <span className="font-mono-num font-semibold text-[#1D4ED8]">
                        {saturationPct}%
                      </span>
                    </div>
                    <input
                      id="slider-sat"
                      type="range"
                      min={100}
                      max={220}
                      step={10}
                      value={saturationPct}
                      onChange={(e) => setSaturationPct(Number(e.target.value))}
                      className="w-full accent-[#1D4ED8] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Generated CSS Code Box */}
              <div className="pt-4 border-t border-[#0A0A0C]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-num text-[11px] font-semibold text-[#52525B]">
                    TOKEN OUTPUT (CSS SPECIFICATION)
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCss}
                    className="px-3 py-1 rounded-lg bg-[#0A0A0C] hover:bg-[#1D4ED8] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedCss ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin CSS</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#0A0A0C] text-[#F8F7F4] font-mono-num text-[11px] overflow-x-auto leading-relaxed">
                  {generatedCss}
                </pre>
              </div>
            </div>

            {/* Right 7 Cols: Live Optical Refraction Stage & Typography Scale Specimen */}
            <div className="lg:col-span-7 rounded-2xl border border-[#0A0A0C]/12 bg-[#EAE7DF] architectural-grid-bg p-6 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[440px]">
              {/* Underlying Geometric Shapes to Demonstrate Refraction */}
              <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#1D4ED8]/35 to-[#60A5FA]/20 pointer-events-none" />
              <div className="absolute bottom-8 left-10 w-48 h-48 rounded-full bg-gradient-to-tr from-[#0A0A0C]/20 to-transparent pointer-events-none" />
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 font-display text-7xl font-extrabold text-[#0A0A0C]/10 select-none pointer-events-none">
                OPTIK 2026
              </div>

              {/* Live Specimen Glass Card */}
              <div
                style={{
                  backgroundColor: `rgba(255, 255, 255, ${surfaceAlpha / 100})`,
                  backdropFilter: `blur(${blurPx}px) saturate(${saturationPct}%)`,
                  WebkitBackdropFilter: `blur(${blurPx}px) saturate(${saturationPct}%)`,
                  borderRadius: `${radiusPx}px`,
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 20px 48px -12px rgba(10, 10, 12, 0.08)',
                }}
                className="relative z-10 p-6 md:p-8 transition-all duration-150"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#0A0A0C]/10 text-xs text-[#52525B]">
                  <span className="font-mono-num font-bold text-[#0A0A0C]">
                    LIVE SPECIMEN // FROSTED-CRYSTAL
                  </span>
                  <span className="font-mono-num text-[#1D4ED8] font-medium">
                    BLUR {blurPx}PX · ALPHA {surfaceAlpha}% · R{radiusPx}
                  </span>
                </div>

                {/* Typography Hierarchy Preview inside Live Card */}
                <div className="mt-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="font-mono-num text-[11px] text-[#52525B] w-32 shrink-0">
                      DISPLAY H1
                    </span>
                    <p className="font-display text-2xl md:text-3xl font-bold text-[#0A0A0C] tracking-tight flex-1">
                      Arsitektur Visual & Gerak Presisi
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="font-mono-num text-[11px] text-[#52525B] w-32 shrink-0">
                      EDITORIAL SERIF
                    </span>
                    <p className="font-editorial italic text-xl md:text-2xl text-[#1D4ED8] flex-1">
                      Monograf Kuratorial & Estetika Taktil
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="font-mono-num text-[11px] text-[#52525B] w-32 shrink-0">
                      BODY PROSE
                    </span>
                    <p className="text-sm text-[#52525B] leading-relaxed flex-1">
                      Setiap komponen memiliki rasio ruang dalam dan radius sudut
                      bersarang ($r_&#123;\text&#123;inner&#125;&#125; = r_&#123;\text&#123;outer&#125;&#125; - \text&#123;padding&#125;$) agar tetap
                      harmonis pada layar 1440px.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2 border-t border-[#0A0A0C]/8">
                    <span className="font-mono-num text-[11px] text-[#52525B] w-32 shrink-0">
                      TABULAR NUMS
                    </span>
                    <p className="font-mono-num text-sm font-semibold text-[#0A0A0C] flex-1">
                      $148,250.30 · +164.8% · 60.0 FPS · 1440×900
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Token Footnote */}
              <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#52525B]">
                <span>
                  Kontras Teks terhadap Permukaan Kaca:{' '}
                  <strong className="text-[#0A0A0C] font-mono-num">
                    14.8 : 1 (WCAG AAA)
                  </strong>
                </span>
                <span className="font-mono-num">
                  60% Alabaster · 30% Frosted Glass · 10% Cobalt
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: MOTION CHOREOGRAPHY & SPRING PHYSICS SANDBOX */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Cols: Spring Controls & Presets */}
            <div className="lg:col-span-5 frosted-crystal rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-[#0A0A0C] mb-1">
                  Parameter Fisika Pegas (Spring)
                </h3>
                <p className="text-xs text-[#52525B] mb-5">
                  Pilih preset kurva studio atau sesuaikan kekakuan dan redaman pegas secara manual.
                </p>

                {/* Preset Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    { name: 'Micro-Feedback 160ms', s: 240, d: 26, m: 0.8 },
                    { name: 'Silk Editorial', s: 120, d: 20, m: 1.1 },
                    { name: 'Kinetic Elastic', s: 190, d: 12, m: 1.0 },
                    { name: 'Architectural Heavy', s: 95, d: 24, m: 1.6 },
                  ].map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => applyMotionPreset(p.name, p.s, p.d, p.m)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-colors cursor-pointer ${
                        presetName === p.name
                          ? 'bg-[#0A0A0C] text-white border-[#0A0A0C]'
                          : 'bg-white/75 text-[#0A0A0C] border-[#0A0A0C]/10 hover:border-[#0A0A0C]/30'
                      }`}
                    >
                      <span className="block font-semibold truncate">{p.name}</span>
                      <span
                        className={`block font-mono-num text-[10px] mt-0.5 ${
                          presetName === p.name ? 'text-[#60A5FA]' : 'text-[#52525B]'
                        }`}
                      >
                        S:{p.s} · D:{p.d} · M:{p.m}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="spring-stiffness" className="font-medium text-[#0A0A0C]">
                        Stiffness (Kekakuan Pegas)
                      </label>
                      <span className="font-mono-num font-semibold text-[#1D4ED8]">
                        {stiffness}
                      </span>
                    </div>
                    <input
                      id="spring-stiffness"
                      type="range"
                      min={60}
                      max={320}
                      value={stiffness}
                      onChange={(e) => {
                        setStiffness(Number(e.target.value));
                        setPresetName('Kustom');
                      }}
                      className="w-full accent-[#1D4ED8] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="spring-damping" className="font-medium text-[#0A0A0C]">
                        Damping (Redaman Osilasi)
                      </label>
                      <span className="font-mono-num font-semibold text-[#1D4ED8]">
                        {damping}
                      </span>
                    </div>
                    <input
                      id="spring-damping"
                      type="range"
                      min={8}
                      max={42}
                      value={damping}
                      onChange={(e) => {
                        setDamping(Number(e.target.value));
                        setPresetName('Kustom');
                      }}
                      className="w-full accent-[#1D4ED8] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor="spring-mass" className="font-medium text-[#0A0A0C]">
                        Mass (Bobot Elemen)
                      </label>
                      <span className="font-mono-num font-semibold text-[#1D4ED8]">
                        {mass.toFixed(1)}x
                      </span>
                    </div>
                    <input
                      id="spring-mass"
                      type="range"
                      min={0.5}
                      max={2.2}
                      step={0.1}
                      value={mass}
                      onChange={(e) => {
                        setMass(Number(e.target.value));
                        setPresetName('Kustom');
                      }}
                      className="w-full accent-[#1D4ED8] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playTick(1.2);
                  setMotionStep((prev) => (prev === 'left' ? 'right' : 'left'));
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#0A0A0C] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Picu Koreografi Transisi</span>
              </button>
            </div>

            {/* Right 7 Cols: Live Motion Comparison Stage & Oscillation Telemetry */}
            <div className="lg:col-span-7 frosted-crystal rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#0A0A0C]/10">
                  <span className="font-mono-num text-xs font-bold text-[#0A0A0C]">
                    SIMULASI KOMPOSITING // TRANSFORM ONLY (60 FPS)
                  </span>
                  <span className="font-mono-num text-xs text-[#1D4ED8] font-semibold">
                    Preset: {presetName}
                  </span>
                </div>

                {/* Track 1: Custom Spring Physics */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-[#52525B] mb-2">
                    <span className="font-semibold text-[#0A0A0C]">
                      A. Atelier Spring Physics (stiffness: {stiffness}, damping: {damping})
                    </span>
                    <span className="font-mono-num">Respons Alami</span>
                  </div>
                  <div className="h-16 rounded-xl bg-[#EFECE6] border border-[#0A0A0C]/10 p-2 flex items-center relative overflow-hidden">
                    <motion.div
                      animate={{
                        x: motionStep === 'right' ? 'calc(100% + 140px)' : '0%',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness,
                        damping,
                        mass,
                      }}
                      className="w-36 h-12 rounded-lg bg-[#0A0A0C] text-white flex items-center justify-between px-3.5 shadow-md"
                    >
                      <span className="font-display text-xs font-bold">Spring Card</span>
                      <Layers className="w-3.5 h-3.5 text-[#60A5FA]" />
                    </motion.div>
                  </div>
                </div>

                {/* Track 2: Standard Linear / Mechanical Tween for Comparison */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-[#52525B] mb-2">
                    <span>B. Transisi Linear Konvensional (350ms linear)</span>
                    <span className="font-mono-num">Pembanding Statis</span>
                  </div>
                  <div className="h-16 rounded-xl bg-[#EFECE6]/70 border border-[#0A0A0C]/10 p-2 flex items-center relative overflow-hidden">
                    <motion.div
                      animate={{
                        x: motionStep === 'right' ? 'calc(100% + 140px)' : '0%',
                      }}
                      transition={{
                        duration: 0.35,
                        ease: 'linear',
                      }}
                      className="w-36 h-12 rounded-lg frosted-crystal border border-[#0A0A0C]/20 text-[#0A0A0C] flex items-center justify-between px-3.5"
                    >
                      <span className="font-display text-xs font-semibold">Linear Card</span>
                      <span className="font-mono-num text-[10px] text-[#52525B]">0.35s</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Live SVG Damped Oscillation Curve */}
              <div className="p-4 rounded-xl bg-white/80 border border-[#0A0A0C]/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#0A0A0C]">
                    Grafik Kurva Kecepatan & Settling Time
                  </span>
                  <span className="font-mono-num text-[11px] text-[#52525B]">
                    Rasio Redaman:{' '}
                    {(damping / (2 * Math.sqrt(stiffness * mass))).toFixed(2)}
                  </span>
                </div>
                <svg viewBox="0 0 360 110" className="w-full h-24 overflow-visible">
                  <line
                    x1="0"
                    y1="30"
                    x2="360"
                    y2="30"
                    stroke="rgba(10,10,12,0.15)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="0"
                    y1="95"
                    x2="360"
                    y2="95"
                    stroke="rgba(10,10,12,0.1)"
                  />
                  <polyline
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="2.2"
                    points={springCurvePath}
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
