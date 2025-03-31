<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Cooperation;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationHoomCampaign;
use App\Helpers\Laposta\LapostaHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Cooperation\CreateCooperation;
use App\Http\Requests\Cooperation\CreateCooperationHoomCampaign;
use App\Http\Requests\Cooperation\UpdateCooperation;
use App\Http\Requests\Cooperation\UpdateCooperationHoomCampaign;
use App\Http\Resources\Cooperation\FullCooperation;
use App\Http\Resources\Cooperation\FullCooperationHoomCampaign;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CooperationController extends ApiController
{
    public function show()
    {
        $this->authorize('view', Cooperation::class);

        if(Cooperation::doesntExist()) return null;

        $cooperation = Cooperation::first();

        $cooperation->load(['createdBy', 'updatedBy', 'contactGroup', 'emailTemplate', 'hoomCampaigns']);

        return FullCooperation::make($cooperation);
    }

    public function store(CreateCooperation $request)
    {
        $this->authorize('manage', Cooperation::class);

        $cooperation = new Cooperation($request->validatedSnake());
        if($cooperation->hoom_group_id == '') {
            $cooperation->hoom_group_id = null;
        }
        if($cooperation->hoom_email_template_id == '') {
            $cooperation->hoom_email_template_id = null;
        }
        if($cooperation->hoom_mailbox_id == '') {
            $cooperation->hoom_mailbox_id = null;
        }
        // todo WM: opschonen inspection* velden
        if($cooperation->inspection_planned_email_template_id == '') {
            $cooperation->inspection_planned_email_template_id = null;
        }
        if($cooperation->inspection_planned_mailbox_id == '') {
            $cooperation->inspection_planned_mailbox_id = null;
        }
        if($cooperation->inspection_recorded_email_template_id == '') {
            $cooperation->inspection_recorded_email_template_id = null;
        }
        if($cooperation->inspection_released_email_template_id == '') {
            $cooperation->inspection_released_email_template_id = null;
        }
        $cooperation->send_email = $request->boolean('sendEmail');
        $cooperation->use_laposta = $request->boolean('useLaposta');
        $cooperation->use_export_address_consumption = $request->boolean('useExportAddressConsumption');
        $cooperation->use_dongle_registration = $request->boolean('useDongleRegistration');
        $cooperation->require_two_factor_authentication = $request->boolean('requireTwoFactorAuthentication');
        $cooperation->create_contacts_for_report_table = $request->boolean('createContactsForReportTable');
        if($cooperation->email_report_table_problems == '') {
            $cooperation->email_report_table_problems = null;
        }
        $cooperation->save();

//            todo WM: opschonen
//        // Store attachment when given
//        if($request->file('attachment')){
//            $this->checkStorageDir($cooperation->id);
//            $this->storeLogo($request->file('attachment'), $cooperation);
//        }

        return $this->show();
    }

    public function update(UpdateCooperation $request, Cooperation $cooperation)
    {
        $this->authorize('manage', Cooperation::class);

        $currentCreateContactsForReportTable = $cooperation->create_contacts_for_report_table;

        $cooperation->fill($request->validatedSnake());

        if($cooperation->hoom_group_id == '') {
            $cooperation->hoom_group_id = null;
        }
        if($cooperation->hoom_email_template_id == '') {
            $cooperation->hoom_email_template_id = null;
        }
        if($cooperation->hoom_mailbox_id == '') {
            $cooperation->hoom_mailbox_id = null;
        }
        // todo WM: opschonen inspection* velden
        if($cooperation->inspection_planned_mailbox_id == '') {
            $cooperation->inspection_planned_mailbox_id = null;
        }
        if($cooperation->inspection_planned_email_template_id == '') {
            $cooperation->inspection_planned_email_template_id = null;
        }
        if($cooperation->inspection_recorded_email_template_id == '') {
            $cooperation->inspection_recorded_email_template_id = null;
        }
        if($cooperation->inspection_released_email_template_id == '') {
            $cooperation->inspection_released_email_template_id = null;
        }
        $cooperation->send_email = $request->boolean('sendEmail');
        $cooperation->use_laposta = $request->boolean('useLaposta');
        $cooperation->use_export_address_consumption = $request->boolean('useExportAddressConsumption');
        $cooperation->use_dongle_registration = $request->boolean('useDongleRegistration');
        $cooperation->require_two_factor_authentication = $request->boolean('requireTwoFactorAuthentication');
        $cooperation->create_contacts_for_report_table = $request->boolean('createContactsForReportTable');
        if($cooperation->email_report_table_problems == '') {
            $cooperation->email_report_table_problems = null;
        }
        $cooperation->save();

        //empty contact_groups_contacts_for_report if create_contacts_for_report_table is set to false
        if($currentCreateContactsForReportTable === true && $cooperation->create_contacts_for_report_table === false) {
            DB::table('contact_groups_contacts_for_report')->truncate();
            $cooperation->create_contacts_for_report_table_last_created = null;
            $cooperation->save();
        }

//            todo WM: opschonen
        // Store attachment when given
//        if($request->file('attachment')){
//            $this->checkStorageDir($cooperation->id);
//            $this->storeLogo($request->file('attachment'), $cooperation);
//        }

        return $this->show();
    }

    public function storeHoomCampaign(CreateCooperationHoomCampaign $request)
    {
        $this->authorize('manage', Cooperation::class);

        $cooperationHoomCampaign = new CooperationHoomCampaign($request->validatedSnake());
        if($cooperationHoomCampaign->measure_id == '') {
            $cooperationHoomCampaign->measure_id = null;
        }
        $cooperationHoomCampaign->save();

        return FullCooperationHoomCampaign::make($cooperationHoomCampaign);
    }
    public function updateHoomCampaign(UpdateCooperationHoomCampaign $request, CooperationHoomCampaign $cooperationHoomCampaign)
    {
        $this->authorize('manage', Cooperation::class);

        $cooperationHoomCampaign->fill($request->validatedSnake());

        if($cooperationHoomCampaign->measure_id == '') {
            $cooperationHoomCampaign->measure_id = null;
        }
        $cooperationHoomCampaign->save();

        return FullCooperationHoomCampaign::make($cooperationHoomCampaign);
    }
    public function destroyHoomCampaign(CooperationHoomCampaign $cooperationHoomCampaign)
    {
        $this->authorize('manage', Cooperation::class);

        $cooperationHoomCampaign->delete();
    }

//            todo WM: opschonen
//    private function checkStorageDir(){
//        //Check if storage map exists
//        $storageDir = Storage::disk('cooperation')->path(DIRECTORY_SEPARATOR . 'cooperation' . DIRECTORY_SEPARATOR . 'logo');
//
//        if (!is_dir($storageDir)) {
//            mkdir($storageDir, 0777, true);
//        }
//    }

//            todo WM: opschonen
//    private function storeLogo($attachment, $cooperation)
//    {
//        $this->authorize('manage', Cooperation::class);
//
//        if (!$attachment->isValid()) {
//            abort('422', 'Error uploading file');
//        }
//
//        $filename = $attachment->store('cooperation'
//            . DIRECTORY_SEPARATOR . 'logo', 'cooperation');
//
//        $cooperation->logo_filename = $filename;
//        $cooperation->logo_name = $attachment->getClientOriginalName();
//
//        $cooperation->save();
//    }

    public function syncAllWithLaposta(Cooperation $cooperation){
        $LapostaHelper = new LapostaHelper();
        return $LapostaHelper->syncAllWithLaposta();
    }


}