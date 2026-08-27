<?php

namespace App\Eco\HousingFile;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class HousingFileBuilder extends Builder
{
    public function whereTeamContactIds(User $user)
    {
        if($user->getTeamContactIds()){
            $this->join('addresses as addressesAuth', 'housing_files.address_id', '=', 'addressesAuth.id');
            $this->whereIn('addressesAuth.contact_id', $user->getTeamContactIds());
        }
        return $this;
    }
}