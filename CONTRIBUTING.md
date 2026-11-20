# Panduan Kontribusi

Portofolio desain bergaya editorial: lapisan glassmorphism, tipografi arsitektural, animasi berbasis scroll, dan studi kasus per proyek. React 19, Vite, dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev    # http://localhost:3000
```

## Sebelum mengirim perubahan

- Jaga performa: animasi harus tetap halus di HP kelas menengah.
- Hormati `prefers-reduced-motion` untuk semua animasi scroll.
- Jangan commit `.env`, kunci API, atau hasil build.

## Alur kontribusi

1. `git checkout -b fix/nama-singkat`
2. Commit dengan pesan yang jelas.
3. Buka pull request ke `main`, jelaskan **apa** dan **kenapa**.

Untuk masalah keamanan, ikuti `SECURITY.md`, jangan buka issue publik.

## Lisensi

Dengan mengirim pull request, kontribusimu dirilis di bawah [MIT License](LICENSE).