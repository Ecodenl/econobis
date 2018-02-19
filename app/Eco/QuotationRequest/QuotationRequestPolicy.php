<?php

namespace App\Eco\QuotationRequest;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class QuotationRequestPolicy
{
    use HandlesAuthorization;

        public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_quotation_request', 'api');
    }
}
