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
<script type="text/javascript" src="./js/vendors~bundle.5223a698a252c4dc2e8e.js"></script><script type="text/javascript" src="./js/bundle.f97fa2cef9dd006ff455.js"></script></body>
</html>
