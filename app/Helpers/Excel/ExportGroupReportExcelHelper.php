<?php

namespace App\Helpers\Excel;

use App\Eco\ContactGroup\ContactGroup;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ExportGroupReportExcelHelper
{
    private $contacts;
    private $contactGroups;

    public function __construct($contacts)
    {
        $this->contacts = $contacts;
        $this->contactGroups = ContactGroup::whereTeamContactGroupIds(Auth::user())
            ->where('include_into_export_group_report', true)
            ->where('type_id', 'static')
            ->orderBy('name')
            ->get();
    }

    public function downloadExportGroupReportExcelHelper()
    {
        if($this->contacts == null || $this->contacts->count() === 0){
            return null;
        }

        $completeData = [];

        $headerData = [];
        $headerData[] = '#';
        $headerData[] = 'Naam';
        $headerData[] = 'Organisatie';
        $headerData[] = 'Aanspreektitel';
        $headerData[] = 'Voornaam';
        $headerData[] = 'Tussenvoegsel';
        $headerData[] = 'Achternaam';
        $headerData[] = 'Adres';
        $headerData[] = 'Huisnummer';
        $headerData[] = 'Toevoeging';
        $headerData[] = 'Postcode';
        $headerData[] = 'Plaats';
        $headerData[] = 'Land';
        foreach ($this->contactGroups as $contactGroup) {
            $headerData[] = $this->translateToValidCharacterSet($contactGroup->name);
        }

        $completeData[] = $headerData;

        foreach ($this->contacts->chunk(500) as $chunk) {
            $chunk->load([
                'person',
                'primaryAddress',
                'selectedGroups',
            ]);
            foreach ($chunk as $contact) {
                $rowData = [];
                $rowData[] = $contact->number;
                // person/organisation fields
                if($contact->isPerson()){
                    $contact->organisation = '';
                    $contact->title = $contact->person->title ? $contact->person->title->name : '';
                    $contact->first_name = $contact->person->first_name;
                    $contact->last_name_prefix = $contact->person->last_name_prefix ? $contact->person->last_name_prefix : '';
                    $contact->last_name = $contact->person->last_name;
                    $contact->full_name = $contact->full_name;
                }
                else if($contact->isOrganisation()){
                    $contact->organisation = $contact->organisation->name;
                    if($contact->contactPerson && $contact->contactPerson->exists() && $contact->contactPerson->contact->isPerson()){
                        $contactPerson = $contact->contactPerson->contact;
                        $contact->title = $contactPerson->person->title ? $contactPerson->person->title->name : '';
                        $contact->first_name = $contactPerson->person->first_name;
                        $contact->last_name_prefix = $contactPerson->person->last_name_prefix ? $contactPerson->person->last_name_prefix : '';
                        $contact->last_name = $contactPerson->person->last_name;
                        $contact->full_name = $contactPerson->full_name;
                    }
                    else{
                        $contact->title = '';
                        $contact->first_name = '';
                        $contact->last_name_prefix ='';
                        $contact->last_name = '';
                        $contact->full_name = '';
                    }
                } else {
                    $contact->organisation = '';
                    $contact->title = '';
                    $contact->first_name = '';
                    $contact->last_name_prefix ='';
                    $contact->last_name = '';
                    $contact->full_name = '';
                }


                $rowData[] = $contact->full_name;
                $rowData[] = $contact->organisation;
                $rowData[] = $contact->title;
                $rowData[] = $contact->first_name;
                $rowData[] = $contact->last_name_prefix;
                $rowData[] = $contact->last_name;

                if($contact->primaryAddress){
                    $rowData[] = $contact->primaryAddress->street;
                    $rowData[] = $contact->primaryAddress->number;
                    $rowData[] = $contact->primaryAddress->addition;
                    $rowData[] = $contact->primaryAddress->postal_code;
                    $rowData[] = $contact->primaryAddress->city;
                    $rowData[] = $contact->primaryAddress->country ? $contact->primaryAddress->country->name : '';
                }else{
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                    $rowData[] = '';
                }
                $contactGroupIds = $contact->selectedGroups()->whereTeamContactGroupIds(Auth::user())->pluck('id')->toArray();
                foreach ($this->contactGroups as $contactGroup) {
                    if(in_array($contactGroup->id, $contactGroupIds)){
                        $contactGroupsPivot= $contactGroup->contacts()->where('contact_id', $contact->id)->first()->pivot;
                        $rowData[] = $contactGroupsPivot->member_to_group_since ? $this->formatDate($contactGroupsPivot->member_to_group_since) : 'onbekend';
                    } else {
                        $rowData[] = '';
                    }
                }
                $completeData[] = $rowData;
            }

        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        for ($col = 'A'; $col !== 'Z'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('1:1')->getFont()->setBold(true);

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        $writer = new Xlsx($spreadsheet);
        $document = $writer->save('php://output');
        return $document;

    }

    protected function translateToValidCharacterSet($field){

//        $field = strtr(utf8_decode($field), utf8_decode('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ'), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
        $field = strtr(mb_convert_encoding($field, 'UTF-8', mb_list_encodings()), mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'UTF-8', mb_list_encodings()), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }
    private function formatDate($date) {
        $formatDate = $date ? new Carbon($date) : false;
        return $formatDate ? $formatDate->format('d-m-Y') : '';
    }

//    private function formatFinancial($amount, $decimals){
//        return number_format($amount, $decimals, '.', '');
//    }

}