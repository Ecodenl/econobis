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
        return $this->participantProject->mutations()->where('status_id', 4)->sum('participation_worth');
    }

    public function participationsOptioned()
    {
        return $this->participantProject->mutations()->whereIn('status_id', [2, 3])->sum('quantity');
    }

    public function amountDefinitive()
    {
        return $this->participantProject->mutations()->where('status_id', 4)->sum('amount');
    }

    public function amountOptioned()
    {
        return $this->participantProject->mutations()->whereIn('status_id', [2, 3])->sum('amount');
    }

    public function run()
    {
        $this->participantProject->participations_definitive = $this->participationsDefinitive();
        $this->participantProject->participations_definitive_worth = $this->participationsDefinitiveWorth();
        $this->participantProject->participations_optioned = $this->participationsOptioned();
        $this->participantProject->amount_definitive = $this->amountDefinitive();
        $this->participantProject->amount_optioned = $this->amountOptioned();

        return $this->participantProject;
    }
}