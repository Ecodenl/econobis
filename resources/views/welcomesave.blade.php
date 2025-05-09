<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <title>Econobis</title>
    <script defer="defer" src="./js/6652.5f4501d9f49960d98310.js"></script>
    <script defer="defer" src="./js/bundle.a467f151402ca81543d6.js"></script>
</head>
<body>
<script src="./js/polyfill.js"></script>

<script>
    // Set some global JS variables
    var URL_APP ="{{ config('app.url') }}";
    var URL_API ="{{ config('app.url_api') }}";
    var CLIENT_ID ="{{ config('app.oauth_client_id') }}";
    var CLIENT_KEY ="{{ $clientKey }}";
</script>

<div id="root"></div>
</body>
</html>