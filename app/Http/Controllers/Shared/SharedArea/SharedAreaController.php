<?php

namespace App\Http\Controllers\Shared\SharedArea;

use App\EcoShared\SharedArea\SharedArea;
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


}