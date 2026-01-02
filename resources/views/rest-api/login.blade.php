<!doctype html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Econobis Rest API - OAuth login</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#f5f7fa; margin:0; }
        .wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; }
        .card { width:100%; max-width:520px; background:#fff; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,.08); padding:24px 28px; box-sizing: border-box; }
        .logo-wrap { text-align:center; margin-bottom:16px; padding:0 4px; }
        .logo { max-width:100%; height: 150px; width:auto; display:inline-block; }
        @media (max-width:480px) { .logo { height:110px; } }
        h1 { font-size:20px; margin:0 0 6px; }
        .muted { color:#667085; font-size:14px; margin:0 0 16px; }
        label { font-size:13px; color:#344054; display:block; margin:12px 0 6px; }
        input { width:100%; padding:10px 14px; border:1px solid #d0d5dd; border-radius:10px; font-size:14px; box-sizing:border-box;}
        input:focus { outline:none; border-color:#175cd3; box-shadow:0 0 0 2px rgba(23,92,211,0.15); }
        .error { background:#fff4f4; border:1px solid #fecaca; color:#b42318; padding:10px 12px; border-radius:10px; font-size:14px; margin-bottom:12px; }
        .btn { margin-top:16px; width:100%; padding:10px 14px; border-radius:10px; border:0; background:#175cd3; color:#fff; font-weight:700; cursor:pointer; }
        .small { margin-top:12px; font-size:12px; color:#667085; }
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
        <h1>Inloggen voor gebruik rest API</h1>
        <p class="muted">Log in om de koppeling te autoriseren.</p>

        @if ($errors->any())
            <div class="error">
                {{ implode(' ', $errors->all()) }}
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <label for="email">E-mail</label>
            <input id="email" type="email" name="email" required autofocus>

            <label for="password">Wachtwoord</label>
            <input id="password" type="password" name="password" required>

            <button class="btn" type="submit">Inloggen</button>
        </form>

        <div class="small">
            Je wordt hierna automatisch teruggestuurd naar de autorisatiepagina.
        </div>
    </div>
</div>
</body>
</html>
