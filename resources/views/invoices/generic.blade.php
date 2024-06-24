<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <title>{{ $invoice->number ? $invoice->number : 'Nota' }}</title>
    <style>
        @font-face {
            font-family: 'Calibri';
            src: url({{ resource_path('fonts/calibri/Calibri.ttf') }}) format("truetype");
        }

        @font-face {
            font-family: 'Calibri';
            src: url({{ resource_path('fonts/calibri/Calibrib.ttf') }}) format("truetype");
            font-weight: bold;
        }

        @font-face {
            font-family: 'Calibri';
            src: url({{ resource_path('fonts/calibri/Calibrii.ttf') }}) format("truetype");
            font-style: italic;
        }

        @font-face {
            font-family: 'Calibri';
            src: url({{ resource_path('fonts/calibri/Calibriz.ttf') }}) format("truetype");
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

        body {
            margin-left: -32px;
        }

        table {
            border-spacing: 0px;
            width: 100%;
            margin-left: 36px;
        }

        .align-left {
            text-align: left;
        }

        .align-right {
            text-align: right;
        }

        .conclusion-text {
            text-align: left;
            margin-left: 36px;
            margin-top: 24px;
        }

        .subject-text {
            margin-left: 36px;
            margin-top: 0px;
            margin-bottom: 0px;
        }

        a:visited {
            text-decoration: none;
            border-bottom: 1px solid #551A8B;
        }

        a:link {
            text-decoration: none;
            border-bottom: 1px solid #0000EE;
        }

        .empty-line {
            height: 12px;
        }

        .page-break {
            page-break-after: always;
            /*content: "Page " counter(page);*/
        }
    </style>
</head>
<body>
<div>
    <div class="header-table">
        <table>
            <thead>
            <tr>
                <th class="align-right" colspan="2">{!! $logo !!}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="align-left" style="width: 58%;">{{ $contactName }}</td>
                <td class="align-left" style="width: 42%;">{{ $invoice->administration->name }}</td>
            </tr>
            <tr>
                <td class="align-left">{{ $contactPerson ? 't.a.v. ' . $contactPerson : $invoice->order->contact->addressLines['street'] }}</td>
                <td class="align-left">{{ $invoice->administration->address }}</td>
            </tr>
            <tr>
                <td class="align-left">{{ $contactPerson ? $invoice->order->contact->addressLines['street'] : $invoice->order->contact->addressLines['city'] }}</td>
                <td class="align-left">{{ $invoice->administration->postal_code . ' ' . $invoice->administration->city }}</td>
            </tr>
            <tr>
                <td class="align-left">{{ $contactPerson ? $invoice->order->contact->addressLines['city'] : $invoice->order->contact->addressLines['country'] }}</td>
                <td class="align-left">{!! $invoice->administration->country ? $invoice->administration->country->name : '&nbsp;' !!}</td>
            </tr>
            <tr>
                <td class="align-left">{!! ($contactPerson) ? $invoice->order->contact->addressLines['country'] : '&nbsp;' !!}</td>
                <td class="align-left"><a href="{{ 'mailto: ' . $invoice->administration->email }}">{{ $invoice->administration->email }}</a></td>
            </tr>
            <tr>
                <td class="align-left">&nbsp;</td>
                <td class="align-left"><a href="{{ $invoice->administration->website }}">{{ $invoice->administration->website }}</a></td>
            </tr>
            <tr>
                <td class="align-left">Notadatum: {{ $invoice->date_sent ? Carbon\Carbon::parse($invoice->date_sent)->isoFormat('D MMMM YYYY') : 'Nog niet bekend' }}</td>
                <td class="align-left">KvK {{ $invoice->administration->kvk_number }}</td>
            </tr>
            <tr>
                <td class="align-left">Notanummer: {{ $invoice->number }}</td>
                <td class="align-left">{{ $invoice->administration->btw_number ? 'BTW-nummer ' . $invoice->administration->btw_number : 'IBAN ' . $invoice->administration->IBAN }}</td>
            </tr>
            <tr>
                <td class="align-left">Contactnummer: {{ $invoice->order->contact->number }}</td>
                <td class="align-left">{{ $invoice->administration->btw_number ? 'IBAN ' . $invoice->administration->IBAN : 'BIC ' . $invoice->administration->bic }}</td>
            </tr>
            <tr>
                <td class="align-left">&nbsp;</td>
                <td class="align-left">{!! ($invoice->administration->btw_number) ? 'BIC ' . $invoice->administration->bic : ( $invoice->administration->rsin_number ? 'RSIN ' . $invoice->administration->rsin_number : '&nbsp;') !!}</td>
            </tr>
            <tr>
                <td class="align-left">&nbsp;</td>
                <td class="align-left">{!! ($invoice->administration->btw_number && $invoice->administration->rsin_number) ? 'RSIN ' . $invoice->administration->rsin_number : '&nbsp;' !!}</td>
            </tr>
            </tbody>
        </table>
    </div>

    <h4 class="subject-text">Betreft: {{ $invoice->order->subject }}</h4>
    <br/>

    <table>
        <tr>
            <th class="align-left" width="34%">Omschrijving</th>
            <th class="align-right" width="18%">Prijs</th>
            <th class="align-right" width="15%">Aantal</th>
            <th class="align-right" width="15%">@if($invoice->vatInfo)BTW @endif</th>
            <th class="align-right" width="18%">Bedrag</th>
        </tr>

        @foreach($invoice->invoiceProducts as $invoiceProduct)
            <tr>
                <td class="align-left">{!! (str_replace('€', '&euro;', $invoiceProduct->description)) !!}</td>
                <td class="align-right"><span class="euro-sign">&euro;</span> {{ number_format($invoiceProduct->price, $invoiceProduct->price_number_of_decimals, ',', '.') }}</td>
                <td class="align-right">{{ $invoiceProduct->amount }}</td>
                <td class="align-right">@if($invoice->vatInfo){{ $invoiceProduct->vat_percentage ? number_format($invoiceProduct->vat_percentage, 2, ',', '.') . '%' : 'Geen'}}@endif</td>
                <td class="align-right"><span class="euro-sign">&euro;</span> {{ $invoiceProduct->amount_excl_vat_formatted }}</td>
            </tr>

            @if($invoiceProduct->product->duration_id !== 'none' && $invoice->collection_frequency_id !== 'once')
                <tr>
                    {{--min 1 dag omdat het t/m is--}}
                    <td  colspan="5">Periode {{ (Carbon\Carbon::parse($invoiceProduct->date_last_invoice))->isoFormat('D MMMM YYYY') }} t/m {{ $invoice->order->addDurationToDate(Carbon\Carbon::parse($invoiceProduct->date_last_invoice))->subDay()->isoFormat('D MMMM YYYY') }}</td>
                </tr>
            @endif

            @if($invoiceProduct->amount_reduction)
                <tr>
                    <td class="align-left" colspan="4">Korting</td>
                    <td class="align-right" ><span class="euro-sign">&euro;</span> {{ $invoiceProduct->amount_reduction_amount_excl_vat_formatted }}</td>
                </tr>
            @endif

            @if($invoiceProduct->percentage_reduction)
                <tr>
                    <td class="align-left" colspan="4">Korting {{ $invoiceProduct->percentage_reduction }}%</td>
                    <td class="align-right"><span class="euro-sign">&euro;</span> {{ $invoiceProduct->amount_reduction_percentage_excl_vat_formatted }}</td>
                </tr>
            @endif
            <tr>
                <td class="empty-line" colspan="5"></td>
            </tr>
        @endforeach
        @if($invoice->vatInfo)
            <tr>
                <td class="align-left" colspan="4"><strong>Totaal excl. BTW</strong></td>
                <td class="align-right"><strong><span class="euro-sign">&euro;</span> {{ number_format($invoice->total_excl_vat_incl_reduction, 2, ',', '.') }}</strong></td>
            </tr>
            <tr>
                <td class="align-left">&nbsp;</td>
                <td class="align-right">BTW</td>
                <td class="align-right">{!! $invoice->has_rounding_difference ? '&nbsp;' :  'Over' !!}</td>
                <td class="align-right">Bedrag</td>
                <td class="align-right">&nbsp;</td>
            </tr>
            @foreach($invoice->vatInfo as $percentage => $vatInfo)
                <tr>
                    <td class="align-left">&nbsp;</td>
                    <td class="align-right">{{ $percentage}}</td>
                    @if($invoice->has_rounding_difference)
                        <td class="align-right">&nbsp;</td>
                    @else
                        <td class="align-right"><span class="euro-sign">&euro;</span> {{ number_format($vatInfo['total_over'], 2, ',', '.') }}</td>
                    @endif
                    <td class="align-right"><span class="euro-sign">&euro;</span> {{ number_format($vatInfo['total_amount'], 2, ',', '.') }}</td>
                </tr>
            @endforeach
            <tr>
                <td class="align-left" colspan="4"><strong>BTW Totaal</strong></td>
                <td class="align-right"><strong><span class="euro-sign">&euro;</span> {{ number_format($invoice->total_vat_incl_reduction, 2, ',', '.') }}</strong></td>
            </tr>
        @endif
        <tr>
            <td class="align-left" colspan="4"><strong>Totaal te betalen</strong></td>
            <td class="align-right"><strong><span class="euro-sign">&euro;</span> {{ number_format($invoice->total_incl_vat_incl_reduction, 2, ',', '.') }}</strong></td>
        </tr>
    </table>

    <div class="conclusion-text">{!! (str_replace('€', '&euro;', $invoice->order->invoice_text)) !!}</div>

    @if($invoice->order->po_number || $invoice->order->project_number)
        <div class="conclusion-text">
            @if($invoice->order->po_number) Opdrachtnummer: {{ $invoice->order->po_number }} @endif
            @if($invoice->order->po_number && $invoice->order->project_number) <br> @endif
            @if($invoice->order->project_number) Projectnummer: {{ $invoice->order->project_number }} @endif
        </div>
    @endif

    @if($invoice->payment_type_id == 'collection')
        <br/><br/>
        <div class="conclusion-text">Het bedrag wordt omstreeks @if($invoice->date_collection){{ Carbon\Carbon::parse($invoice->date_collection)->format('d-m-Y') }} @else
                (datum nog niet bekend) @endif van uw rekening afgeschreven.<br/>
            @if($invoice->order->contact->iban) Uw bankgegevens IBAN: {{ $invoice->order->contact->iban }} @endif
            @if($invoice->order->contact->iban_attn) t.n.v. {{ $invoice->order->contact->iban_attn }}<br/>
            @elseif($invoice->order->contact->full_name) t.n.v. {{ $invoice->order->contact->full_name }}<br/>
            @else <br/> @endif
            Machtigingskenmerk: {{ $invoice->order->contact->collect_mandate_code }}<br/>
        </div>
    @elseif($invoice->payment_type_id == 'transfer' && $invoice->total_incl_vat_incl_reduction < 0)
        <br/><br/>
        <div class="conclusion-text">Het bedrag zal aan u worden overgemaakt of verrekend worden met een openstaande nota.</div>
    @else
        <br/><br/>
        <div class="conclusion-text">Betaling graag
            binnen {{ $invoice->administration->default_payment_term ? $invoice->administration->default_payment_term : 30 }}
            dagen na notadatum op bankrekening {{ $invoice->administration->IBAN }}
            overmaken @if($invoice->administration->iban_attn)t.n.v.
            {{ $invoice->administration->iban_attn }}@endif onder vermelding van
            notanummer {{ $invoice->number }}.
        </div>
    @endif

    {{-- Here's the magic. This MUST be inside body tag. Page count / total, centered at bottom of page --}}
    <script type="text/php">
        if (isset($pdf)) {
            $text = "pagina: {PAGE_NUM} van {PAGE_COUNT}";
            $size = 10;
            $font = $fontMetrics->getFont("Verdana");
            $width = $fontMetrics->get_text_width($text, $font, $size) / 2;
            $x = ($pdf->get_width() - $width) / 2;
            $y = $pdf->get_height() - 35;
            $pdf->page_text($x, $y, $text, $font, $size);
        }
    </script>
</div>
</body>
</html>