# Bhupinder Singh Sahmey — Portfolio

A modern Next.js portfolio with **3D WebGL** scenes (React Three Fiber): an interactive hero particle network and a scroll-driven **career journey** path through milestones.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19, TypeScript, Tailwind CSS 4
- [Framer Motion](https://www.framer.com/motion/) for UI motion
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) + Three.js for 3D

## Local development

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy free on Vercel (recommended for 3D)

GitHub Pages requires static export and limits Next.js features. **Vercel Hobby (free)** runs this project with full WebGL support.

1. Push this repo to GitHub (root can be the monorepo; set Vercel **Root Directory** to `portfolio` if needed).
2. Sign in at [vercel.com](https://vercel.com) with GitHub.
3. **Add New Project** → import your repository.
4. Framework preset: **Next.js**. Root directory: `portfolio` (if the app lives in that folder).
5. No environment variables required for the 3D portfolio.
6. Deploy — every push to `main` redeploys automatically.

Your live URL will look like `https://your-project.vercel.app`.

### Optional: custom domain

In the Vercel project → **Settings** → **Domains**, add your domain and follow DNS instructions.

## Accessibility & performance

- **Mobile** and **`prefers-reduced-motion`**: 2D timeline fallback (no WebGL) for the career section; hero uses a static gradient instead of the 3D canvas.
- Career 3D canvas **lazy-loads** when the section enters the viewport.
- Canvas **DPR** capped at 1.5 for smoother performance on mid-range devices.

## Project structure

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Main page sections |
| `components/Hero.tsx` | Hero + 3D backdrop |
| `components/CareerJourney.tsx` | 3D scroll journey orchestrator |
| `components/CareerJourneyFallback.tsx` | 2D timeline fallback |
| `components/three/` | R3F scenes and canvas wrappers |
| `lib/journeyData.ts` | Career milestone data |

## Learn more

- [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel + Next.js](https://vercel.com/docs/frameworks/nextjs)
