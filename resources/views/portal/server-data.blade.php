window.__SERVER_DATA__ = window.__SERVER_DATA__ || {};

window.__SERVER_DATA__.base_url = "{{ $internalPortalUrl }}";
window.__SERVER_DATA__.client_id = "{{ $clientId }}";
window.__SERVER_DATA__.client_key = "{{ $secretKey }}";

// PrivateCaptcha keys
window.__SERVER_DATA__.privatecaptcha_sitekey_nl = "{{ $captchaSiteKeyNl }}";
window.__SERVER_DATA__.privatecaptcha_sitekey_eu = "{{ $captchaSiteKeyEu }}";
