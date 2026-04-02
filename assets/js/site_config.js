window.SiteConfig = null;

async function fetchSiteConfig() {
    try {
        const res = await fetch('/assets/json/site_config.json');
        if (!res.ok) return;

        window.SiteConfig = await res.json();
        window.resolveSiteConfig();
    } catch (err) {
        console.warn('[site-config] Failed to load config, using defaults.');
    }
}

// Apply config to DOM
window.resolveSiteConfig = function () {
    const config = window.SiteConfig;
    if (!config) return;

    /* ── Docs Links ───────────────────────────── */
    if (config.DOCS_URL) {
        document.querySelectorAll('.docs-link').forEach(link => {
            link.href = config.DOCS_URL;
        });
    }

    /* ── Platform Links ───────────────────────── */
    if (config.PLATFORM_URL) {
        const base = config.PLATFORM_URL.endsWith('/')
            ? config.PLATFORM_URL
            : config.PLATFORM_URL + '/';

        document.querySelectorAll('.platform-link').forEach(link => {
            const path = link.getAttribute('data-path') || '';
            link.href = base + path;
        });
    }

    /* ── Website Links ───────────────────────────── */
    if (config.WEBSITE_URL) {
        document.querySelectorAll('.website-link').forEach(link => {
            link.href = config.WEBSITE_URL;
        });
    }

    /* ── Site Name (optional reuse) ───────────── */
    if (config.SITE_NAME) {
        document.querySelectorAll('.site-name-text').forEach(el => {
            el.textContent = config.SITE_NAME;
        });
    }
};

// Init immediately
fetchSiteConfig();