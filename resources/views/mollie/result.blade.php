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
        <h4 class="mx-1">{{ $invoiceMolliePayment->date_paid ? 'Betaling is geslaagd' : 'Betaling is niet voltooid' }}</h4>
        <div class="card">
            <div class="card-header">
                Transactiegegevens
            </div>
            <div class="card-body">
                <table class="table">
                    <tbody>
                    <tr>
                        <td>Administratie</td>
                        <td>{{ $invoiceMolliePayment->invoice->administration->name }}</td>
                    </tr>
                    <tr>
                        <td>Nota</td>
                        <td>{{ $invoiceMolliePayment->invoice->number }}</td>
                    </tr>
                    <tr>
                        <td>Betreft</td>
                        <td>{{ $invoiceMolliePayment->invoice->subject }}</td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>{{ $invoiceMolliePayment->invoice->order->contact->full_name }}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{{ $invoiceMolliePayment->date_paid ? 'Betaald' : 'Niet betaald' }}</td>
                    </tr>
                    <tr>
                        <td>Datum betaald</td>
                        <td>{{ $invoiceMolliePayment->date_paid ? $invoiceMolliePayment->date_paid->format('d-m-Y H:i:s') : '-' }}</td>
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
