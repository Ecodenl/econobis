<?php

namespace App\Eco\ParticipantProject;


class ParticipantProjectCalculator
{

    protected $participantProject;

    public function __construct(ParticipantProject $participantProject)
    {
        $this->participantProject = $participantProject;
    }

    public function participationsDefinitive()
    {
        return $this->participantProject->mutations()->where('status_id', 4)->sum('quantity');
    }

    public function participationsDefinitiveWorth()
    {
        return $this->participationsDefinitive() * $this->participantProject->project->participation_worth;
    }

    public function participationsOptioned()
    {
        return $this->participantProject->mutations()->whereIn('status_id', [2, 3])->sum('quantity');
    }
}