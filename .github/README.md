<p align="center">
  <img src="https://raw.githubusercontent.com/Maijied/Reportkit-UI/main/assets/reportkit-logo.png" alt="@reportkit/ui" width="168">
</p>

<h1 align="center">@reportkit/ui</h1>

<p align="center"><strong>The browser layer for ReportKit — design tokens, page chrome, and DataTables helpers.</strong></p>

<p align="center">
  <a href="https://www.npmjs.com/package/@reportkit/ui"><img alt="npm version" src="https://img.shields.io/npm/v/@reportkit/ui?color=0b7a4b"></a>
  <a href="https://www.npmjs.com/package/@reportkit/ui"><img alt="npm downloads" src="https://img.shields.io/npm/dt/@reportkit/ui?color=0b7a4b"></a>
  <img alt="jQuery" src="https://img.shields.io/badge/peer-jQuery%20%E2%89%A5%201.10-0769ad">
  <a href="https://github.com/Maijied/Reportkit-UI/actions/workflows/publish.yml"><img alt="CI" src="https://github.com/Maijied/Reportkit-UI/actions/workflows/publish.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/npm/l/@reportkit/ui?color=0b7a4b"></a>
</p>

<p align="center">
  <a href="https://reportkit.lorapok.tech">Website &amp; Docs</a> ·
  <a href="https://reportkit.lorapok.tech/showcase">Live Demo</a> ·
  <a href="docs/CSS.md">CSS</a> ·
  <a href="docs/JS.md">JS</a>
</p>

> **Part of the Lorapok Labs ecosystem.** Framework-free CSS + JS that pairs with the [`reportkit/core`](https://github.com/Maijied/Reportkit-Core) engine and its Laravel adapters.

---

## What is @reportkit/ui?

`@reportkit/ui` gives ReportKit reports a consistent, professional look and the client behaviour they need: CAS design tokens, page chrome, sync/async loaders, KPI cards, and first-class server-side DataTables helpers — including **export the current view without re-querying**.

## Architecture

```mermaid
graph TB
  subgraph ui ["@reportkit/ui"]
    CSS["css/reportkit.css"]
    Compat["css/reportkit-compat.css"]
    JS["js/reportkit.js"]
  end
  subgraph runtime ["Browser"]
    Fonts["ReportKit.fonts"]
    Sync["ReportKit.syncLoader"]
    Async["ReportKit.asyncLoader"]
    Table["ReportKit.table"]
    Kpi["ReportKit.kpi"]
  end
  Host["Host Blade / HTML"]
  CSS --> Host
  Compat --> Host
  JS --> Fonts
  JS --> Sync
  JS --> Async
  JS --> Table
  JS --> Kpi
```

Layout order (CAS): **page-head → filter → summary → KPI → panels → loaders → send → howto**.

---

## JS surface

| API | Purpose |
|-----|---------|
| `ReportKit.fonts.ensure()` | Inject Manrope/Sora |
| `ReportKit.syncLoader.*` | Classic form overlay |
| `ReportKit.asyncLoader.*` | Prepare progress overlay |
| `ReportKit.table.mount()` | DataTables serverSide mount |
| `ReportKit.table.toPreparedRows(api)` | Export current view — **no re-query** |
| `ReportKit.kpi.apply()` | Fill KPI cards from summary JSON |

## Requirements

- Peer: **jQuery ≥ 1.10.0**
- Optional peer: DataTables (`datatables.net`) for `ReportKit.table.mount`

## Install

```bash
npm install @reportkit/ui
```

Beta channel:

```bash
npm install @reportkit/ui@beta
```

### Use in a page

```html
<link rel="stylesheet" href="path/to/reportkit.css">
<link rel="stylesheet" href="path/to/reportkit-compat.css"><!-- optional CAS aliases -->

<script src="jquery.min.js"></script>
<script src="jquery.dataTables.min.js"></script><!-- optional -->
<script src="path/to/reportkit.js"></script>
```

```js
ReportKit.fonts.ensure();
ReportKit.syncLoader.bindForm('#search-pan', '#rkSyncLoading');

var table = ReportKit.table.mount('#rkTable', {
  ajax: '/admin/demo-report/data',
  columns: [
    { data: 'id', title: 'ID' },
    { data: 'name', title: 'Name' }
  ]
});
```

Docs: [docs/CSS.md](docs/CSS.md) · [docs/JS.md](docs/JS.md)

---

## Ecosystem

| Package | Role |
|---------|------|
| [`reportkit/core`](https://github.com/Maijied/Reportkit-Core) | PHP engine (5.6 → 8.5) |
| [`reportkit/laravel-legacy`](https://github.com/Maijied/Reportkit-Laravel-Legacy) | Laravel 4.1–5.4 |
| [`reportkit/laravel`](https://github.com/Maijied/Reportkit-Laravel) | Laravel 5.5 → 12 / 13 |
| [`@reportkit/ui`](https://github.com/Maijied/Reportkit-UI) | This repository |

## Author

**Mohammad Maizied Hasan Majumder** · [mdshuvo40@gmail.com](mailto:mdshuvo40@gmail.com)
Founder &amp; Principal Engineer at **Lorapok Labs** · Senior Software Engineer @ **Shohoz Ltd**

## License

MIT © Mohammad Maizied Hasan Majumder / Lorapok Labs
