<?php

namespace App\Eco\Campaign;

use App\Eco\Contact\Contact;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\Registration\Registration;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $table = 'campaigns';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [

    ];

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function measures()
    {
        return $this->belongsToMany(Measure::class);
    }

    public function status()
    {
        return $this->belongsTo(CampaignStatus::class);
    }

    public function type()
    {
        return $this->belongsTo(CampaignType::class);
    }

    public function responses(){
        return $this->hasMany(CampaignResponse::class);
    }

    public function organisations(){
        return $this->belongsToMany(Organisation::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function ownedBy(){
        return $this->belongsTo(User::class);
    }
}
