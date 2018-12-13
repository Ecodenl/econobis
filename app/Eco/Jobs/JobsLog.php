<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-12-2018
 * Time: 12:59
 */

namespace App\Eco\Jobs;



use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class JobsLog extends Model
{
    protected $table = 'jobs_log';
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded
        = [
            'id'
        ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}