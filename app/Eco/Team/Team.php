<?php

namespace App\Eco\Team;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Email\Email;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

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

    public function mailboxes()
    {
        return $this->belongsToMany(Mailbox::class,  'team_mailbox');
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
