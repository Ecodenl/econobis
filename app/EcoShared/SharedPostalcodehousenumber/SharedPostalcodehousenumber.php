<?php

namespace App\EcoShared\SharedPostalcodehousenumber;

use App\EcoShared\SharedArea\SharedArea;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class SharedPostalcodehousenumber extends Model
{
    protected $connection = 'econobis_shared';

    protected $guarded = ['id'];

    protected $table = 'shared_postal_codes_house_numbers';

    public function sharedArea() {
        return sharedArea::where('area_code', $this->area_code)->first();
    }
}
