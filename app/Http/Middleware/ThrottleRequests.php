<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Routing\Middleware\ThrottleRequests as LaravelThrottleRequests;

class ThrottleRequests extends LaravelThrottleRequests
{

    public function handle($request, Closure $next, $maxAttempts = 60, $decaySeconds = 60, $prefix = '')
    {
        //Add this because when we do testing locally we dont want to hit max requests
        if(\Config::get('app.env') === 'local')return $next($request);

        $key = $this->resolveRequestSignature($request);

        $maxAttempts = $this->resolveMaxAttempts($request, $maxAttempts);

        if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
            throw $this->buildException($request, $key, $maxAttempts);
        }

        $this->limiter->hit($key, (int) $decaySeconds);

        $response = $next($request);

        return $this->addHeaders(
            $response, $maxAttempts,
            $this->calculateRemainingAttempts($key, $maxAttempts)
        );
    }
}
