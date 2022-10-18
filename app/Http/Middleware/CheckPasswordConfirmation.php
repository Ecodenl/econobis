<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Hash;

class CheckPasswordConfirmation
{
    public function handle($request, Closure $next)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = $request->user();

        if(!Hash::check($request->input('password'), $user->password)){
            abort(422, 'Wachtwoordbevestiging is niet correct.');
        }

        return $next($request);
    }
}
