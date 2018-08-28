<?php

namespace App\Eco\Team;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Measure\Measure;
use App\Eco\Intake\Intake;
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

    public function tasks()
    {
        return $this->hasMany(Task::class, 'responsible_team_id');
    }

    public function emails()
    {
        return $this->hasMany(Email::class, 'responsible_team_id');
    }
}
