// src/helpers/privateCaptcha.js
export function getPrivateCaptchaSiteKeyByDomain() {
    const hostname = window.location.hostname.toLowerCase();

    // EU domein
    if (hostname.endsWith('.eu')) {
        return window.__SERVER_DATA__?.privatecaptcha_sitekey_eu ?? null;
    }

    // Default NL
    return window.__SERVER_DATA__?.privatecaptcha_sitekey_nl ?? null;
}
