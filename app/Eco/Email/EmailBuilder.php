<?php

namespace App\Eco\Email;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class EmailBuilder extends Builder
{
    public function whereEigenOpenstaand(User $user)
    {
        return $this->whereResponsibleUserOrRelatedTeams($user)
            ->whereAuthorized($user)
            ->where('status', '!=', 'closed')
            ->where('folder', 'inbox');
    }

    public function whereResponsibleUserOrRelatedTeams(User $user)
    {
        return $this->where(function($query) use ($user) {
            $query->where('emails.responsible_user_id', $user->id);
            $query->orWhereIn('emails.responsible_team_id', $user->teams->pluck('team_id'));
        });
    }

    public function whereAuthorized(User $user)
    {
        return $this->whereIn('mailbox_id', $user->mailboxes()->where('is_active', true)->pluck('mailbox_id'));
    }
}