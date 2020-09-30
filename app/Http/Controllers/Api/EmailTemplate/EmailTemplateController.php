<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\EmailTemplate;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Helpers\Delete\Models\DeleteEmailTemplate;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\EmailTemplate\EmailTemplatePeek;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EmailTemplate\GridEmailTemplate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EmailTemplateController
{

    public function grid()
    {
        $emailTemplates = EmailTemplate::with('createdBy')->orderBy('name')->get();

        return GridEmailTemplate::collection($emailTemplates);
    }

    public function show(EmailTemplate $emailTemplate)
    {
        $emailTemplate->load('createdBy');

        return FullEmailTemplate::make($emailTemplate);
    }

    public function showWithUser(EmailTemplate $emailTemplate)
    {
        $emailTemplate->load('createdBy');

        $user = Auth::user();

        $emailTemplate->html_body = TemplateVariableHelper::replaceTemplateVariables($emailTemplate->html_body, 'ik', $user);

        return FullEmailTemplate::make($emailTemplate);
    }

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('subject')->onEmpty(null)->next()
            ->string('htmlBody')->onEmpty(null)->alias('html_body')->next()
            ->get();

        $emailTemplate = new EmailTemplate();
        $emailTemplate->fill($data);
        $emailTemplate->save();

        return FullEmailTemplate::make($emailTemplate->fresh());
    }

    public function update(RequestInput $requestInput, EmailTemplate $emailTemplate) {

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('subject')->onEmpty(null)->next()
            ->string('htmlBody')->onEmpty(null)->alias('html_body')->next()
            ->get();

        $emailTemplate->fill($data);
        $emailTemplate->save();

        return FullEmailTemplate::make($emailTemplate->fresh());
    }

    public function destroy(EmailTemplate $emailTemplate)
    {
        try {
            DB::beginTransaction();

            $deleteEmailTemplate = new DeleteEmailTemplate($emailTemplate);
            $result = $deleteEmailTemplate->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function peek()
    {
        return EmailTemplatePeek::collection(EmailTemplate::get());
    }

}