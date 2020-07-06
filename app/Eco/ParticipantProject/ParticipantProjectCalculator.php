<?php

namespace App\Eco\ParticipantProject;


class ParticipantProjectCalculator
{

    protected $participantProject;

    public function __construct(ParticipantProject $participantProject)
    {
        $this->participantProject = $participantProject;
    }

    public function participationsDefinitiveWorth()
    {
        return $this->participationsDefinitive() * $this->participantProject->project->currentBookWorth();
    }
    public function participationsCapitalWorth()
    {
        if($this->participantProject->project->projectType->code_ref == 'capital' || $this->participantProject->project->projectType->code_ref == 'postalcode_link_capital') {
            $participationWorth = $this->participantProject->mutations()->where('status_id', 4)->sum('participation_worth');
            $participationsCapitalWorth = $participationWorth + $this->amountDefinitive();
        }else{
            $participationsCapitalWorth = null;
        }
        return $participationsCapitalWorth;
    }
    public function participationsDefinitiveForTerminating()
    {
        return $this->participantProject->mutations()->where('status_id', 4)->sum('quantity');
    }
    public function participationsDefinitive()
    {
        return ($this->participantProject->date_terminated === null) ? $this->participantProject->mutations()->where('status_id', 4)->sum('quantity') : 0;
    }
    public function participationsGranted()
    {
        return ($this->participantProject->date_terminated === null) ? $this->participantProject->mutations()->where('status_id', 3)->sum('quantity') : 0;
    }
    public function participationsOptioned()
    {
        return ($this->participantProject->date_terminated === null) ? $this->participantProject->mutations()->where('status_id', 2)->sum('quantity') : 0;
    }
    public function participationsInteressed()
    {
        return ($this->participantProject->date_terminated === null) ? $this->participantProject->mutations()->where('status_id', 1)->sum('quantity') : 0;
    }

    public function amountDefinitiveForTerminating()
    {
        return $this->participantProject->mutations()->where('status_id', 4)->sum('amount');
    }
    public function amountDefinitive()
    {
        return ($this->participantProject->date_terminated === null) ? $this->participantProject->mutations()->where('status_id', 4)->sum('amount') : 0;
    }
    public function amountGranted()
    {
        return ($this->participantProject->date_terminated === null) ? $this->participantProject->mutations()->where('status_id', 3)->sum('amount') : 0;
    }
    public function amountOptioned()
    {
        return ($this->participantProject->date_terminated === null) ? $this->participantProject->mutations()->where('status_id', 2)->sum('amount') : 0;
    }
    public function amountInteressed()
    {
        return ($this->participantProject->date_terminated === null) ? $this->participantProject->mutations()->where('status_id', 1)->sum('amount') : 0;
    }

    public function run()
    {
        $this->participantProject->participations_definitive = $this->participationsDefinitive();
        $this->participantProject->participations_definitive_worth = $this->participationsDefinitiveWorth();
        $this->participantProject->participations_capital_worth = $this->participationsCapitalWorth();
        $this->participantProject->participations_granted = $this->participationsGranted();
        $this->participantProject->participations_optioned = $this->participationsOptioned();
        $this->participantProject->participations_interessed = $this->participationsInteressed();
        $this->participantProject->amount_definitive = $this->amountDefinitive();
        $this->participantProject->amount_granted = $this->amountGranted();
        $this->participantProject->amount_optioned = $this->amountOptioned();
        $this->participantProject->amount_Interessed = $this->amountInteressed();

        return $this->participantProject;
    }
}