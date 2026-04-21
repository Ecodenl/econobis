<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Contact\Contact;
use App\Eco\ParticipantProject\ParticipantProject;
use Illuminate\Database\Eloquent\Model;

class FinancialOverviewParticipantProject extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function financialOverviewProject()
    {
        return $this->belongsTo(FinancialOverviewProject::class);
    }
    public function participantProject()
    {
        return $this->belongsTo(ParticipantProject::class);
    }
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

}
