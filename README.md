# Lead Build — Sales Enablement App

A standalone premium web application designed for modern B2B sales teams. Built with a responsive, glassmorphic dark-mode design, this app provides three core modules to manage outbound sales workflows:

## Features

### 1. Lead Database Build
A structured, segmented prospect list that goes beyond simple data entry.
- Filter by industry, company size, tier, and buying signals.
- Live text search and column sorting.
- Auto-tiering based on firmographics and buying signals.
- Expandable detail drawers for notes and contact links.
- Export to CSV functionality.

### 2. Cold Outreach Campaign
Design, track, and measure your outbound sequences.
- Visual 4-step sequence timeline.
- A/B testing tracker for multiple message variants.
- Live Chart.js conversion funnel (Sent → Opened → Replied → Booked).
- Animated metric counters and automatic "What we learned" insights.

### 3. ICP Framework + Lead Scoring
Define your Ideal Customer Profile and dynamically score leads.
- Interactive weighting sliders (Industry, Size, Signal, Budget, Access).
- Real-time prospect list re-ranking based on slider adjustments.
- Visual score bars and ranking badges.
- Exportable/Printable ICP One-Pager summarizing your criteria.

## Technologies Used
- HTML5, CSS3, Vanilla JavaScript
- Chart.js (via CDN)
- Google Fonts (Outfit, Inter)

## Getting Started
1. Clone the repository.
2. Serve the directory using any local web server. For example:
   ```bash
   python3 -m http.server 8080
   ```
3. Open `http://localhost:8080` in your browser.
