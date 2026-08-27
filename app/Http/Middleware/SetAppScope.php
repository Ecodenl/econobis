<?php

namespace App\Http\Middleware;

use Closure;

class SetAppScope
{

    public function handle($request, Closure $next)
    {
        // Alleen een default zetten als er nog geen scope is meegegeven
        if (!$request->has('scope') || empty($request->input('scope'))) {
            $request->merge(['scope' => 'use-app']);
        }
        return $next($request);
    }
}
