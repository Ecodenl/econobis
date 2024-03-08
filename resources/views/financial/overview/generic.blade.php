<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <title>{{ $financialOverviewContactReference ? $financialOverviewContactReference : 'Waardestaat' }}</title>
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

        .ws-additional {
            width: 100%;
            margin-left: 36px;
        }

        table {
            border-spacing: 0px;
            width: 100%;
            margin-left: 36px;
        }

        .total-table {
            border-bottom: #000000 2px solid;
        }

        .align-left {
            text-align: left;
        }

        .align-right {
            text-align: right;
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
                <td class="align-left" style="width: 42%;">{{ $financialOverviewContact->financialOverview->administration->name }}</td>
            </tr>
            <tr>
                <td class="align-left">{{ $contactPerson ? 't.a.v. ' . $contactPerson : $financialOverviewContact->contact->addressLines['street'] }}</td>
                <td class="align-left">{{ $financialOverviewContact->financialOverview->administration->address }}</td>
            </tr>
            <tr>
                <td class="align-left">{{ $contactPerson ? $financialOverviewContact->contact->addressLines['street'] : $financialOverviewContact->contact->addressLines['city'] }}</td>
                <td class="align-left">{{ $financialOverviewContact->financialOverview->administration->postal_code . ' ' . $financialOverviewContact->financialOverview->administration->city }}</td>
            </tr>
            <tr>
                <td class="align-left">{{ $contactPerson ? $financialOverviewContact->contact->addressLines['city'] : $financialOverviewContact->contact->addressLines['country'] }}</td>
                <td class="align-left">{!! $financialOverviewContact->financialOverview->administration->country ? $financialOverviewContact->financialOverview->administration->country->name : '&nbsp;' !!}</td>
            </tr>
            <tr>
                <td class="align-left">{!! ($contactPerson) ? $financialOverviewContact->contact->addressLines['country'] : '&nbsp;' !!}</td>
                <td class="align-left"><a href="{{ 'mailto:' . $financialOverviewContact->financialOverview->administration->email }}">{{ $financialOverviewContact->financialOverview->administration->email }}</a></td>
            </tr>
            <tr>
                <td class="align-left">&nbsp;</td>
                <td class="align-left">{!! ($financialOverviewContact->financialOverview->administration->website) ? $financialOverviewContact->financialOverview->administration->website : '&nbsp;' !!}</td>
            </tr>
            <tr>
                <td class="align-left">Datum: {{ $financialOverviewContact->date_sent ? Carbon\Carbon::parse($financialOverviewContact->date_sent)->isoFormat('D MMMM YYYY') : 'Nog niet bekend' }}</td>
                <td class="align-left">KvK {{ $financialOverviewContact->financialOverview->administration->kvk_number }}</td>
            </tr>
            <tr>
                <td class="align-left">Referentie: {{ $financialOverviewContactReference ? $financialOverviewContactReference : 'Nog niet bekend' }}</td>
                <td class="align-left">{{ $financialOverviewContact->financialOverview->administration->btw_number ? 'BTW-nummer ' . $financialOverviewContact->financialOverview->administration->btw_number : 'IBAN ' . $financialOverviewContact->financialOverview->administration->IBAN }}</td>
            </tr>
            <tr>
                <td class="align-left">Contactnummer: {{ $financialOverviewContact->contact->number }}</td>
                <td class="align-left">{{ $financialOverviewContact->financialOverview->administration->btw_number ? 'IBAN ' . $financialOverviewContact->financialOverview->administration->IBAN : 'BIC ' . $financialOverviewContact->financialOverview->administration->bic }}</td>
            </tr>
            <tr>
                <td class="align-left">&nbsp;</td>
                <td class="align-left">{!! ($financialOverviewContact->financialOverview->administration->btw_number) ? 'BIC ' . $financialOverviewContact->financialOverview->administration->bic : ( $financialOverviewContact->financialOverview->administration->rsin_number ? 'RSIN ' . $financialOverviewContact->financialOverview->administration->rsin_number : '&nbsp;') !!}</td>
            </tr>
            <tr>
                <td class="align-left">&nbsp;</td>
                <td class="align-left">{!! ($financialOverviewContact->financialOverview->administration->btw_number && $financialOverviewContact->financialOverview->administration->rsin_number) ? 'RSIN ' . $financialOverviewContact->financialOverview->administration->rsin_number : '&nbsp;' !!}</td>
            </tr>
            <tr>
                <td class="align-left">&nbsp;</td>
                <td class="align-left">&nbsp;</td>
            </tr>
            </tbody>
        </table>
    </div>

    <h4 class="subject-text">Betreft: waardestaat {{ $financialOverviewContact->financialOverview->description }}</h4>
    <br/>

    <h3 class="subject-text">Totaaloverzicht bezittingen</h3>

    <table class="total-table">
        <tr>
            <th class="align-left" style="width:60%;"></th>
            <th class="align-right" style="width:20%;">01-01-{{ $financialOverviewContact->financialOverview->year }}</th>
            <th class="align-right" style="width:20%;">31-12-{{ $financialOverviewContact->financialOverview->year }}</th>
        </tr>

        @if($financialOverviewContactTotalLoanProjects != null)
            <tr>
                <td class="align-left">
                    Lening
                </td>
                <td class="align-right"><span
                            class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactTotalLoanProjects->total_amount_start_value, 2, ',', '.') }}
                </td>
                <td class="align-right"><span
                            class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactTotalLoanProjects->total_amount_end_value, 2, ',', '.') }}
                </td>
            </tr>
        @endif
        @if($financialOverviewContactTotalObligationProjects != null)
            <tr>
                <td class="align-left">
                    Obligaties
                </td>
                <td class="align-right"><span
                            class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactTotalObligationProjects->total_amount_start_value, 2, ',', '.') }}
                </td>
                <td class="align-right"><span
                            class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactTotalObligationProjects->total_amount_end_value, 2, ',', '.') }}
                </td>
            </tr>
        @endif
        @if($financialOverviewContactTotalCapitalProjects != null)
            <tr>
                <td class="align-left">
                    Participaties
                </td>
                <td class="align-right"><span
                            class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactTotalCapitalProjects->total_amount_start_value, 2, ',', '.') }}
                </td>
                <td class="align-right"><span
                            class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactTotalCapitalProjects->total_amount_end_value, 2, ',', '.') }}
                </td>
            </tr>
        @endif

        <tr>
            <td class="align-left"><strong>Totaal bezittingen</strong></td>
            <td class="align-right"><strong><span
                            class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactTotalStart, 2, ',', '.') }}
                </strong></td>
            <td class="align-right"><strong><span
                            class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactTotalEnd, 2, ',', '.') }}
                </strong></td>
        </tr>
        <tr>
            <td class="empty-line" colspan="3"></td>
        </tr>
        <tr>
            <td class="empty-line" colspan="3"></td>
        </tr>

    </table>

    <br/>
    <h3 class="subject-text">Specificaties</h3>

    @if($financialOverviewContactLoanProjects && count($financialOverviewContactLoanProjects)>0)
        <h4 class="subject-text">Lening {{ $financialOverviewContact->financialOverview->year }}</h4>
        <table>
            <tr>
                <th class="align-left" style="width:45%;">Project</th>
                <th class="align-left" style="width:20%;">Per</th>
                <th class="align-right" style="width:10%;">&nbsp;</th>
                <th class="align-right" style="width:10%;">&nbsp;</th>
                <th class="align-right" style="width:15%;">Totale waarde</th>
            </tr>

            @foreach($financialOverviewContactLoanProjects as $financialOverviewContactLoanProject)
                <tr>
                    <td class="align-left">{{ $financialOverviewContactLoanProject->name }}</td>
                    <td class="align-left">01-01-{{ $financialOverviewContact->financialOverview->year }}</td>
                    <td class="align-right">&nbsp;</td>
                    <td class="align-right">&nbsp;</td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactLoanProject->amount_start_value, 2, ',', '.') }}
                    </td>
                </tr>
                <tr>
                    <td class="align-left">&nbsp;</td>
                    <td class="align-left">31-12-{{ $financialOverviewContact->financialOverview->year }}</td>
                    <td class="align-right">&nbsp;</td>
                    <td class="align-right">&nbsp;</td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactLoanProject->amount_end_value, 2, ',', '.') }}
                    </td>
                </tr>
            @endforeach

            <tr>
                <td class="align-left"><strong>Totaal</strong></td>
                <td class="align-left">01-01-{{ $financialOverviewContact->financialOverview->year }}</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactLoanTotalStart, 2, ',', '.') }}
                    </strong></td>
            </tr>
            <tr>
                <td class="align-left"><strong>&nbsp;</strong></td>
                <td class="align-left">31-12-{{ $financialOverviewContact->financialOverview->year }}</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactLoanTotalEnd, 2, ',', '.') }}
                    </strong></td>
            </tr>
        </table>
    @endif

    @if($financialOverviewContactObligationProjects && count($financialOverviewContactObligationProjects)>0)
        <br/>
        <h4 class="subject-text">Obligaties {{ $financialOverviewContact->financialOverview->year }}</h4>
        <table>
            <tr>
                <th class="align-left" style="width:45%;">Project</th>
                <th class="align-left" style="width:20%;">Per</th>
                <th class="align-right" style="width:10%;">Aantal</th>
                <th class="align-right" style="width:10%;">Waarde</th>
                <th class="align-right" style="width:15%;">Totale waarde</th>
            </tr>

            @foreach($financialOverviewContactObligationProjects as $financialOverviewContactObligationProject)
                <tr>
                    <td class="align-left">{{ $financialOverviewContactObligationProject->name }}</td>
                    <td class="align-left">01-01-{{ $financialOverviewContact->financialOverview->year }}</td>
                    <td class="align-right">{{ $financialOverviewContactObligationProject->quantity_start_value }}</td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactObligationProject->bookworth_start_value, 2, ',', '.') }}
                    </td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactObligationProject->amount_start_value, 2, ',', '.') }}
                    </td>
                </tr>
                <tr>
                    <td class="align-left">&nbsp;</td>
                    <td class="align-left">31-12-{{ $financialOverviewContact->financialOverview->year }}</td>
                    <td class="align-right">{{ $financialOverviewContactObligationProject->quantity_end_value }}</td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactObligationProject->bookworth_end_value, 2, ',', '.') }}
                    </td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactObligationProject->amount_end_value, 2, ',', '.') }}
                    </td>
                </tr>
            @endforeach

            <tr>
                <td class="align-left"><strong>Totaal</strong></td>
                <td class="align-left">01-01-{{ $financialOverviewContact->financialOverview->year }}</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactObligationTotalStart, 2, ',', '.') }}
                    </strong></td>
            </tr>
            <tr>
                <td class="align-left"><strong>&nbsp;</strong></td>
                <td class="align-left">31-12-{{ $financialOverviewContact->financialOverview->year }}</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactObligationTotalEnd, 2, ',', '.') }}
                    </strong></td>
            </tr>
        </table>

    @endif

    @if($financialOverviewContactCapitalProjects && count($financialOverviewContactCapitalProjects)>0)
        <br/>
        <h4 class="subject-text">Participaties {{ $financialOverviewContact->financialOverview->year }}</h4>
        <table>
            <tr>
                <th class="align-left" style="width:45%;">Project</th>
                <th class="align-left" style="width:20%;">Per</th>
                <th class="align-right" style="width:10%;">Aantal</th>
                <th class="align-right" style="width:10%;">Waarde</th>
                <th class="align-right" style="width:15%;">Totale waarde</th>
            </tr>

            @foreach($financialOverviewContactCapitalProjects as $financialOverviewContactCapitalProject)
                <tr>
                    <td class="align-left">{{ $financialOverviewContactCapitalProject->name }}</td>
                    <td class="align-left">01-01-{{ $financialOverviewContact->financialOverview->year }}</td>
                    <td class="align-right">{{ $financialOverviewContactCapitalProject->quantity_start_value }}</td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactCapitalProject->bookworth_start_value, 2, ',', '.') }}
                    </td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactCapitalProject->amount_start_value, 2, ',', '.') }}
                    </td>
                </tr>
                <tr>
                    <td class="align-left">&nbsp;</td>
                    <td class="align-left">31-12-{{ $financialOverviewContact->financialOverview->year }}</td>
                    <td class="align-right">{{ $financialOverviewContactCapitalProject->quantity_end_value }}</td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactCapitalProject->bookworth_end_value, 2, ',', '.') }}
                    </td>
                    <td class="align-right"><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactCapitalProject->amount_end_value, 2, ',', '.') }}
                    </td>
                </tr>
            @endforeach

            <tr>
                <td class="align-left"><strong>Totaal</strong></td>
                <td class="align-left">01-01-{{ $financialOverviewContact->financialOverview->year }}</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactCapitalTotalStart, 2, ',', '.') }}
                    </strong></td>
            </tr>
            <tr>
                <td class="align-left"><strong>&nbsp;</strong></td>
                <td class="align-left">31-12-{{ $financialOverviewContact->financialOverview->year }}</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right">&nbsp;</td>
                <td class="align-right"><strong><span
                                class="euro-sign">&euro; </span>{{ number_format($financialOverviewContactCapitalTotalEnd, 2, ',', '.') }}
                    </strong></td>
            </tr>
        </table>

    @endif

</div>

@if($wsAdditionalInfo)
    <div class="page-break"></div>
    <div class="ws-additional">
        {!! $wsAdditionalInfo !!}
    </div>
@endif

</body>
</html>