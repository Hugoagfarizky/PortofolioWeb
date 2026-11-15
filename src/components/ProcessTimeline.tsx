import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Layers, Compass, Sparkles, Code2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface MethodologyPhase {
  id: string;
  number: string;
  title: string;
  duration: string;
  summary: string;
  keyArtifact: string;
  engineeringStandards: string[];
  deliverables: string[];
}

const METHODOLOGY_PHASES: MethodologyPhase[] = [
  {
    id: 'phase-01',
    number: '01',
    title: 'Audit Spasial & Arsitektur Informasi',
    duration: 'Minggu 1—2',
    summary:
      'Memetakan friksi kognitif produk saat ini, menyederhanakan pohon navigasi, dan menetapkan satu jangkar fokus utama untuk setiap layar.',
    keyArtifact: 'Spatial Wireframe Blueprint & Cognitive Load Audit',
    engineeringStandards: [
      'Pemangkasan cabang navigasi berlebih menjadi kontrak 3-zona yang bersih.',
      'Pemetaan hierarki pembacaan F-Pattern dan Z-Pattern pada layar 1440px.',
      'Validasi kontras awal WCAG AA/AAA sebelum eksplorasi dekoratif.',
    ],
    deliverables: [
      'Dokumen Arsitektur Alur Pengguna',
      'Peta Kepadatan Informasi',
      'Cetak Biru Wireframe Modular',
    ],
  },
  {
    id: 'phase-02',
    number: '02',
    title: 'Sistem Tipografi & Material Frosted-Crystal',
    duration: 'Minggu 3—5',
    summary:
      'Merancang pasangan tipografi berkarakter bold, menetapkan aturan tabular numerals untuk data, dan mengkalibrasi translusensi kaca optik.',
    keyArtifact: 'Figma Design Token Library & Optical Surface Matrix',
    engineeringStandards: [
      'Matematika radius bersarang (r_inner = r_outer - padding) di seluruh kartu.',
      'Disiplin distribusi warna 60% Kanvas Netral · 30% Permukaan · 10% Aksen.',
      'Zero-pill metadata: penulisan kategori & tanggal menggunakan separator tipografi.',
    ],
    deliverables: [
      'Pustaka Komponen UI Terdokumentasi',
      'Spesimen Tipografi & Grid Swiss',
      'Token Warna & Permukaan Optik CSS',
    ],
  },
  {
    id: 'phase-03',
    number: '03',
    title: 'Koreografi Motion & Prototipe Kinetik 60fps',
    duration: 'Minggu 6—8',
    summary:
      'Membangun transisi berbasis fisika pegas dan interaksi scroll yang hanya memanipulasi properti compositor (transform & opacity).',
    keyArtifact: 'Interactive 60fps Motion Prototype & Easing Spec',
    engineeringStandards: [
      'Anggaran latensi umpan balik mikro di bawah 200ms (cubic-bezier(0.16, 1, 0.3, 1)).',
      'Dukungan penuh terhadap prefers-reduced-motion untuk aksesibilitas.',
      'Sinkronisasi kurva pegas antara prototipe desain dan kode produksi.',
    ],
    deliverables: [
      'Prototipe Interaktif Beresolusi Tinggi',
      'Tabel Parameter Spring Physics',
      'Aset Showreel &Lottie/WebGL',
    ],
  },
  {
    id: 'phase-04',
    number: '04',
    title: 'QA Arsitektural & Handoff Produksi',
    duration: 'Minggu 9—10',
    summary:
      'Pengujian ketahanan tata letak lintas perangkat, audit performa rendering, serta pendampingan implementasi bersama tim rekayasa.',
    keyArtifact: 'Production-Ready Component Spec & QA Sign-Off',
    engineeringStandards: [
      'Zero-broken-image policy dengan kontainer fallback CSS/SVG terukur.',
      'Uji ketahanan teks panjang (truncation & text-wrap: balance).',
      'Verifikasi performa Lighthouse >95 pada desktop dan perangkat seluler.',
    ],
    deliverables: [
      'Repositori Kode / Storybook UI',
      'Dokumentasi Panduan Merek & Sistem',
      'Sesi Pelatihan Tim Internal Klien',
    ],
  },
];

export const ProcessTimeline: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<string>(
    METHODOLOGY_PHASES[0].id
  );

  const activePhase =
    METHODOLOGY_PHASES.find((p) => p.id === activePhaseId) ||
    METHODOLOGY_PHASES[0];

  return (
    <div className="mt-14 pt-12 border-t border-[#0A0A0C]/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-mono-num text-xs font-semibold text-[#1D4ED8] block">
            METODOLOGI EKSEKUSI TERSTRUKTUR
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-[#0A0A0C] mt-1">
            4 Tahapan Kerja dari Audit Menuju Peluncuran
          </h3>
        </div>
        <span className="text-xs text-[#52525B]">
          Klik tahapan di bawah untuk melihat standar kualitas & deliverables
        </span>
      </div>

      {/* 4 Phase Selector Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {METHODOLOGY_PHASES.map((phase) => {
          const isSelected = phase.id === activePhase.id;
          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => {
                soundEngine.playTick();
                setActivePhaseId(phase.id);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0A0A0C] text-white border-[#0A0A0C] shadow-md'
                  : 'frosted-crystal text-[#0A0A0C] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`font-mono-num text-xs font-bold ${
                    isSelected ? 'text-[#60A5FA]' : 'text-[#1D4ED8]'
                  }`}
                >
                  FASE {phase.number}
                </span>
                <span
                  className={`font-mono-num text-[11px] ${
                    isSelected ? 'text-white/75' : 'text-[#52525B]'
                  }`}
                >
                  {phase.duration}
                </span>
              </div>
              <p className="font-display text-sm font-bold leading-snug">
                {phase.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Phase Detailed Breakdown Card */}
      <motion.div
        key={activePhase.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="frosted-crystal rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#52525B]">
            <span className="font-mono-num font-bold text-[#0A0A0C]">
              FASE {activePhase.number}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-num text-[#1D4ED8] font-semibold">
              {activePhase.duration}
            </span>
          </div>

          <h4 className="font-display text-xl md:text-2xl font-bold text-[#0A0A0C]">
            {activePhase.title}
          </h4>

          <p className="text-sm text-[#52525B] leading-relaxed">
            {activePhase.summary}
          </p>

          <div className="p-3.5 rounded-xl bg-white/80 border border-[#0A0A0C]/10">
            <span className="font-mono-num text-[10px] text-[#52525B] block">
              ARTEFAK UTAMA TAHAP INI
            </span>
            <span className="font-mono-num text-xs font-bold text-[#0A0A0C] mt-0.5 block">
              {activePhase.keyArtifact}
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-semibold text-[#0A0A0C] block">
            Standar Rekayasa & Kualitas Desain:
          </span>
          <ul className="space-y-2.5">
            {activePhase.engineeringStandards.map((std, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs text-[#52525B] leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                <span>{std}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <span className="text-xs font-semibold text-[#0A0A0C] block">
            Output & Deliverables Klien:
          </span>
          <div className="space-y-2">
            {activePhase.deliverables.map((deliv) => (
              <div
                key={deliv}
                className="p-2.5 rounded-xl bg-white/80 border border-[#0A0A0C]/8 flex items-center gap-2 text-xs font-medium text-[#0A0A0C]"
              >
                <Layers className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                <span>{deliv}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
