<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\FreeFields;

use App\Eco\Document\Document;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\FreeFields\Grid\RequestQuery;
use App\Http\Resources\FreeFields\GridFreeFields;
use App\Helpers\Delete\Models\DeleteFreeFieldsField;
use App\Eco\FreeFields\FreeFieldsField;

class FreeFieldsController extends ApiController
{
    public function grid(RequestQuery $requestQuery)
    {
        $freeFields = $requestQuery->get();

        return GridFreeFields::collection($freeFields)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function delete($freeFieldsField)
    {
        //$this->authorize('manage', FreeFieldsField::class);

        $freeFieldsField = FreeFieldsField::find($freeFieldsField);

        $freeFieldsField->delete();
    }

    public function store(RequestInput $requestInput)
    {
        //$this->authorize('manage', FreeFieldsField::class);

        $data = $requestInput->integer('tableId')->alias('table_id')->whenMissing(null)->onEmpty(null)->next()
            ->integer('fieldFormatId')->alias('field_format_id')->whenMissing(null)->onEmpty(null)->next()
            ->string('fieldName')->alias('field_name')->whenMissing(null)->onEmpty(null)->next()
            ->boolean('mandatory')->next()
            ->boolean('visiblePortal')->alias('visible_portal')->next()
            ->boolean('changePortal')->alias('change_portal')->next()
            ->string('defaultValue')->alias('default_value')->whenMissing(null)->onEmpty(null)->next()
            ->get();

        $freeField = new FreeFieldsField();
        $freeField->fill($data);
        $freeField->save();

        return $this->show($freeField);
    }

    public function show(FreeFieldsField $freeField)
    {
        //$this->authorize('view', FreeFieldsField::class);

//        $freeField->load([
//            'freeFieldsTable',
//            'freeFieldsFieldFormat',
//        ]);

        return FreeFieldsField::make($freeField);
    }
}