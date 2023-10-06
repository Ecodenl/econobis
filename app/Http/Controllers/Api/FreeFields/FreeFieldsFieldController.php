<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\FreeFields;

use App\Eco\FreeFields\FreeFieldsFieldFormat;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\FreeFields\Grid\RequestQuery;
use App\Http\Resources\FreeFields\FullFreeFieldsField;
use App\Http\Resources\FreeFields\GridFreeFieldsField;
use App\Helpers\Delete\Models\DeleteFreeFieldsField;
use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FreeFieldsFieldController extends ApiController
{
    public function grid(RequestQuery $requestQuery, Request $request)
    {
        $this->authorize('view', FreeFieldsField::class);

        $freeFields = $requestQuery->get();
        $freeFields->load([
            'freeFieldsTable',
            'freeFieldsFieldFormat',
        ]);

        return GridFreeFieldsField::collection($freeFields)
            ->additional([
                'meta' => [
                   'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function show(FreeFieldsField $freeFieldsField)
    {
        $this->authorize('view', FreeFieldsField::class);

        $freeFieldsField->load([
            'freeFieldsTable',
            'freeFieldsFieldFormat',
        ]);

        return FullFreeFieldsField::make($freeFieldsField);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $data = $requestInput->integer('tableId')->alias('table_id')->whenMissing(null)->onEmpty(null)->next()
            ->integer('fieldFormatId')->alias('field_format_id')->whenMissing(null)->onEmpty(null)->next()
            ->string('fieldName')->alias('field_name')->whenMissing(null)->onEmpty(null)->next()
            ->boolean('mandatory')->next()
            ->boolean('visiblePortal')->alias('visible_portal')->next()
            ->boolean('changePortal')->alias('change_portal')->next()
            ->string('defaultValue')->alias('default_value')->whenMissing(null)->onEmpty(null)->next()
            ->boolean('exportable')->next()
            ->integer('sortOrder')->alias('sort_order')->next()
            ->get();

        $freeFieldsField = new FreeFieldsField($data);
        $freeFieldsField->save();

        return FullFreeFieldsField::make($freeFieldsField);
    }

    public function update(RequestInput $requestInput, FreeFieldsField $freeFieldsField)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $data = $requestInput->integer('tableId')->alias('table_id')->whenMissing(null)->onEmpty(null)->next()
            ->integer('fieldFormatId')->alias('field_format_id')->whenMissing(null)->onEmpty(null)->next()
            ->string('fieldName')->alias('field_name')->whenMissing(null)->onEmpty(null)->next()
            ->boolean('mandatory')->next()
            ->boolean('visiblePortal')->alias('visible_portal')->next()
            ->boolean('changePortal')->alias('change_portal')->next()
            ->string('defaultValue')->alias('default_value')->whenMissing(null)->onEmpty(null)->next()
            ->boolean('exportable')->next()
            ->integer('sortOrder')->alias('sort_order')->next()
            ->get();

        $freeFieldsField->fill($data);
        $freeFieldsField->save();

        return FullFreeFieldsField::make($freeFieldsField);
    }

    public function delete(FreeFieldsField $freeFieldsField)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $freeFieldsField->delete();
    }

    public function freeFieldsTablesList() {
        return FreeFieldsTable::get();
    }

    public function freeFieldsFieldFormatsList() {
        return FreeFieldsFieldFormat::get();
    }
}