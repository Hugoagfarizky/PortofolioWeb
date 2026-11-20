# PortofolioWeb

Portofolio desain satu halaman bergaya **editorial direktur kreatif**: lapisan *frosted-crystal glassmorphism*, tipografi arsitektural tebal, dan koreografi animasi berbasis scroll. Dibuat untuk menampilkan karya lintas disiplin (UI/UX, brand identity, motion, editorial, 3D) tanpa terasa seperti template.

**Live:** _(belum di-deploy)_

## Fitur

- **Bento grid karya** dengan filter kategori: UI/UX, Brand Identity, Motion Design, Editorial, Desain Grafis, Web Design, 3D Visual.
- **Case study modal** per proyek: tantangan, solusi arsitektural, hasil, deliverables, dan palet warna.
- **Before/After Inspector** untuk membandingkan hasil desain sebelum dan sesudah.
- **Kinetic Poster Studio & Kinetic Stage** sebagai etalase eksperimen tipografi bergerak.
- **Process Timeline** dan **Recognition Archive** untuk menampilkan alur kerja serta pencapaian.
- **Scope Estimator** dan **Atelier Lab** sebagai bagian interaktif portofolio.
- **Sound engine** ringan untuk umpan balik audio opsional.
- Menghormati `prefers-reduced-motion`: animasi berat berhenti saat pengguna memintanya.

## Teknologi

- React 19 + TypeScript, Vite 8
- Tailwind CSS v4, `motion` untuk animasi
- Lucide React untuk ikon
- Tanpa backend: semua konten statis di `src/data/portfolioData.ts`

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # output ke dist/
npm run preview
npm run lint     # tsc --noEmit
```

## Struktur

```
index.html
src/
â”œâ”€â”€ App.tsx                  susunan halaman
â”œâ”€â”€ components/              bagian UI (bento, modal, timeline, estimator)
â”œâ”€â”€ data/portfolioData.ts    isi karya, kategori, dan studi kasus
â”œâ”€â”€ assets/images/           gambar karya
â”œâ”€â”€ utils/soundEngine.ts     umpan balik audio
â””â”€â”€ index.css                token desain dan animasi
metadata.json                judul dan deskripsi aplikasi
```

## Mengganti isi portofolio

Semua teks dan gambar karya ada di `src/data/portfolioData.ts`. Ubah `PORTFOLIO_PROJECTS` untuk daftar proyek dan `TRANSFORMATION_STUDIES` untuk studi before/after. Gambar diletakkan di `src/assets/images/` lalu diimpor di file tersebut.

## Lisensi

[MIT](LICENSE)
