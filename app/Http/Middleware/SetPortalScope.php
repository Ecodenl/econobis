<?php

namespace App\Http\Middleware;

use Closure;

class SetPortalScope
{

    public function handle($request, Closure $next)
    {
        $request->merge(['scope' => 'use-portal']);

        return $next($request);
    }
}
