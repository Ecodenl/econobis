<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <style>
        table {
            width: 100%;
            margin: 36px;
        }

        table > tr > td {
            text-align: center;
        }

        table > tr > th {
            font-weight: bold;
        }

        .conclusion-text {
            text-align: center;
            margin-top: 36px;
        }
    </style>
</head>

<body>
<div>
    <table>
        <tr>
            <td width="50%"></td>
            <td width="50%" align="right">
                {!! $logo !!}
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td>
                {{ $invoice->order->contact->full_name }}
            </td>
            <td>
                {{ $invoice->administration->name }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $invoice->order->contact->primaryAddress ? $invoice->order->contact->primaryAddress->street . ' ' . $invoice->order->contact->primaryAddress->number . $invoice->order->contact->primaryAddress->addition : '' }}
            </td>
            <td>
                {{ $invoice->administration->address }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $invoice->order->contact->primaryAddress ? $invoice->order->contact->primaryAddress->postal_code . ' ' . $invoice->order->contact->primaryAddress->city : ''}}
            </td>
            <td>
                {{ $invoice->administration->postal_code . ' ' . $invoice->administration->city }}
            </td>
        </tr>
        <tr>
            <td>
            </td>
            <td>
                {{ $invoice->administration->country ? $invoice->administration->country->name : 'Nederland' }}
            </td>
        </tr>
        <tr>
            <td>
            </td>
            <td>
                {{ $invoice->administration->email }}
            </td>
        </tr>
        <tr>
            <td>
            </td>
            <td>
                {{ $invoice->administration->website }}
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td colspan="2">
                Betreft: {{ $invoice->order->subject }}
            </td>
        </tr>
        <tr>
            <td>
                Factuurnummer: {{ $invoice->number }}
            </td>
            <td>
                IBAN: {{ $invoice->administration->IBAN }}
            </td>
        </tr>
        <tr>
            <td>
                Factuurdatum: {{ Carbon\Carbon::parse($invoice->created_at)->format('d/m/Y') }}
            </td>
            <td>
                BIC: {{ $invoice->administration->bic }}
            </td>
        </tr>
        <tr>
            <td>
                PO nummer: {{ $invoice->order->po_number }}
            </td>
            <td>
                KvK: {{ $invoice->administration->kvk_number }}
            </td>
        </tr>
    </table>

    @foreach($invoice->invoiceProducts as $invoiceProduct)
        @if($invoiceProduct->amount_reduction)
            <?php $amount_reduction = '<th>Korting</th>'; ?>
        @else
            <?php $amount_reduction = ''; ?>
        @endif
        @if($invoiceProduct->percentage_reduction)
            <?php $percentage_reduction = '<th>Kortingspercentage</th>'; ?>
        @else
            <?php $percentage_reduction = ''; ?>
        @endif
    @endforeach
    <table>
        <tr>
            <th width="20%">Omschrijving</th>
            <th width="10%">Prijs</th>
            <th width="10%">Aantal</th>
            <?php echo ($amount_reduction ? '<th width="10%">Korting</th>' : '')?>
            <?php echo ($percentage_reduction ? '<th width="10%">Kortingspercentage</th>' : '')?>
            <th width="10%">Bedrag</th>
        </tr>

        @foreach($invoice->invoiceProducts as $invoiceProduct)
            <tr>
                <td>{{ $invoiceProduct->description }}</td>
                <td>€{{ number_format($invoiceProduct->product->price_incl_vat, 2, ',', '.') }}</td>
                <td>{{ $invoiceProduct->amount }}</td>
                @if($invoiceProduct->amount_reduction)
                    <td>€{{ number_format($invoiceProduct->amount_reduction, 2, ',', '.') }}</td>
                @else
                    <?php echo ($amount_reduction ? '<td></td>' : '')?>
                @endif
                @if($invoiceProduct->percentage_reduction)
                    <td>{{ $invoiceProduct->percentage_reduction }}%</td>
                @else
                    <?php echo ($percentage_reduction ? '<td></td>' : '') ?>
                @endif
                <td>€{{ number_format($invoiceProduct->price_incl_vat_and_reduction, 2, ',', '.') }}</td>
            </tr>
        @endforeach
        <tr>
            <td><strong>Totaal te betalen:</strong></td>
            <td>€{{ number_format($invoice->total_price_incl_vat_and_reduction, 2, ',', '.') }}</td>
        </tr>
    </table>

    @if($invoice->payment_type_id == 'collection')
    <div class="conclusion-text">Dit is een automatische incasso met debiteurnummer {{ $invoice->order->contact->number }} en factuurnummer {{ $invoice->number }}. Het volledige bedrag zal
        @if($invoice->date_collection){{ Carbon\Carbon::parse($invoice->date_collection)->format('d/m/Y') }} @else ??? @endif
        worden afschreven
        van bankrekening {{ $invoice->administration->IBAN }}.
    </div>

    @else
    <div class="conclusion-text">Betaling gaarne
        binnen {{ $invoice->administration->default_payment_term ? $invoice->administration->default_payment_term : 30 }}
        dagen na factuurdatum op bankrekening {{ $invoice->administration->IBAN }}
        overmaken onder vermelding van het debiteurnummer {{ $invoice->order->contact->number }} en het factuurnummer {{ $invoice->number }}.
    </div>
    @endif

    <div class="conclusion-text">{{ $invoice->order->invoice_text }}
    </div>

</div>
</body>
</html>