import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Send,
  Calendar,
  Sparkles,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import {
  SERVICE_OPTIONS,
  ProjectCategory,
  ProjectItem,
} from '../data/portfolioData';

interface ScopeEstimatorProps {
  referencedProject: ProjectItem | null;
  onClearReference: () => void;
}

interface SavedInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  selectedServices: Exclude<ProjectCategory, 'Semua'>[];
  complexity: 'focused' | 'comprehensive' | 'flagship';
  timelineMode: 'standard' | 'accelerated';
  estimatedWeeks: number;
  estimatedBudgetIDR: number;
  notes: string;
  referencedProjectTitle?: string;
  submittedAt: string;
}

const STORAGE_KEY = 'atelier_kinetik_inquiries_v1';

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({
  referencedProject,
  onClearReference,
}) => {
  const [selectedServices, setSelectedServices] = useState<
    Exclude<ProjectCategory, 'Semua'>[]
  >(['UI/UX', 'Web Design']);
  const [complexity, setComplexity] = useState<
    'focused' | 'comprehensive' | 'flagship'
  >('comprehensive');
  const [timelineMode, setTimelineMode] = useState<'standard' | 'accelerated'>(
    'standard'
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedInquiry, setSubmittedInquiry] = useState<SavedInquiry | null>(
    null
  );

  // Sync when a user clicks "Jadikan Referensi Kolaborasi" from a Case Study
  useEffect(() => {
    if (referencedProject) {
      const merged = Array.from(
        new Set([
          referencedProject.category,
          ...referencedProject.secondaryCategories.slice(0, 1),
        ])
      );
      setSelectedServices(merged);
      setNotes(
        `Referensi arah visual: ${referencedProject.title} (${referencedProject.client}). Kami ingin mendiskusikan cakupan serupa untuk produk kami.`
      );
    }
  }, [referencedProject]);

  const toggleService = (serviceId: Exclude<ProjectCategory, 'Semua'>) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        if (prev.length === 1) return prev; // Keep at least 1 active
        return prev.filter((id) => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  // Calculate live metrics
  const selectedObjects = SERVICE_OPTIONS.filter((opt) =>
    selectedServices.includes(opt.id)
  );
  const rawWeeks = selectedObjects.reduce((acc, s) => acc + s.baseWeeks, 0);
  const rawBudget = selectedObjects.reduce(
    (acc, s) => acc + s.baseInvestmentIDR,
    0
  );

  const complexityMultiplier =
    complexity === 'focused' ? 0.8 : complexity === 'comprehensive' ? 1.0 : 1.35;
  const timelineMultiplier = timelineMode === 'accelerated' ? 1.2 : 1.0;
  const durationDiscount = timelineMode === 'accelerated' ? 0.78 : 1.0;

  const estimatedWeeks = Math.max(
    2,
    Math.round(rawWeeks * complexityMultiplier * durationDiscount)
  );
  const estimatedBudgetIDR = Math.round(
    rawBudget * complexityMultiplier * timelineMultiplier
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setErrorMessage(
        'Mohon lengkapi nama dan alamat email kerja yang valid sebelum mengirim brief.'
      );
      return;
    }
    setErrorMessage(null);

    const inquiry: SavedInquiry = {
      id: `INQ-${Date.now().toString().slice(-5)}`,
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || 'Independen / Stealth Startup',
      selectedServices,
      complexity,
      timelineMode,
      estimatedWeeks,
      estimatedBudgetIDR,
      notes: notes.trim(),
      referencedProjectTitle: referencedProject?.title,
      submittedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existing: SavedInquiry[] = existingRaw
        ? JSON.parse(existingRaw)
        : [];
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([inquiry, ...existing].slice(0, 10))
      );
    } catch {
      // ignore storage errors
    }

    setSubmittedInquiry(inquiry);
  };

  const handleReset = () => {
    setSubmittedInquiry(null);
    setName('');
    setEmail('');
    setCompany('');
    setNotes('');
    onClearReference();
  };

  return (
    <section
      id="kolaborasi"
      className="py-20 md:py-28 border-t border-[#0A0A0C]/10"
      aria-labelledby="scope-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs text-[#52525B] mb-3">
            <span className="font-mono-num text-[#0A0A0C] font-semibold">
              03. Estimasi Scope & Kolaborasi
            </span>
            <span aria-hidden="true">·</span>
            <span>Transparansi Lini Masa & Investasi</span>
          </div>
          <h2
            id="scope-heading"
            className="font-display text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0A0A0C] leading-[1.12] [text-wrap:balance]"
          >
            Konfigurasi Ruang Lingkup Proyek & Mulai <span className="font-editorial italic font-normal">Dialog Kreatif</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Scope Configurator (7 Cols) */}
          <div className="lg:col-span-7 frosted-crystal rounded-2xl p-6 md:p-8 space-y-8">
            {/* Referenced Project Notice if active */}
            {referencedProject && (
              <div className="p-4 rounded-xl bg-[#1D4ED8]/[0.06] border border-[#1D4ED8]/25 flex items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="text-[#1D4ED8] font-semibold block">
                    Referensi Proyek Aktif: {referencedProject.title}
                  </span>
                  <span className="text-[#52525B]">
                    Kategori layanan telah disesuaikan secara otomatis dengan studi kasus ini.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClearReference}
                  className="px-3 py-1.5 rounded-lg bg-white text-xs font-medium text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Hapus Referensi
                </button>
              </div>
            )}

            {/* Step 1: Discipline Multi-Select */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <label className="text-xs font-semibold text-[#0A0A0C]">
                  1. Pilih Disiplin Desain yang Dibutuhkan (Bisa lebih dari satu)
                </label>
                <span className="font-mono-num text-xs text-[#1D4ED8] font-medium">
                  {selectedServices.length} disiplin dipilih
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICE_OPTIONS.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0A0A0C] text-white border-[#0A0A0C] shadow-sm'
                          : 'bg-white/75 text-[#0A0A0C] border-[#0A0A0C]/10 hover:border-[#0A0A0C]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="font-display text-sm font-bold">
                          {service.id}
                        </span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#1D4ED8] text-white'
                              : 'border border-[#0A0A0C]/25'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <p
                        className={`text-xs mt-1.5 leading-relaxed ${
                          isSelected ? 'text-white/80' : 'text-[#52525B]'
                        }`}
                      >
                        {service.deliverableSummary}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Project Complexity Scale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#0A0A0C]/10">
              <div>
                <label className="block text-xs font-semibold text-[#0A0A0C] mb-3">
                  2. Skala & Kedalaman Eksplorasi
                </label>
                <div className="flex flex-col gap-2">
                  {(
                    [
                      {
                        key: 'focused',
                        title: 'Focused Sprint / MVP',
                        desc: '1 produk inti atau penyegaran visual terarah',
                      },
                      {
                        key: 'comprehensive',
                        title: 'Comprehensive System',
                        desc: 'Ekosistem produk lengkap & pedoman desain',
                      },
                      {
                        key: 'flagship',
                        title: 'Flagship Transformation',
                        desc: 'Multi-platform, riset mendalam & motion kustom',
                      },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setComplexity(item.key)}
                      className={`px-3.5 py-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        complexity === item.key
                          ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                          : 'bg-white/75 text-[#0A0A0C] border-[#0A0A0C]/10 hover:border-[#0A0A0C]/30'
                      }`}
                    >
                      <span className="block text-xs font-bold">{item.title}</span>
                      <span
                        className={`block text-[11px] mt-0.5 ${
                          complexity === item.key ? 'text-white/85' : 'text-[#52525B]'
                        }`}
                      >
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Timeline Pace */}
              <div className="flex flex-col justify-between">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0C] mb-3">
                    3. Kecepatan Lini Masa
                  </label>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setTimelineMode('standard')}
                      className={`px-3.5 py-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        timelineMode === 'standard'
                          ? 'bg-[#0A0A0C] text-white border-[#0A0A0C]'
                          : 'bg-white/75 text-[#0A0A0C] border-[#0A0A0C]/10 hover:border-[#0A0A0C]/30'
                      }`}
                    >
                      <span className="block text-xs font-bold">
                        Ritme Kuratorial Standar
                      </span>
                      <span
                        className={`block text-[11px] mt-0.5 ${
                          timelineMode === 'standard'
                            ? 'text-white/80'
                            : 'text-[#52525B]'
                        }`}
                      >
                        Iterasi mingguan terstruktur & review bertahap
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTimelineMode('accelerated')}
                      className={`px-3.5 py-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        timelineMode === 'accelerated'
                          ? 'bg-[#0A0A0C] text-white border-[#0A0A0C]'
                          : 'bg-white/75 text-[#0A0A0C] border-[#0A0A0C]/10 hover:border-[#0A0A0C]/30'
                      }`}
                    >
                      <span className="block text-xs font-bold">
                        urgen / Peluncuran Dipercepat
                      </span>
                      <span
                        className={`block text-[11px] mt-0.5 ${
                          timelineMode === 'accelerated'
                            ? 'text-white/80'
                            : 'text-[#52525B]'
                        }`}
                      >
                        Alokasi prioritas penuh (~22% lebih cepat)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Live Calculated Summary Box */}
                <div className="mt-6 p-4 rounded-xl bg-[#0A0A0C] text-white flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-white/70 block">
                      Estimasi Durasi Kerja
                    </span>
                    <span className="font-mono-num text-xl md:text-2xl font-bold">
                      ~{estimatedWeeks} Minggu
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-white/70 block">
                      Estimasi Investasi Proyek
                    </span>
                    <span className="font-mono-num text-xl md:text-2xl font-bold text-[#60A5FA]">
                      Rp {estimatedBudgetIDR} Jt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Brief Submission Form (5 Cols) */}
          <div className="lg:col-span-5 frosted-crystal rounded-2xl p-6 md:p-8">
            {submittedInquiry ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 space-y-5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <span className="font-mono-num text-xs text-[#1D4ED8] font-semibold">
                    BRIEF TERKONFIRMASI · {submittedInquiry.id}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#0A0A0C] mt-1">
                    Terima kasih, {submittedInquiry.name}.
                  </h3>
                  <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
                    Ringkasan estimasi proyek untuk{' '}
                    <strong className="text-[#0A0A0C]">
                      {submittedInquiry.company}
                    </strong>{' '}
                    telah tercatat. Kami akan mengirimkan jadwal sesi penemuan
                    (discovery call) ke{' '}
                    <span className="underline">{submittedInquiry.email}</span>{' '}
                    dalam waktu 24 jam kerja.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#0A0A0C]/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">Disiplin:</span>
                    <span className="font-semibold text-[#0A0A0C]">
                      {submittedInquiry.selectedServices.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">Estimasi Durasi:</span>
                    <span className="font-mono-num font-semibold text-[#0A0A0C]">
                      ~{submittedInquiry.estimatedWeeks} Minggu
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52525B]">Estimasi Investasi:</span>
                    <span className="font-mono-num font-bold text-[#1D4ED8]">
                      Rp {submittedInquiry.estimatedBudgetIDR} Juta
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#0A0A0C]/20 hover:bg-[#0A0A0C] hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Buat Simulasi Scope Baru</span>
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0A0A0C]">
                    Kirim Ringkasan Brief & Kunci Jadwal
                  </h3>
                  <p className="text-xs text-[#52525B] mt-1">
                    Slot ketersediaan studio saat ini terbuka untuk kuartal mendatang.
                  </p>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium"
                  >
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="client-name"
                    className="block text-xs font-medium text-[#0A0A0C] mb-1.5"
                  >
                    Nama Lengkap *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mis. Adrian Wirawan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#0A0A0C]/15 text-sm text-[#0A0A0C] placeholder:text-[#52525B]/60 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="client-email"
                      className="block text-xs font-medium text-[#0A0A0C] mb-1.5"
                    >
                      Email Kerja *
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adrian@perusahaan.id"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#0A0A0C]/15 text-sm text-[#0A0A0C] placeholder:text-[#52525B]/60 focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="client-company"
                      className="block text-xs font-medium text-[#0A0A0C] mb-1.5"
                    >
                      Perusahaan / Brand
                    </label>
                    <input
                      id="client-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Mis. Studio Lumina"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#0A0A0C]/15 text-sm text-[#0A0A0C] placeholder:text-[#52525B]/60 focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="client-notes"
                    className="block text-xs font-medium text-[#0A0A0C] mb-1.5"
                  >
                    Konteks Proyek & Target Peluncuran
                  </label>
                  <textarea
                    id="client-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ceritakan secara singkat produk yang sedang dibangun atau metrik desain yang ingin dicapai..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-[#0A0A0C]/15 text-sm text-[#0A0A0C] placeholder:text-[#52525B]/60 focus:outline-none focus:border-[#1D4ED8] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-[#1D4ED8] hover:bg-[#0A0A0C] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    Kirim Permintaan Kolaborasi (~Rp {estimatedBudgetIDR} Jt)
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
