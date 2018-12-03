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

class RevenueDistributionCSVHelper
{
    private $csvExporter;
    private $distribution;

    public function __construct($distribution)
    {
        $this->csvExporter = new Export();
        $this->csvExporter->getCsv()->setDelimiter(';');
        $this->distribution = $distribution;
    }

    public function downloadCSV(){

        $csv = '';
        $headers = true;

        foreach ($this->distribution->chunk(500) as $chunk) {
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