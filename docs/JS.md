# JavaScript API

Requires **jQuery ≥ 1.10**. DataTables is required only for `ReportKit.table.mount`.

## `ReportKit.fonts.ensure()`

Injects Manrope + Sora from Google Fonts once.

## `ReportKit.syncLoader`

| Method | Description |
|--------|-------------|
| `show(selector?)` | Show `#rkSyncLoading` (default) |
| `hide(selector?)` | Hide overlay |
| `bindForm(form?, loader?)` | Show on form submit |

## `ReportKit.asyncLoader`

| Method | Description |
|--------|-------------|
| `show(selector?, message?)` | Show prepare overlay |
| `hide(selector?)` | Hide |
| `setProgress(pct, selector?)` | 0–100 width on `.rk-progress-bar` |

## `ReportKit.table`

| Method | Description |
|--------|-------------|
| `mount(selector, definition)` | `DataTable({ serverSide, ajax, columns, … })` |
| `toPreparedRows(api)` | Current filtered rows — **no server re-query** |
| `reload(api, resetPaging?)` | `ajax.reload` |

`mount` triggers `rk:table:mounted` on the table element with the API instance.

## `ReportKit.kpi.apply(root, summary)`

```js
ReportKit.kpi.apply('.rk-kpi-row', {
  tickets: { value: '1,240', hint: 'Sold', tone: 'good' }
});
```

Cards need `data-rk-kpi="tickets"` plus `.rk-kpi-value` / `.rk-kpi-hint`.
