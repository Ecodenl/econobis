<?php


namespace App\Eco\Jobs;

use Illuminate\Database\Eloquent\Model;

class JobsCategory extends model
{
    protected $table = 'job_categories';
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded
        = [
            'id'
        ];

    public function jobsLog()
    {
        return $this->hasMany(JobsLog::class);
    }
}