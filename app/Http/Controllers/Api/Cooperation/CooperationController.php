<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Cooperation;

use App\Eco\Cooperation\Cooperation;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Cooperation\CreateCooperation;
use App\Http\Requests\Cooperation\UpdateCooperation;
use App\Http\Resources\Cooperation\FullCooperation;
use Illuminate\Support\Facades\Storage;

class CooperationController extends ApiController
{
    public function show()
    {
        $this->authorize('manage', Cooperation::class);

        if(Cooperation::doesntExist()) return null;

        $cooperation = Cooperation::first();

        $cooperation->load(['createdBy', 'updatedBy', 'contactGroup', 'emailTemplate']);

        return FullCooperation::make($cooperation);
    }

    public function store(CreateCooperation $request)
    {
        $cooperation = new Cooperation($request->validatedSnake());
        if($cooperation->hoom_email_template_id == '') {
            $cooperation->hoom_email_template_id = null;
        }
        if($cooperation->hoom_group_id == '') {
            $cooperation->hoom_group_id = null;
        }
        $cooperation->save();

        // Store attachment when given
        if($request->file('attachment')){
            $this->checkStorageDir($cooperation->id);
            $this->storeLogo($request->file('attachment'), $cooperation);
        }

        return $this->show($cooperation);
    }

    public function update(UpdateCooperation $request, Cooperation $cooperation)
    {
        $cooperation->fill($request->validatedSnake());
        if($cooperation->hoom_email_template_id == '') {
            $cooperation->hoom_email_template_id = null;
        }
        if($cooperation->hoom_group_id == '') {
            $cooperation->hoom_group_id = null;
        }
        $cooperation->save();

        // Store attachment when given
        if($request->file('attachment')){
            $this->checkStorageDir($cooperation->id);
            $this->storeLogo($request->file('attachment'), $cooperation);
        }

        return $this->show($cooperation);
    }

    private function checkStorageDir(){
        //Check if storage map exists
        $storageDir = Storage::disk('cooperation')->getDriver()->getAdapter()->getPathPrefix()
            . DIRECTORY_SEPARATOR . 'cooperation' . DIRECTORY_SEPARATOR . 'logo';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }

    private function storeLogo($attachment, $cooperation)
    {
        if (!$attachment->isValid()) {
            abort('422', 'Error uploading file');
        }

        $filename = $attachment->store('cooperation'
            . DIRECTORY_SEPARATOR . 'logo', 'cooperation');

        $cooperation->logo_filename = $filename;
        $cooperation->logo_name = $attachment->getClientOriginalName();

        $cooperation->save();
    }
}