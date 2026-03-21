# Personal Portfolio

A premium, fully responsive personal portfolio website built with Next.js 14, Tailwind CSS, and Framer Motion. 

## Features
- **Modern UI**: Dark/light mode theme using Tailwind CSS and elegant animations with Framer Motion.
- **Dynamic Data**: Fetches GitHub profile stats and pinned/top repositories dynamically.
- **Experience Timeline**: A responsive vertical timeline displaying work experience and education.
- **GitHub Heatmap**: Displays open-source contribution statistics using integrating a heatmap.
- **Contact Form**: Aesthetic form UI ready to be connected with EmailJS.
- **SEO Optimized**: Fully leverages Next.js App Router metadata conventions.

## Tech Stack
- Frontend: Next.js 14, React 18
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: Lucide React
- Fonts: Inter & Outfit (Google Fonts)

## Getting Started

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables
   Rename `.env.example` to `.env.local` and add your required keys (if any email integrations are configured).
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Customization
- **Profile Configuration**: Update `src/lib/data.ts` to edit your personal biography, skills, education, and LinkedIn experience data.
- **GitHub Username**: Change the static `GITHUB_USERNAME` constant in `src/lib/github.ts` to point to your GitHub profile.
- **Theme**: Colors and border radii are configured in `src/app/globals.css`.

## Deployment
This project is Next.js based and Zero-Config ready for Vercel. 
1. Push this repository to GitHub.
2. Link the repository to vercel via the Vercel Dashboard.
3. Your portfolio will automatically deploy!
