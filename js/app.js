/* ===================================================
   LEAD BUILD — APP.JS
   Router · Toast · Utils
   =================================================== */

'use strict';

/* ── Shared State ─────────────────────────────────── */
const AppState = {
  activeModule: 'leads',
};

/* ── Toast ─────────────────────────────────────────── */
const Toast = (() => {
  const container = document.getElementById('toast-container');

  function show(message, type = 'info', duration = 3500) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'all 300ms ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  return { show };
})();

/* ── Router ─────────────────────────────────────────── */
const Router = (() => {
  const tabs    = document.querySelectorAll('.nav-tab');
  const modules = document.querySelectorAll('.module');

  function navigate(moduleId) {
    AppState.activeModule = moduleId;
    tabs.forEach(t => t.classList.toggle('active', t.dataset.module === moduleId));
    modules.forEach(m => {
      const wasActive = m.classList.contains('active');
      m.classList.toggle('active', m.id === moduleId);
      // Trigger chart renders on first activation
      if (m.id === moduleId && !wasActive) {
        if (moduleId === 'outreach' && typeof OutreachModule !== 'undefined') {
          OutreachModule.renderChart();
        }
      }
    });
    history.replaceState(null, '', `#${moduleId}`);
  }

  function init() {
    tabs.forEach(t => t.addEventListener('click', () => navigate(t.dataset.module)));
    const hash = location.hash.replace('#', '');
    navigate((hash && document.getElementById(hash)) ? hash : 'leads');
  }

  return { init, navigate };
})();

/* ── Utils ──────────────────────────────────────────── */
const Utils = {
  /** Animate a number counting up to target */
  animateCount(el, target, prefix = '', suffix = '', duration = 600) {
    const start = Date.now();
    const from  = parseFloat(el.textContent.replace(/[^0-9.]/g, '')) || 0;
    function tick() {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = from + (target - from) * eased;
      const display  = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
      el.textContent = prefix + display + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  },

  /** Sanitize for innerHTML */
  escape(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  },

  /** Generate a CSV blob and trigger download */
  downloadCSV(rows, filename = 'export.csv') {
    const csv = rows.map(r =>
      r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
};

/* ── Init ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Router.init();
  if (typeof LeadsModule   !== 'undefined') LeadsModule.init();
  if (typeof OutreachModule !== 'undefined') OutreachModule.init();
  if (typeof ICPModule     !== 'undefined') ICPModule.init();
});
