<?php

namespace App\Eco\Registration;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Task\Task;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{

    protected $table = 'registrations';

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
        return $this->belongsToMany(RegistrationSource::class,
            'registration_source', 'registration_id', 'source_id');
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function notes()
    {
        return $this->hasMany(RegistrationNote::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function reasons()
    {
        return $this->belongsToMany(RegistrationReason::class,
            'reason_registration', 'registration_id', 'reason_id');
    }

    public function status()
    {
        return $this->belongsTo(RegistrationStatus::class, 'registration_status_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
