<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

//        $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self';                 style-src 'self' 'unsafe-inline';                                                                               img-src 'self' data:; font-src 'self' data:; object-src 'none'; frame-ancestors 'none';");
        $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self';                 style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data:;                        object-src 'none'; frame-ancestors 'none';");
//        $response->headers->set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';                                                                               img-src 'self' data:; font-src 'self' data:; object-src 'none'; frame-ancestors 'none';");
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'no-referrer-when-downgrade');
        $response->headers->set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

        return $response;
    }
}
