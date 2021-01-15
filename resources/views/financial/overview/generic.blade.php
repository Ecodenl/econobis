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

        .align-left {
            text-align: left;
        }

        .align-right {
            text-align: right;
        }

        .conclusion-text {
            text-align: left;
            margin-top: 24px;
            margin-left: 36px;
        }

        .subject-text {
            margin-left: 36px;
            margin-top: 0px;
            margin-bottom: 24px;
        }

        .logo {
            float: right;
            margin-bottom: 12px;
            margin-top: -12px;
            margin-right: 32px;
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

        .contact-info-table, .invoice-data-left-table {
            display: inline-block;
            float: left;
            margin-left: 0px;
            width: 50%;
        }

        .administration-info-table, .invoice-data-right-table {
            display: inline-block;
            float: right;
            margin-left: 400px;
            width: 50%;
        }

        .clearfix::after {
            content: " ";
            display: block;
            height: 0;
            clear: both;
        }

        .page-break {
            page-break-after: always;
        }
   </style>
</head>

<body>

<div>
    <div class="clearfix">
        <div class="logo">
            {!! $logo !!}
        </div>
    </div>

    <div style="clear: both !important;"></div>

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
                        {{ $financialOverviewContact->contact->addressLines['street'] }}
                    @endif
                </td>
            </tr>
            <tr>
                <td>
                    {{--Eerst nota adres, anders primair--}}
                    @if($contactPerson)
                        {{ $financialOverviewContact->contact->addressLines['street'] }}
                    @else
                        {{ $financialOverviewContact->contact->addressLines['city']}}
                    @endif
                </td>
            </tr>
            <tr>
                <td>
                    @if($contactPerson)
                        {{ $financialOverviewContact->contact->addressLines['city']}}
                    @else
                        {{ $financialOverviewContact->contact->addressLines['country']}}
                    @endif
                </td>
            </tr>
            <tr>
                <td>
                    @if($contactPerson)
                        {{ $financialOverviewContact->contact->addressLines['country']}}
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
        <table cellpadding=0 cellspacing=2>
            <tr>
                <td>
                    {{ $financialOverviewContact->financialOverview->administration->name }}
                </td>
            </tr>
            <tr>
                <td>
                    {{ $financialOverviewContact->financialOverview->administration->address }}
                </td>
            </tr>
            <tr>
                <td>
                    {{ $financialOverviewContact->financialOverview->administration->postal_code . ' ' . $financialOverviewContact->financialOverview->administration->city }}
                </td>
            </tr>
            <tr>
                <td>
                    {{ $financialOverviewContact->financialOverview->administration->country ? $financialOverviewContact->financialOverview->administration->country->name : '' }}
                </td>
            </tr>
            <tr>
                <td>
                    <a href="{{ 'mailto: ' . $financialOverviewContact->financialOverview->administration->email }}">{{ $financialOverviewContact->financialOverview->administration->email }}</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href>{{ $financialOverviewContact->financialOverview->administration->website }}</a>
                </td>
            </tr>
        </table>
    </div>

    <div style="clear: both !important;"></div>

    <div class="invoice-data-left-table">
        <table cellpadding=0 cellspacing=2>
            <tr>
                <td>
                    Datum: {{ $financialOverviewContact->date_sent ? Carbon\Carbon::parse($financialOverviewContact->date_sent)->formatLocalized('%e %B %Y') : 'Nog niet bekend' }}
                </td>
            </tr>
            <tr>
                <td>
                    Referentie: {{ $financialOverviewContactReference ? $financialOverviewContactReference : 'Nog niet bekend' }}
                </td>
            </tr>
            <tr>
                <td>
                    Contactnummer: {{ $financialOverviewContact->contact->number }}
                </td>
            </tr>
            <tr>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                </td>
            </tr>
        </table>
    </div>
    <div class="invoice-data-right-table">
        <table cellpadding=0 cellspacing=2>
            <tr>
                <td>
                    KvK {{ $financialOverviewContact->financialOverview->administration->kvk_number }}
                </td>
            </tr>
            <tr>
                <td>
                    @if($financialOverviewContact->financialOverview->administration->btw_number)
                        BTW-nummer {{ $financialOverviewContact->financialOverview->administration->btw_number }}
                    @else
                        IBAN {{ $financialOverviewContact->financialOverview->administration->IBAN }}
                    @endif
                </td>
            </tr>
            <tr>
                <td>
                    @if($financialOverviewContact->financialOverview->administration->btw_number)
                        IBAN {{ $financialOverviewContact->financialOverview->administration->IBAN }}
                    @else
                        BIC {{ $financialOverviewContact->financialOverview->administration->bic }}
                    @endif
                </td>
            </tr>
            <tr>
                <td>
                    @if($financialOverviewContact->financialOverview->administration->btw_number)
                        BIC {{ $financialOverviewContact->financialOverview->administration->bic }}
                    @elseif($financialOverviewContact->financialOverview->administration->rsin_number)
                        RSIN {{ $financialOverviewContact->financialOverview->administration->rsin_number }}
                    @endif
                </td>
            </tr>
            <tr>
                <td>
                    @if($financialOverviewContact->financialOverview->administration->btw_number && $financialOverviewContact->financialOverview->administration->rsin_number)
                        RSIN {{ $financialOverviewContact->financialOverview->administration->rsin_number }}
                    @endif
                </td>
            </tr>
        </table>
    </div>

    <div style="clear: both !important;">&nbsp;</div>

    <h4 class="subject-text">Betreft: waardestaat {{ $financialOverviewContact->financialOverview->description }}</h4>

    <h3 class="subject-text">Totaaloverzicht:</h3>

    <h3 class="subject-text">Bezittingen</h3>

    <table cellpadding=0 cellspacing=0>
        <tr>
            <th class="align-left" width="45%">&nbsp;</th>
            <th class="align-right" width="15%">01-01-{{ $financialOverviewContact->financialOverview->year }}</th>
            <th class="align-right" width="15%">31-12-{{ $financialOverviewContact->financialOverview->year }}</th>
        </tr>

        @foreach($financialOverviewContactTotalProjects as $financialOverviewContactTotalProject)
            <tr>
                <td class="align-left">
                    @switch($financialOverviewContactTotalProject->code_ref)
                        @case('loan')
                        Lening
                        @break
                        @case('obligation')
                        Obligaties
                        @break
                        @case('capital')
                        Participaties
                        @break
                        @case('postalcode_link_capital')
                        Participaties
                        @break
                    @endswitch
                </td>
                <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactTotalProject->total_amount_start_value, 2, ',', '.') }}</td>
                <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactTotalProject->total_amount_end_value, 2, ',', '.') }}</td>
            </tr>

            <tr>
                <td class="invoice-product-line" colspan="3"></td>
            </tr>
        @endforeach

        <tr>
            <td class="align-left"><strong>Totaal bezittingen:</strong></td>
            <td class="align-right"><strong><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactTotalStart, 2, ',', '.') }}</strong></td>
            <td class="align-right"><strong><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactTotalEnd, 2, ',', '.') }}</strong></td>
        </tr>

    </table>

    <br/>
    <h3 class="subject-text">Specificaties:</h3>

    @if($financialOverviewContactLoanProjects && count($financialOverviewContactLoanProjects)>0)
        <h3 class="subject-text">Lening per 31-12-{{ $financialOverviewContact->financialOverview->year }}</h3>
        <table cellpadding=0 cellspacing=0>
            <tr>
                <th class="align-left" width="45%">Project</th>
                <th class="align-left" width="20%">Type</th>
                <th class="align-right" width="10%">&nbsp;</th>
                <th class="align-right" width="10%">&nbsp;</th>
                <th class="align-right" width="15%">Totale waarde</th>
            </tr>

            @foreach($financialOverviewContactLoanProjects as $financialOverviewContactLoanProject)
                <tr>
                    <td class="align-left">{{ $financialOverviewContactLoanProject->name }}</td>
                    <td class="align-left">Lening</td>
                    <td class="align-right">&nbsp;</td>
                    <td class="align-right">&nbsp;</td>
                    <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactLoanProject->amount_end_value, 2, ',', '.') }}</td>
                </tr>
            @endforeach

            <tr>
                <td class="align-left"><strong>Totaal:</strong></td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactLoanTotalEnd, 2, ',', '.') }}</strong></td>
            </tr>
        </table>
    @endif

    @if($financialOverviewContactObligationProjects && count($financialOverviewContactObligationProjects)>0)
        <br/>
        <h3 class="subject-text">Obligaties per 31-12-{{ $financialOverviewContact->financialOverview->year }}</h3>
        <table cellpadding=0 cellspacing=0>
            <tr>
                <th class="align-left" width="45%">Project</th>
                <th class="align-left" width="20%">Type</th>
                <th class="align-right" width="10%">Aantal</th>
                <th class="align-right" width="10%">Waarde</th>
                <th class="align-right" width="15%">Totale waarde</th>
            </tr>

            @foreach($financialOverviewContactObligationProjects as $financialOverviewContactObligationProject)
                <tr>
                    <td class="align-left">{{ $financialOverviewContactObligationProject->name }}</td>
                    <td class="align-left">Obligaties</td>
                    <td class="align-right">{{ $financialOverviewContactObligationProject->quantity_end_value }}</td>
                    <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactObligationProject->bookworth_end_value, 2, ',', '.') }}</td>
                    <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactObligationProject->amount_end_value, 2, ',', '.') }}</td>
                </tr>
            @endforeach

            <tr>
                <td class="align-left"><strong>Totaal:</strong></td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactObligationTotalEnd, 2, ',', '.') }}</strong></td>
            </tr>
        </table>

    @endif

    @if($financialOverviewContactCapitalProjects && count($financialOverviewContactCapitalProjects)>0)
        <br/>
        <h3 class="subject-text">Participaties per 31-12-{{ $financialOverviewContact->financialOverview->year }}</h3>
        <table cellpadding=0 cellspacing=0>
            <tr>
                <th class="align-left" width="45%">Project</th>
                <th class="align-left" width="20%">Type</th>
                <th class="align-right" width="10%">Aantal</th>
                <th class="align-right" width="10%">Waarde</th>
                <th class="align-right" width="15%">Totale waarde</th>
            </tr>

            @foreach($financialOverviewContactCapitalProjects as $financialOverviewContactCapitalProject)
                <tr>
                    <td class="align-left">{{ $financialOverviewContactCapitalProject->name }}</td>
                    <td class="align-left">Participaties</td>
                    <td class="align-right">{{ $financialOverviewContactCapitalProject->quantity_end_value }}</td>
                    <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactCapitalProject->bookworth_end_value, 2, ',', '.') }}</td>
                    <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactCapitalProject->amount_end_value, 2, ',', '.') }}</td>
                </tr>
            @endforeach

            <tr>
                <td class="align-left"><strong>Totaal:</strong></td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactCapitalTotalEnd, 2, ',', '.') }}</strong></td>
            </tr>
        </table>

    @endif

    @if($financialOverviewContactPcrProjects && count($financialOverviewContactPcrProjects)>0)
        <br/>
        <h3 class="subject-text">Participaties per 31-12-{{ $financialOverviewContact->financialOverview->year }}</h3>
        <table cellpadding=0 cellspacing=0>
            <tr>
                <th class="align-left" width="45%">Project</th>
                <th class="align-left" width="20%">Type</th>
                <th class="align-right" width="10%">Aantal</th>
                <th class="align-right" width="10%">Waarde</th>
                <th class="align-right" width="15%">Totale waarde</th>
            </tr>

            @foreach($financialOverviewContactPcrProjects as $financialOverviewContactPcrProject)
                <tr>
                    <td class="align-left">{{ $financialOverviewContactPcrProject->name }}</td>
                    <td class="align-left">Participaties</td>
                    <td class="align-right">{{ $financialOverviewContactPcrProject->quantity_end_value }}</td>
                    <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactPcrProject->bookworth_end_value, 2, ',', '.') }}</td>
                    <td class="align-right"><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactPcrProject->amount_end_value, 2, ',', '.') }}</td>
                </tr>

                <tr>
                    <td class="invoice-product-line" colspan="5"></td>
                </tr>
            @endforeach

            <tr>
                <td class="align-left"><strong>Totaal:</strong></td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span class="euro-sign">&euro;</span>{{ number_format($financialOverviewContactPcrTotalEnd, 2, ',', '.') }}</strong></td>
            </tr>
        </table>
    @endif

</div>
</body>