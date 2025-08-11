<?php

namespace App\Eco\FinancialOverview;

use App\Eco\ParticipantProject\ParticipantProject;
use Illuminate\Database\Eloquent\Model;

class FinancialOverviewParticipantProject extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function participantProject()
    {
        return $this->belongsTo(ParticipantProject::class);
    }
    public function financialOverviewProject()
    {
        return $this->belongsTo(FinancialOverviewProject::class);
    }

}
