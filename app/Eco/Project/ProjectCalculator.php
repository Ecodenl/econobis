<?php

namespace App\Eco\Project;


class ProjectCalculator
{

    protected $project;

    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    public function participationsDefinitive()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 4)->sum('quantity');
    }
    public function participationsGranted()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 3)->sum('quantity');
    }
    public function participationsOptioned()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 2)->sum('quantity');
    }
    public function participationsInteressed()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 1)->sum('quantity');
    }

    public function amountDefinitive()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 4)->sum('amount');
    }
    public function amountGranted()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 3)->sum('amount');
    }
    public function amountOptioned()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 2)->sum('amount');
    }
    public function amountInteressed()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 1)->sum('amount');
    }


    public function run()
    {
        $this->project->participations_definitive = $this->participationsDefinitive();
        $this->project->participations_granted = $this->participationsGranted();
        $this->project->participations_optioned = $this->participationsOptioned();
        $this->project->participations_interessed = $this->participationsInteressed();
        $this->project->amount_definitive = $this->amountDefinitive();
        $this->project->amount_granted = $this->amountGranted();
        $this->project->amount_optioned = $this->amountOptioned();
        $this->project->amount_interessed = $this->amountInteressed();

        return $this->project;
    }
}