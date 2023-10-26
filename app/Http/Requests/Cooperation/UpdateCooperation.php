<?php

namespace App\Http\Requests\Cooperation;

use App\Eco\Cooperation\Cooperation;
use App\Http\Requests\FormRequest;

class UpdateCooperation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('manage', Cooperation::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required'],
            'address' => [''],
            'postalCode' => [''],
            'city' => [''],
            'kvkNumber' => [''],
            'btwNumber' => [''],
            'iban' => [''],
            'ibanAttn' => [''],
            'email' => ['email'],
            'website' => [''],
            'logoFilename' => [''],
            'logoName' => [''],
            'hoomLink' => [''],
            'hoomConnectCoachLink' => [''],
            'hoomKey' => [''],
            'sendEmail' => [''],
            'hoomEmailTemplateId' => [''],
            'hoomGroupId' => [''],
            'useLaposta' => [''],
            'lapostaKey' => [''],
            'useExportAddressConsumption' => [''],
            'requireTwoFactorAuthentication' => [''],
            'inspectionPlannedEmailTemplateId' => [''],
            'inspectionPlannedMailboxId' => [''],
            'inspectionRecordedEmailTemplateId' => [''],
            'inspectionReleasedEmailTemplateId' => [''],
            'createContactsForReportTable' => [''],
            'emailReportTableProblems' => ['email'],
            'fontFamilyDefault' => [''],
            'fontSizeDefault' => [''],
            'fontColorDefault' => [''],
        ];
    }
}
