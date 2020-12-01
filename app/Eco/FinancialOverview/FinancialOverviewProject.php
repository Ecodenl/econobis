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

}
