<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\FreeFields;

use App\Eco\FreeFields\FreeFieldsFieldFormat;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\FreeFields\PeekFreeFieldsFieldFormat;
use Illuminate\Http\Request;

class FreeFieldsFieldFormatController extends ApiController
{
    public function peek(Request $request)
    {
        return PeekFreeFieldsFieldFormat::collection(FreeFieldsFieldFormat::orderBy('format_name')->get());
    }
}