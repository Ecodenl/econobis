<?php

namespace App\EcoShared\SharedPostalCodesHouseNumber;

use App\EcoShared\SharedArea\SharedArea;
use Illuminate\Database\Eloquent\Model;

class SharedPostalCodesHouseNumber extends Model
{
    protected $connection = 'econobis_shared';

    protected $guarded = ['id'];

    protected $table = 'shared_postal_codes_house_numbers';

    public function sharedArea() {
        return $this->belongsTo(SharedArea::class, 'area_code', 'area_code');
    }
}
