<?php
/**
 * Created by PhpStorm.
 * User: joskolenberg
 * Date: 13-11-17
 * Time: 21:23
 */

namespace App\Helpers\RequestInput;


use Carbon\Carbon;

class Field
{

    protected $rules;

    protected $hasOnEmpty = false;
    protected $onEmpty;

    protected $hasWhenMissing = false;
    protected $whenMissing;

    protected $alias;

    protected $name;

    protected $type;

    protected $sanitizer;

    /**
     * Field constructor.
     * @param string $type
     * @param $name
     */
    public function __construct($type = 'string', $name)
    {
        $this->name = $name;
        $this->type = $type;
    }

    /**
     * Set a default value in case the input is empty (matching PHP's empty() method).
     * @param $value
     * @return $this
     */
    public function onEmpty($value)
    {
        $this->hasOnEmpty = true;
        $this->onEmpty = $value;
        return $this;
    }

    /**
     * Set NULL as the default value in case the input is empty.
     * @return $this
     */
    public function nullable()
    {
        return $this->onEmpty(null);
    }

    /**
     * Set a default value in case the key (name) of the field is not present in the input.
     * @param $value
     * @return $this
     */
    public function whenMissing($value)
    {
        $this->hasWhenMissing = true;
        $this->whenMissing = $value;
        return $this;
    }

    /**
     * Set a default value in case the key (name) of the field is not present in the input or the input for the key is empty.
     * @param $value
     * @return $this
     */
    public function default($value)
    {
        $this->whenMissing($value);
        $this->onEmpty($value);
        return $this;
    }

    /**
     * Set an alias for this field. The value will be returned on th key of this alias instead of it's original name.
     * @param $alias
     * @return $this
     */
    public function alias($alias)
    {
        $this->alias = $alias;
        return $this;
    }

    /**
     * Set the validation rules for this field.
     * @param $rules
     * @return $this
     */
    public function validate($rules)
    {
        $this->rules = $rules;
        return $this;
    }

    /**
     * Get the value for this field. If the given value is empty, the default value for empty input will be used.
     * @param $input
     * @return bool|null|string|static
     */
    public function getValue($input)
    {
        if($this->hasOnEmpty && empty($input)) {
            $value = $this->onEmpty;
        }else{
            $value = $input;
        }

        if(is_null($value)) return null;

        return $this->castValue($value);
    }

    /**
     * Tell if this field has a default value in case the key is missing in the input.
     * @return bool
     */
    public function hasWhenMissing()
    {
        return $this->hasWhenMissing;
    }

    /**
     * Get the value to be used in case the key is missing in the input.
     * @return mixed
     */
    public function getWhenMissing()
    {
        return $this->whenMissing;
    }

    /**
     * Get the name of this field.
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Get the key to be used for the output.
     * @return mixed
     */
    public function getKey()
    {
        if(!empty($this->alias)) return $this->alias;
        return $this->name;
    }

    /**
     * Cast a value based on the type of field.
     * @param $value
     * @return bool|int|string|static
     */
    protected function castValue($value)
    {
        switch ($this->type){
            case 'integer':
                return (int) $value;
            case 'string':
                return (string) $value;
            case 'boolean':
                return (bool) $value;
            case 'date':
                return (new Carbon($value))->startOfDay();
            case 'password':
                return bcrypt($value);
            default:
                return $value;

        }
    }

    /**
     * Tell if this field has any rules.
     * @return bool
     */
    public function hasRules()
    {
        return !empty($this->rules);
    }

    /**
     * Get the rules for this field.
     * @return mixed
     */
    public function getRules()
    {
        return $this->rules;
    }

    /**
     * Set the associated Sanitizer
     * @param Sanitizer $sanitizer
     */
    public function setSanitizer(Sanitizer $sanitizer)
    {
        $this->sanitizer = $sanitizer;
    }

    /**
     * Return the associated Sanitizer (for smooth method chaining).
     * @return mixed
     */
    public function next()
    {
        return $this->sanitizer;
    }
}