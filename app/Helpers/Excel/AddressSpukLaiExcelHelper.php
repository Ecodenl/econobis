<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Excel;

use App\Eco\Measure\MeasureCategory;
use App\Eco\Opportunity\OpportunityAction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class AddressSpukLaiExcelHelper
{
    private $addresses;

    public function __construct($addresses)
    {
        $this->addresses = $addresses;
    }

    public function downloadSpukLaiExcel(string $dateBegin = '2025-01-01', string $dateEnd = '2025-12-31')
    {
        if ($this->addresses->count() === 0) {
            abort(403, 'Geen adressen aanwezig in selectie');
        }

        $year = date('Y', strtotime($dateBegin)); // automatisch het jaar bepalen

        $completeData = [];

        $headerData = [];
        $headerData[0] = 'Straat';
        $headerData[1] = 'nr.';
        $headerData[2] = 'Toevoeging';
        $headerData[3] = 'Postcode';
        $headerData[4] = 'Woonplaats';
        $headerData[5] = 'WOZ-waarde boven of onder gemiddelde WOZ- waarde van de koopwoningen in de betreffende gemeente of de NHG-grens';
        $headerData[6] = 'Evt. aanwezig energielabel (sleepmenu D t/m G)';
        $headerData[7] = 'Opsomming van energetisch slechte schilelementen (minimaal 2)';
        $headerData[8] = 'Jaar uitvoering maatregel(en)';
        $headerData[9] = 'Toegekend bedrag(in euro\'s)';
        $headerData[10] = 'Uitzondering schuldhulpsanering (ja/nee)';
        $headerData[11] = 'Dakisolatie (in m2) (minimaal 20 m2 per woning) dhz';
        $headerData[12] = 'Dakisolatie (in m2) (minimaal 20 m2 per woning) derden';
        $headerData[13] = 'Zolder/vlieringvloerisolatie (in m2) (minimaal 20 m2 per woning) dhz';
        $headerData[14] = 'Zolder/vlieringvloerisolatie (in m2) (minimaal 20 m2 per woning) derden';
        $headerData[15] = 'Spouwmuurisolatie (in m2), (minimaal 10 m2 per woning) dhz';
        $headerData[16] = 'Spouwmuurisolatie (in m2), (minimaal 10 m2 per woning) derden';
        $headerData[17] = 'Gevelisolatie (zowel binnen- als buitengevelisolatie) (in m2) (minimaal 10 m2 per woning) dhz';
        $headerData[18] = 'Gevelisolatie (zowel binnen- als buitengevelisolatie) (in m2) (minimaal 10 m2 per woning) derden';
        $headerData[19] = 'Vloerisolatie (in m2) (minimaal 20 m2 per woning) dhz';
        $headerData[20] = 'Vloerisolatie (in m2) (minimaal 20 m2 per woning) derden';
        $headerData[21] = 'Bodemisolatie (in m2) (minimaal 20 m2 per woning) dhz';
        $headerData[22] = 'Bodemisolatie (in m2) (minimaal 20 m2 per woning) derden';
        $headerData[23] = 'Glas en kozijnpanelen Ug en Up ≤ 1,2 W/m2K dhz';
        $headerData[24] = 'Glas en kozijnpanelen Ug en Up ≤ 1,2 W/m2K derden';
        $headerData[25] = 'Isolerende deuren Ud ≤ 1,5 W/m2K dhz';
        $headerData[26] = 'Isolerende deuren Ud ≤ 1,5 W/m2K derden';
        $headerData[27] = 'Glas en kozijnpanelen Ug en Up ≤ 0,7 W/m2K dhz';
        $headerData[28] = 'Glas en kozijnpanelen Ug en Up ≤ 0,7 W/m2K derden';
        $headerData[29] = 'Isolerende deuren Ud ≤ 1,0 W/m2K i.c.m. nieuwe isolerende kozijnen Uf ≤  1,5 W/m2K dhz';
        $headerData[30] = 'Isolerende deuren Ud ≤ 1,0 W/m2K i.c.m. nieuwe isolerende kozijnen Uf ≤  1,5 W/m2K derden';
        $headerData[31] = 'CO2-gestuurde ventilatie (mits van toepassing maximaal 1 invullen) dhz';
        $headerData[32] = 'CO2-gestuurde ventilatie (mits van toepassing maximaal 1 invullen) derden';
        $headerData[33] = 'Balansventilatie met WTW (evt. in combinatie met CO2-sturing) (mits van toepassing maximaal 1 invullen) dhz';
        $headerData[34] = 'Balansventilatie met WTW (evt. in combinatie met CO2-sturing) (mits van toepassing maximaal 1 invullen) derden';

        $completeData[] = $headerData;

        // Ophalen actie
        $budgetAanvraagAction = OpportunityAction::where('code_ref', 'subsidy-request')->first();
        if (!$budgetAanvraagAction) {
            abort(422, 'Onbekende opportunity action: subsidy-request');
        }

        foreach ($this->addresses->chunk(100) as $chunk) {
            // Eager load met filters
            $chunk->load([
                'housingFile',
                'intakes' => function ($q) {
                    $q->whereIn('id', function ($sub) {
                        $sub->from('opportunities')
                            ->select('intake_id')
                            ->groupBy('intake_id')
                            ->havingRaw('COUNT(DISTINCT measure_category_id) >= 2');
                    });
                },
                'intakes.opportunities.quotationRequests' => function ($q) use ($budgetAanvraagAction, $dateBegin, $dateEnd) {
                    $q->where('opportunity_action_id', $budgetAanvraagAction->id)
                        ->whereBetween('date_executed', [$dateBegin, $dateEnd]);
                },
            ]);

            foreach ($chunk as $address) {
                foreach ($address->intakes as $intake) {
                    foreach ($intake->opportunities as $opportunity) {
                        $quotationRequestsCollection = $opportunity->quotationRequests;
                        if ($quotationRequestsCollection->isNotEmpty()) {
                            // Gebruik dynamisch jaar
                            $completeData[] = $this->addRowData($address, $year, $opportunity, $quotationRequestsCollection);
                        }
                    }
                }
            }
        }

        // Excel export
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'AJ'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:AJ1')->applyFromArray([
            'font' => ['bold' => true],
        ]);

        $writer = new Xlsx($spreadsheet);
        $writer->save('php://output');
        return response()->noContent(); // evt. download response afhankelijk van jouw gebruik
    }


     private function addRowData($address, $year, $opportunity, $quotationRequestsCollection) {


         $housingFile = $address?->housingFile;
//         $measureCategoryNames = implode(', ', MeasureCategory::whereIn('id', $opportunity->measures->pluck('measure_category_id')->toArray() )->pluck('name')->toArray() );
         $measureNames = implode(', ', $opportunity->measures->pluck('name')->toArray() );

         $amountGranted = $quotationRequestsCollection->sum('quotation_amount');

         $rowData = [];
         $rowData[0] = $address ? $address->street : '';
         $rowData[1] = $address ? $address->number : '';
         $rowData[2] = $address ? $address->addition : '';
         $rowData[3] = $address ? $address->postal_code : '';
//         $rowData[4] = $address ? $address->city : '';
         $rowData[4] = ($address ? $address->city : '') . ' - ' . $opportunity->number;
         $rowData[5] = $opportunity ? ( $opportunity->below_woz_limit == 1 ? 'Onder' : ($opportunity->below_woz_limit == 0 ? 'Boven' : '') )  : '';
         $rowData[6] = $housingFile?->energyLabel ? $housingFile->energyLabel->name : 'Niet aanwezig';

         $rowData[7] = $measureNames;
         $rowData[8] = $year; //TODO measures_year
         $rowData[9] = $amountGranted;

         $rowData[10] = $opportunity ? ( $opportunity->exception_debt_relief == 1 ? 'Ja' : ($opportunity->exception_debt_relief == 0 ? 'Nee' : '') )  : '';

         $rowData[11] = ''; //TODO roof_insulation_diy
         $rowData[12] = ''; //TODO roof_insulation_thirdparty
         $rowData[13] = ''; //TODO attic_insulation_diy
         $rowData[14] = ''; //TODO attic_insulation_thirdparty
         $rowData[15] = ''; //TODO cavity_wall_insulation_diy
         $rowData[16] = ''; //TODO cavity_wall_insulation_thirdparty
         $rowData[17] = ''; //TODO facade_insulation_diy
         $rowData[18] = ''; //TODO facade_insulation_thirdparty
         $rowData[19] = ''; //TODO floor_insulation_diy
         $rowData[20] = ''; //TODO floor_insulation_thirdparty
         $rowData[21] = ''; //TODO ground_insulation_diy
         $rowData[22] = ''; //TODO ground_insulation_thirdparty
         $rowData[23] = ''; //TODO glass_and_frame_panels_1_2_diy
         $rowData[24] = ''; //TODO glass_and_frame_panels_1_2_thirdparty
         $rowData[25] = ''; //TODO insulating_doors_1_5_diy
         $rowData[26] = ''; //TODO insulating_doors_1_5_thirdparty
         $rowData[27] = ''; //TODO glass_and_frame_panels_0_7_diy
         $rowData[28] = ''; //TODO glass_and_frame_panels_0_7_thirdparty
         $rowData[29] = ''; //TODO insulating_doors_1_0_diy
         $rowData[30] = ''; //TODO insulating_doors_1_0_thirdparty
         $rowData[31] = ''; //TODO co2_controlled_ventilation_diy
         $rowData[32] = ''; //TODO co2_controlled_ventilation_thirdparty
         $rowData[33] = ''; //TODO balance_ventilation_with_heat_recovery_diy
         $rowData[34] = ''; //TODO balance_ventilation_with_heat_recovery_thirdparty

         return $rowData;

    }
     private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}
