<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Project\Project;
use Illuminate\Database\Eloquent\Model;

class FinancialOverviewProject extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
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
    public function getStatusAttribute()
    {
        if(!$this->status_id) return null;

        switch ($this->status_id) {
            case 'in-progress':
                return 'Wordt toegevoegd';
            case 'concept':
                return 'Concept';
            case 'definitive':
                return 'Definitief';
            default:
                return null;
        }

    }

}
