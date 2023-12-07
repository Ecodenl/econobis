<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\FreeFields;

use App\Eco\FreeFields\FreeFieldsTable;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\FreeFields\Grid\RequestQuery;
use App\Http\Resources\FreeFields\FilterFreeFieldsField;
use App\Http\Resources\FreeFields\FullFreeFieldsField;
use App\Http\Resources\FreeFields\GridFreeFieldsField;
use App\Helpers\Delete\Models\DeleteFreeFieldsField;
use App\Eco\FreeFields\FreeFieldsField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function getForFilter($tableType, Request $request)
    {
        $tableId = FreeFieldsTable::where('table', $tableType)->first()->id;
        return FilterFreeFieldsField::collection(FreeFieldsField::where('table_id', $tableId)->orderBy('sort_order')->get());
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
            ->string('defaultValue')->alias('default_value')->whenMissing('')->onEmpty('')->next()
            ->boolean('exportable')->next()
            ->integer('sortOrder')->alias('sort_order')->next()
            ->string('mask')->whenMissing(null)->onEmpty(null)->next()
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
            ->string('defaultValue')->alias('default_value')->whenMissing('')->onEmpty('')->next()
            ->boolean('exportable')->next()
            ->integer('sortOrder')->alias('sort_order')->next()
            ->string('mask')->whenMissing(null)->onEmpty(null)->next()
            ->get();

        $freeFieldsField->fill($data);
        $freeFieldsField->save();

        return FullFreeFieldsField::make($freeFieldsField);
    }

    public function delete(FreeFieldsField $freeFieldsField)
    {
        $this->authorize('manage', FreeFieldsField::class);

        try {
            DB::beginTransaction();

            $deleteFreeFieldsField = new DeleteFreeFieldsField($freeFieldsField);
            $result = $deleteFreeFieldsField->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

}