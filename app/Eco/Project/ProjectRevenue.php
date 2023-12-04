<?php

namespace App\Eco\Project;

use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ProjectRevenue extends Model
{
    use RevisionableTrait;

    protected $table = 'project_revenues';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $dates = [
//        'date_begin',
//        'date_end',
//        'date_reference',
//        'date_confirmed',
//        'date_payed',
        'created_at',
        'updated_at',
    ];

    //relations
    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function participant(){
        return $this->belongsTo(ParticipantProject::class, 'participation_id');
    }

    public function type(){
        return $this->belongsTo(ProjectRevenueType::class, 'type_id');
    }

    public function category(){
        return $this->belongsTo(ProjectRevenueCategory::class, 'category_id');
    }

    public function participantProjectPayoutType(){
        return $this->belongsTo(ParticipantProjectPayoutType::class, 'payout_type_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function distribution(){
        return $this->hasMany(ProjectRevenueDistribution::class, 'revenue_id');
    }

// todo WM: opschonen: deliveredKwhPeriod gebruiken we niet meer
//    public function deliveredKwhPeriod(){
//        return $this->hasMany(xxxProjectRevenueDeliveredKwhPeriod::class, 'revenue_id');
//    }

    //Appended fields
    public function getKwhResultAttribute()
    {
        return ($this->kwh_end - $this->kwh_start);
    }

    public function getAmountRevenueAttribute()
    {
        $projectTypeCodeRef = (ProjectType::where('id', $this->project->project_type_id)->first())->code_ref;
        $amountRevenue = 0;
        switch ($projectTypeCodeRef) {
            case 'loan':
            case 'obligation':
                foreach ($this->distribution as $item) {
                    $amountRevenue += $item->payout;
                }
                break;
            case 'capital':
            case 'postalcode_link_capital':
                $amountRevenue = $this->revenue;
                break;
        }
        return $amountRevenue;
    }

    public function getDistributionType()
    {
        if(!$this->distribution_type_id) return null;

        return ProjectRevenueDistributionType::get($this->distribution_type_id);
    }
}
