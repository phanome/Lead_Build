/* ===================================================
   LEAD BUILD — ICP.JS
   Module 3: ICP Framework & Lead Scoring
   =================================================== */

'use strict';

const ICPModule = (() => {

  /* ── Scoring Weights (synced from sliders) ─────────── */
  let weights = {
    industry: 25,
    size:     20,
    signal:   25,
    budget:   15,
    access:   15,
  };

  /* ── Score a single lead ───────────────────────────── */
  function scoreLeadRaw(lead) {
    // Industry (Exact=10, Adjacent=5, None=0)
    const indScore = { Exact: 10, Adjacent: 5, 'No Match': 0 }[lead.industryMatch] ?? 0;
    // Size (Target=10, Close=5, None=0)
    const sizeScore = { Target: 10, Close: 5, None: 0 }[lead.sizeMatch] ?? 0;

    return (
      indScore        * (weights.industry / 100) +
      sizeScore       * (weights.size     / 100) +
      lead.signalScore * (weights.signal   / 100) +
      lead.budgetScore * (weights.budget   / 100) +
      lead.accessScore * (weights.access   / 100)
    );
  }

  function getTierForScore(score) {
    if (score >= 8.0) return 'Tier 1';
    if (score >= 5.5) return 'Tier 2';
    return 'Tier 3';
  }

  function getTierBadgeClass(tier) {
    return { 'Tier 1': 'badge-green', 'Tier 2': 'badge-amber', 'Tier 3': 'badge-gray' }[tier] || 'badge-gray';
  }

  function getRankBadgeClass(idx) {
    return ['gold', 'silver', 'bronze'][idx] || '';
  }

  /* ── Render Ranked Leads Table ─────────────────────── */
  function renderLeads() {
    const tbody = document.getElementById('icp-tbody');
    if (!tbody) return;

    const leads = (typeof LeadsModule !== 'undefined')
      ? LeadsModule.getLeadsData()
      : [];

    if (leads.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:var(--sp-8);color:var(--txt-muted)">No lead data available.</td></tr>`;
      return;
    }

    const scored = leads
      .map(l => ({ ...l, _score: parseFloat(scoreLeadRaw(l).toFixed(2)) }))
      .sort((a, b) => b._score - a._score);

    tbody.innerHTML = '';
    scored.forEach((lead, idx) => {
      const tier = getTierForScore(lead._score);
      const rankClass = getRankBadgeClass(idx);
      const scoreBarWidth = Math.round((lead._score / 10) * 100);
      const rankEmoji = ['🥇', '🥈', '🥉'][idx] ?? '';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <span class="rank-badge ${rankClass}">${rankEmoji || (idx + 1)}</span>
        </td>
        <td style="font-weight:var(--fw-semi);color:var(--txt-primary)">${Utils.escape(lead.company)}</td>
        <td style="color:var(--txt-muted);font-size:var(--fs-xs)">${Utils.escape(lead.industry)}</td>
        <td class="score-bar-cell">
          <div class="score-bar-track">
            <div class="score-bar-fill" style="width:${scoreBarWidth}%"></div>
          </div>
          <div class="score-number">${lead._score.toFixed(1)} / 10</div>
        </td>
        <td><span class="badge ${getTierBadgeClass(tier)}">${tier}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* ── Render ICP Criteria Summary ─────────────────────── */
  function renderOnepager() {
    const criteriaList = document.getElementById('icp-criteria-list');
    if (!criteriaList) return;

    const criteria = [
      { key: 'industry', label: 'Industry Match',          desc: 'Exact = 10, Adjacent = 5' },
      { key: 'size',     label: 'Company Size Fit',        desc: 'In target range = 10, Close = 5' },
      { key: 'signal',   label: 'Buying Signal Present',   desc: 'Funded / Hiring / Using rival = 10' },
      { key: 'budget',   label: 'Budget / Tech Indicator', desc: 'Enterprise stack in use = 10' },
      { key: 'access',   label: 'Accessibility',           desc: 'Direct contact or warm intro = 10' },
    ];

    criteriaList.innerHTML = criteria.map(c => `
      <div class="icp-criterion">
        <span class="icp-criterion-name">${c.label}</span>
        <div class="icp-criterion-bar-track">
          <div class="icp-criterion-bar-fill" id="onepager-bar-${c.key}" style="width:${weights[c.key]}%"></div>
        </div>
        <span class="icp-criterion-weight" id="onepager-weight-${c.key}">${weights[c.key]}%</span>
      </div>
    `).join('');
  }

  /* ── Update Weights from Sliders ─────────────────────── */
  function updateWeights() {
    let total = 0;

    document.querySelectorAll('.icp-slider').forEach(slider => {
      const key = slider.dataset.target;
      const val = parseInt(slider.value, 10);
      weights[key] = val;
      total += val;

      // Update display value
      const disp = document.getElementById(`disp-weight-${key}`);
      if (disp) disp.textContent = `${val}%`;

      // Update one-pager bar
      const bar = document.getElementById(`onepager-bar-${key}`);
      if (bar) bar.style.width = `${val}%`;
      const wt  = document.getElementById(`onepager-weight-${key}`);
      if (wt) wt.textContent = `${val}%`;
    });

    // Update total indicator
    const totalEl = document.getElementById('icp-total-weight');
    if (totalEl) {
      totalEl.textContent = `${total}%`;
      totalEl.className = `total-weight-value ${total === 100 ? 'ok' : 'bad'}`;
    }

    renderLeads();
  }

  /* ── Print / Export ICP one-pager ───────────────────── */
  function printOnepager() {
    window.print();
  }

  /* ── Init ─────────────────────────────────────────────── */
  function init() {
    document.querySelectorAll('.icp-slider').forEach(slider => {
      slider.addEventListener('input', updateWeights);
    });

    document.getElementById('btn-print-icp')?.addEventListener('click', printOnepager);

    renderOnepager();
    updateWeights();
  }

  return { init };
})();
