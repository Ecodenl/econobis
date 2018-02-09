<?php

namespace App\Eco\Intake;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Measure\Measure;
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

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function status()
    {
        return $this->belongsTo(IntakeStatus::class);
    }

    public function sources()
    {
        return $this->belongsToMany(IntakeSource::class);
    }

    public function reasons()
    {
        return $this->belongsToMany(IntakeReason::class);
    }

    public function measuresRequested(){
        return $this->belongsToMany(Measure::class);
    }

    public function opportunities()
    {
        return $this->belongsToMany(Opportunity::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function notes()
    {
        //todo
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function emails()
    {
        return $this->hasMany(Email::class);
    }

}
