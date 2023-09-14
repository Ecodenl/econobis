<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\FreeFields;

use App\Http\Controllers\Api\ApiController;
use App\Eco\FreeFields\FreeFieldsTable;
use App\Http\Resources\FreeFields\PeekFreeFieldsTable;
use Illuminate\Http\Request;

class FreeFieldsTableController extends ApiController
{
    public function peek(Request $request)
    {
        return PeekFreeFieldsTable::collection(FreeFieldsTable::orderBy('name')->get());
    }

}