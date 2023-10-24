<?php

namespace App\EcoShared\SharedDistrict;

use Illuminate\Database\Eloquent\Model;

class SharedDistrict extends Model
{
    protected $connection = 'econobis_shared';

    protected $guarded = ['id'];

    protected $table = 'shared_districts';
}
