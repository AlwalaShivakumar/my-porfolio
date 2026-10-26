/** White elastic pointer inspired by the reference's observed cursor behavior. */
export function initCursor({ reducedMotion = false } = {}) {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const layer = document.createElement('div');
  layer.id = 'pointer-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.setAttribute('popover', 'manual');
  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  const dot = document.createElement('div');
  dot.className = 'cursor-center-dot';
  layer.append(follower, dot);
  document.body.append(layer);
  let reduced = reducedMotion;
  let visible = false;
  let frame = 0;
  let x = 0, y = 0, vx = 0, vy = 0, width = 50, height = 50;
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  let targetWidth = 50, targetHeight = 50, radius = 25;
  let targetRadius = 25;
  let mode = 'free';

  function bringToFront() {
    // A manual, pointer-transparent popover also renders above native dialogs.
    if (typeof layer.showPopover === 'function') {
      try {
        if (layer.matches(':popover-open')) layer.hidePopover();
        layer.showPopover();
      } catch { layer.removeAttribute('popover'); }
    } else layer.removeAttribute('popover');
    if (visible) schedule();
  }
  bringToFront();
  const dialogs = new MutationObserver(bringToFront);
  document.querySelectorAll('dialog').forEach(dialog => dialogs.observe(dialog, { attributes: true, attributeFilter: ['open'] }));

  function hide() {
    visible = false;
    layer.classList.remove('is-visible');
    document.documentElement.classList.remove('cursor-enhanced');
    cancelAnimationFrame(frame); frame = 0;
  }
  function paint() {
    frame = 0;
    if (!visible || document.hidden || !fine.matches) return;
    updateTarget();
    const precise = reduced || mode === 'control';
    if (precise) { x = targetX; y = targetY; vx = vy = 0; }
    else {
      vx = (vx + (targetX - x) * .18) * .69;
      vy = (vy + (targetY - y) * .18) * .69;
      x += vx; y += vy;
    }
    width += (targetWidth - width) * (precise ? 1 : .22);
    height += (targetHeight - height) * (precise ? 1 : .22);
    radius += (targetRadius - radius) * (precise ? 1 : .22);
    const speed = mode === 'free' && !reduced ? Math.min(Math.hypot(vx, vy) / 100, .3) : 0;
    const angle = speed > .015 ? Math.atan2(vy, vx) * 180 / Math.PI : 0;
    follower.style.width = `${width}px`;
    follower.style.height = `${height}px`;
    follower.style.borderRadius = `${radius}px`;
    follower.style.transform = `translate3d(${x - width / 2}px,${y - height / 2}px,0) rotate(${angle}deg) scale(${1 + speed},${1 - speed * .55})`;
    dot.style.transform = `translate3d(${mouseX - 4.5}px,${mouseY - 4.5}px,0)`;
    if (mode === 'control' || Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(vx) + Math.abs(vy) + Math.abs(targetWidth - width) + Math.abs(targetHeight - height) > .1) frame = requestAnimationFrame(paint);
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
  function move(event) {
    if (event.pointerType === 'touch' || !fine.matches) { hide(); return; }
    mouseX = event.clientX; mouseY = event.clientY;
    if (!visible) { x = mouseX; y = mouseY; vx = vy = 0; visible = true; layer.classList.add('is-visible'); document.documentElement.classList.add('cursor-enhanced'); }
    schedule();
  }
  function updateTarget() {
    const pointed = document.elementFromPoint(mouseX, mouseY);
    const target = pointed?.closest('a,button,[role="button"]');
    const isKey = target?.hasAttribute('data-key') || pointed?.closest('#keyboard-scene');
    mode = isKey ? 'key' : target ? 'control' : 'free';
    layer.dataset.mode = mode;
    if (mode === 'control') {
      let rect = target.getBoundingClientRect();
      // Wide navigation links include empty row space and a right-aligned arrow.
      // Measure their actual text rather than snapping to the row's center.
      if (rect.width > 260) {
        const text = [...target.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        if (text) { const range = document.createRange(); range.selectNodeContents(text); rect = range.getBoundingClientRect(); }
      }
      targetWidth = rect.width + 16;
      targetHeight = rect.height + 12;
      targetRadius = Math.min(targetHeight / 2, 14);
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    } else {
      targetWidth = targetHeight = mode === 'key' ? 25 : 50;
      targetRadius = targetWidth / 2;
      targetX = mouseX; targetY = mouseY;
    }
  }
  document.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  document.addEventListener('scroll', schedule, { passive: true, capture: true });
  window.addEventListener('resize', schedule, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  document.addEventListener('keydown', event => { if (event.key === 'Tab') hide(); });
  document.addEventListener('pointerdown', () => { layer.classList.add('is-pressed'); });
  document.addEventListener('pointerup', () => { layer.classList.remove('is-pressed'); });
  fine.addEventListener('change', () => { if (!fine.matches) hide(); });
  return { setReducedMotion(value) { reduced = Boolean(value); schedule(); } };
}
