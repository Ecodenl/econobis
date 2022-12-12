<?php

namespace App\Http\Controllers\Api\District;

use App\Eco\District\District;

class DistrictController
{
    public function grid()
    {
        return District::all()->map(function ($district) {
            return [
                'id' => $district->id,
                'name' => $district->name,
            ];
        });
    }
}