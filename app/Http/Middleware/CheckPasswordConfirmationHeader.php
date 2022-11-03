<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Hash;

class CheckPasswordConfirmationHeader
{
    public function handle($request, Closure $next)
    {
        $password = $request->header('PasswordConfirmation');

        $user = $request->user();

        if(!Hash::check($password, $user->password)){
            abort(422, 'Wachtwoordbevestiging is niet correct.');
        }

        return $next($request);
    }
}
