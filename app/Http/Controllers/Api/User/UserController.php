<?php

namespace App\Http\Controllers\Api\User;

use App\Eco\User\User;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function me(Request $request)
    {
        return $this->show($request->user());
    }

    public function show(User $user)
    {
        $user->load('lastNamePrefix');
        return FullUser::make($user);
    }
}
