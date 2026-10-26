# Shiva Kumar Alwala — motion portfolio

A buildless personal portfolio with an original WebGL 3D interactive keyboard, an elastic white cursor, scroll choreography, a project gallery, accessible detail dialogs, reduced-motion controls, and direct contact actions.

## Run locally

Node.js is the only local prerequisite. No dependency installation is needed.

```text
npm run dev
```

Open http://127.0.0.1:4173. Run `npm run check` for the source and asset checks. The publishable website is in `dist/`.

## Content sources

- https://github.com/AlwalaShivakumar/AlwalaShivakumar/blob/main/README.md
- https://github.com/AlwalaShivakumar/my-porfolio/blob/main/src/lib/data.ts
- https://github.com/AlwalaShivakumar/AI-Communication-Couch
- https://github.com/AlwalaShivakumar/SmartvidGuru
- https://github.com/AlwalaShivakumar/GymManagementSystem

Education and internship information reflects the user's existing public portfolio. No performance, client, employment-verification, or commercial-use statistics have been invented. Project illustrations are labeled concept visuals or illustrative sketches. Only AI Communication Coach has a repository-declared live link; the other projects link to their public repositories.

## Design and implementation

The motion direction was informed by REA's browser inspection of shhiva.in: a recurring 3D object, coordinated scrolling, large typography, a white follower cursor with a dark center, and restrained background movement. This implementation uses original markup, styling, project visuals, and keyboard geometry; it does not reuse the reference site's assets or scene.

The keyboard uses locally vendored Three.js 0.186.1 (MIT), with a CSS fallback for unavailable WebGL. Fonts are served locally (Manrope, Space Grotesk, and Unbounded, from Google Fonts). There are no analytics trackers, API keys, or external JavaScript requests. Contact opens the visitor's email client; no form data is collected or sent to a pretend backend.

The pause control stops decorative animation and persists locally. System reduced-motion preferences are respected until the visitor explicitly changes the setting. The white cursor follows immediately in reduced-motion mode and is disabled for touch pointers. The site includes semantic headings, visible focus states, native modal focus management, keyboard-operable toolkit buttons, and narrow-screen layouts.

## Deploy on Vercel

This is a static HTML/CSS/JavaScript site. The repository's vercel.json selects the Other framework preset, runs the source checks, skips dependency installation, and serves dist/. No API keys or environment variables are needed.

For the existing portfolio project:

1. Open the Vercel project currently serving shivakumaralwala.me.
2. In Settings → Git, confirm the repository is AlwalaShivakumar/my-porfolio and the production branch is main.
3. In build settings, use root directory ./, Framework Preset Other, Build Command npm run check, and Output Directory dist. The checked-in vercel.json supplies these build/output overrides. Remove any old Next.js-specific install/build overrides if they conflict.
4. Deploy the latest main commit, or redeploy it after changing project settings.
5. Keep shivakumaralwala.me attached to this project under Settings → Domains. No DNS changes are normally needed when retaining the same Vercel project.
6. Verify the domain over HTTPS and test menu navigation, keyboard selections, and the motion toggle.

If using a new Vercel project instead, first test its generated vercel.app URL, then add shivakumaralwala.me under Settings → Domains and confirm Move Domain. Do not remove it from the old project first. Add/retain the www variant and choose one primary domain with a redirect. Apply DNS changes only if Vercel reports they are required, using the exact values displayed there.

Official references:
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/domains/working-with-domains/add-a-domain
- https://vercel.com/docs/domains/working-with-domains/transfer-your-domain
