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

    public function participationsOptioned()
    {
        return $this->project->participantMutations()->whereIn('participant_mutations.status_id', [2, 3])->sum('quantity');
    }

    public function amountDefinitive()
    {
        return $this->project->participantMutations()->where('participant_mutations.status_id', 4)->sum('amount');
    }

    public function amountOptioned()
    {
        return $this->project->participantMutations()->whereIn('participant_mutations.status_id', [2, 3])->sum('amount');
    }

    public function run()
    {
        $this->project->participations_definitive = $this->participationsDefinitive();
        $this->project->participations_optioned = $this->participationsOptioned();
        $this->project->amount_definitive = $this->amountDefinitive();
        $this->project->amount_optioned = $this->amountOptioned();

        return $this->project;
    }
}