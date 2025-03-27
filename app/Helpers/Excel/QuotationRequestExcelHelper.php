<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Excel;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class QuotationRequestExcelHelper
{
    private $quotationRequests;

    public function __construct($quotationRequests)
    {
        $this->quotationRequests = $quotationRequests;
    }

    public function downloadSpukLaiExcel()
    {
        Log::info('downloadSpukLaiExcel - debug 1');

        if($this->quotationRequests->count() === 0){
            abort(403, 'Geen kansacties aanwezig in selectie');
        }

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
        $headerData[10] = 'Dakisolatie (in m2) (minimaal 20 m2 per woning) dhz';
        $headerData[11] = 'Dakisolatie (in m2) (minimaal 20 m2 per woning) derden';
        $headerData[12] = 'Zolder/vlieringvloerisolatie (in m2) (minimaal 20 m2 per woning) dhz';
        $headerData[13] = 'Zolder/vlieringvloerisolatie (in m2) (minimaal 20 m2 per woning) derden';
        $headerData[14] = 'Spouwmuurisolatie (in m2), (minimaal 10 m2 per woning) dhz';
        $headerData[15] = 'Spouwmuurisolatie (in m2), (minimaal 10 m2 per woning) derden';
        $headerData[16] = 'Gevelisolatie (zowel binnen- als buitengevelisolatie) (in m2) (minimaal 10 m2 per woning) dhz';
        $headerData[17] = 'Gevelisolatie (zowel binnen- als buitengevelisolatie) (in m2) (minimaal 10 m2 per woning) derden';
        $headerData[18] = 'Vloerisolatie (in m2) (minimaal 20 m2 per woning) dhz';
        $headerData[19] = 'Vloerisolatie (in m2) (minimaal 20 m2 per woning) derden';
        $headerData[20] = 'Bodemisolatie (in m2) (minimaal 20 m2 per woning) dhz';
        $headerData[21] = 'Bodemisolatie (in m2) (minimaal 20 m2 per woning) derden';
        $headerData[22] = 'Glas en kozijnpanelen Ug en Up ≤ 1,2 W/m2K dhz';
        $headerData[23] = 'Glas en kozijnpanelen Ug en Up ≤ 1,2 W/m2K derden';
        $headerData[24] = 'Isolerende deuren Ud ≤ 1,5 W/m2K dhz';
        $headerData[25] ='Isolerende deuren Ud ≤ 1,5 W/m2K derden';
        $headerData[26] = 'Glas en kozijnpanelen Ug en Up ≤ 0,7 W/m2K dhz';
        $headerData[27] = 'Glas en kozijnpanelen Ug en Up ≤ 0,7 W/m2K derden';
        $headerData[28] = 'Isolerende deuren Ud ≤ 1,0 W/m2K i.c.m. nieuwe isolerende kozijnen Uf ≤  1,5 W/m2K dhz';
        $headerData[29] = 'Isolerende deuren Ud ≤ 1,0 W/m2K i.c.m. nieuwe isolerende kozijnen Uf ≤  1,5 W/m2K derden';
        $headerData[30] = 'CO2-gestuurde ventilatie (mits van toepassing maximaal 1 invullen) dhz';
        $headerData[31] = 'CO2-gestuurde ventilatie (mits van toepassing maximaal 1 invullen) derden';
        $headerData[32] = 'Balansventilatie met WTW (evt. in combinatie met CO2-sturing) (mits van toepassing maximaal 1 invullen) dhz';
        $headerData[33] = 'Balansventilatie met WTW (evt. in combinatie met CO2-sturing) (mits van toepassing maximaal 1 invullen) derden';
        $headerData[34] = '??';

        $completeData[] = $headerData;

        Log::info('debug 2');
        Log::info($completeData);

        foreach ($this->quotationRequests->chunk(500) as $chunk) {
            $chunk->load([
                'opportunity.intake.address',
                'opportunity.intake.address.contact',
                'opportunity.intake.address.housingFile',
            ]);

            foreach ($chunk as $quotationRequest) {
                $address = $quotationRequest?->opportunity?->intake?->address;
                $contact = $quotationRequest?->opportunity?->intake?->address?->contact;
                $opportunity = $quotationRequest?->opportunity;
                $housingFile = $quotationRequest?->opportunity?->intake?->address?->housingFile;

//                $measures = [];
//                foreach ($quotationRequest->measures_applicable as $measure){
//                    array_push($measures, $measure->name);
//                }
//                if(count($measures) > 0){
//                    $quotationRequest->measures = implode(', ', $measures);
//                }

                $rowData = [];
                $rowData[0] = $address ? $address->street : '';
                $rowData[1] = $address ? $address->number : '';
                $rowData[2] = $address ? $address->addition : '';
                $rowData[3] = $address ? $address->postal_code : '';
                $rowData[4] = $address ? $address->city : '';
                $rowData[5] = $opportunity ? ( $opportunity->below_woz_limit == 1 ? 'Onder' : ($opportunity->below_woz_limit == 0 ? 'Boven' : '') )  : '';
                $rowData[6] = $housingFile?->energyLabel ? $housingFile->energyLabel->name : 'Niet aanwezig';

                $rowData[7] = ''; //TODO measures_applicable
                $rowData[8] = ''; //TODO measures_year
                $rowData[9] = ''; //TODO amount_granted

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

                $completeData[] = $rowData;
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'AI'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:AI1')
            ->applyFromArray([
                'font' => [
                    'bold' => true,
                ],

            ]);

        $writer = new Xlsx($spreadsheet);
        $document = $writer->save('php://output');
        return $document;
    }

     private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
}
