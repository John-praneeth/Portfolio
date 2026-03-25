# John Praneeth – 3D Developer Portfolio 🚀

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=061926)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.168-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=0A0B0F)](https://gsap.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

A highly interactive, animation-rich 3D developer portfolio built with
React, TypeScript, Three.js, and GSAP. It features a custom 3D character,
smooth Lenis-powered scrolling, and sectioned content that clearly shows my
work, experience, licenses, and tech stack in a clean, recruiter-friendly
layout.

---

## Live Demo 🌐

> After you deploy, replace this placeholder with your live URL.

**Live Site:** https://www.johnpraneeth.tech

![Portfolio Preview](public/images/preview.png)

---

## 1. Problem Statement 💡

Traditional portfolios are often static and text-heavy, making it hard to
stand out or communicate personality and technical depth. This project solves
that by providing:

- A visually engaging 3D experience that reflects my personality.
- A clear, structured way to present projects, experience, and skills.
- Fast, smooth interactions so visitors can quickly understand what I do.

---

## 2. Features ✨

- 🧑‍💻 **Interactive 3D hero** – character-driven hero section rendered with
	Three.js/WebGL, immediately showcasing personality and technical skills.
- 🎢 **High-performance scroll animations** – smooth, GPU-accelerated
	transitions using GSAP, ScrollTrigger, and Lenis for smooth scrolling.
- 🧩 **Optimized projects carousel** – horizontally scrollable **My Work**
	section with tight spacing and clear visual hierarchy.
- 📄 **In-site resume viewer** – resume opens inside a polished modal so
	visitors stay on the site while reviewing details.
- 🧾 **Proof-backed experience timeline** – career roles with direct
	LinkedIn proof links for extra credibility.
- 📚 **Licenses & certifications** – curated list of key credentials.
- 🧰 **Tech stack highlight** – clearly communicates tools, frameworks, and
	technologies I use day to day.
- 📬 **Contact shortcuts** – one-click access to GitHub, LinkedIn, Email,
	and Instagram.
- 🖱️ **Custom cursor & hover states** – subtle motion and feedback on
	interactive elements.
- 📱 **Responsive by design** – layouts tuned for large screens down to
	mobile devices.

---

## Performance Optimizations ⚡

- Uses **Vite** for fast dev server startup and optimized production builds.
- Smooth scrolling is centralized through **Lenis**, avoiding conflicts with
	CSS `scroll-behavior` and keeping scroll feel consistent across sections.
- **GSAP + ScrollTrigger** only run where needed, and many effects respect
	`prefers-reduced-motion` for motion-sensitive users.
- The **Three.js** renderer is tuned (pixel ratio caps, visibility handling)
	to balance visual quality with frame rate.
- Hover effects (e.g., social icons) are implemented with a single
	`requestAnimationFrame` loop for better performance.
- Horizontal scrolling and the work carousel rely on CSS + transforms for
	good performance on both desktop and mobile.

---

## UI/UX Highlights 🎨

- Strong **visual hierarchy**: 3D hero → About → What I Do → Career → Work
	→ Tech Stack (desktop) → Licenses → Contact, guiding recruiters through
	the story.
- **Consistent typography and spacing** using shared container widths and
	title styles.
- **Scroll hints and affordances** (e.g., subtle arrow hint in Work) so
	users immediately understand how to interact.
- **Glass-style resume modal** that feels integrated with the site rather
	than a separate PDF viewer.
- Accessible color contrast on important text and links, especially in the
	About and Career sections.

---

## Security Considerations 🔐

- No secrets or private keys are committed; any future keys should live in
	environment variables prefixed with `VITE_`.
- External links that open in new tabs use `target="_blank"` with
	appropriate `rel` attributes where needed to avoid tab-nabbing issues.
- No user accounts or authentication flows are present, which keeps the
	attack surface small for this portfolio use case.

---

## Why This Project Matters 🚀

- Serves as a **living showcase** of my front-end, animation, and 3D skills
	in a real, production-style codebase.
- Demonstrates comfort with **modern tooling** (React, TypeScript, Vite,
	Three.js, GSAP) that many companies actively use.
- Provides a polished, easily shareable link for recruiters and hiring
	managers to explore my work quickly.

---

## 3. Tech Stack 🛠️

**Frontend**

- React 18
- TypeScript
- Vite
- CSS (component-scoped styles)

**3D & Animations**

- Three.js
- @react-three/fiber, @react-three/drei
- GSAP core, ScrollTrigger, Lenis (smooth scrolling), custom text-splitting
	utilities

**Backend & Database**

- None – this is a static SPA portfolio with no backend or database.

**APIs & Services**

- @vercel/analytics (optional usage when deployed on Vercel).

**Tooling**

- TypeScript
- ESLint
- Vite dev server & build pipeline

---

## 4. Architecture Overview 🧱

- **Single Page Application (SPA)** built with React + Vite.
- **Component-based layout** under `src/components` for each section
	(Landing, About, What I Do, Career, Work, Tech Stack, Licenses, Contact).
- **MainContainer** coordinates layout, smooth scrolling wrapper, and
	conditionally renders Tech Stack on desktop.
- **3D scene** encapsulated in the `Character` components using
	Three.js/@react-three/fiber and related utilities.
- **Utility modules** under `src/components/utils` for GSAP scroll
	animations, intro effects, Lenis integration, and text splitting.
- **Styling**: each major component has its own CSS file in
	`src/components/styles` for isolation and easier maintenance.

The app is mounted in `main.tsx`, renders `App.tsx`, which wraps the main
layout and 3D character model.

---

## 5. Folder Structure 📁

High-level layout (simplified) with responsibilities:

```text
.
├─ public/
│  ├─ images/            # Static images (preview, thumbnails, social cards)
│  ├─ models/            # 3D model assets and HDR environment
│  └─ draco/             # Draco decoder JS for compressed 3D assets
├─ src/
│  ├─ assets/            # Front-end assets imported via modules (icons, media)
│  ├─ components/        # All React UI building blocks and sections
│  │  ├─ About.tsx       # About-me section content and layout
│  │  ├─ Career.tsx      # Timeline of roles, companies, and proof links
│  │  ├─ Contact.tsx     # Contact details, footer, and social links
│  │  ├─ Landing.tsx     # Hero section with 3D character + intro text
│  │  ├─ Licenses.tsx    # Certifications / licenses listing
│  │  ├─ TechStack.tsx   # Tech stack badges and descriptions (desktop only)
│  │  ├─ WhatIDo.tsx     # "What I Do" section with animated heading + cards
│  │  ├─ Work.tsx        # Horizontally scrollable projects showcase
│  │  ├─ MainContainer.tsx # Orchestrates layout, smooth wrapper, sections
│  │  ├─ Character/      # 3D scene, character setup, and utilities
│  │  └─ styles/         # CSS files for each visual section/component
│  ├─ components/utils/  # GSAP scroll helpers, intro FX, text splitting
│  ├─ context/
│  │  └─ LoadingProvider.tsx  # Loading/intro animation context
│  ├─ data/
│  │  └─ boneData.ts     # 3D rig/bone configuration data
│  ├─ App.tsx            # Root app layout and section composition
│  ├─ main.tsx           # React entry point; mounts App into the DOM
│  ├─ App.css            # Global app-level styles and layout helpers
│  └─ index.css          # Base resets, typography, and global variables
├─ package.json
├─ tsconfig*.json
├─ vite.config.ts
└─ README.md
```

---

## 6. Installation & Setup Guide 🧩

### Prerequisites

- Node.js (LTS recommended, e.g., 18+)
- npm (comes with Node) or another package manager

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url> john-portfolio
cd john-portfolio
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run in Development Mode

```bash
npm run dev
```

Vite will print a local URL (by default `http://localhost:5173`). Open it in
your browser to view the site.

### 4️⃣ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 5️⃣ Preview the Production Build (optional)

```bash
npm run preview
```

---

## 7. Usage Instructions 💻

Once the dev server is running:

- Scroll to explore sections: Landing → About → Tech Stack → Career → Work
	→ Licenses → Contact.
- Hover over project cards and social icons for interactive effects.
- Click **RESUME** to open the in-page resume viewer and close it with the
	glassy **Close** pill.
- In the **Career** section, click on specific role titles to open LinkedIn
	proof links in a new tab.

---

## 8. Environment Variables (.env) ⚙️

This project does **not** require environment variables for basic usage.

If you later integrate APIs, analytics keys, or forms, you can create a
`.env` file in the project root with variables like:

```bash
VITE_API_BASE_URL="https://api.example.com"
VITE_CONTACT_FORM_ENDPOINT="https://form.example.com/submit"
```

Vite exposes only variables prefixed with `VITE_` to the client.

---

## 9. API Endpoints 🔌

This portfolio is currently a **pure front-end SPA** and does not define its
own backend API endpoints.

If you add a backend later (e.g., for a contact form or blog), document your
endpoints here, for example:

```text
POST /api/contact       # Submit contact form
GET  /api/projects      # Fetch project data
```

---

## 10. Screenshots & Demo 🖼️

- Landing page (3D character + hero text)
	- `public/images/preview.png`
- Additional screenshots can be added here, for example:
	- `public/images/about.png`
	- `public/images/work.png`

---

## 11. Deployment Guide 🚀

### Local / Static Hosting

1. Build the project:

	 ```bash
	 npm run build
	 ```

2. Serve the `dist/` directory using any static host (e.g., Vercel, Netlify,
	 Cloudflare Pages, GitHub Pages).

This project now uses only **free GSAP features** (core + ScrollTrigger)
along with **Lenis** for smooth scrolling. It is safe to deploy in
production without Club GreenSock plugins.

GSAP docs: https://gsap.com/docs/

### Example: Deploy to Vercel

1. Push this repository to GitHub.
2. Create a new project in Vercel and import the repo.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Configure any env vars if you add APIs or analytics.

---

## 12. Testing Instructions ✅

This project is currently focused on visuals and interaction, and **does not
yet include automated unit or integration tests**. Even so, there is a basic
quality gate you can run during development:

- **Static analysis / linting**

	```bash
	npm run lint
	```

Recommended next steps for a more robust testing strategy:

- Add a test runner such as **Vitest** or **Jest**.
- Use **React Testing Library** for component-level tests (e.g., rendering
  sections, presence of links and CTAs).
- Add a small smoke-test suite that runs in CI before deployment.

---

## 13. Future Improvements 🧭

- Add automated tests (unit + integration) for key components.
- Introduce a small backend (e.g., serverless functions) for a contact form.
- Add theme switching (light/dark or color schemes).
- Implement internationalization (i18n) for multiple languages.
- Add more 3D character interactions (hover/click reactions).
- Optimize bundle size further via code splitting and asset compression.

---

## 14. Contributing Guidelines 🤝

Although this is a personal portfolio, contributions and suggestions are
welcome.

1. Fork the repository.
2. Create a new branch for your feature or bugfix:

	 ```bash
	 git checkout -b feature/my-update
	 ```

3. Make your changes and run `npm run lint`.
4. Commit and push your branch.
5. Open a Pull Request explaining **what** you changed and **why**.

---

## 15. License 📄

This project is open source and available under the **MIT License**.
See the [LICENSE](LICENSE) file for full details.

---

## 16. Author 👨‍💻

**John Praneeth Dasari**

- GitHub: https://github.com/John-praneeth
- LinkedIn: https://www.linkedin.com/in/john-praneeth/
- Email: `johnpraneeth3030@gmail.com`

Feel free to reach out for collaborations, opportunities, or feedback!
