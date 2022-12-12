<?php

namespace App\Http\Controllers\Api\District;

use App\Eco\District\District;
use Illuminate\Http\Request;

class DistrictController
{
    public function index()
    {
        return District::all()->map(function ($district) {
            return [
                'id' => $district->id,
                'name' => $district->name,
            ];
        });
    }

    public function show(District $district)
    {
        return [
            'id' => $district->id,
            'name' => $district->name,
        ];
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $district = new District();
        $district->name = $request->name;
        $district->save();

        return [
            'id' => $district->id,
        ];
    }

    public function update(Request $request, District $district)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $district->name = $request->name;
        $district->save();
    }
}