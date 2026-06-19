<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\PortalFreeFields;

use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsTable;
use App\Eco\PortalFreeFields\PortalFreeFieldsField;
use App\Eco\PortalFreeFields\PortalFreeFieldsPage;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Helpers\Delete\Models\DeletePortalFreeFieldsPage;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\PortalFreeFieldsPages\Grid\RequestQuery;
use App\Http\Resources\FreeFields\FilterFreeFieldsField;
use App\Http\Resources\PortalFreeFields\FullPortalFreeFieldsField;
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

        $portalFreeFieldsPages = $requestQuery->get();
        $portalFreeFieldsPages->load([
            'portalFreeFieldsFields',
            'portalFreeFieldsFields.freeFieldsField',
        ]);

        return GridPortalFreeFieldsPages::collection($portalFreeFieldsPages)
            ->additional([
                'meta' => [
                   'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function show(PortalFreeFieldsPage $portalFreeFieldsPage)
    {
        $this->authorize('view', FreeFieldsField::class);

        $portalFreeFieldsPage->load([
            'portalFreeFieldsFields',
            'portalFreeFieldsFields.freeFieldsField',
        ]);

        return FullPortalFreeFieldsPage::make($portalFreeFieldsPage);
    }

    public function store(RequestInput $requestInput, Request $request)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $data = $requestInput
            ->string('name')->whenMissing(null)->onEmpty(null)->next()
            ->string('description')->whenMissing(null)->onEmpty(null)->next()
            ->string('urlPageRef')->alias('url_page_ref')->whenMissing('')->onEmpty('')->next()
            ->get();

        // Cast 'isActive' to a boolean explicitly if it's a string
        $isActive = $request->get('isActive');
        $data['is_active'] = $isActive;

        if (is_string($isActive)) {
            if($isActive === 'false' || $isActive === '0'){
                $data['is_active'] = false;
            } elseif($isActive === 'true' || $isActive === '1'){
                $data['is_active'] = true;
            }
        }

        $portalFreeFieldsPage = new PortalFreeFieldsPage($data);
        $portalFreeFieldsPage->save();

        return FullPortalFreeFieldsPage::make($portalFreeFieldsPage);
    }

    public function update(RequestInput $requestInput, Request $request, PortalFreeFieldsPage $portalFreeFieldsPage)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $data = $requestInput
            ->string('name')->whenMissing(null)->onEmpty(null)->next()
            ->string('description')->whenMissing(null)->onEmpty(null)->next()
            ->string('urlPageRef')->alias('url_page_ref')->whenMissing('')->onEmpty('')->next()
            ->get();

        // Cast 'isActive' to a boolean explicitly if it's a string
        $isActive = $request->get('isActive');
        $data['is_active'] = $isActive;

        if (is_string($isActive)) {
            if($isActive === 'false' || $isActive === '0'){
                $data['is_active'] = false;
            } elseif($isActive === 'true' || $isActive === '1'){
                $data['is_active'] = true;
            }
        }

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

    public function peekContacts(PortalFreeFieldsPage $portalFreeFieldsPage, Request $request)
    {
        // Get the ID for the 'contacts' table.
        $tableIdContacts = FreeFieldsTable::where('table', 'contacts')->first()->id;

        // Get the IDs of FreeFieldsField records already used by the incoming $portalFreeFieldsPage.
        $usedFieldIds = $portalFreeFieldsPage->portalFreeFieldsFields->pluck('field_id');

        // Retrieve and filter the FreeFieldsField collection.
        return FilterFreeFieldsField::collection(
            FreeFieldsField::where('table_id', $tableIdContacts)
                ->whereNotIn('id', $usedFieldIds) // Exclude already used fields
                ->orderBy('sort_order')
                ->get()
        );
    }

    public function storePortalFreeFieldsField(RequestInput $input, Request $request)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $data = $input->integer('pageId')->alias('page_id')->next()
            ->integer('fieldId')->validate('exists:free_fields_fields,id')->alias('field_id')->next()
            ->integer('sortOrder')->whenMissing(999)->onEmpty(999)->alias('sort_order')->next()
            ->get();

        // Cast 'changePortal' to a boolean explicitly if it's a string
        $changePortal = $request->get('changePortal');
        $data['change_portal'] = $changePortal;

        if (is_string($changePortal)) {
            if($changePortal === 'false' || $changePortal === '0'){
                $data['change_portal'] = false;
            } elseif($changePortal === 'true' || $changePortal === '1'){
                $data['change_portal'] = true;
            }
        }
        $portalFreeFieldsField = new PortalFreeFieldsField($data);
        $portalFreeFieldsField->save();

        $portalFreeFieldsField->load([
            'freeFieldsField',
        ]);
        
        return FullPortalFreeFieldsField::make($portalFreeFieldsField);
    }
    public function updatePortalFreeFieldsField(RequestInput $input, Request $request, PortalFreeFieldsField $portalFreeFieldsField)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $data = $input->integer('sortOrder')->whenMissing(999)->onEmpty(999)->alias('sort_order')->next()
            ->get();

        // Cast 'changePortal' to a boolean explicitly if it's a string
        $changePortal = $request->get('changePortal');
        $data['change_portal'] = $changePortal;

        if (is_string($changePortal)) {
            if($changePortal === 'false' || $changePortal === '0'){
                $data['change_portal'] = false;
            } elseif($changePortal === 'true' || $changePortal === '1'){
                $data['change_portal'] = true;
            }
        }

        $portalFreeFieldsField->fill($data);
        $portalFreeFieldsField->save();

        $portalFreeFieldsField->load([
            'freeFieldsField',
        ]);

        return FullPortalFreeFieldsField::make($portalFreeFieldsField);

    }
    public function destroyPortalFreeFieldsField(PortalFreeFieldsField $portalFreeFieldsField)
    {
        $this->authorize('manage', FreeFieldsField::class);

        $portalFreeFieldsField->delete();
    }



}