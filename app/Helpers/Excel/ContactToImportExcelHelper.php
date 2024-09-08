<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Excel;

use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ContactToImportExcelHelper
{
    private $contactToImports;

    public function __construct($contactToImports)
    {
        $this->contactToImports = $contactToImports;
    }

    public function downloadExcel()
    {
        if($this->contactToImports->count() === 0){
            abort(403, 'Geen import energie klanten aanwezig in selectie');
        }

        $completeData = [];

        $headerData = [];

        $headerData[] = 'Status';
        $headerData[] = 'Match';
        $headerData[] = 'Contact nr';
        $headerData[] = 'Voornaam';
        $headerData[] = 'Tussen voegsel';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Adres';
        $headerData[] = 'Straat';
        $headerData[] = 'Huis nr';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Woonplaats';
        $headerData[] = 'Email primair';
        $headerData[] = 'Telefoon';
        $headerData[] = 'Energie leverancier';
        $headerData[] = 'Ean type';
        $headerData[] = 'Ean';
        $headerData[] = 'Klant nr';
        $headerData[] = 'Klant sinds';
        $headerData[] = 'Klant tot';

        $completeData[] = $headerData;

        foreach ($this->contactToImports->chunk(200) as $chunk) {
            foreach ($chunk as $contactToImport) {
                switch ($contactToImport['status']) {
                    case 'new':
                        $statusText = 'Nieuw';
                        break;
                    case 'created':
                        $statusText = 'Contact aangemaakt';
                        break;
                    case 'updated':
                        $statusText = 'Contact bijgewerkt';
                        break;
                    default:
                        $statusText = '';
                        break;
                }

                $ean = $contactToImport['ean'] && !empty($contactToImport['ean']) ? 'EAN: ' . $contactToImport['ean'] : '';
                $memberSince = $contactToImport['memberSince'] && !empty($contactToImport['memberSince']) ? Carbon::parse($contactToImport['memberSince'])->format('d-m-Y') : '';
                $endDate = $contactToImport['endDate'] && !empty($contactToImport['endDate']) ? Carbon::parse($contactToImport['endDate'])->format('d-m-Y') : '';

                $rowData = [];

                $rowData[0] = $statusText;
                $rowData[1] = $contactToImport['importMatchDescription'] ?: '';
                $rowData[2] = $contactToImport['contactNumber'] ?: '';
                $rowData[3] = $contactToImport['firstName'] ?: '';
                $rowData[4] = $contactToImport['lastNamePrefix'] ?: '';
                $rowData[5] = $contactToImport['lastName'] ?: '';
                $rowData[6] = $contactToImport['address'] ?: '';
                $rowData[7] = $contactToImport['street'] ?: '';
                $rowData[8] = $contactToImport['housenumber'] ?: '';
                $rowData[9] = $contactToImport['addition'] ?: '';
                $rowData[10] = $contactToImport['postalCode'] ?: '';
                $rowData[11] = $contactToImport['city'] ?: '';
                $rowData[12] = $contactToImport['emailContact'] ?: '';
                $rowData[13] = $contactToImport['phoneNumber'] ?: '';
                $rowData[14] = $contactToImport['supplierCodeRef'] ?: '';
                $rowData[16] = $contactToImport['eanType'] ?: '';
                $rowData[15] = $ean;
                $rowData[17] = $contactToImport['esNumber'] ?: '';
                $rowData[18] = $memberSince;
                $rowData[19] = $endDate;

                $completeData[] = $rowData;

                if ($contactToImport['contactForImports'] ) {
                    foreach ($contactToImport['contactForImports']  as $contactForImport) {
                        $contactForImport = collect($contactForImport);

                        // Choose which fields to use based on the 'eanType'
                        if ($contactToImport['eanType'] === 'Gas') {
                            $contactForImportData = [
                                'supplierCodeRef' => $contactForImport['esCodeRefGas'],
                                'ean' => ($contactForImport['eanGas'] && !empty($contactForImport['eanGas']) ? 'EAN: ' . $contactForImport['eanGas'] : ''),
                                'eanType' => $contactForImport['esTypeGas'],
                                'esNumber' => $contactForImport['esNumberGas'],
                                'memberSince' => ($contactForImport['esMemberSinceGas'] && !empty($contactForImport['esMemberSinceGas']) ? Carbon::parse($contactForImport['esMemberSinceGas'])->format('d-m-Y') : ''),
                                'endDate' => ($contactForImport['esEndDateGas'] && !empty($contactForImport['esEndDateGas']) ? Carbon::parse($contactForImport['esEndDateGas'])->format('d-m-Y') : ''),
                            ];
                        } else {
                            $contactForImportData = [
                                'supplierCodeRef' => $contactForImport['esCodeRefElectricity'],
                                'ean' => ($contactForImport['eanElectricity'] && !empty($contactForImport['eanElectricity']) ? 'EAN: ' . $contactForImport['eanElectricity'] : ''),
                                'eanType' => $contactForImport['esTypeElectricity'],
                                'esNumber' => $contactForImport['esNumberElectricity'],
                                'memberSince' => ($contactForImport['esMemberSinceElectricity'] && !empty($contactForImport['esMemberSinceElectricity']) ? Carbon::parse($contactForImport['esMemberSinceElectricity'])->format('d-m-Y') : ''),
                                'endDate' => ($contactForImport['esEndDateElectricity'] && !empty($contactForImport['esEndDateElectricity']) ? Carbon::parse($contactForImport['esEndDateElectricity'])->format('d-m-Y') : ''),
                            ];
                        }
                        $rowData = [];

                        $rowData[0] = '';
                        $rowData[1] = $contactForImport['matchDescription'] ?: '';
                        $rowData[2] = $contactForImport['number'] ?: '';
                        $rowData[3] = $contactForImport['firstName'] ?: '';
                        $rowData[4] = $contactForImport['lastNamePrefix'] ?: '';
                        $rowData[5] = $contactForImport['lastName'] ?: '';
                        $rowData[6] = $contactForImport['address'] ?: '';
                        $rowData[7] = $contactForImport['street'] ?: '';
                        $rowData[8] = $contactForImport['housenumber'] ?: '';
                        $rowData[9] = $contactForImport['addition'] ?: '';
                        $rowData[10] = $contactForImport['postalCode'] ?: '';
                        $rowData[11] = $contactForImport['city'] ?: '';
                        $rowData[12] = $contactForImport['emailContact'] ?: '';
                        $rowData[13] = $contactForImport['phoneNumber'] ?: '';
                        $rowData[14] = $contactForImportData['supplierCodeRef'] ?: '';
                        $rowData[15] = $contactForImportData['ean'] ?: '';
                        $rowData[16] = $contactForImportData['eanType'] ?: '';
                        $rowData[17] = $contactForImportData['esNumber'] ?: '';
                        $rowData[18] = $contactForImportData['memberSince'] ?: '';
                        $rowData[19] = $contactForImportData['endDate'] ?: '';

                        $completeData[] = $rowData;

                    }
                }
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'T'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:T1')
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