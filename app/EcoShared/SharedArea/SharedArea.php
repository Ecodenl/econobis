<?php

namespace App\EcoShared\SharedArea;

use Illuminate\Database\Eloquent\Model;

class SharedArea extends Model
{
    protected $connection = 'econobis_shared';

    protected $guarded = ['id'];

    protected $table = 'shared_areas';
}
