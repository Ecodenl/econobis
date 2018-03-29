<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Routing\Middleware\ThrottleRequests as LaravelThrottleRequests;

class ThrottleRequests extends LaravelThrottleRequests
{

    public function handle($request, Closure $next, $maxAttempts = 60, $decayMinutes = 1)
    {
        //Add this because when we do testing locally we dont want to hit max requests
        if(\Config::get('app.env') === 'local')return $next($request);

        $key = $this->resolveRequestSignature($request);

        $maxAttempts = $this->resolveMaxAttempts($request, $maxAttempts);

        if ($this->limiter->tooManyAttempts($key, $maxAttempts, $decayMinutes)) {
            throw $this->buildException($key, $maxAttempts);
        }

        $this->limiter->hit($key, $decayMinutes);

        $response = $next($request);

        return $this->addHeaders(
            $response, $maxAttempts,
            $this->calculateRemainingAttempts($key, $maxAttempts)
        );
    }
}
