# CSS tokens & layout

## Tokens (`:root`)

| Token | Default | Role |
|-------|---------|------|
| `--rk-accent` | `#0b7a4b` | Primary green (CAS) |
| `--rk-accent-deep` | `#096640` | Hover / emphasis |
| `--rk-accent-soft` | `#e6f5ee` | Soft fills |
| `--rk-ink` | `#1f2f38` | Body text |
| `--rk-muted` | `#5a7385` | Secondary text |
| `--rk-line` | `#d5dde3` | Borders |
| `--rk-surface` | `#ffffff` | Cards |
| `--rk-bg` | `#f4f6f7` | Page background |
| `--rk-font-body` | Manrope stack | Body |
| `--rk-font-head` | Sora stack | Titles |

## Sections (recommended order)

1. `.rk-page-head`
2. `.rk-filter-pan` (alias `.search-pan`)
3. `.rk-filter-summary`
4. `.rk-kpi-row` / `.rk-kpi-card`
5. `.rk-panel` (+ `.rk-panel-head` / `.rk-panel-body` / `.rk-table-x`)
6. `.rk-sync-loading` / `.rk-async-loading`
7. `.rk-send-panel`
8. `.rk-howto`

## Files

- `css/reportkit.css` — canonical `rk-*`
- `css/reportkit-compat.css` — `sales-*` / `cas-*` aliases for design-source hosts
