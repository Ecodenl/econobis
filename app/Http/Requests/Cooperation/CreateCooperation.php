<?php

namespace App\Http\Requests\Cooperation;

use App\Eco\Cooperation\Cooperation;
use App\Http\Requests\FormRequest;

class CreateCooperation extends FormRequest
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
        // todo WM: opschonen inspection* velden
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
//            'logoFilename' => [''],
//            'logoName' => [''],
            'hoomLink' => [''],
            'hoomConnectCoachLink' => [''],
            'hoomKey' => [''],
            'hoomEmailTemplateId' => [''],
            'hoomGroupId' => [''],
            'hoomMailboxId' => [''],
            'useLaposta' => [''],
            'lapostaKey' => [''],
            'useExportAddressConsumption' => [''],
            'useDongleRegistration' => [''],
            'requireTwoFactorAuthentication' => [''],
            'inspectionPlannedEmailTemplateId' => [''],
            'inspectionPlannedMailboxId' => [''],
            'inspectionRecordedEmailTemplateId' => [''],
            'inspectionReleasedEmailTemplateId' => [''],
            'createContactsForReportTable' => [''],
            'emailReportTableProblems' => ['email'],
            'showExternalUrlForContacts' => [''],
            'externalUrlContacts' => [''],
            'externalUrlContactsButtonText' => [''],
            'externalUrlContactsOnNewPage' => [''],
            'cleanupYearsInvoicesDateSend' => [7],
            'cleanupYearsOneoffOrdersStartDate' => [7],
            'cleanupYearsPeriodicOrdersTerminationDate' => [7],
            'cleanupYearsIntakesMutationDate' => [7],
            'cleanupYearsOpportunitiesMutationDate' => [7],
            'cleanupYearsParticipationsChangeDate' => [7],
            'cleanupYearsParticipationsTerminationDate' => [7],
        ];
    }
}
