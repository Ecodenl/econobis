<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Excel;

use App\Eco\HousingFile\HousingFileHoomHousingStatus;
use App\Eco\HousingFile\HousingFileHoomLink;
use App\Eco\HousingFile\HousingFileHousingStatus;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class HousingFileExcelHelper
{
    private $housingFiles;

    public function __construct($housingFiles)
    {
        $this->housingFiles = $housingFiles;
        // voorlopig even op volgorde external_hoom_short_name
        $this->housingFileHoomLinksStatus = HousingFileHoomLink::where('housing_file_data_type', 'W')->where('visible_in_econobis', true)->orderBy('external_hoom_short_name')->get();
    }

    public function downloadExcel()
    {

        if($this->housingFiles->count() === 0){
            abort(403, 'Geen woningdossiers aanwezig in selectie');
        }

        $completeData = [];

        $headerData = [];

        $headerData[] = 'Contactnaam';
        $headerData[] = 'Straat';
        $headerData[] = 'Nummer';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Plaats';
        $headerData[] = 'Woningtype';
        $headerData[] = 'Gebruikersopervlakte';
        $headerData[] = 'Bouwjaar';
        $headerData[] = 'Daktype';
        $headerData[] = 'Energielabel';
        $headerData[] = 'Status energielabel';
        $headerData[] = 'Aantal bouwlagen';
        $headerData[] = 'Monument';
        $headerData[] = 'Koophuis';

        $headerData[] = 'Hoom building Id';
        $headerData[] = 'Geveloppervlakte';
        $headerData[] = 'Raamoppervlakte';
        $headerData[] = 'Kozijntype';
        $headerData[] = 'Vloeroppervlakte';
        $headerData[] = 'Hellend dakoppervlakte';
        $headerData[] = 'Platte dakoppervlakte';
        $headerData[] = 'Manier koken';
        $headerData[] = 'Verwarming';
        $headerData[] = 'Water comfort';

        $headerData[] = 'Hellend dak ruimtes verwarming';
        $headerData[] = 'Platte dak ruimtes verwarming';
        $headerData[] = 'hr3p glaslijst (huidig)';
        $headerData[] = 'Kamers verwarmd (met Glas-in-lood ramen)';
        $headerData[] = 'Aantal bewoners';
        $headerData[] = 'Stooktemperatuur';
        $headerData[] = 'Verbruik gas';
        $headerData[] = 'Verbruik elektriciteit';

        $headerData[] = 'Opbrengst zonnepanelen';

        foreach($this->housingFileHoomLinksStatus as $housingFileHoomLinkStatus) {
            $headerData[] = $housingFileHoomLinkStatus->label;
        }

        $completeData[] = $headerData;

        foreach ($this->housingFiles->chunk(500) as $chunk) {
            $chunk->load([
                'address.country',
            ]);

            foreach ($chunk as $housingFile) {
                $rowData = [];
                $rowData[0] = $housingFile->address->contact ? $housingFile->address->contact->full_name : '';
                $rowData[1] = $housingFile->address->street;
                $rowData[2] = $housingFile->address->number;
                $rowData[3] = $housingFile->address->addition;
                $rowData[4] = $housingFile->address->postal_code;
                $rowData[5] = $housingFile->address->city;
                $rowData[6] = $housingFile->buildingType ? $housingFile->buildingType->name : '';
                $rowData[7] = $housingFile->surface;
                $rowData[8] = $housingFile->build_year;
                $rowData[9] = $housingFile->roofType ? $housingFile->roofType->name : '';
                $rowData[10] = $housingFile->energyLabel ? $housingFile->energyLabel->name : '';
                $rowData[11] = $housingFile->energyLabelStatus ? $housingFile->energyLabelStatus->name : '';
                $rowData[12] = $housingFile->floors;
                $rowData[13] = $housingFile->is_monument ? 'Ja' : 'Nee';
                $rowData[14] = $housingFile->is_house_for_sale ? 'Ja' : 'Nee';

                $rowData[15] = $housingFile->hoom_building_id;
                $rowData[16] = $housingFile->wall_surface;
                $rowData[17] = $housingFile->total_window_surface;
                $rowData[18] = $housingFile->frameType ? $housingFile->frameType->hoom_status_name : '';
                $rowData[19] = $housingFile->floor_surface;
                $rowData[20] = $housingFile->pitched_roof_surface;
                $rowData[21] = $housingFile->flat_roof_surface;
                $rowData[22] = $housingFile->cookType ? $housingFile->cookType->hoom_status_name : '';
                $rowData[23] = $housingFile->heatSource ? $housingFile->heatSource->hoom_status_name : '';
                $rowData[24] = $housingFile->waterComfort ? $housingFile->waterComfort->hoom_status_name : '';

                $rowData[25] = $housingFile->pitchedRoofHeating ? $housingFile->pitchedRoofHeating->hoom_status_name : '';
                $rowData[26] = $housingFile->flatRoofHeating ? $housingFile->flatRoofHeating->hoom_status_name : '';
                $rowData[27] = $housingFile->hr3pGlassFrameCurrentGlass ? $housingFile->hr3pGlassFrameCurrentGlass->hoom_status_name : '';
                $rowData[28] = $housingFile->glassInLeadReplaceRoomsHeated ? $housingFile->glassInLeadReplaceRoomsHeated->hoom_status_name : '';
                $rowData[29] = $housingFile->number_of_residents;
                $rowData[30] = $housingFile->boilerSettingComfortHeat ? $housingFile->boilerSettingComfortHeat->hoom_status_name : '';
                $rowData[31] = $housingFile->amount_gas;
                $rowData[32] = $housingFile->amount_electricity;


                $rowData[33] = $housingFile->revenue_solar_panels;

                $colcounter = 34;
                foreach($this->housingFileHoomLinksStatus as $housingFileHoomLinkStatus) {
                    $housingFileHousingStatus = HousingFileHousingStatus::where('housing_file_id', $housingFile->id)->where('housing_file_hoom_links_id', $housingFileHoomLinkStatus->id)->first();

                    if($housingFileHousingStatus AND $hfhhs = HousingFileHoomHousingStatus::where('external_hoom_short_name', $housingFileHoomLinkStatus->external_hoom_short_name)->where('hoom_status_value', $housingFileHousingStatus->status)->first()) {
                        $rowData[$colcounter] = $hfhhs->hoom_status_name;
                    } else {
                        $rowData[$colcounter] = '';
                    }
                    $colcounter = $colcounter + 1;
                }

                $completeData[] = $rowData;
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'AR'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:AR1')
            ->applyFromArray([
                'font' => [
                    'bold' => true,
                ],

            ]);

        $writer = new Xlsx($spreadsheet);
        $document = $writer->save('php://output');
        return $document;
    }
}