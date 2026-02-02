<?php

namespace App\Http\Requests\Cooperation;

use App\Eco\Cooperation\Cooperation;
use App\Http\Requests\FormRequest;

class UpdateCooperationCleanupItem extends FormRequest
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

    protected function prepareForValidation(): void
    {
        if ($this->has('hasRetentionPeriod')) {
            $this->merge([
                'hasRetentionPeriod' => filter_var(
                    $this->input('hasRetentionPeriod'),
                    FILTER_VALIDATE_BOOLEAN,
                    FILTER_NULL_ON_FAILURE
                ),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'yearsForDelete' => ['required', 'integer', 'min:1'],
            'hasRetentionPeriod' => ['sometimes', 'boolean'],
        ];
    }
}
