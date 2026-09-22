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
        return $this->project->participantMutations()->whereNull('participation_project.date_terminated')->where('participant_mutations.status_id', 4)->sum('quantity');
    }
    public function participationsGranted()
    {
        return $this->project->participantMutations()->whereNull('participation_project.date_terminated')->where('participant_mutations.status_id', 3)->sum('quantity');
    }
    public function participationsOptioned()
    {
        return $this->project->participantMutations()->whereNull('participation_project.date_terminated')->where('participant_mutations.status_id', 2)->sum('quantity');
    }
    public function participationsInteressed()
    {
        return $this->project->participantMutations()->whereNull('participation_project.date_terminated')->where('participant_mutations.status_id', 1)->sum('quantity');
    }

    public function amountDefinitive()
    {
        return $this->project->participantMutations()->whereNull('participation_project.date_terminated')->where('participant_mutations.status_id', 4)->sum('amount');
    }
    public function amountGranted()
    {
        return $this->project->participantMutations()->whereNull('participation_project.date_terminated')->where('participant_mutations.status_id', 3)->sum('amount');
    }
    public function amountOptioned()
    {
        return $this->project->participantMutations()->whereNull('participation_project.date_terminated')->where('participant_mutations.status_id', 2)->sum('amount');
    }
    public function amountInteressed()
    {
        return $this->project->participantMutations()->whereNull('participation_project.date_terminated')->where('participant_mutations.status_id', 1)->sum('amount');
    }
    public function totalParticipationsPowerKwAvailable()
    {
        return $this->project->participantsProject()
            ->whereNull('date_terminated')
            ->where('participations_definitive', '>', 0)
            ->sum('power_kw_available');
    }
    public function totalParticipationsPowerKwhConsumption()
    {
        return $this->project->participantsProject()
            ->whereNull('date_terminated')
            ->where('participations_definitive', '>', 0)
            ->sum('power_kwh_consumption');
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

        if ($this->project->projectType->code_ref === 'energy_community') {
            $this->project->total_participations_power_kw_available =
                $this->totalParticipationsPowerKwAvailable();

            $this->project->total_participations_power_kwh_consumption =
                $this->totalParticipationsPowerKwhConsumption();
        }

        return $this->project;
    }
}