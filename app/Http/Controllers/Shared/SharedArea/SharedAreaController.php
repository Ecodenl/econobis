<?php

namespace App\Http\Controllers\Shared\SharedArea;

use App\EcoShared\SharedArea\SharedArea;
use App\EcoShared\SharedPostalCodesHouseNumber\SharedPostalCodesHouseNumber;
use App\Http\Resources\SharedArea\SharedAreaSearch;
use Illuminate\Http\Request;

class SharedAreaController
{
    public function searchArea(Request $request)
    {
        $sharedAreas = SharedArea::select('id', 'area_code', 'area_name', 'municipality_name', 'district_name')->orderBy('area_name');
        foreach(explode(" ", $request->input('searchTerm')) as $searchTerm) {
            $sharedAreas->where(function ($sharedAreas) use ($searchTerm) {
                $sharedAreas->where('shared_areas.area_name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('shared_areas.district_name', 'like', '%' . $searchTerm . '%')
                    ->orWhere('shared_areas.municipality_name', 'like', '%' . $searchTerm . '%')
                ;
            });
        }
        $sharedAreas = $sharedAreas->get();

        return SharedAreaSearch::collection($sharedAreas);
    }

    public function getSharedAreaDetails(Request $request){
        $pc = $request->input('postalCode');

        if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $pc)){
            $pc = strtoupper(preg_replace('/\s+/', '', $pc));
        }

        $sharedPostalCodesHouseNumber = SharedPostalCodesHouseNumber::where('postal_code', $pc)->where('house_number', $request->input('number'))->first();

        if(isSet($sharedPostalCodesHouseNumber)) {
            return [
                'areaName' => $sharedPostalCodesHouseNumber->sharedArea->area_name,
                'districtName' => $sharedPostalCodesHouseNumber->sharedArea->district_name
            ];
        }

        return [
            'areaName' => '',
            'districtName' => ''
        ];

    }


}