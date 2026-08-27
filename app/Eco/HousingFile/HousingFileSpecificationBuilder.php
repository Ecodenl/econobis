<?php

namespace App\Eco\HousingFile;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class HousingFileSpecificationBuilder extends Builder
{
    public function whereTeamContactIds(User $user): self
    {
        $teamContactIds = $user->getTeamContactIds();

        if (!empty($teamContactIds)) {
            $this->join(
                'housing_files as housingFilesAuth',
                'housing_file_specifications.housing_file_id',
                '=',
                'housingFilesAuth.id'
            );

            $this->join(
                'addresses as addressesAuth',
                'housingFilesAuth.address_id',
                '=',
                'addressesAuth.id'
            );

            $this->whereIn('addressesAuth.contact_id', $teamContactIds);
        }

        return $this;
    }
}