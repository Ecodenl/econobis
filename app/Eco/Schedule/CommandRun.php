<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-12-2018
 * Time: 12:59
 */

namespace App\Eco\Schedule;



use Illuminate\Database\Eloquent\Model;

class CommandRun extends Model
{
    protected $table = 'command_runs';

    public $timestamps = false;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded
        = [
            'id'
        ];

}