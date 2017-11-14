<?php
/**
 * Created by PhpStorm.
 * User: joskolenberg
 * Date: 13-11-17
 * Time: 21:23
 */

namespace App\Helpers\RequestInput;


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

    protected $requestInput;

    public function __construct($type = 'string', $name)
    {
        $this->name = $name;
        $this->type = $type;
    }

    public function onEmpty($value)
    {
        $this->hasOnEmpty = true;
        $this->onEmpty = $value;
        return $this;
    }

    public function nullable()
    {
        return $this->onEmpty(null);
    }

    public function whenMissing($value)
    {
        $this->hasWhenMissing = true;
        $this->whenMissing = $value;
        return $this;
    }

    public function default($value)
    {
        $this->whenMissing($value);
        $this->onEmpty($value);
        return $this;
    }

    public function alias($alias)
    {
        $this->alias = $alias;
        return $this;
    }

    public function validate($rules)
    {
        $this->rules = $rules;
        return $this;
    }

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

    public function hasWhenMissing()
    {
        return $this->hasWhenMissing;
    }

    public function getWhenMissing()
    {
        return $this->whenMissing;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getKey()
    {
        if(!empty($this->alias)) return $this->alias;
        return $this->name;
    }

    protected function castValue($value)
    {
        switch ($this->type){
            case 'int':
            case 'integer':
            case 'real':
            case 'float':
            case 'double':
            case 'string':
                return (string) $value;
            case 'bool':
            case 'boolean':
                return (bool) $value;
            case 'object':
            case 'array':
            case 'json':
            case 'collection':
            case 'date':
            case 'datetime':
            case 'timestamp':
            case 'password':
                return bcrypt($value);
            default:
                return $value;

        }
    }

    public function hasRules()
    {
        return !empty($this->rules);
    }

    public function getRules()
    {
        return $this->rules;
    }

    /**
     * @param mixed $requestInput
     */
    public function setRequestInput(RequestInput $requestInput)
    {
        $this->requestInput = $requestInput;
    }

    public function next()
    {
        return $this->requestInput;
    }
}