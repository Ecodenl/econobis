<?php

// app/Http/Middleware/LogRedirects.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class LogRedirects
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if ($response instanceof RedirectResponse) {
            Log::info('Redirect gedetecteerd', [
                'van' => $request->fullUrl(),
                'naar' => $response->getTargetUrl(),
                'status' => $response->getStatusCode(),
                'user_id' => auth()->id(),
            ]);
        }

        return $response;
    }
}
