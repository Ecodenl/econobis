<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use Carbon\Carbon;
use League\Csv\Reader;

class QuotationRequestSpukLaiHelper
{
    private $csvExporter;
    private $quotationRequests;

    public function __construct($quotationRequests)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->quotationRequests = $quotationRequests;

        die();
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->quotationRequests->chunk(500) as $chunk) {
            $chunk->load([
//                'organisationOrCoach',
//                'projectManager',
//                'externalParty',
//                'status',
//                'opportunityAction',
//                'opportunity.intake.contact.person.title',
//                'opportunity.intake.campaign',
//                'opportunity.measureCategory',
//                'opportunity.measures',
            ]);

            $this->csvExporter->beforeEach(function ($quotationRequest) {
//                $quotationRequest->opportunityActionName = $quotationRequest->opportunityAction ? $quotationRequest->opportunityAction->name : '';

                $address = $quotationRequest->opportunity->intake->address;

                $quotationRequest->street = ($address ? $address->street : '');
                $quotationRequest->street_number = ($address ? $address->number : '');
                $quotationRequest->addition = ($address ? $address->addition : '');
                $quotationRequest->postal_code = ($address ? $address->postal_code : '');
                $quotationRequest->city = ($address ? $address->city : '');

                $quotationRequest->below_woz_limit = $quotationRequest->opportunity->below_woz_limit == 1 ? 'Ja' : 'Nee';

                $quotationRequest->energy_label = (($address && $address->housingFile && $address->housingFile->energyLabel) ? $address->housingFile->energyLabel->name : '');

//                $measures = [];
//                foreach ($quotationRequest->measures_applicable as $measure){
//                    array_push($measures, $measure->name);
//                }
//                if(count($measures) > 0){
//                    $quotationRequest->measures = implode(', ', $measures);
//                }
//                $quotationRequest->measures_applicable = ''; //TODO
                $quotationRequest->measures_applicable = ''; //TODO
                $quotationRequest->measures_year = ''; //TODO

                $quotationRequest->amount_granted = ''; //TODO
                $quotationRequest->exception_debt_relief = $quotationRequest->opportunity->exception_debt_relief == 1 ? 'Ja' : 'Nee';

                $quotationRequest->roof_insulation_diy = ''; //TODO
                $quotationRequest->roof_insulation_thirdparty = ''; //TODO
                $quotationRequest->attic_insulation_diy = ''; //TODO
                $quotationRequest->attic_insulation_thirdparty = ''; //TODO
                $quotationRequest->cavity_wall_insulation_diy = ''; //TODO
                $quotationRequest->cavity_wall_insulation_thirdparty = ''; //TODO
                $quotationRequest->facade_insulation_diy = ''; //TODO
                $quotationRequest->facade_insulation_thirdparty = ''; //TODO
                $quotationRequest->floor_insulation_diy = ''; //TODO
                $quotationRequest->floor_insulation_thirdparty = ''; //TODO
                $quotationRequest->ground_insulation_diy = ''; //TODO
                $quotationRequest->ground_insulation_thirdparty = ''; //TODO

                $quotationRequest->glass_and_frame_panels_1_2_diy = ''; //TODO
                $quotationRequest->glass_and_frame_panels_1_2_thirdparty = ''; //TODO
                $quotationRequest->insulating_doors_1_5_diy = ''; //TODO
                $quotationRequest->insulating_doors_1_5_thirdparty = ''; //TODO
                $quotationRequest->glass_and_frame_panels_0_7_diy = ''; //TODO
                $quotationRequest->glass_and_frame_panels_0_7_thirdparty = ''; //TODO
                $quotationRequest->insulating_doors_1_0_diy = ''; //TODO
                $quotationRequest->insulating_doors_1_0_thirdparty = ''; //TODO
                $quotationRequest->co2_controlled_ventilation_diy = ''; //TODO
                $quotationRequest->co2_controlled_ventilation_thirdparty = ''; //TODO
                $quotationRequest->balance_ventilation_with_heat_recovery_diy = ''; //TODO
                $quotationRequest->balance_ventilation_with_heat_recovery_thirdparty = ''; //TODO
            });

            $csv = $this->csvExporter->build($chunk, [
                'street' => 'Straat',
                'street_number' => 'nr.',
                'addition' => 'Toevoeging',
                'postal_code' => 'Postcode',
                'city' => 'Woonplaats',
                'below_woz_limit' => ' WOZ-waarde boven of onder gemiddelde WOZ- waarde van de koopwoningen in de betreffende gemeente of de NHG-grens',
                'energy_label' => 'Evt. aanwezig energielabel (sleepmenu D t/m G)',
                'measures_applicable' => 'Opsomming van energetisch slechte schilelementen (minimaal 2)',
                'measures_year' => 'Jaar uitvoering maatregel(en)',
                'amount_granted'=> 'Toegekend bedrag(in euro\'s)',
                'roof_insulation' => 'Dakisolatie (in m2) (minimaal 20 m2 per woning) dhz',
                'roof_insulation' => 'Dakisolatie (in m2) (minimaal 20 m2 per woning) derden',
                'attic_insulation' => 'Zolder/vlieringvloerisolatie (in m2) (minimaal 20 m2 per woning) dhz',
                'attic_insulation' => 'Zolder/vlieringvloerisolatie (in m2) (minimaal 20 m2 per woning) derden',
                'cavity_wall_insulation' => 'Spouwmuurisolatie (in m2), (minimaal 10 m2 per woning) dhz',
                'cavity_wall_insulation' => 'Spouwmuurisolatie (in m2), (minimaal 10 m2 per woning) derden',
                'facade_insulation' => 'Gevelisolatie (zowel binnen- als buitengevelisolatie) (in m2) (minimaal 10 m2 per woning) dhz',
                'facade_insulation' => 'Gevelisolatie (zowel binnen- als buitengevelisolatie) (in m2) (minimaal 10 m2 per woning) derden',
                'floor_insulation' => 'Vloerisolatie (in m2) (minimaal 20 m2 per woning) dhz',
                'floor_insulation' => 'Vloerisolatie (in m2) (minimaal 20 m2 per woning) derden',
                'ground_insulation' => 'Bodemisolatie (in m2) (minimaal 20 m2 per woning) dhz',
                'ground_insulation' => 'Bodemisolatie (in m2) (minimaal 20 m2 per woning) derden',
                'glass_and_frame_panels_1_2' => 'Glas en kozijnpanelen Ug en Up ≤ 1,2 W/m2K dhz',
                'glass_and_frame_panels_1_2' => 'Glas en kozijnpanelen Ug en Up ≤ 1,2 W/m2K derden',
                'insulating_doors_1_5' => 'Isolerende deuren Ud ≤ 1,5 W/m2K dhz',
                'insulating_doors_1_5' => 'Isolerende deuren Ud ≤ 1,5 W/m2K derden',
                'glass_and_frame_panels_0_7' => 'Glas en kozijnpanelen Ug en Up ≤ 0,7 W/m2K dhz',
                'glass_and_frame_panels_0_7' => 'Glas en kozijnpanelen Ug en Up ≤ 0,7 W/m2K derden',
                'insulating_doors_1_0' => 'Isolerende deuren Ud ≤ 1,0 W/m2K i.c.m. nieuwe isolerende kozijnen Uf ≤  1,5 W/m2K dhz',
                'insulating_doors_1_0' => 'Isolerende deuren Ud ≤ 1,0 W/m2K i.c.m. nieuwe isolerende kozijnen Uf ≤  1,5 W/m2K derden',
                'co2_controlled_ventilation' => 'CO2-gestuurde ventilatie (mits van toepassing maximaal 1 invullen) dhz',
                'co2_controlled_ventilation' => 'CO2-gestuurde ventilatie (mits van toepassing maximaal 1 invullen) derden',
                'balance_ventilation_with_heat_recovery' => 'Balansventilatie met WTW (evt. in combinatie met CO2-sturing) (mits van toepassing maximaal 1 invullen) dhz',
                'balance_ventilation_with_heat_recovery' => 'Balansventilatie met WTW (evt. in combinatie met CO2-sturing) (mits van toepassing maximaal 1 invullen) derden',
            ], $headers);
            $headers = false;
        }
        if (empty($csv)) abort(422, 'Geen gegevens om te downloaden');

        return Reader::BOM_UTF8 . $csv->getCsv();
    }

    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }
    private function formatDateTime($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y H:i') : '';
    }
}