<?php

namespace App\Http\Controllers\Shared\SharedArea;

use App\EcoShared\SharedDistrict\SharedArea;
use Illuminate\Http\Request;

class SharedAreaController
{

    public function getSharedArea(string $code)
    {
        return SharedArea::find($code);
    }

}