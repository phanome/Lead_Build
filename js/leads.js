/* ===================================================
   LEAD BUILD — LEADS.JS
   Module 1: Lead Database Build
   =================================================== */

'use strict';

const LeadsModule = (() => {

  /* ── Sample Lead Data ─────────────────────────────── */
  const LEADS = [
    {
      id: 1,
      company: 'Acme Corp',
      industry: 'Manufacturing',
      size: 'Enterprise',
      contact: 'Jane Smith',
      title: 'VP Operations',
      email: 'jane.smith@acmecorp.com',
      linkedin: 'https://linkedin.com/in/janesmith',
      signal: 'Legacy ERP',
      signalType: 'legacy',
      tier: 'Tier 1',
      source: 'LinkedIn Sales Navigator',
      notes: 'Recently posted 3 IT admin roles — clear sign of tech stack overhaul.',
      industryMatch: 'Exact', sizeMatch: 'Target', signalScore: 9, budgetScore: 10, accessScore: 7,
    },
    {
      id: 2,
      company: 'CloudSync',
      industry: 'SaaS',
      size: 'SMB',
      contact: 'Tom Hardy',
      title: 'Founder & CEO',
      email: 'tom@cloudsync.io',
      linkedin: 'https://linkedin.com/in/tomhardy',
      signal: 'Recently Funded',
      signalType: 'funded',
      tier: 'Tier 1',
      source: 'Apollo.io',
      notes: 'Series A $12M (Jan 2026). Growing sales team from 2 to 8 reps.',
      industryMatch: 'Exact', sizeMatch: 'Close', signalScore: 10, budgetScore: 8, accessScore: 9,
    },
    {
      id: 3,
      company: 'MediLife Systems',
      industry: 'Healthcare',
      size: 'Mid-Market',
      contact: 'Dr. Sarah Lee',
      title: 'Head of IT & Digital',
      email: 'slee@medilife.org',
      linkedin: 'https://linkedin.com/in/drsarahlee',
      signal: 'Hiring IT Admins',
      signalType: 'hiring',
      tier: 'Tier 2',
      source: 'LinkedIn Sales Navigator',
      notes: '4 open IT roles this quarter. Using fragmented toolstack.',
      industryMatch: 'Adjacent', sizeMatch: 'Target', signalScore: 7, budgetScore: 6, accessScore: 5,
    },
    {
      id: 4,
      company: 'FinTrust Capital',
      industry: 'Finance',
      size: 'Enterprise',
      contact: 'Mark Evans',
      title: 'CFO',
      email: 'mark.evans@fintrust.net',
      linkedin: 'https://linkedin.com/in/markevans',
      signal: 'None',
      signalType: 'none',
      tier: 'Tier 3',
      source: 'Hunter.io',
      notes: 'Large org, long sales cycle. No clear trigger yet.',
      industryMatch: 'Adjacent', sizeMatch: 'Target', signalScore: 0, budgetScore: 10, accessScore: 4,
    },
    {
      id: 5,
      company: 'DevSolutions Ltd',
      industry: 'SaaS',
      size: 'Mid-Market',
      contact: 'Anna Wu',
      title: 'CTO',
      email: 'anna@devsolutions.com',
      linkedin: 'https://linkedin.com/in/annawu',
      signal: 'Using Competitor',
      signalType: 'rival',
      tier: 'Tier 1',
      source: 'BuiltWith + Apollo.io',
      notes: 'BuiltWith confirms Salesforce usage — renewal window Q3.',
      industryMatch: 'Exact', sizeMatch: 'Target', signalScore: 10, budgetScore: 9, accessScore: 8,
    },
    {
      id: 6,
      company: 'BuildRite Construction',
      industry: 'Manufacturing',
      size: 'SMB',
      contact: 'Carlos Diaz',
      title: 'Owner',
      email: 'carlos@buildrite.com',
      linkedin: 'https://linkedin.com/in/carlosdiaz',
      signal: 'None',
      signalType: 'none',
      tier: 'Tier 3',
      source: 'LinkedIn Sales Navigator',
      notes: 'Small team, budget likely constrained. Low priority.',
      industryMatch: 'Exact', sizeMatch: 'Close', signalScore: 0, budgetScore: 2, accessScore: 6,
    },
    {
      id: 7,
      company: 'CarePlus Health',
      industry: 'Healthcare',
      size: 'Enterprise',
      contact: 'Robert Chang',
      title: 'Director of Procurement',
      email: 'rchang@careplus.com',
      linkedin: 'https://linkedin.com/in/robertchang',
      signal: 'Recently Funded',
      signalType: 'funded',
      tier: 'Tier 2',
      source: 'Apollo.io',
      notes: 'Government grant $8M for digital transformation. Procurement cycle started.',
      industryMatch: 'Adjacent', sizeMatch: 'Target', signalScore: 8, budgetScore: 7, accessScore: 5,
    },
    {
      id: 8,
      company: 'PayFlow Fintech',
      industry: 'Finance',
      size: 'SMB',
      contact: 'Emily Chen',
      title: 'CEO & Co-Founder',
      email: 'emily@payflow.co',
      linkedin: 'https://linkedin.com/in/emilychen',
      signal: 'Using Competitor',
      signalType: 'rival',
      tier: 'Tier 2',
      source: 'BuiltWith + Hunter.io',
      notes: 'On HubSpot Starter — likely hitting limitations as they scale.',
      industryMatch: 'Adjacent', sizeMatch: 'Close', signalScore: 8, budgetScore: 5, accessScore: 7,
    },
    {
      id: 9,
      company: 'DataMind AI',
      industry: 'SaaS',
      size: 'Enterprise',
      contact: 'Chris Taylor',
      title: 'VP of Revenue',
      email: 'chris@datamind.ai',
      linkedin: 'https://linkedin.com/in/christaylor',
      signal: 'Hiring Engineers',
      signalType: 'hiring',
      tier: 'Tier 1',
      source: 'LinkedIn Sales Navigator',
      notes: '12 open sales-adjacent roles. Aggressive expansion into EMEA.',
      industryMatch: 'Exact', sizeMatch: 'Target', signalScore: 9, budgetScore: 10, accessScore: 9,
    },
    {
      id: 10,
      company: 'AutoParts Direct',
      industry: 'Manufacturing',
      size: 'Mid-Market',
      contact: 'Laura White',
      title: 'Supply Chain Manager',
      email: 'lwhite@autoparts.com',
      linkedin: 'https://linkedin.com/in/laurawhite',
      signal: 'None',
      signalType: 'none',
      tier: 'Tier 3',
      source: 'Apollo.io',
      notes: 'Traditional supply chain background, low tech adoption.',
      industryMatch: 'Exact', sizeMatch: 'Target', signalScore: 0, budgetScore: 4, accessScore: 3,
    },
    {
      id: 11,
      company: 'Nexify Growth',
      industry: 'SaaS',
      size: 'SMB',
      contact: 'Priya Nair',
      title: 'Head of Sales',
      email: 'priya@nexify.io',
      linkedin: 'https://linkedin.com/in/priyanair',
      signal: 'Recently Funded',
      signalType: 'funded',
      tier: 'Tier 1',
      source: 'Apollo.io',
      notes: 'Pre-seed $2M. Founder-led sales. Perfect early adopter profile.',
      industryMatch: 'Exact', sizeMatch: 'Close', signalScore: 10, budgetScore: 6, accessScore: 10,
    },
    {
      id: 12,
      company: 'Meridian Analytics',
      industry: 'Finance',
      size: 'Mid-Market',
      contact: 'James Okafor',
      title: 'Chief Data Officer',
      email: 'james@meridian-analytics.com',
      linkedin: 'https://linkedin.com/in/jamesokafor',
      signal: 'Using Competitor',
      signalType: 'rival',
      tier: 'Tier 2',
      source: 'BuiltWith',
      notes: 'Pipedrive users — publicly complained about weak reporting on G2.',
      industryMatch: 'Adjacent', sizeMatch: 'Target', signalScore: 8, budgetScore: 7, accessScore: 6,
    },
    {
      id: 13,
      company: 'PharmaLink',
      industry: 'Healthcare',
      size: 'Enterprise',
      contact: 'Susan Park',
      title: 'VP IT & Security',
      email: 'spark@pharmalink.com',
      linkedin: 'https://linkedin.com/in/susanpark',
      signal: 'Hiring IT Admins',
      signalType: 'hiring',
      tier: 'Tier 2',
      source: 'LinkedIn Sales Navigator',
      notes: 'HIPAA compliance initiative underway. Evaluating new vendors.',
      industryMatch: 'Adjacent', sizeMatch: 'Target', signalScore: 7, budgetScore: 9, accessScore: 5,
    },
    {
      id: 14,
      company: 'SkyOps Logistics',
      industry: 'Manufacturing',
      size: 'Mid-Market',
      contact: 'Derek Walsh',
      title: 'Operations Director',
      email: 'd.walsh@skyops.net',
      linkedin: 'https://linkedin.com/in/derekwalsh',
      signal: 'Legacy ERP',
      signalType: 'legacy',
      tier: 'Tier 1',
      source: 'LinkedIn job post + Hunter.io',
      notes: 'Job post: "SAP to modern ERP migration". Clear pain, now.',
      industryMatch: 'Exact', sizeMatch: 'Target', signalScore: 9, budgetScore: 8, accessScore: 7,
    },
    {
      id: 15,
      company: 'Vertigo Studios',
      industry: 'SaaS',
      size: 'SMB',
      contact: 'Maya Torres',
      title: 'Founder',
      email: 'maya@vertigostudios.co',
      linkedin: 'https://linkedin.com/in/mayatorres',
      signal: 'Recently Funded',
      signalType: 'funded',
      tier: 'Tier 1',
      source: 'Apollo.io',
      notes: 'Angel round $500K. Building sales team for first time.',
      industryMatch: 'Exact', sizeMatch: 'Close', signalScore: 10, budgetScore: 5, accessScore: 9,
    },
  ];

  /* ── State ──────────────────────────────────────────── */
  let sortKey = 'tier';
  let sortAsc = true;
  let openRowId = null;

  /* ── Helpers ─────────────────────────────────────────── */
  function getSignalHtml(lead) {
    const labels = {
      funded:  `<span class="badge signal-funded">💸 ${lead.signal}</span>`,
      hiring:  `<span class="badge signal-hiring">📈 ${lead.signal}</span>`,
      rival:   `<span class="badge signal-rival">⚔️ ${lead.signal}</span>`,
      legacy:  `<span class="badge signal-legacy">⚠️ ${lead.signal}</span>`,
      none:    `<span class="signal-none">—</span>`,
    };
    return labels[lead.signalType] || labels.none;
  }

  function getTierBadgeClass(tier) {
    return { 'Tier 1': 'badge-green', 'Tier 2': 'badge-amber', 'Tier 3': 'badge-gray' }[tier] || 'badge-gray';
  }

  function tierOrder(t) { return { 'Tier 1': 1, 'Tier 2': 2, 'Tier 3': 3 }[t] || 9; }

  function getFiltered() {
    const industry = document.getElementById('filter-industry').value;
    const size     = document.getElementById('filter-size').value;
    const tier     = document.getElementById('filter-tier').value;
    const signal   = document.getElementById('filter-signal').value;
    const query    = document.getElementById('search-leads').value.toLowerCase();

    return LEADS.filter(l => {
      if (industry !== 'All' && l.industry !== industry) return false;
      if (size     !== 'All' && l.size     !== size)     return false;
      if (tier     !== 'All' && l.tier     !== tier)     return false;
      if (signal   !== 'All' && l.signalType !== signal) return false;
      if (query && ![l.company, l.contact, l.title, l.email, l.notes]
        .some(f => f.toLowerCase().includes(query))) return false;
      return true;
    });
  }

  function getSorted(leads) {
    return [...leads].sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (sortKey === 'tier') { va = tierOrder(va); vb = tierOrder(vb); }
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ?  1 : -1;
      return 0;
    });
  }

  /* ── Render Table ─────────────────────────────────────── */
  function renderTable() {
    const tbody   = document.getElementById('leads-tbody');
    const filtered = getSorted(getFiltered());

    // Update stat cards
    const t1 = filtered.filter(l => l.tier === 'Tier 1').length;
    const t2 = filtered.filter(l => l.tier === 'Tier 2').length;
    const signals = filtered.filter(l => l.signalType !== 'none').length;

    animateStat('stat-total',   filtered.length);
    animateStat('stat-tier1',   t1);
    animateStat('stat-tier2',   t2);
    animateStat('stat-signals', signals);

    tbody.innerHTML = '';

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:var(--sp-10);color:var(--txt-muted)">
        <div style="font-size:32px;margin-bottom:var(--sp-3)">🔍</div>
        No leads match the current filters.
      </td></tr>`;
      return;
    }

    filtered.forEach(lead => {
      const isOpen = openRowId === lead.id;
      const tierClass = lead.tier === 'Tier 1' ? ' tier1-row' : '';

      // Main row
      const tr = document.createElement('tr');
      tr.className = `lead-row${tierClass}`;
      tr.dataset.id = lead.id;
      tr.innerHTML = `
        <td>
          <span class="rank-badge" style="width:22px;height:22px;font-size:10px">
            ${lead.tier === 'Tier 1' ? '🥇' : lead.tier === 'Tier 2' ? '🥈' : '🥉'}
          </span>
        </td>
        <td class="company-cell">${Utils.escape(lead.company)}</td>
        <td>${Utils.escape(lead.industry)}</td>
        <td><span class="badge badge-gray">${Utils.escape(lead.size)}</span></td>
        <td>${Utils.escape(lead.contact)}</td>
        <td style="color:var(--txt-muted);font-size:var(--fs-xs)">${Utils.escape(lead.title)}</td>
        <td><a href="mailto:${lead.email}" style="font-size:var(--fs-xs)">${lead.email}</a></td>
        <td>${getSignalHtml(lead)}</td>
        <td><span class="badge ${getTierBadgeClass(lead.tier)}">${lead.tier}</span></td>
      `;
      tr.addEventListener('click', () => toggleDetail(lead.id, filtered));
      tbody.appendChild(tr);

      // Detail drawer row
      const trDetail = document.createElement('tr');
      trDetail.className = `detail-row${isOpen ? ' open' : ''}`;
      trDetail.id = `detail-${lead.id}`;
      trDetail.innerHTML = `<td colspan="9">
        <div class="detail-drawer">
          <div>
            <div class="detail-field-label">📧 Email</div>
            <div class="detail-field-value"><a href="mailto:${lead.email}">${lead.email}</a></div>
            <div class="detail-field-label" style="margin-top:var(--sp-3)">🔗 LinkedIn</div>
            <div class="detail-field-value"><a href="${lead.linkedin}" target="_blank" rel="noopener">View Profile ↗</a></div>
          </div>
          <div>
            <div class="detail-field-label">📡 Buying Signal</div>
            <div class="detail-field-value">${getSignalHtml(lead)}</div>
            <div class="detail-field-label" style="margin-top:var(--sp-3)">🗂 Source</div>
            <div class="detail-field-value" style="color:var(--txt-secondary)">${Utils.escape(lead.source)}</div>
          </div>
          <div>
            <div class="detail-field-label">📝 Notes</div>
            <div class="detail-field-value" style="color:var(--txt-secondary);line-height:1.6">${Utils.escape(lead.notes)}</div>
          </div>
        </div>
      </td>`;
      tbody.appendChild(trDetail);
    });

    // Update sort indicators
    document.querySelectorAll('.data-table th[data-sort]').forEach(th => {
      th.classList.toggle('sorted', th.dataset.sort === sortKey);
      const icon = th.querySelector('.sort-icon');
      if (icon && th.dataset.sort === sortKey) {
        icon.textContent = sortAsc ? '▲' : '▼';
      } else if (icon) {
        icon.textContent = '⇅';
      }
    });
  }

  function toggleDetail(id, filtered) {
    openRowId = openRowId === id ? null : id;
    renderTable();
    if (openRowId !== null) {
      const el = document.getElementById(`detail-${openRowId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function animateStat(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    Utils.animateCount(el, target, '', '', 500);
  }

  /* ── Export CSV ─────────────────────────────────────── */
  function exportCSV() {
    const headers = ['Company','Industry','Size','Contact','Title','Email','LinkedIn','Signal','Tier','Source','Notes'];
    const rows = getFiltered().map(l => [
      l.company, l.industry, l.size, l.contact, l.title,
      l.email, l.linkedin, l.signal, l.tier, l.source, l.notes
    ]);
    Utils.downloadCSV([headers, ...rows], 'lead-build-export.csv');
    Toast.show('Lead list exported to CSV ✓', 'success');
  }

  /* ── Init ────────────────────────────────────────────── */
  function init() {
    // Filter listeners
    ['filter-industry', 'filter-size', 'filter-tier', 'filter-signal', 'search-leads'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', renderTable);
      document.getElementById(id)?.addEventListener('change', renderTable);
    });

    // Sort headers
    document.querySelectorAll('.data-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        if (sortKey === th.dataset.sort) {
          sortAsc = !sortAsc;
        } else {
          sortKey = th.dataset.sort;
          sortAsc = true;
        }
        renderTable();
      });
    });

    // Export button
    document.getElementById('btn-export-leads')?.addEventListener('click', exportCSV);

    renderTable();
  }

  /* ── Public API ──────────────────────────────────────── */
  return {
    init,
    getLeadsData: () => LEADS,
  };
})();
