<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\EmailTemplate;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\EmailTemplate\FullEmailTemplate;
use App\Http\Resources\EmailTemplate\GridEmailTemplate;


class EmailTemplateController
{

    public function grid()
    {
        $emailTemplates = EmailTemplate::with('createdBy')->get();

        return GridEmailTemplate::collection($emailTemplates);
    }

    public function show(EmailTemplate $emailTemplate){
        $emailTemplate->load('createdBy');

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

    public function update(RequestInput $requestInput, EmailTemplate $emailTemplate)
    {

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('subject')->onEmpty(null)->next()
            ->string('htmlBody')->onEmpty(null)->alias('html_body')->next()
            ->get();

        $emailTemplate->fill($data);
        $emailTemplate->save();

        return FullEmailTemplate::make($emailTemplate->fresh());
    }

}