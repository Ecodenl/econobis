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
    public function whereDocumentCreatedFrom(User $user)
    {
        if($user->getDocumentCreatedFrom()){
            $this->whereIn('document_created_from', $user->getDocumentCreatedFrom());
        }
        return $this;
    }
}