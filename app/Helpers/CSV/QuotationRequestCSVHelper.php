<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\CSV;

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use Carbon\Carbon;
use League\Csv\Reader;

class QuotationRequestCSVHelper
{
    private $csvExporter;
    private $quotationRequests;

    public function __construct($quotationRequests)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->quotationRequests = $quotationRequests;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->quotationRequests->chunk(500) as $chunk) {
            $chunk->load([

        ]);

        $this->csvExporter->beforeEach(function ($order) {

        });


        $csv = $this->csvExporter->build($chunk, [
         'id' => 'id'
        ], $headers);
            $headers = false;
        }

        return Reader::BOM_UTF8 . $csv->getCsv();
    }
}