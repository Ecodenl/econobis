<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\JobsLog;

use App\Eco\Jobs\JobsLog;
use App\Http\Controllers\Api\ApiController;
use JosKolenberg\LaravelJory\Facades\Jory;

class JobController extends ApiController
{
    public function jory()
    {
        return Jory::on(JobsLog::class);
    }

}