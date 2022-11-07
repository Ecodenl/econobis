<?php

namespace App\Eco\Invoice;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class InvoicePolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_invoice', 'api');
    }
    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_financial', 'api');
    }
}
