<?php
// === settings (haal uit config-rest-api.php) ===
$config = require __DIR__ . '/../../config-rest-api.php';

$laravelBaseUrl = $config['base_url'];
$clientId       = $config['client_id'];
$clientSecret   = $config['client_secret'];
$scope          = $config['scope'];

// ---------- eenvoudige file-based token cache ----------
function cache_get($key) {
    $file = sys_get_temp_dir() . "/$key.json";
    if (!is_file($file)) return null;
    $payload = json_decode(file_get_contents($file), true);
    if (!$payload) return null;
    // verlopen?
    if (($payload['expires_at'] ?? 0) <= time() + 30) return null;
    return $payload['access_token'] ?? null;
}
function cache_set($key, $accessToken, $expiresIn) {
    $file = sys_get_temp_dir() . "/$key.json";
    file_put_contents($file, json_encode([
        'access_token' => $accessToken,
        'expires_at'   => time() + (int)$expiresIn,
    ], JSON_UNESCAPED_SLASHES));
}

// JSON headers
header('Content-Type: application/json');

// Alleen POST accepteren
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

// JSON body lezen
$input = json_decode(file_get_contents('php://input'), true) ?? [];
$contactnr = isset($input['contactnr']) ? trim((string)$input['contactnr']) : '';

if ($contactnr === '') {
    http_response_code(400);
    echo json_encode(['error' => 'contactnr_missing']);
    exit;
}

// 1) access token (cache first)
$cacheKey    = 'econobis_rest_api_token_' . $clientId . '_' . str_replace([' ', ':'], '_', $scope);
$accessToken = cache_get($cacheKey);

if (!$accessToken) {
    $tokenUrl = $laravelBaseUrl . '/oauth/token';

    $tokenPayload = [
        'grant_type'    => 'client_credentials',
        'client_id'     => $clientId,
        'client_secret' => $clientSecret,
        'scope'         => $scope,
    ];

    $ch = curl_init($tokenUrl);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['Accept: application/json'],
        CURLOPT_POSTFIELDS     => http_build_query($tokenPayload),
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT        => 10,
    ]);
    $tokenResponse = curl_exec($ch);
    $httpCode      = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr       = curl_error($ch);
    curl_close($ch);

    if ($tokenResponse === false || $httpCode !== 200) {
        http_response_code(502);
        echo json_encode([
            'error'  => 'token_request_failed',
            'status' => $httpCode,
            'curl'   => $curlErr,
            'body'   => $tokenResponse,
        ]);
        exit;
    }

    $tokenData   = json_decode($tokenResponse, true);
    $accessToken = $tokenData['access_token'] ?? null;
    $expiresIn   = $tokenData['expires_in'] ?? 0;

    if (!$accessToken) {
        http_response_code(502);
        echo json_encode([
            'error' => 'no_access_token_in_response',
            'body'  => $tokenResponse,
        ]);
        exit;
    }

    cache_set($cacheKey, $accessToken, (int)$expiresIn);
}

// 2) call jullie REST endpoint
$contactUrl = $laravelBaseUrl . '/rest-api/contact/' . rawurlencode($contactnr);

$ch = curl_init($contactUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Accept: application/json',
        'Authorization: Bearer ' . $accessToken,
    ],
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT        => 10,
]);
$contactResponse = curl_exec($ch);
$curlErr         = curl_error($ch);
$contactHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($contactResponse === false) {
    http_response_code(502);
    echo json_encode(['error' => 'upstream_failed', 'details' => $curlErr]);
    exit;
}

// Geef status + body door aan de browser
http_response_code($contactHttpCode);
echo $contactResponse;
