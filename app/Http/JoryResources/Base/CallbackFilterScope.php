<?php

namespace App\Http\JoryResources\Base;

use JosKolenberg\LaravelJory\Scopes\FilterScope;

class CallbackFilterScope implements FilterScope
{
    protected $callback;

    public function __construct(callable $callback)
    {
        $this->callback = $callback;
    }

    public function apply($builder, string $operator = null, $data = null): void
    {
        call_user_func($this->callback, $builder, $operator, $data);
    }
}