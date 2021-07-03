<?php

namespace App\Eco\ParticipantProject;

use App\Eco\Project\ProjectRevenueDistribution;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ParticipantProjectPayoutType extends Model
{
    use SoftDeletes;

    protected $table = 'participant_project_payout_type';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function participantsProject()
    {
        return $this->hasMany(ParticipantProject::class);
    }
    public function projectRevenue()
    {
        return $this->hasMany(ProjectRevenue::class, 'id', 'payout_type_id');
    }
    public function projectRevenueDistribution()
    {
        return $this->hasMany(ProjectRevenueDistribution::class, 'id', 'payout_type_id');
    }

}
