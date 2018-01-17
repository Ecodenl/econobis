<?php

namespace App\Helpers\RequestInput;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequestInput
{

    /**
     * @var Request
     */
    private $request;

    private $fields = [];

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public static function make()
    {
        return new static(app()->make(Request::class));
    }

    public function input($type = 'string', $field)
    {
        $field = new Field($type, $field);
        $field->setRequestInput($this);
        $this->fields[] = $field;
        return $field;
    }

    public function string($field)
    {
        return $this->input('string', $field);
    }

    public function json($field)
    {
        return $this->input('json', $field);
    }

    public function integer($field)
    {
        return $this->input('integer', $field);
    }

    public function date($field)
    {
        return $this->input('date', $field);
    }

    public function password($field)
    {
        return $this->input('password', $field);
    }

    public function boolean($field)
    {
        return $this->input('boolean', $field);
    }

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
        if($this->request->has($field->getName())) return $field->getValue($this->request->input($field->getName()));

        return $field->getWhenMissing();
    }

    private function fieldHasValue(Field $field)
    {
        return ($field->hasWhenMissing() || $this->request->has($field->getName()));
    }

    public function validate()
    {
        $this->getValidator()->validate();
        return $this;
    }

    public function getValidator()
    {
        return Validator::make($this->request->all(), $this->getRules());
    }

    private function getRules()
    {
        $validations = [];

        foreach ($this->fields as $field){
            if($field->hasRules()) $validations[$field->getName()] = $field->getRules();
        }

        return $validations;
    }

}