<?php

namespace App\Eco\DocumentTemplate;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DocumentTemplatePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function view(User $user)
    {
        return $user->hasPermissionTo('view_document_template', 'api');
    }

    /**
     * Determine whether the user can create the model.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermissionTo('create_document_template', 'api');
    }

}
