<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Econobis</title>

</head>
<body>
<script type="text/javascript" src="./js/polyfill.js"></script>

<script type="text/javascript">
    // Set some global JS variables
    var URL_APP ="{{ config('app.url') }}";
    var URL_API ="{{ config('app.url_api') }}";
    var CLIENT_ID ="{{ config('app.oauth_client_id') }}";
    var CLIENT_KEY ="{{ $clientKey }}";
</script>

<div id="root"></div>
<script type="text/javascript" src="./js/vendors~bundle.4e9ff7f6b64f2acccea2.js"></script><script type="text/javascript" src="./js/bundle.4a27cbad0db2b11bced8.js"></script></body>
</html>
