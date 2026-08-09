/**
 * @reportkit/ui — browser helpers (ES5 / jQuery).
 *
 * Peers: jQuery >= 1.10. DataTables optional for ReportKit.table.mount.
 */
(function (window) {
    'use strict';

    var ReportKit = window.ReportKit || {};

    ReportKit.brand = ReportKit.brand || {
        pdf_disclaimer: 'This document was generated for authorized use only.',
        accent: '#0b7a4b'
    };

    ReportKit.version = '0.1.0';

    function jq() {
        return window.jQuery || null;
    }

    /**
     * Optional Google Fonts inject for Manrope + Sora (CAS standard).
     */
    ReportKit.fonts = {
        ensure: function () {
            if (typeof document === 'undefined') {
                return;
            }
            if (document.getElementById('rk-fonts')) {
                return;
            }
            var link = document.createElement('link');
            link.id = 'rk-fonts';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Sora:wght@600;700&display=swap';
            document.head.appendChild(link);
        }
    };

    /**
     * Sync generate overlay (classic form submit).
     */
    ReportKit.syncLoader = {
        show: function (selector) {
            var $ = jq();
            if (!$) {
                return;
            }
            $(selector || '#rkSyncLoading').addClass('is-visible').show();
        },
        hide: function (selector) {
            var $ = jq();
            if (!$) {
                return;
            }
            $(selector || '#rkSyncLoading').removeClass('is-visible').hide();
        },
        bindForm: function (formSelector, loaderSelector) {
            var $ = jq();
            if (!$) {
                return;
            }
            $(formSelector || '#search-pan').on('submit', function () {
                ReportKit.syncLoader.show(loaderSelector);
            });
        }
    };

    /**
     * Async prepare overlay + progress bar.
     */
    ReportKit.asyncLoader = {
        show: function (selector, message) {
            var $ = jq();
            if (!$) {
                return;
            }
            var $el = $(selector || '#rkAsyncLoading');
            if (message) {
                $el.find('.rk-async-loading-msg').text(message);
            }
            $el.addClass('is-visible').show();
        },
        hide: function (selector) {
            var $ = jq();
            if (!$) {
                return;
            }
            $(selector || '#rkAsyncLoading').removeClass('is-visible').hide();
        },
        setProgress: function (pct, selector) {
            var $ = jq();
            if (!$) {
                return;
            }
            var n = Math.max(0, Math.min(100, Number(pct) || 0));
            $(selector || '#rkAsyncLoading').find('.rk-progress-bar').css('width', n + '%');
        }
    };

    /**
     * DataTables mount + export helpers.
     * definition: { ajax, columns, pageLength, lengthMenu, serverSide, order, ... }
     */
    ReportKit.table = {
        mount: function (selector, definition) {
            var $ = jq();
            definition = definition || {};
            if (!$ || !$.fn || !$.fn.dataTable) {
                if (typeof console !== 'undefined' && console.warn) {
                    console.warn('ReportKit.table.mount requires jQuery DataTables');
                }
                return null;
            }
            var options = {
                serverSide: definition.serverSide !== false,
                processing: definition.processing !== false,
                pageLength: definition.pageLength || 25,
                lengthMenu: definition.lengthMenu || [10, 25, 50, 100],
                ajax: definition.ajax,
                columns: definition.columns || [],
                order: definition.order || [],
                searching: definition.searching !== false,
                deferLoading: typeof definition.deferLoading === 'number' ? definition.deferLoading : 0,
                dom: definition.dom || 'lfrtip'
            };
            if (definition.createdRow) {
                options.createdRow = definition.createdRow;
            }
            if (definition.drawCallback) {
                options.drawCallback = definition.drawCallback;
            }
            var api = $(selector).DataTable(options);
            $(selector).trigger('rk:table:mounted', [api]);
            return api;
        },

        /**
         * Flatten current DataTables view into plain row objects/arrays for client compose.
         * Does not re-query the server.
         */
        toPreparedRows: function (tableApi) {
            if (!tableApi || typeof tableApi.rows !== 'function') {
                return [];
            }
            return tableApi.rows({ search: 'applied' }).data().toArray();
        },

        /**
         * Reload with optional reset of paging.
         */
        reload: function (tableApi, resetPaging) {
            if (!tableApi || !tableApi.ajax || typeof tableApi.ajax.reload !== 'function') {
                return;
            }
            tableApi.ajax.reload(null, resetPaging !== false);
        }
    };

    /**
     * Set KPI card values from a summary map { key: { value, hint, tone } }.
     */
    ReportKit.kpi = {
        apply: function (rootSelector, summary) {
            var $ = jq();
            if (!$ || !summary) {
                return;
            }
            var $root = $(rootSelector || '.rk-kpi-row');
            Object.keys(summary).forEach(function (key) {
                var item = summary[key] || {};
                var $card = $root.find('[data-rk-kpi="' + key + '"]');
                if (!$card.length) {
                    return;
                }
                if (typeof item.value !== 'undefined') {
                    $card.find('.rk-kpi-value').text(item.value);
                }
                if (typeof item.hint !== 'undefined') {
                    $card.find('.rk-kpi-hint').text(item.hint);
                }
                $card.removeClass('is-good is-bad is-warn');
                if (item.tone) {
                    $card.addClass('is-' + item.tone);
                }
            });
        }
    };

    window.ReportKit = ReportKit;
}(window));
