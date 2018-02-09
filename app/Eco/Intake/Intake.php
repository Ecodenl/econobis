<?php

namespace App\Eco\Intake;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\Document\Document;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Task\Task;
use Illuminate\Database\Eloquent\Model;

class Intake extends Model
{

    protected $table = 'intakes';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'address_id', 'status_id',
    ];

    public function sources()
    {
        return $this->belongsToMany(IntakeSource::class,
            'intake_source', 'intake_id', 'source_id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function reasons()
    {
        return $this->belongsToMany(IntakeReason::class,
            'reason_intake', 'intake_id', 'reason_id');
    }

    public function status()
    {
        return $this->belongsTo(IntakeStatus::class, 'intake_status_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

}
