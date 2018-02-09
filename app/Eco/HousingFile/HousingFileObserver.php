<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\HousingFile;

use Illuminate\Support\Facades\Auth;

class HousingFileObserver
{

    public function creating(HousingFile $housingFile)
    {
        $userId = Auth::id();
        $housingFile->created_by_id = $userId;
        $housingFile->updated_by_id = $userId;
    }

    public function updating(HousingFile $housingFile)
    {
        $userId = Auth::id();
        $housingFile->updated_by_id = $userId;
    }

}