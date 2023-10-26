<?php

namespace App\Http\Controllers\Shared\SharedDistrict;

use App\EcoShared\SharedDistrict\SharedDistrict;

class SharedDistrictController
{
    public function getSharedDistrict(string $code)
    {
        return SharedDistrict::find($code);
    }

}