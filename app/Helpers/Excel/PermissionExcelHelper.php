<?php
/** Created by Délano instead of PHP storm */

namespace App\Helpers\Excel;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionExcelHelper {
    public function __construct() {

    }

    public function downloadExcel() {

        $permissions = Permission::all();
        if ($permissions->count() == 0) {
            abort (403, 'Er is iets mis gegaan. Neem contact op met de beheerder.');
        }

        $completedData = [];
        $headerData = [];
        $headerData[0] = 'Role';

        $roles = Role::all();
        foreach ($roles as $role) {
            $headerData[] = $role->name;
        }

        $completeData[] = $headerData;

        foreach ($permissions as $permission) {
            $rowData = [];
            $rowData[0] = $permission->name;
            foreach ($roles as $role) {
                $rowData[] = $role->hasPermissionTo($permission) ? 'V' : '';
            }
            $completeData[] = $rowData;

        }

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Load all data in worksheet
        $sheet->fromArray($completeData);

        for ($col = 'A'; $col !== 'Q'; $col++) {
            $spreadsheet->getActiveSheet()
                ->getColumnDimension($col)
                ->setAutoSize(true);
        }

        $sheet->getStyle('A1:Q1')
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