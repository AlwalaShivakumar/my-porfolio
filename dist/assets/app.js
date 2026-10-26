import { initKeyboard } from './keyboard.js';
import { initCursor } from './cursor.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
let savedMotion;
try { savedMotion = localStorage.getItem('ska-motion'); } catch { /* Private storage can be unavailable. */ }
let paused = savedMotion ? savedMotion === 'paused' : motionQuery.matches;
const cursor = initCursor({ reducedMotion: paused });
let scroll = window.scrollY;
let pointer = { x: 0, y: 0 };
let pointerSmooth = { x: 0, y: 0 };
let raf = 0;
let lastPaint = 0;
let anchors;
let toastTimer;
const shell = $('#scene-shell');
const heroAnchor = $('.hero-scene-anchor');
const toolkitAnchor = $('.toolkit-scene-anchor');
toolkitAnchor.prepend(shell);

const symbols = { Python: 'PY', FastAPI: '>_', React: '{ }', TypeScript: 'TS', Gemini: '✦', LangChain: '∞', SQL: 'SQL', Git: 'git', Docker: '▥', HTML: '</>', CSS: '✳', Node: 'N', AI: 'AI', Data: '∷', API: '↔', Explore: 'esc', Build: '↗', Iterate: '↵', Launch: '↑' };
const keyboard = initKeyboard($('#keyboard-scene'), {
  onSelect({ name, description, color }) {
    $('#tech-name').textContent = name;
    $('#tech-description').textContent = description;
    $('#tech-symbol').textContent = symbols[name] ?? name.slice(0, 2);
    $('#tech-symbol').style.color = color;
    $('.tech-readout').style.borderColor = color + '66';
    $('.scene-badge .mono').textContent = `${name.toUpperCase()} / ANOTHER WAY TO BUILD`;
    if (scroll < $('#toolkit').offsetTop - 100) showToast(`${name} selected · explore the toolkit below`);
  },
});

function showToast(text) {
  clearTimeout(toastTimer);
  $('#toast').textContent = text;
  $('#toast').classList.add('show');
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 2700);
}

function point(element) {
  const r = element.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + scroll + r.height / 2 };
}
function measure() {
  scroll = window.scrollY;
  anchors = { hero: point(heroAnchor), toolkit: point(toolkitAnchor), toolkitTop: $('#toolkit').offsetTop, workTop: $('#work').offsetTop };
  resizeCanvas();
  positionScene(performance.now());
  requestFrame();
}
function positionScene(time) {
  if (!anchors) return;
  const mobile = window.innerWidth < 600;
  const tablet = window.innerWidth < 900;
  const distance = Math.max(1, Math.min(anchors.toolkit.y - anchors.hero.y, anchors.toolkitTop - 80));
  const t = paused ? (scroll > anchors.toolkitTop - window.innerHeight * .25 ? 1 : 0) : clamp(scroll / distance);
  const centerX = lerp(anchors.hero.x, anchors.toolkit.x, t);
  const centerY = lerp(anchors.hero.y, anchors.toolkit.y, t) - scroll;
  const baseScale = mobile ? .88 : tablet ? lerp(.93, .65, t) : window.innerWidth < 1200 ? .95 : 1.11;
  const scale = baseScale * (1 + (paused ? 0 : .065 * t));
  const float = paused || t > .7 ? 0 : Math.sin(time / 1900) * 7;
  const width = shell.offsetWidth;
  const height = shell.offsetHeight;
  const docked = t >= .98;
  keyboard.setDocked?.(docked);
  shell.classList.toggle('is-docked', docked);
  shell.style.left = docked ? '50%' : '0px';
  shell.style.top = docked ? '50%' : '0px';
  shell.style.transform = docked
    ? `translate3d(${-width * scale / 2}px,${-height * scale / 2}px,0) scale(${scale})`
    : `translate3d(${centerX - width * scale / 2}px,${centerY - height * scale / 2 + float}px,0) scale(${scale})`;
  const fade = 1 - clamp((scroll - (anchors.workTop - window.innerHeight * .7)) / (window.innerHeight * .45));
  const visible = fade > .01 && centerY > -300 && centerY < window.innerHeight + 400;
  shell.style.opacity = visible ? fade : 0;
  shell.style.visibility = visible ? 'visible' : 'hidden';
  shell.inert = !visible;
  shell.setAttribute('aria-hidden', String(!visible));
  pointerSmooth.x = lerp(pointerSmooth.x, paused ? 0 : pointer.x, .055);
  pointerSmooth.y = lerp(pointerSmooth.y, paused ? 0 : pointer.y, .055);
  const parallax = docked || paused ? 0 : 1;
  keyboard.setPose({ rotateX: lerp(48, 35, t) + pointerSmooth.y * 2.5 * parallax, rotateY: lerp(-8, 3, t) + pointerSmooth.x * 5 * parallax, rotateZ: lerp(-25, -13, t), scale: 1 });
}

const canvas = $('#atmosphere');
const context = canvas.getContext('2d');
let stars = [];
function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(window.innerWidth * ratio);
  canvas.height = Math.round(window.innerHeight * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  let seed = 21;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  stars = Array.from({ length: window.innerWidth < 600 ? 22 : 48 }, () => ({ x: random() * window.innerWidth, y: random() * window.innerHeight, r: .4 + random() * .8, alpha: .1 + random() * .2, speed: .1 + random() * .2 }));
  paintStars(0);
}
function paintStars(time) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const star of stars) {
    const x = (star.x + (paused ? 0 : time * .0015 * star.speed)) % window.innerWidth;
    context.beginPath();
    context.arc(x, star.y, star.r, 0, Math.PI * 2);
    context.fillStyle = `rgba(216,222,207,${star.alpha})`;
    context.fill();
  }
}
function requestFrame() { if (!raf) raf = requestAnimationFrame(frame); }
function frame(time) {
  raf = 0;
  positionScene(time);
  if (time - lastPaint > 40) { paintStars(time); lastPaint = time; }
  if (!paused && !document.hidden && scroll < anchors.workTop + 200) requestFrame();
}

function applyMotion() {
  document.body.classList.toggle('motion-paused', paused);
  $('#motion-toggle').setAttribute('aria-pressed', String(paused));
  $('#motion-toggle').setAttribute('aria-label', paused ? 'Enable decorative motion' : 'Pause decorative motion');
  $('.motion-label').textContent = paused ? 'Motion off' : 'Motion on';
  $('.motion-symbol').textContent = paused ? '▷' : 'Ⅱ';
  document.documentElement.style.scrollBehavior = paused ? 'auto' : 'smooth';
  keyboard.setReducedMotion(paused);
  cursor.setReducedMotion(paused);
  requestFrame();
}
$('#motion-toggle').addEventListener('click', () => {
  paused = !paused;
  savedMotion = paused ? 'paused' : 'playing';
  try { localStorage.setItem('ska-motion', savedMotion); } catch { /* The toggle still works without storage. */ }
  applyMotion();
  showToast(paused ? 'Decorative motion paused' : 'Decorative motion enabled');
});
motionQuery.addEventListener('change', event => { if (!savedMotion) { paused = event.matches; applyMotion(); } });

window.addEventListener('scroll', () => {
  scroll = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  $('.scroll-progress').style.transform = `scaleX(${total > 0 ? clamp(scroll / total) : 0})`;
  $('.site-header').classList.toggle('scrolled', scroll > 40);
  requestFrame();
}, { passive: true });
window.addEventListener('resize', measure, { passive: true });
window.addEventListener('pointermove', event => {
  if (paused || !finePointer.matches) return;
  pointer.x = (event.clientX / window.innerWidth - .5) * 2;
  pointer.y = (event.clientY / window.innerHeight - .5) * 2;
  requestFrame();
}, { passive: true });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
  else requestFrame();
});

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}, { threshold: .07, rootMargin: '0px 0px -15px 0px' });
$$('.reveal').forEach(element => observer.observe(element));
document.body.classList.add('js-ready');

$$('.magnetic').forEach(element => {
  element.addEventListener('pointermove', event => {
    if (paused || !finePointer.matches) return;
    const r = element.getBoundingClientRect();
    const x = clamp((event.clientX - r.left - r.width / 2) * .08, -4, 4);
    const y = clamp((event.clientY - r.top - r.height / 2) * .12, -4, 4);
    element.style.transform = `translate(${x}px,${y}px)`;
  });
  element.addEventListener('pointerleave', () => { element.style.transform = ''; });
});

const menu = $('#menu-dialog');
const menuToggle = $('#menu-toggle');
let restoreOverflow = '';
function lockPage() { restoreOverflow = document.documentElement.style.overflow; document.documentElement.style.overflow = 'hidden'; }
function unlockPage() { document.documentElement.style.overflow = restoreOverflow; }
menuToggle.addEventListener('click', () => { menu.showModal(); lockPage(); menuToggle.setAttribute('aria-expanded', 'true'); });
function closeMenu() { menu.close(); }
$('[data-close-menu]').addEventListener('click', closeMenu);
menu.addEventListener('close', () => { unlockPage(); menuToggle.setAttribute('aria-expanded', 'false'); });
$$('nav a', menu).forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const target = $(link.getAttribute('href'));
  closeMenu();
  target?.scrollIntoView({ behavior: paused ? 'instant' : 'smooth', block: 'start' });
}));

const PROJECTS = {
  coach: {
    category: '01 / GENERATIVE AI · INTERVIEW PRACTICE', title: 'AI Communication Coach',
    summary: 'A speech-first interview practice platform that turns a résumé and job description into focused questions, records spoken answers, and provides structured STAR-method feedback.',
    points: ['Résumé and job-description context for relevant practice questions.', 'Browser speech and recording tools for spoken-answer practice.', 'Session history and progress insights, with Supabase-backed application data.'],
    tech: ['Next.js', 'React', 'TypeScript', 'Google GenAI', 'Supabase', 'Tailwind CSS'],
    repo: 'https://github.com/AlwalaShivakumar/AI-Communication-Couch', live: 'https://ai-communication-couch.vercel.app',
    note: 'Explore the repository for the implementation, setup instructions, and current project status.',
  },
  smartvid: {
    category: '02 / AI LEARNING · RETRIEVAL-AUGMENTED GENERATION', title: 'SmartVidGuru',
    summary: 'An AI video-learning tool that turns YouTube videos into summaries at different detail levels. A retrieval-based tutor answers follow-up questions and links back to the relevant video timestamps.',
    points: ['A React interface connected to a Python/FastAPI backend.', 'Gemini-powered summaries and a retrieval-based question-answering workflow.', 'Supabase/PostgreSQL data with pgvector retrieval and timestamp links.'],
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'Gemini', 'Supabase', 'pgvector'],
    repo: 'https://github.com/AlwalaShivakumar/SmartvidGuru',
    note: 'The public repository contains the frontend, backend, and setup documentation. A public live deployment is not listed.',
  },
  gym: {
    category: '03 / BACKEND ENGINEERING · FASTAPI', title: 'Gym Management System',
    summary: 'A FastAPI backend for managing gym members, trainers, and membership payments. The project connects registration and payment into a complete practice workflow with clear request validation.',
    points: ['Member, trainer, and payment operations in one API.', 'Validation, filtering, search, sorting, and pagination.', 'Built as a FastAPI internship final project, using in-memory demonstration storage.'],
    tech: ['Python', 'FastAPI', 'Pydantic', 'Uvicorn'],
    repo: 'https://github.com/AlwalaShivakumar/GymManagementSystem',
    note: 'This is a learning/demo backend with in-memory storage. The thumbnail is an illustrative architecture sketch, not a live API response.',
  },
};
const projectDialog = $('#project-dialog');
function openProject(id) {
  const project = PROJECTS[id]; if (!project) return;
  const body = $('#project-dialog-body');
  body.replaceChildren();
  const eyebrow = document.createElement('div'); eyebrow.className = 'eyebrow'; eyebrow.textContent = project.category;
  const heading = document.createElement('h2'); heading.id = 'project-dialog-title'; heading.textContent = project.title;
  const summary = document.createElement('p'); summary.textContent = project.summary;
  const list = document.createElement('ul');
  project.points.forEach(point => { const item = document.createElement('li'); item.textContent = point; list.append(item); });
  const tech = document.createElement('div'); tech.className = 'dialog-tech';
  project.tech.forEach(name => { const span = document.createElement('span'); span.textContent = name; tech.append(span); });
  const actions = document.createElement('div'); actions.className = 'dialog-actions';
  const repository = document.createElement('a'); repository.href = project.repo; repository.target = '_blank'; repository.rel = 'noopener noreferrer'; repository.className = 'button button-light'; repository.textContent = 'View repository ↗'; actions.append(repository);
  if (project.live) { const live = document.createElement('a'); live.href = project.live; live.target = '_blank'; live.rel = 'noopener noreferrer'; live.className = 'text-link'; live.textContent = 'Open live project ↗'; actions.append(live); }
  const note = document.createElement('p'); note.className = 'dialog-note'; note.textContent = project.note;
  body.append(eyebrow, heading, summary, list, tech, actions, note);
  projectDialog.showModal(); lockPage();
}
$$('[data-open-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.openProject)));
$('.project-dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('close', unlockPage);
projectDialog.addEventListener('click', event => {
  const r = projectDialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) projectDialog.close();
});

$('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('alwalashiva2@gmail.com');
    $('#copy-email span').textContent = 'Copied!';
    showToast('Email copied. Say hello whenever you’re ready.');
    setTimeout(() => { $('#copy-email span').textContent = 'Copy email'; }, 2500);
  } catch { showToast('alwalashiva2@gmail.com'); }
});
$('#year').textContent = new Date().getFullYear();

measure();
applyMotion();
shell.classList.add('is-ready');
document.fonts?.ready.then(measure);
if (!paused) {
  $$('.hero-line').forEach((line, index) => line.animate([{ opacity: 0, transform: 'translateY(28px) rotate(1deg)' }, { opacity: 1, transform: 'translateY(0) rotate(0)' }], { duration: 950, delay: 80 + index * 110, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
}
// Re-measure after late-loading fonts/images, without altering anchor destinations.
window.addEventListener('load', measure, { once: true });
