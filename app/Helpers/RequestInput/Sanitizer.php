<?php

namespace App\Helpers\RequestInput;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Sanitizer
{

    /**
     * The Request to get the data from
     * @var Input
     */
    private $input;

    /**
     * The array with defined fields
     * @var array
     */
    private $fields = [];

    /**
     * RequestInput constructor.
     * @param array $input
     */
    public function __construct(array $input)
    {
        $this->input = new Input($input);
    }

    /**
     * Add a new field to the instance.
     * @param string $type The type of field to be added ('string', 'integer', 'double, 'date', 'password' or 'boolean').
     * @param string $field The name of the input parameter.
     * @return Field
     */
    public function input($type = 'string', $field)
    {
        $field = new Field($type, $field);
        $field->setSanitizer($this);
        $this->fields[] = $field;
        return $field;
    }

    /**
     * Add a new string field to the instance.
     * @param $field
     * @return Field
     */
    public function string($field)
    {
        return $this->input('string', $field);
    }

    /**
     * Add a new integer field to the instance.
     * @param $field
     * @return Field
     */
    public function integer($field)
    {
        return $this->input('integer', $field);
    }

    /**
     * Add a new numeric field to the instance.
     * @param $field
     * @return Field
     */
    public function numeric($field)
    {
        return $this->input('numeric', $field);
    }

    /**
     * Add a new double field to the instance.
     * @param $field
     * @return Field
     */
    public function double($field)
    {
        return $this->input('double', $field);
    }

    /**
     * Add a new date field to the instance.
     * @param $field
     * @return Field
     */
    public function date($field)
    {
        return $this->input('date', $field);
    }

    /**
     * Add a new password field to the instance.
     * @param $field
     * @return Field
     */
    public function password($field)
    {
        return $this->input('password', $field);
    }

    /**
     * Add a new boolean field to the instance.
     * @param $field
     * @return Field
     */
    public function boolean($field)
    {
        return $this->input('boolean', $field);
    }

    /**
     * Get the result from the request based on the defined fields.
     * @param bool $validate
     * @return array
     */
    public function get($validate = true)
    {
        if($validate) $this->validate();

        $result = [];
        foreach ($this->fields as $field) {
            if(!$this->fieldHasValue($field)) continue;
            $result[$field->getKey()] = $this->getValue($field);
        }
        return $result;
    }

    private function getValue(Field $field)
    {
        if($this->input->has($field->getName())) return $field->getValue($this->input->input($field->getName()));

        return $field->getWhenMissing();
    }

    private function fieldHasValue(Field $field)
    {
        return ($field->hasWhenMissing() || $this->input->has($field->getName()));
    }

    /**
     * Validate the data with the defined rules.
     * @return $this
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validate()
    {
        $this->getValidator()->validate();
        return $this;
    }

    /**
     * Get the validator based on the defined rules.
     * @return \Illuminate\Validation\Validator
     */
    public function getValidator()
    {
        return Validator::make($this->input->all(), $this->getRules());
    }

    /**
     * Get the defined rules.
     * @return array
     */
    private function getRules()
    {
        $validations = [];

        foreach ($this->fields as $field){
            if($field->hasRules()) $validations[$field->getName()] = $field->getRules();
        }

        return $validations;
    }

}