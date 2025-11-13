<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Project\Project;
use App\Eco\Project\ProjectType;
use App\Eco\Project\ProjectValueCourse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class FinancialOverviewProject extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function financialOverview()
    {
        return $this->belongsTo(FinancialOverview::class);
    }
    public function financialOverviewParticipantProjects()
    {
        return $this->hasMany(FinancialOverviewParticipantProject::class);
    }
    public function financialOverviewContactsForThisProject()
    {
        return $this->hasMany(FinancialOverviewContact::class, 'financial_overview_id', 'financial_overview_id')
            ->whereRelation('contact.participations', function ($q) {
                $q->where('participation_project.project_id', $this->project_id);
            });
    }
    public function getStatusAttribute()
    {
        if(!$this->status_id) return null;

        switch ($this->status_id) {
            case 'in-progress':
                return 'Wordt toegevoegd...';
            case 'concept':
                if( $this->has_interim_financial_overview_contacts ) {
                    return 'Concept / Verwerkt';
                } else {
                    return 'Concept';
                }
            case 'definitive':
                if( $this->has_interim_financial_overview_contacts ) {
                    return 'Definitief / Verwerkt';
                } else {
                    return 'Definitief';
                }
            case 'processed':
                return 'Verwerkt';
            default:
                return null;
        }

    }

    public function getStartDateAttribute(){
        return Carbon::createFromDate($this->financialOverview->year, 1, 1)->format('Y-m-d');
    }
    public function getEndDateAttribute(){
        return Carbon::createFromDate($this->financialOverview->year, 12, 31)->format('Y-m-d');
    }

    public function getNumberOfParticipantProjectsAttribute()
    {
        return $this->financialOverviewParticipantProjects->count();
    }

    public function getNumberOfFinancialOverviewContactsSendAttribute()
    {
        return $this->financialOverviewContactsForThisProject()
            ->where('status_id', 'sent')
            ->count();    }
    public function getHasInterimFinancialOverviewContactsAttribute()
    {
        return $this->financialOverviewContactsForThisProject()
            ->where('status_id', 'sent')
            ->exists();
    }

    public function getTotalQuantityStartValueAttribute()
    {
        $projectTypeCodeRef = (ProjectType::where('id', $this->project->project_type_id)->first())->code_ref;
        if($projectTypeCodeRef === 'loan') {
            return null;
        }
        return $this->financialOverviewParticipantProjects->sum('quantity_start_value');
    }
    public function getTotalQuantityEndValueAttribute()
    {
        $projectTypeCodeRef = (ProjectType::where('id', $this->project->project_type_id)->first())->code_ref;
        if($projectTypeCodeRef === 'loan') {
            return null;
        }
        return $this->financialOverviewParticipantProjects->sum('quantity_end_value');
    }

    public function getBookworthStartValueAttribute(){
        $projectTypeCodeRef = (ProjectType::where('id', $this->project->project_type_id)->first())->code_ref;
        if($projectTypeCodeRef === 'loan') {
            return null;
        }
        $projectValueCourse = ProjectValueCourse::where('project_id', $this->project->id)->where('date', '<=', $this->getStartDateAttribute())->orderBy('date', 'DESC')->first();
        return $projectValueCourse ? $projectValueCourse->book_worth : 0;
    }
    public function getBookworthEndValueAttribute(){
        $projectTypeCodeRef = (ProjectType::where('id', $this->project->project_type_id)->first())->code_ref;
        if($projectTypeCodeRef === 'loan') {
            return null;
        }
        $projectValueCourse = ProjectValueCourse::where('project_id', $this->project->id)->where('date', '<=', $this->getEndDateAttribute())->orderBy('date', 'DESC')->first();
        return $projectValueCourse ? $projectValueCourse->book_worth : 0;
    }

    public function getTotalAmountStartValueAttribute()
    {
        return $this->financialOverviewParticipantProjects->sum('amount_start_value');
    }
    public function getTotalAmountEndValueAttribute()
    {
        return $this->financialOverviewParticipantProjects->sum('amount_end_value');
    }

}
