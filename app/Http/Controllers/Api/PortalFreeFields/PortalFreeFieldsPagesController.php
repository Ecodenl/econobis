<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\PortalFreeFields;

use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\PortalFreeFields\PortalFreeFieldsPage;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Helpers\Delete\Models\DeletePortalFreeFieldsPage;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\PortalFreeFieldsPages\Grid\RequestQuery;
use App\Http\Resources\PortalFreeFields\FullPortalFreeFieldsPage;
use App\Http\Resources\PortalFreeFields\GridPortalFreeFieldsPages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PortalFreeFieldsPagesController extends ApiController
{
    public function grid(RequestQuery $requestQuery, Request $request)
    {
        $this->authorize('view', FreeFieldsField::class);
        $this->authorize('manage', PortalSettingsDashboard::class);

        $freeFields = $requestQuery->get();
//        $freeFields->load([
//            'freeFieldsTable',
//            'freeFieldsFieldFormat',
//        ]);

        return GridPortalFreeFieldsPages::collection($freeFields)
            ->additional([
                'meta' => [
                   'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function show(PortalFreeFieldsPage $portalFreeFieldsPage)
    {
        $this->authorize('view', FreeFieldsField::class);

//        $portalFreeFieldsPage->load([
//            'freeFieldsTable',
//            'freeFieldsFieldFormat',
//        ]);

        return FullPortalFreeFieldsPage::make($portalFreeFieldsPage);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $data = $requestInput
            ->string('name')->whenMissing(null)->onEmpty(null)->next()
            ->boolean('isActive')->alias('is_active')->next()
            ->string('description')->whenMissing(null)->onEmpty(null)->next()
            ->string('urlPageRef')->alias('url_page_ref')->whenMissing('')->onEmpty('')->next()
            ->get();

        $portalFreeFieldsPage = new PortalFreeFieldsPage($data);
        $portalFreeFieldsPage->save();

        return FullPortalFreeFieldsPage::make($portalFreeFieldsPage);
    }

    public function update(RequestInput $requestInput, PortalFreeFieldsPage $portalFreeFieldsPage)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $data = $requestInput
            ->string('name')->whenMissing(null)->onEmpty(null)->next()
            ->boolean('isActive')->alias('is_active')->next()
            ->string('description')->whenMissing(null)->onEmpty(null)->next()
            ->string('urlPageRef')->alias('url_page_ref')->whenMissing('')->onEmpty('')->next()
            ->get();
        $portalFreeFieldsPage->fill($data);
        $portalFreeFieldsPage->save();

        return FullPortalFreeFieldsPage::make($portalFreeFieldsPage);
    }

    public function delete(PortalFreeFieldsPage $portalFreeFieldsPage)
    {
        $this->authorize('manage', FreeFieldsField::class);

        try {
            DB::beginTransaction();

            $deletePortalFreeFieldsPage = new DeletePortalFreeFieldsPage($portalFreeFieldsPage);
            $result = $deletePortalFreeFieldsPage->delete();

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