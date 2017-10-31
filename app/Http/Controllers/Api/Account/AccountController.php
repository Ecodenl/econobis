<?php

namespace App\Http\Controllers\Api\Account;

use App\Eco\Account\Account;
use App\Http\Resources\Account\AccountPeek;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AccountController extends Controller
{
    public function peek(Request $request)
    {
        $accounts = Account::orderBy('name', 'asc')->get();

        return AccountPeek::collection($accounts);
    }
}
