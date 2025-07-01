// pkce.js

import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

function base64URLEncode(str) {
    return str
        .toString(Base64)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function generateRandomString(length = 43) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
}

export function generatePKCECodes() {
    const codeVerifier = generateRandomString();
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    return { codeVerifier, codeChallenge };
}
