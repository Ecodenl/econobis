<?php

namespace App\Eco\Campaign;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\Intake\Intake;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Campaign extends Model
{
    use RevisionableTrait;

    protected $table = 'campaigns';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [

    ];

    public function intakes()
    {
        return $this->hasMany(Intake::class);
    }

    public function opportunities()
    {
        return $this->hasManyThrough(Opportunity::class, Intake::class);
    }
    
    public function measureCategories()
    {
        return $this->belongsToMany(MeasureCategory::class);
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

    // Only unfinished tasks are a task
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false);
    }

    // A finished task is a note
    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true);
    }

    public function documents(){
        return $this->hasMany(Document::class);
    }
}
