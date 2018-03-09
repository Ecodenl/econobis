<?php

namespace App\Helpers\RequestInput;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequestInput extends Sanitizer
{

    /**
     * RequestInput constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        parent::__construct($request->all());
    }

    /**
     * Make a new RequestInput
     * @return static
     */
    public static function make()
    {
        return new static(app()->make(Request::class));
    }

}