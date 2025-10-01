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
use App\Http\Controllers\Controller;
use App\Http\Resources\EmailTemplate\EmailTemplatePeek;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EmailTemplate\GridEmailTemplate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EmailTemplateController extends Controller
{

    public function grid()
    {
        $this->authorize('view', EmailTemplate::class);

        $emailTemplates = EmailTemplate::with('createdBy')->orderBy('name')->get();

        return GridEmailTemplate::collection($emailTemplates);
    }

    public function show(EmailTemplate $emailTemplate)
    {
        $this->authorize('view', EmailTemplate::class);

        $emailTemplate->load('createdBy', 'defaultAttachmentDocument');

        return FullEmailTemplate::make($emailTemplate);
    }

    public function showWithUser(EmailTemplate $emailTemplate)
    {
        $emailTemplate->load('createdBy' , 'defaultAttachmentDocument');

        $user = Auth::user();

        $emailTemplate->html_body = TemplateVariableHelper::replaceTemplateVariables($emailTemplate->html_body, 'ik', $user);

        return FullEmailTemplate::make($emailTemplate);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('create', EmailTemplate::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('subject')->onEmpty(null)->next()
            ->string('htmlBody')->onEmpty(null)->alias('html_body')->next()
            ->integer('defaultAttachmentDocumentId')->onEmpty(null)->alias('default_attachment_document_id')->next()
            ->get();

        $emailTemplate = new EmailTemplate();
        $emailTemplate->fill($data);
        $emailTemplate->save();

        return FullEmailTemplate::make($emailTemplate->fresh());
    }

    public function update(RequestInput $requestInput, EmailTemplate $emailTemplate) {
        $this->authorize('create', EmailTemplate::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('subject')->onEmpty(null)->next()
            ->string('htmlBody')->onEmpty(null)->alias('html_body')->next()
            ->integer('defaultAttachmentDocumentId')->onEmpty(null)->alias('default_attachment_document_id')->next()
            ->get();

        $emailTemplate->fill($data);
        $emailTemplate->save();

        return FullEmailTemplate::make($emailTemplate->fresh());
    }

    public function destroy(EmailTemplate $emailTemplate)
    {
        $this->authorize('create', EmailTemplate::class);

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

    public function duplicate(EmailTemplate $emailTemplate)
    {
        $newTemplate = $emailTemplate->replicate();
        $newTemplate->save();

        return $this->show($newTemplate);
    }

    public function peek()
    {
        return EmailTemplatePeek::collection(EmailTemplate::get()->sortBy('name', SORT_NATURAL|SORT_FLAG_CASE));
    }

}