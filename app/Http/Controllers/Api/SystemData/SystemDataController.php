<?php

namespace App\Http\Controllers\Api\SystemData;

use App\Http\Resources\SystemData\SystemData;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SystemDataController extends Controller
{
    public function get(Request $request)
    {
        return SystemData::make($request);
    }
}
