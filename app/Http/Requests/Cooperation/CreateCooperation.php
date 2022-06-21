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
            'hoomKey' => [''],
            'hoomEmailTemplateId' => [''],
            'hoomGroupId' => [''],
            'useLaposta' => [''],
            'lapostaKey' => [''],
            'useExportAddressConsumption' => [''],
        ];
    }
}
