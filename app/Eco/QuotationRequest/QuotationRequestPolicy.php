<?php

namespace App\Eco\QuotationRequest;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class QuotationRequestPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_quotation_request', 'api');
    }

    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_quotation_request', 'api');
    }
}
