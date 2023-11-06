<?php

namespace App\EcoShared\SharedCommandRun;

use Illuminate\Database\Eloquent\Model;

class SharedCommandRun extends Model
{
    protected $connection = 'econobis_shared';

    protected $guarded = ['id'];

    protected $table = 'shared_command_runs';

    public $timestamps = false;

}
