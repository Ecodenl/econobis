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
            'postal_code' => [''],
            'city' => [''],
            'kvk_number' => [''],
            'btw_number' => [''],
            'iban' => [''],
            'iban_attn' => [''],
            'email' => ['email'],
            'website' => [''],
            'logo_filename' => [''],
            'logo_name' => [''],
            'hoom_link' => [''],
            'hoom_key' => [''],
            'hoom_email_template_id' => [''],
            'hoom_group_id' => [''],
        ];
    }
}
