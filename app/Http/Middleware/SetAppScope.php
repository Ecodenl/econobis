<?php

namespace App\Http\Middleware;

use Closure;

class SetAppScope
{

    public function handle($request, Closure $next)
    {
        $request->merge(['scope' => 'use-app']);

        return $next($request);
    }
}
