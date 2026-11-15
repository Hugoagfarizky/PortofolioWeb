import React, { useState } from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import {
  AWARDS_ARCHIVE,
  EDITORIAL_PUBLICATIONS,
  AwardItem,
} from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

interface RecognitionArchiveProps {
  onSelectProjectById: (projectId: string) => void;
}

export const RecognitionArchive: React.FC<RecognitionArchiveProps> = ({
  onSelectProjectById,
}) => {
  const [activeDiscipline, setActiveDiscipline] = useState<
    'Semua' | AwardItem['disciplineGroup']
  >('Semua');

  const filteredAwards =
    activeDiscipline === 'Semua'
      ? AWARDS_ARCHIVE
      : AWARDS_ARCHIVE.filter((a) => a.disciplineGroup === activeDiscipline);

  return (
    <section
      id="rekognisi"
      className="py-20 md:py-28 border-t border-[#0A0A0C]/10"
      aria-labelledby="recognition-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#52525B] mb-3">
              <span className="font-mono-num text-[#0A0A0C] font-semibold">
                05. Rekognisi & Arsip Publikasi
              </span>
              <span aria-hidden="true">·</span>
              <span>Penghargaan Desain Internasional 2025—2026</span>
            </div>
            <h2
              id="recognition-heading"
              className="font-display text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0A0A0C] leading-[1.12] [text-wrap:balance]"
            >
              Validasi Kuratorial & Sorotan{' '}
              <span className="font-editorial italic font-normal">
                Media Desain Global
              </span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter daftar penghargaan"
            className="frosted-crystal p-1.5 rounded-xl flex flex-wrap items-center gap-1 self-start lg:self-end"
          >
            {(
              [
                'Semua',
                'Digital & UI/UX',
                'Brand & Kemasan',
                'Motion & 3D',
                'Editorial',
              ] as const
            ).map((group) => {
              const isSelected = activeDiscipline === group;
              return (
                <button
                  key={group}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    soundEngine.playTick();
                    setActiveDiscipline(group);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#0A0A0C] text-white'
                      : 'text-[#52525B] hover:text-[#0A0A0C]'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Structured Monograph Table of Awards */}
        <div className="frosted-crystal rounded-2xl overflow-hidden divide-y divide-[#0A0A0C]/10">
          {filteredAwards.map((award, index) => (
            <div
              key={award.id}
              onClick={() => {
                soundEngine.playTick(1.1);
                onSelectProjectById(award.projectId);
              }}
              className="p-5 md:p-6 hover:bg-white/85 transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center cursor-pointer group"
            >
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="font-mono-num text-xs font-bold text-[#52525B]">
                  0{index + 1}
                </span>
                <span className="font-mono-num text-sm font-bold text-[#0A0A0C]">
                  {award.year}
                </span>
                <span aria-hidden="true" className="text-[#52525B]">
                  ·
                </span>
                <span className="text-xs text-[#52525B]">{award.location}</span>
              </div>

              <div className="md:col-span-4">
                <span className="font-display text-base font-bold text-[#0A0A0C] group-hover:text-[#1D4ED8] transition-colors block">
                  {award.organization}
                </span>
                <span className="text-xs text-[#52525B] block mt-0.5">
                  {award.awardTitle}
                </span>
              </div>

              <div className="md:col-span-4">
                <span className="text-xs text-[#52525B] block">Karya Terkait</span>
                <span className="text-sm font-semibold text-[#0A0A0C]">
                  {award.projectTitle}
                </span>
              </div>

              <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                <span className="text-xs font-medium text-[#1D4ED8]">
                  Inspeksi Karya
                </span>
                <span className="w-8 h-8 rounded-xl bg-[#0A0A0C]/5 group-hover:bg-[#0A0A0C] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3-Column Editorial Press Highlights */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDITORIAL_PUBLICATIONS.map((pub) => (
            <article
              key={pub.id}
              className="frosted-crystal rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#52525B]">
                  <Award className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span className="font-semibold text-[#0A0A0C]">
                    {pub.publication}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">{pub.year}</span>
                </div>

                <h3 className="font-display text-base font-bold text-[#0A0A0C] mt-3 leading-snug">
                  {pub.articleTitle}
                </h3>

                <p className="text-xs text-[#52525B] mt-3 leading-relaxed italic">
                  “{pub.quote}”
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#0A0A0C]/8 text-[11px] font-mono-num text-[#52525B]">
                {pub.issueNumber}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
