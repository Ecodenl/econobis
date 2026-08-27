<!doctype html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Econobis Rest API - Toestemming</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#f5f7fa; margin:0; }
        .wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; }
        .card { width:100%; max-width:520px; background:#fff; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,.08); padding:24px 28px; box-sizing: border-box; }
        .logo-wrap { text-align: center; margin-bottom: 16px; }
        .logo { max-width:100%; height: 150px; width:auto; display:inline-block; }
        @media (max-width:480px) { .logo { height:110px; } }
        h1 { font-size:20px; margin:0 0 8px; }
        .muted { color:#667085; font-size:14px; margin:0 0 16px; }
        ul { margin:0 0 16px 18px; color:#344054; }
        .row { display:flex; gap:12px; justify-content:flex-end; }
        button { padding:10px 14px; border-radius:10px; border:0; cursor:pointer; font-weight:600; }
        .btn-cancel { background:#f2f4f7; color:#344054; }
        .btn-ok { background:#175cd3; color:#fff; }
    </style>
</head>
<body>
<div class="wrap">
    <div class="card">
        <div class="logo-wrap">
            <img
                    src="{{ asset('images/logo-ECO-2025.png') }}"
                    alt="Econobis logo"
                    class="logo"
            >
        </div>
        <h1>Econobis Rest API - Toestemming geven</h1>
        <p class="muted">
            <strong>{{ $client->name }}</strong> wil toegang tot je account voor applicatie <strong>{{ config('app.name') }}</strong>.
        </p>

        @if (count($scopes) > 0)
            <p class="muted">Deze applicatie krijgt toestemming voor:</p>
            <ul>
                @foreach ($scopes as $scope)
                    <li>{{ $scope->description }}</li>
                @endforeach
            </ul>
        @endif

        <div class="row">
            {{-- Deny form --}}
            <form method="post" action="{{ route('passport.authorizations.deny') }}" style="margin:0;">
                @csrf
                @method('DELETE')
                <input type="hidden" name="state" value="{{ $request->state }}">
                <input type="hidden" name="client_id" value="{{ $client->getKey() }}">
                <input type="hidden" name="auth_token" value="{{ $authToken }}">
                <button class="btn-cancel" type="submit">Afwijzen</button>
            </form>

            {{-- Approve form --}}
            <form method="post" action="{{ route('passport.authorizations.approve') }}" style="margin:0;">
                @csrf
                <input type="hidden" name="state" value="{{ $request->state }}">
                <input type="hidden" name="client_id" value="{{ $client->getKey() }}">
                <input type="hidden" name="auth_token" value="{{ $authToken }}">
                <button class="btn-ok" type="submit">Toestaan</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>
