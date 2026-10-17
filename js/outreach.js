/* ===================================================
   LEAD BUILD — OUTREACH.JS
   Module 2: Cold Outreach Campaign
   =================================================== */

'use strict';

const OutreachModule = (() => {

  /* ── Sequence Data ─────────────────────────────────── */
  const SEQUENCE = [
    {
      day: 1,
      type: 'email',
      title: 'First Touch: Hook & Problem',
      desc: 'Personalized opening line referencing something specific about their company. Lead with their pain — not your product. Under 100 words.',
    },
    {
      day: 3,
      type: 'linkedin',
      title: 'LinkedIn Connection Request',
      desc: 'Soft touch. Short note referencing the email. No pitch — just signal you exist and are relevant.',
    },
    {
      day: 6,
      type: 'email',
      title: 'Value-Add Follow-up',
      desc: 'Share a relevant case study, ROI calculation, or insight. Make it feel like generosity, not a chase.',
    },
    {
      day: 10,
      type: 'email',
      title: 'Breakup Email',
      desc: '"Taking it away" framing. Low-stakes, no hard feelings. Often has the highest reply rate of the sequence.',
    },
  ];

  /* ── A/B Variant Data ──────────────────────────────── */
  const VARIANTS = {
    A: {
      name: 'Control (Generic)',
      subject: 'Quick question about your sales process',
      body: `Hi [Name],

I saw you're in tech and wanted to reach out. We help companies like yours streamline their sales process and save time on manual CRM work.

Let's schedule a demo to see if it's a fit.

Best,
[Your Name]`,
      sent: 150,
      opened: 28,
      replied: 4,
      booked: 1,
      color: 'var(--accent-amber)',
      insight: 'Generic subject line and no personalization. Treated as a mass email by recipients. Open rate sits at 19% — below industry average.',
    },
    B: {
      name: 'Personalized Hook',
      subject: "Ideas for [Company]'s Series B growth",
      body: `Hi [Name],

Congrats on the recent Series B — rapid growth usually means the sales ops debt catches up fast (more reps, same manual CRM overhead).

We helped [Similar Co] cut rep admin time by 70% in 6 weeks.

Worth a 15-min chat to see if that's relevant for you?

Best,
[Your Name]`,
      sent: 150,
      opened: 42,
      replied: 12,
      booked: 6,
      color: 'var(--accent-green)',
      insight: 'Personalized subject line referencing a real trigger (funding round). First line leads with a specific, relevant pain rather than a generic pitch. 28% open rate vs 19% for A — 47% lift driven by the subject line alone.',
    },
    C: {
      name: 'Direct CTA',
      subject: 'Cutting CRM admin time by 70%',
      body: `Hi [Name],

Sales reps spend ~10 hours a week on data entry. We built a tool that cuts that to under 3.

If reducing admin overhead is a Q3 priority, I have a 3-minute Loom showing exactly how it works for teams your size.

Mind if I send the link?

Best,
[Your Name]`,
      sent: 150,
      opened: 35,
      replied: 9,
      booked: 4,
      color: 'var(--accent-violet)',
      insight: 'Specific stat in subject line drives curiosity. Body is direct and short. CTA is ultra-low friction ("mind if I send?"). Strong reply rate (6%) but fewer meetings than B — works best for decision-makers who want proof before committing time.',
    },
  };

  let activeVariant = 'B';
  let chartInstance = null;

  /* ── Render Sequence Timeline ─────────────────────── */
  function renderTimeline() {
    const container = document.getElementById('sequence-timeline');
    container.innerHTML = '';

    SEQUENCE.forEach((step, idx) => {
      const isLast = idx === SEQUENCE.length - 1;

      const stepEl = document.createElement('div');
      stepEl.className = 'sequence-step';

      if (!isLast) {
        const connector = document.createElement('div');
        connector.className = 'step-connector';
        stepEl.appendChild(connector);
      }

      const typeLabel = step.type === 'email' ? '📧' : '🔗';
      const iconClass = step.type === 'email' ? 'email' : 'linkedin';

      stepEl.innerHTML += `
        <div class="step-icon ${iconClass}">${typeLabel}</div>
        <div class="step-content">
          <div class="step-day">Day ${step.day} · ${step.type === 'email' ? 'Email' : 'LinkedIn'}</div>
          <div class="step-title">${step.title}</div>
          <div class="step-desc">${step.desc}</div>
        </div>
      `;

      container.appendChild(stepEl);
    });
  }

  /* ── Render Stats Cards ───────────────────────────── */
  function renderStats(variantKey) {
    const v = VARIANTS[variantKey];
    const openRate  = ((v.opened  / v.sent) * 100).toFixed(1);
    const replyRate = ((v.replied / v.sent) * 100).toFixed(1);

    // Determine which cards are "winners" compared to baseline A
    const isWinner = variantKey !== 'A';

    const statsGrid = document.getElementById('outreach-stats-grid');
    statsGrid.innerHTML = `
      <div class="outreach-stat-card">
        <div class="outreach-stat-value" id="ostat-sent" style="color:var(--txt-primary)">0</div>
        <div class="outreach-stat-label">Emails Sent</div>
      </div>
      <div class="outreach-stat-card${openRate > 22 ? ' winner' : ''}">
        <div class="outreach-stat-value" id="ostat-open" style="color:var(--accent-amber)">0%</div>
        <div class="outreach-stat-label">Open Rate</div>
      </div>
      <div class="outreach-stat-card${replyRate > 4 ? ' winner' : ''}">
        <div class="outreach-stat-value" id="ostat-reply" style="color:var(--accent-teal)">0%</div>
        <div class="outreach-stat-label">Reply Rate</div>
      </div>
      <div class="outreach-stat-card${v.booked >= 4 ? ' winner' : ''}">
        <div class="outreach-stat-value" id="ostat-booked" style="color:var(--accent-green)">0</div>
        <div class="outreach-stat-label">Meetings Booked</div>
      </div>
    `;

    // Animate stats
    Utils.animateCount(document.getElementById('ostat-sent'),   v.sent,    '', '',  600);
    Utils.animateCount(document.getElementById('ostat-open'),   parseFloat(openRate),  '', '%', 700);
    Utils.animateCount(document.getElementById('ostat-reply'),  parseFloat(replyRate), '', '%', 700);
    Utils.animateCount(document.getElementById('ostat-booked'), v.booked,  '', '',  600);
  }

  /* ── Render Email Preview ─────────────────────────── */
  function renderPreview(variantKey) {
    const v = VARIANTS[variantKey];
    document.getElementById('outreach-subject').textContent = v.subject;
    document.getElementById('outreach-body').textContent    = v.body;
  }

  /* ── Render Results Narrative ─────────────────────── */
  function renderNarrative(variantKey) {
    const v = VARIANTS[variantKey];
    const openRate  = ((v.opened  / v.sent) * 100).toFixed(1);
    const replyRate = ((v.replied / v.sent) * 100).toFixed(1);
    const el = document.getElementById('results-narrative');
    el.innerHTML = `<strong>"Sent ${v.sent} emails (Variant ${variantKey}: ${v.name}).</strong>
Achieved a <strong>${openRate}% open rate</strong> and <strong>${replyRate}% reply rate</strong>, resulting in <strong>${v.booked} meetings booked</strong>.
${v.insight}"`;
  }

  /* ── Render Chart ─────────────────────────────────── */
  function renderChart(variantKey = activeVariant) {
    const v   = VARIANTS[variantKey];
    const ctx = document.getElementById('outreach-funnel-chart');
    if (!ctx) return;

    if (chartInstance) { chartInstance.destroy(); chartInstance = null; }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sent', 'Opened', 'Replied', 'Booked'],
        datasets: [{
          label: `Variant ${variantKey}`,
          data: [v.sent, v.opened, v.replied, v.booked],
          backgroundColor: [
            '#64748b',
            '#d97706',
            '#2563eb',
            '#059669',
          ],
          borderRadius: 4,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: '#1e293b',
            borderWidth: 1,
            titleColor: '#ffffff',
            bodyColor: '#e2e8f0',
            padding: 10,
            cornerRadius: 6,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.06)' },
            ticks: { color: '#64748b', font: { size: 11, family: 'Inter' } },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { size: 11, family: 'Inter' } },
          },
        },
        animation: {
          duration: 500,
          easing: 'easeOutCubic',
        },
      },
    });
  }

  /* ── Switch Variant ───────────────────────────────── */
  function switchVariant(key) {
    activeVariant = key;

    document.querySelectorAll('.ab-selector .section-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.variant === key);
    });

    renderStats(key);
    renderPreview(key);
    renderNarrative(key);
    renderChart(key);
  }

  /* ── Init ────────────────────────────────────────────── */
  function init() {
    renderTimeline();

    document.querySelectorAll('.ab-selector .section-pill').forEach(btn => {
      btn.addEventListener('click', () => switchVariant(btn.dataset.variant));
    });

    switchVariant('B'); // Default to winner
  }

  return { init, renderChart: () => renderChart(activeVariant) };
})();
