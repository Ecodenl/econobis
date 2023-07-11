<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\TwinfieldLog;

use App\Eco\Twinfield\TwinfieldLog;
use App\Http\Controllers\Api\ApiController;
use JosKolenberg\LaravelJory\Facades\Jory;

class TwinfieldLogController extends ApiController
{
    public function jory()
    {
        return Jory::on(TwinfieldLog::class);
    }

}