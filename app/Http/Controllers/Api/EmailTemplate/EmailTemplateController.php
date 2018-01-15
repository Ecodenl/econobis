<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\EmailTemplate;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\User\User;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\EmailTemplate\EmailTemplatePeek;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EmailTemplate\GridEmailTemplate;
use Illuminate\Support\Facades\Auth;


class EmailTemplateController
{

    public function grid()
    {
        $emailTemplates = EmailTemplate::with('createdBy')->get();

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

        $emailTemplate->html_body = $this->replaceCurrentUserVariables($emailTemplate->html_body, $user);

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

    public function peek()
    {
        return EmailTemplatePeek::collection(EmailTemplate::get());
    }

    public function replaceCurrentUserVariables($html_body, $user){

        $user->full_name = $user->present()->fullName();

        if (preg_match_all("/{me_(.*?)}/", $html_body,$m)) {
            foreach ($m[1] as $i => $varname) {
                $html_body = str_replace($m[0][$i], $user->$varname, $html_body);
            }
        }

        return $html_body;
    }

    static public function replaceUserVariables($html_body, $user){

        $user->full_name = $user->present()->fullName();

        if (preg_match_all("/{user_(\S*?)}/", $html_body,$m)) {
            foreach ($m[1] as $i => $varname) {
                $html_body = str_replace($m[0][$i], $user->$varname, $html_body);
            }
        }

        $html_body = EmailTemplateController::stripRemainingVariableTags($html_body);

        return $html_body;
    }

    static public function replaceContactVariables($html_body, $contact){

        if (preg_match_all("/{contact_(\S*?)}/", $html_body,$m)) {
            foreach ($m[1] as $i => $varname) {
                $html_body = str_replace($m[0][$i], $contact->$varname, $html_body);
            }
        }

        $html_body = EmailTemplateController::stripRemainingVariableTags($html_body);

        return $html_body;
    }

    static  public function stripRemainingVariableTags($html_body){
        if (preg_match_all("/{(\S*?)}/", $html_body,$m)) {
            foreach ($m[1] as $i => $varname) {
                $html_body = str_replace($m[0][$i], '', $html_body);
            }
        }

        return $html_body;
    }

}