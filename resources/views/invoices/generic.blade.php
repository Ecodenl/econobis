<html lang="nl">
<head>
    <meta charset="utf-8">
    <style>
        @font-face {
            font-family: 'Calibri';
            src: url({{ resource_path('fonts/calibri/Calibri.ttf') }}) format("truetype");
        }
        @font-face {
            font-family: 'Calibri';
            src: url({{ resource_path('fonts/calibri/CALIBRIB.ttf') }}) format("truetype");
            font-weight: bold;
        }
        @font-face {
            font-family: 'Calibri';
            src: url({{ resource_path('fonts/calibri/CALIBRII.ttf') }}) format("truetype");
            font-style: italic;
        }
        @font-face {
            font-family: 'Calibri';
            src: url({{ resource_path('fonts/calibri/CALIBRIZ.ttf') }}) format("truetype");
            font-style: italic;
            font-weight: bold;
        }

        * {
            font-family: 'Calibri' !important;
        }

        /*Omdat custom font geen euroteken heeft*/
        .euro-sign {
            font-family: Arial !important;
        }

        table {
            width: 100%;
            margin-left: 36px;
            margin-right: 36px;
        }

        table > tr > td {
            text-align: center;
        }

        table > tr > th {
            font-weight: bold;
        }

        .align-right {
            text-align: right;
        }

        .conclusion-text {
            text-align: left;
            margin-top: 24px;
            margin-left: 48px;
        }

        .subject-text {
            margin-left: 48px;
            margin-bottom: 24px;
        }

        .logo {
            margin-bottom: 24px;
            margin-top: -16px;
        }

        a:visited {
            text-decoration: none;
            border-bottom: 1px solid #551A8B;
        }

        a:link {
            text-decoration: none;
            border-bottom: 1px solid #0000EE;
        }

        .invoice-product-line {
            height: 12px;
        }

        .contact-name {
            vertical-align: top;
        }

        .contact-info-table {
            display: inline-block;
            float: left;
            width: 45%
        }

        .administration-info-table {
            display: inline-block;
            float: right;
            width: 55%
        }
   </style>
</head>

<body>

<div>
    <table class="logo">
        <tr>
            <td width="50%"></td>
            <td width="50%" align="right">
                {!! $logo !!}
            </td>
        </tr>
    </table>

    <div class="contact-info-table">
    <table cellpadding=0 cellspacing=2>
        <tr>
            <td class="contact-name">
                {{ $contactName }}
            </td>
        </tr>
        <tr>
            <td>
                @if($contactPerson)
                    t.a.v. {{ $contactPerson }}
                @else
                    {{ $invoice->order->contact->addressLines['street'] }}
                @endif
            </td>
        </tr>
        <tr>
            <td>
                {{--Eerst factuur adres, anders primair--}}
                @if($contactPerson)
                    {{ $invoice->order->contact->addressLines['street'] }}
                @else
                    {{ $invoice->order->contact->addressLines['city']}}
                @endif
            </td>
        </tr>
        <tr>
            <td>
                @if($contactPerson)
                    {{ $invoice->order->contact->addressLines['city']}}
                @else
                    {{ $invoice->order->contact->addressLines['country']}}
                @endif
            </td>
        </tr>
        <tr>
            <td>
                @if($contactPerson)
                    {{ $invoice->order->contact->addressLines['country']}}
                @endif
            </td>
        </tr>
        <tr>
            <td>
            </td>
        </tr>
    </table>
    </div>
    <div class="administration-info-table">
    <table width="250px" cellpadding=0 cellspacing=2>
        <tr>
            <td>
                {{ $invoice->administration->name }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $invoice->administration->address }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $invoice->administration->postal_code . ' ' . $invoice->administration->city }}
            </td>
        </tr>
        <tr>
            <td>
                {{ $invoice->administration->country ? $invoice->administration->country->name : '' }}
            </td>
        </tr>
        <tr>
            <td>
                <a href="{{ 'mailto: ' . $invoice->administration->email }}">{{ $invoice->administration->email }}</a>
            </td>
        </tr>
        <tr>
            <td>
                <a href>{{ $invoice->administration->website }}</a>
            </td>
        </tr>
    </table>
    </div>

    <div style="clear: both !important;"></div>

    <table cellpadding=0 cellspacing=2>
        <tr>
            <td width="50%">
                Factuurdatum: {{ Carbon\Carbon::parse($invoice->created_at)->formatLocalized('%e %B %Y') }}
            </td>
            <td width="50%">
                KvK {{ $invoice->administration->kvk_number }}
            </td>
        </tr>
        <tr>
            <td>
                Factuurnummer: {{ $invoice->number }}
            </td>
            <td>
                @if($invoice->administration->btw_number)
                    BTW-nummer {{ $invoice->administration->btw_number }}
                @else
                    IBAN {{ $invoice->administration->IBAN }}
                @endif
            </td>
        </tr>
        <tr>
            <td>
                Contactnummer: {{ $invoice->order->contact->number }}
            </td>
            <td>
                @if($invoice->administration->btw_number)
                    IBAN {{ $invoice->administration->IBAN }}
                @else
                    BIC {{ $invoice->administration->bic }}
                @endif
            </td>
        </tr>
        <tr>
            <td>
            </td>
            <td>
                @if($invoice->administration->btw_number)
                    BIC {{ $invoice->administration->bic }}
                @elseif($invoice->administration->rsin_number)
                    RSIN {{ $invoice->administration->rsin_number }}
                @endif
            </td>
        </tr>
        <tr>
            <td>
            </td>
            <td>
                @if($invoice->administration->btw_number && $invoice->administration->rsin_number)
                    RSIN {{ $invoice->administration->rsin_number }}
                @endif
            </td>
        </tr>
    </table>


    <h4 class="subject-text">Betreft: {{ $invoice->order->subject }}</h4>

    <table cellpadding=0 cellspacing=0>
        <tr>
            <th width="20%">Omschrijving</th>
            <th class="align-right" width="10%">Prijs</th>
            <th class="align-right" width="10%">Aantal</th>

            <th class="align-right" width="10%">@if($invoice->vatInfo)BTW @endif</th>

            <th class="align-right" width="10%">Bedrag</th>
        </tr>

        @foreach($invoice->invoiceProducts as $invoiceProduct)
            <tr>
                <td>{{ $invoiceProduct->description }}</td>
                <td class="align-right"><span class="euro-sign">€</span>{{ number_format($invoiceProduct->price, 2, ',', '.') }}</td>
                <td class="align-right">{{ $invoiceProduct->amount }}</td>
                <td class="align-right">@if($invoice->vatInfo){{ $invoiceProduct->vat_percentage ? number_format($invoiceProduct->vat_percentage, 2, ',', '.') . '%' : 'Geen'}}@endif</td>
                <td class="align-right"><span class="euro-sign">€</span>{{ number_format(($invoiceProduct->price * $invoiceProduct->amount), 2, ',', '.') }}</td>
            </tr>
            @if($invoiceProduct->amount_reduction)
                <tr>
                    <td colspan="4">Korting</td>
                    <td class="align-right" ><span class="euro-sign">- €</span>{{ number_format(($invoiceProduct->amount_reduction), 2, ',', '.') }}</td>
                </tr>
            @endif

            @if($invoiceProduct->percentage_reduction)
                <tr>
                    <td colspan="4">Korting {{ $invoiceProduct->percentage_reduction }}%</td>
                    <td class="align-right"><span class="euro-sign">- €</span>{{ number_format((($invoiceProduct->percentage_reduction/100) * ($invoiceProduct->price * $invoiceProduct->amount)), 2, ',', '.') }}</td>
                </tr>
            @endif
            <tr>
                <td class="invoice-product-line" colspan="5"></td>
            </tr>
        @endforeach
        @if($invoice->vatInfo)
        <tr>
            <td colspan="4"><strong>Totaal excl. BTW</strong></td>
            <td class="align-right"><strong><span class="euro-sign">€</span>{{ number_format($invoice->total_price_ex_vat_incl_reduction, 2, ',', '.') }}</strong></td>
        </tr>
        <tr>
            <td></td>
            <td class="align-right">BTW</td>
            <td class="align-right">Over</td>
            <td class="align-right">Bedrag</td>
            <td></td>
        </tr>
        @foreach($invoice->vatInfo as $percentage => $vatInfo)
            <tr>
                <td></td>
                <td class="align-right">{{ $percentage}}</td>
                <td class="align-right"><span class="euro-sign">€</span>{{ number_format($vatInfo['total_over'], 2, ',', '.') }}</td>
                <td class="align-right"><span class="euro-sign">€</span>{{ number_format($vatInfo['total_amount'], 2, ',', '.') }}</td>
                <td></td>
            </tr>
        @endforeach
        <tr>
            <td colspan="4"><strong>BTW Totaal</strong></td>
            <td class="align-right"><strong><span class="euro-sign">€</span>{{ number_format($invoice->total_vat, 2, ',', '.') }}</strong></td>
        </tr>
        @endif
        <tr>
            <td colspan="4"><strong>Totaal te betalen</strong></td>
            <td class="align-right"><strong><span class="euro-sign">€</span>{{ number_format($invoice->total_price_incl_vat_and_reduction, 2, ',', '.') }}</strong></td>
        </tr>
    </table>

    <div class="conclusion-text">{{ $invoice->order->invoice_text }}</div>

    @if($invoice->order->po_number)
        <div class="conclusion-text">
            Opdrachtnummer: {{ $invoice->order->po_number }}
        </div>
    @endif

    @if($invoice->payment_type_id == 'collection')
        <br/><br/>
        <div class="conclusion-text">Het bedrag wordt omstreeks @if($invoice->date_collection){{ Carbon\Carbon::parse($invoice->date_collection)->format('d-m-Y') }} @else
                (datum nog niet bekend) @endif van uw rekening afgeschreven.<br/>
            @if($invoice->order->IBAN) Uw bankgegevens IBAN: {{ $invoice->order->IBAN }}<br/>
            @elseif($invoice->order->contact->iban) Uw bankgegevens IBAN: {{ $invoice->order->contact->iban }}<br/> @endif
                Incasso Mandaat ID (SEPA): {{ $invoice->order->number }}<br/>
        </div>

    @else
        <br/><br/>
        <div class="conclusion-text">Betaling graag
            binnen {{ $invoice->administration->default_payment_term ? $invoice->administration->default_payment_term : 30 }}
            dagen na factuurdatum op bankrekening {{ $invoice->administration->IBAN }}
            overmaken @if($invoice->administration->iban_attn)t.n.v.
            {{ $invoice->administration->iban_attn }}@endif onder vermelding van
            contactnummer {{ $invoice->order->contact->number }} en factuurnummer {{ $invoice->number }}.
        </div>
    @endif
</div>
</body>