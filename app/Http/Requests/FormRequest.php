<?php

namespace App\Http\Requests;

use App\Rules\NoEmptyString;
use App\Rules\NotNull;
use App\Rules\StrictFloat;
use App\Rules\StrictInt;
use App\Rules\StrictString;
use Illuminate\Support\Str;

abstract class FormRequest extends \Illuminate\Foundation\Http\FormRequest
{

    public function validatedSnake()
    {
        $result = [];

        foreach ($this->validated() as $key => $value) {
            $result[$key] = $value;
        }

        return $this->arrayKeysToSnake($result);
    }

    public function onlySnake($keys)
    {
        return $this->arrayKeysToSnake($this->only($keys));
    }

    /**
     * Validate a field which is required and must hold
     * an id to a model in the database.
     *
     * No Input: 422
     * Null input: 422
     * Input in any other datatype than the model's keyType: 422
     * Input in right datatype: 200 (if exists)
     *
     * @param string $modelClass
     * @return array
     */
    public function validateRequiredModel(string $modelClass): array
    {
        $model = new $modelClass;
        $table = $model->getConnectionName() . '.' . $model->getTable();

        if($model->getKeyType() === 'int'){
            $typeRule = new StrictInt;
        }else{
            $typeRule = new StrictString;
        }

        return [
            $typeRule,
            'required',
            'exists:' . $table . ',' . $model->getKeyName()
        ];
    }

    /**
     * Validate a field which is optional (may be omitted), nullable (may
     * have null value) and must hold an id to a model in the database.
     *
     * No Input: 200
     * Null input: 200
     * Input in any other datatype than the model's keyType: 422
     * Input in right datatype: 200 (if exists)
     *
     * @param string $modelClass
     * @return array
     */
    public function validateOptionalNullableModel(string $modelClass): array
    {
        $model = new $modelClass;
        $table = $model->getConnectionName() . '.' . $model->getTable();

        if($model->getKeyType() === 'int'){
            $typeRule = new StrictInt;
        }else{
            $typeRule = new StrictString;
        }

        return [
            $typeRule,
            new NoEmptyString,
            'nullable',
            'exists:' . $table . ',' . $model->getKeyName()
        ];
    }

    /**
     * Validate a field which is optional (may be omitted), but not nullable.
     * If present it must hold an id to a model in the database.
     *
     * No Input: 200
     * Null input: 422
     * Input in any other datatype than the model's keyType: 422
     * Input in right datatype: 200 (if exists)
     *
     * @param string $modelClass
     * @return array
     */
    public function validateOptionalRequiredModel(string $modelClass): array
    {
        $model = new $modelClass;
        $table = $model->getConnectionName() . '.' . $model->getTable();

        if($model->getKeyType() === 'int'){
            $typeRule = new StrictInt;
        }else{
            $typeRule = new StrictString;
        }

        return [
            $typeRule,
            new NoEmptyString,
            'exists:' . $table . ',' . $model->getKeyName()
        ];
    }

    /**
     * Validate a string field which is optional and can hold an empty string.
     *
     * No Input: 200
     * Null input: 422
     * Input in any other datatype except string (1.23, 12, true, []): 422
     * Empty string input (""): 200
     * String input: 200
     *
     * @return array
     */
    public function validateOptionalEmptiableString(): array
    {
        return [
            new NotNull,
            new StrictString,
        ];
    }

    /**
     * Validate a field which is optional. But when given, it must hold an int.
     *
     * No Input: 200
     * Null input: 422
     * Input in any other datatype except int (1.23, "string", "", true, []): 422
     * Zero input (0): 200
     * Integer input: 200
     *
     * @param null $min (inclusive)
     * @param null $max (inclusive)
     * @return array
     */
    public function validateOptionalInt($min = null, $max = null): array
    {
        $rules = [
            new NotNull,
            new NoEmptyString,
            new StrictInt,
            'int',
        ];

        if(!is_null($min)){
            $rules[] = 'min:' . $min;
        }

        if(!is_null($max)){
            $rules[] = 'max:' . $max;
        }

        return $rules;
    }

    /**
     * Validate a required field which must hold an int.
     *
     * No Input: 422
     * Null input: 422
     * Input in any other datatype except int (1.23, "string", "", true, []): 422
     * Zero input (0): 200
     * Integer input: 200
     *
     * @param null $min (inclusive)
     * @param null $max (inclusive)
     * @return array
     */
    public function validateRequiredInt($min = null, $max = null): array
    {
        $rules = [
            new NotNull,
            new NoEmptyString,
            new StrictInt,
            'required',
            'int',
        ];

        if(!is_null($min)){
            $rules[] = 'min:' . $min;
        }

        if(!is_null($max)){
            $rules[] = 'max:' . $max;
        }

        return $rules;
    }

    /**
     * Validate a required field which must hold a float or int.
     *
     * No Input: 422
     * Null input: 422
     * Input in any other datatype except int ("1.23", "string", "", true, []): 422
     * Zero input (0): 200
     * Integer input: 200
     *
     * @param null $min (inclusive)
     * @param null $max (inclusive)
     * @return array
     */
    public function validateRequiredFloat($min = null, $max = null): array
    {
        $rules = [
            new NotNull,
            new NoEmptyString,
            new StrictFloat(),
            'required',
            'numeric',
        ];

        if(!is_null($min)){
            $rules[] = 'min:' . $min;
        }

        if(!is_null($max)){
            $rules[] = 'max:' . $max;
        }

        return $rules;
    }

    protected function arrayKeysToSnake(array $array): array
    {
        $result = [];

        foreach ($array as $key => $value) {
            $result[Str::snake($key)] = $value;
        }

        return $result;
    }

    protected function normalizeBooleans(array $fields): void
    {
        $data = [];

        foreach ($fields as $field) {
            if ($this->has($field)) {
                $data[$field] = filter_var(
                    $this->input($field),
                    FILTER_VALIDATE_BOOLEAN,
                    FILTER_NULL_ON_FAILURE
                );
            }
        }

        if (!empty($data)) {
            $this->merge($data);
        }
    }

}
