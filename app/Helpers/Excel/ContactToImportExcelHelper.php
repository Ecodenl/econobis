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
        $headerData[] = 'Title';
        $headerData[] = 'Voornaam';
        $headerData[] = 'Tussen voegsel';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Geboortedatum';
        $headerData[] = 'Straat';
        $headerData[] = 'Huis nr';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Woonplaats';
        $headerData[] = 'IBAN';
        $headerData[] = 'Email primair';
        $headerData[] = 'Email financieel';
        $headerData[] = 'Telefoon';
        $headerData[] = 'KvK nummer';
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

                $dateOfBirth = $contactToImport['dateOfBirth'] && !empty($contactToImport['dateOfBirth']) ? Carbon::parse($contactToImport['dateOfBirth'])->format('d-m-Y') : '';

                $partialHiddenIbanContactToImport = self::partialHiddenIban($contactToImport['iban']);

                // Choose which fields to use based on the 'eanType'
                if ($contactToImport['eanType'] === 'Gas') {
                    $ean = $contactToImport['eanGas'] && !empty($contactToImport['eanGas']) ? 'EAN: ' . $contactToImport['eanGas'] : '';
                    $memberSince = $contactToImport['memberSinceGas'] && !empty($contactToImport['memberSinceGas']) ? Carbon::parse($contactToImport['memberSinceGas'])->format('d-m-Y') : '';
                    $endDate = $contactToImport['endDateGas'] && !empty($contactToImport['endDateGas']) ? Carbon::parse($contactToImport['endDateGas'])->format('d-m-Y') : '';
                } else {
                    $ean = $contactToImport['ean'] && !empty($contactToImport['ean']) ? 'EAN: ' . $contactToImport['ean'] : '';
                    $memberSince = $contactToImport['memberSince'] && !empty($contactToImport['memberSince']) ? Carbon::parse($contactToImport['memberSince'])->format('d-m-Y') : '';
                    $endDate = $contactToImport['endDate'] && !empty($contactToImport['endDate']) ? Carbon::parse($contactToImport['endDate'])->format('d-m-Y') : '';
                }

                $rowData = [];

                $rowData[0] = $statusText;
                $rowData[1] = $contactToImport['importMatchDescription'] ?: '';
                $rowData[2] = $contactToImport['contactNumber'] ?: '';
                $rowData[3] = $contactToImport['title'] ?: '';
                $rowData[4] = $contactToImport['firstName'] ?: '';
                $rowData[5] = $contactToImport['lastNamePrefix'] ?: '';
                $rowData[6] = $contactToImport['lastName'] ?: '';
                $rowData[7] = $dateOfBirth;
                $rowData[8] = $contactToImport['street'] ?: '';
                $rowData[9] = $contactToImport['housenumber'] ?: '';
                $rowData[10] = $contactToImport['addition'] ?: '';
                $rowData[11] = $contactToImport['postalCode'] ?: '';
                $rowData[12] = $contactToImport['city'] ?: '';
                $rowData[13] = $partialHiddenIbanContactToImport;
                $rowData[14] = $contactToImport['emailContact'] ?: '';
                $rowData[15] = $contactToImport['emailContactFinancial'] ?: '';
                $rowData[16] = $contactToImport['phoneNumber'] ?: '';
                $rowData[17] = $contactToImport['chamberOfCommerceNumber'] ?: '';
                $rowData[18] = $contactToImport['supplierCodeRef'] ?: '';
                $rowData[19] = $contactToImport['eanType'] ?: '';
                $rowData[20] = $ean;
                $rowData[21] = $contactToImport['esNumber'] ?: '';
                $rowData[22] = $memberSince;
                $rowData[23] = $endDate;

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

                        $partialHiddenIbanContactForImport = self::partialHiddenIban($contactForImport['iban']);

                        $rowData = [];

                        $rowData[0] = '';
                        $rowData[1] = $contactForImport['matchDescription'] ?: '';
                        $rowData[2] = $contactForImport['number'] ?: '';
                        $rowData[3] = $contactForImport['title'] ?: '';
                        $rowData[4] = $contactForImport['firstName'] ?: '';
                        $rowData[5] = $contactForImport['lastNamePrefix'] ?: '';
                        $rowData[6] = $contactForImport['lastName'] ?: '';
                        $rowData[7] = $contactForImport['dateOfBirth'] ?: '';
                        $rowData[8] = $contactForImport['street'] ?: '';
                        $rowData[9] = $contactForImport['housenumber'] ?: '';
                        $rowData[10] = $contactForImport['addition'] ?: '';
                        $rowData[11] = $contactForImport['postalCode'] ?: '';
                        $rowData[12] = $contactForImport['city'] ?: '';
                        $rowData[13] = $partialHiddenIbanContactForImport;
                        $rowData[14] = $contactForImport['emailContact'] ?: '';
                        $rowData[15] = $contactForImport['emailContactFinancial'] ?: '';
                        $rowData[16] = $contactForImport['phoneNumber'] ?: '';
                        $rowData[17] = $contactForImport['chamberOfCommerceNumber'] ?: '';
                        $rowData[18] = $contactForImportData['supplierCodeRef'] ?: '';
                        $rowData[19] = $contactForImportData['eanType'] ?: '';
                        $rowData[20] = $contactForImportData['ean'] ?: '';
                        $rowData[21] = $contactForImportData['esNumber'] ?: '';
                        $rowData[22] = $contactForImportData['memberSince'] ?: '';
                        $rowData[23] = $contactForImportData['endDate'] ?: '';

                        $completeData[] = $rowData;

                    }
                }
            }
        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'Y'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:X1')
            ->applyFromArray([
                'font' => [
                    'bold' => true,
                ],

            ]);

        $writer = new Xlsx($spreadsheet);
        $document = $writer->save('php://output');
        return $document;
    }

    private function partialHiddenIban(string $partialHiddenIban) : string
    {
        if($partialHiddenIban && !empty($partialHiddenIban) && strlen($partialHiddenIban)>13)
        {
            $numberOfHiddenCharacters = strlen($partialHiddenIban) - 11;                         // 18 - 11 = 7
            $partialHiddenIbanContactForImport = substr($partialHiddenIban, 0, 7);  // eerste 7
            while($numberOfHiddenCharacters > 0) {
                $partialHiddenIbanContactForImport = $partialHiddenIbanContactForImport . '*';
                $numberOfHiddenCharacters--;
            }
            return $partialHiddenIbanContactForImport . (substr($partialHiddenIban, -4));
        }
        return '';
    }
}

