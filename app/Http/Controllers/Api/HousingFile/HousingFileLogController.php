<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\HousingFile;

use App\Eco\HousingFile\HousingFileLog;
use App\Http\Controllers\Api\ApiController;
use JosKolenberg\LaravelJory\Facades\Jory;

class HousingFileLogController extends ApiController
{
    public function jory()
    {
        return Jory::on(HousingFileLog::class);
    }

}