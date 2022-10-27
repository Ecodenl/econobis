<?php

namespace App\Eco\Document;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class DocumentBuilder extends Builder
{
    public function whereTeamContactIds(User $user)
    {
        if($user->getTeamContactIds()){
            $this->whereIn('contact_id', $user->getTeamContactIds());
        }
        return $this;
    }
    public function whereDocumentCreatedFromIds(User $user)
    {
        if($user->getDocumentCreatedFromIds()){
            $this->whereIn('document_created_from_id', $user->getDocumentCreatedFromIds());
        }
        return $this;
    }
}