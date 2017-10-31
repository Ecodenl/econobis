<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 9:25
 */

namespace App\Rules;


use Illuminate\Contracts\Validation\Rule;

class EnumExists implements Rule
{

    /**
     * @var
     */
    private $class;

    public function __construct($class)
    {
        $this->class = $class;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return call_user_func($this->class . '::exists', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.enum_exists');
    }

}