<?php

namespace App\Eco\ContactNote;

use App\Eco\User\User;
use App\Eco\ContactNote\ContactNote;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactNotePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the contactNote.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\ContactNote\ContactNote  $contactNote
     * @return mixed
     */
    public function view(User $user, ContactNote $contactNote)
    {
        return $user->can('view', $contactNote->contact);
    }

    /**
     * Determine whether the user can create contactNotes.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, ContactNote $contactNote)
    {
        return $user->can('update', $contactNote->contact);
    }

    /**
     * Determine whether the user can update the contactNote.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\ContactNote\ContactNote  $contactNote
     * @return mixed
     */
    public function update(User $user, ContactNote $contactNote)
    {
        return $user->can('update', $contactNote->contact);
    }

    /**
     * Determine whether the user can delete the contactNote.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\ContactNote\ContactNote  $contactNote
     * @return mixed
     */
    public function delete(User $user, ContactNote $contactNote)
    {
        return $user->can('update', $contactNote->contact);
    }
}
