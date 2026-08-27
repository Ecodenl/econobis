<?php

namespace App\Eco\Team;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\District\District;
use App\Eco\Email\Email;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;
use App\Eco\Document\DocumentCreatedFrom;

class Team extends Model
{
    use RevisionableTrait;

    protected $table = 'teams';

    protected $guarded = ['id'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function contactGroups()
    {
          return $this->belongsToMany(ContactGroup::class,  'team_contact_group');
    }

    public function districts()
    {
        return $this->belongsToMany(District::class,  'team_district');
    }

    public function documentCreatedFroms()
    {
        return $this->belongsToMany(DocumentCreatedFrom::class,  'team_document_created_from');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'responsible_team_id');
    }

    public function emails()
    {
        return $this->hasMany(Email::class, 'responsible_team_id');
    }
}
