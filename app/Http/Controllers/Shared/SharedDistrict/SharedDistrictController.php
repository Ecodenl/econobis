<?php

namespace App\Http\Controllers\Shared\SharedDistrict;

use App\EcoShared\SharedDistrict\SharedDistrict;
use Illuminate\Http\Request;

class SharedDistrictController
{
//    public function index()
//    {
////        if(!auth()->user()->hasPermissionTo('view_shared_district', 'api')) {
////            abort(403);
////        }
//
//        return SharedDistrict::orderBy('name')->get()->map(function ($sharedDistrict) {
//            return [
//                'id' => $sharedDistrict->id,
//                'districtCode' => $sharedDistrict->district_code,
//                'districtName' => $sharedDistrict->district_name,
//            ];
//        });
//    }
//
//    public function show(SharedDistrict $sharedDistrict)
//    {
////        if(!auth()->user()->hasPermissionTo('view_shared_district', 'api')) {
////            abort(403);
////        }
//
//        return [
//            'id' => $sharedDistrict->id,
//            'districtCode' => $sharedDistrict->district_code,
//            'districtName' => $sharedDistrict->district_name,
//        ];
//    }

    public function getDistrict(string $code)
    {
        return SharedDistrict::find($code);
    }

}