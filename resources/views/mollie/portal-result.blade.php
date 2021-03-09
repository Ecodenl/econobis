<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Econobis</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
</head>
<body>
<div class="d-flex justify-content-center pt-5">
    <div class="px-3" style="width: 100%; max-width: 30rem;">
        <h4 class="mx-1">{{ $datePaid ? 'Betaling is geslaagd' : 'Betaling is niet voltooid' }}</h4>
        <div class="card">
            <div class="card-header">
                Transactiegegevens
            </div>
            <div class="card-body">
                <table class="table">
                    <tbody>
                    <tr>
                        <td>Status</td>
                        <td>{{ $datePaid ? 'Betaald' : 'Niet betaald' }}</td>
                    </tr>
                    <tr>
                        <td>Datum betaald</td>
                        <td>{{ $datePaid ? $datePaid->format('d-m-Y H:i:s') : '-' }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="flex-grow-1 d-flex justify-content-center mt-2">
            <small>{{ \Carbon\Carbon::now()->format('Y') }} - Econobis</small>
        </div>
    </div>
</div>
</body>
</html>
