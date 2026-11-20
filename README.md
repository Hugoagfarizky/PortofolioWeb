# PortofolioWeb

Single-page design portfolio in an **editorial creative-director style**: frosted-crystal glassmorphism layers, bold architectural typography, and scroll-driven animation choreography. Built to showcase cross-disciplinary work (UI/UX, brand identity, motion, editorial, 3D) without feeling like a template.

**Live:** https://hugoagfarizky.github.io/PortofolioWeb/

## Features

- **Bento grid of work** with category filters: UI/UX, Brand Identity, Motion Design, Editorial, Graphic Design, Web Design, 3D Visual.
- **Case study modal** per project: challenge, architectural solution, outcome, deliverables, and color palette.
- **Before/After Inspector** to compare designs before and after.
- **Kinetic Poster Studio & Kinetic Stage** as showcases for moving typography experiments.
- **Process Timeline** and **Recognition Archive** to display workflow and achievements.
- **Scope Estimator** and **Atelier Lab** as interactive portfolio sections.
- **Lightweight sound engine** for optional audio feedback.
- Respects `prefers-reduced-motion`: heavy animations stop when the user requests it.

## Tech stack

- React 19 + TypeScript, Vite 8
- Tailwind CSS v4, `motion` for animation
- Lucide React for icons
- No backend: all content is static in `src/data/portfolioData.ts`

## Running

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # output to dist/
npm run preview
npm run lint     # tsc --noEmit
```

## Structure

```
index.html
src/
├── App.tsx                  page composition
├── components/              UI sections (bento, modal, timeline, estimator)
├── data/portfolioData.ts    projects, categories, and case studies
├── assets/images/           project images
├── utils/soundEngine.ts     audio feedback
└── index.css                design tokens and animations
metadata.json                app title and description
```

## Updating portfolio content

All project text and images live in `src/data/portfolioData.ts`. Edit `PORTFOLIO_PROJECTS` for the project list and `TRANSFORMATION_STUDIES` for before/after studies. Place images in `src/assets/images/` and import them in that file.

## License

[MIT](LICENSE)
