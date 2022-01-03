<?php

namespace App\Eco\ParticipantProject;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantProject extends Model
{
    use RevisionableTrait, Encryptable, SoftDeletes;

    protected $table = 'participation_project';

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $dates = [
    ];

    protected $encryptable = [
        'iban_payout'
    ];

    //relations
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function participantProjectPayoutType()
    {
        return $this->belongsTo(ParticipantProjectPayoutType::class, 'type_id');
    }

    public function giftedByContact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function legalRepContact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function projectRevenues(){
        return $this->hasMany(ProjectRevenue::class, 'participation_id');
    }

    public function projectRevenueDistributions()
    {
        return $this->hasMany(ProjectRevenueDistribution::class, 'participation_id');
    }

    public function financialOverviewParticipantProjects()
    {
        return $this->hasMany(FinancialOverviewParticipantProject::class);
    }

    public function mutations()
    {
        return $this->hasMany(ParticipantMutation::class, 'participation_id')->orderBy('id', 'desc');
    }

    public function mutationsForPortal()
    {
        return $this->hasMany(ParticipantMutation::class, 'participation_id');
    }

    public function mutationsDefinitive()
    {
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;

        return $this->hasMany(ParticipantMutation::class, 'participation_id')->where('status_id', $mutationStatusFinal)->orderBy('date_entry', 'asc');
    }

    public function mutationsDefinitiveForKhwPeriod()
    {
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
        $mutationTypeFirstDesposit = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id',  $this->project->projectType->id)->first();
        $mutationTypeWithDrawal = ParticipantMutationType::where('code_ref', 'withDrawal')->where('project_type_id',  $this->project->projectType->id)->first();
        $mutationTypes = [];
        if($mutationTypeFirstDesposit) {
            array_push($mutationTypes, $mutationTypeFirstDesposit->id);
        }
        if($mutationTypeWithDrawal) {
            array_push($mutationTypes, $mutationTypeWithDrawal->id);
        }

        return $this->hasMany(ParticipantMutation::class, 'participation_id')->where('status_id', $mutationStatusFinal)->whereIn('type_id', $mutationTypes)->orderBy('date_entry', 'asc');
    }

    public function obligationNumbers()
    {
        return $this->hasMany(ObligationNumber::class, 'participation_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'participation_project_id')->orderBy('documents.id', 'desc');
    }

    public function documentsNotOnPortal(){
        return $this->hasMany(Document::class, 'participation_project_id')->where('document_created_from', 'participant')->where('show_on_portal', false)->orderBy('documents.id', 'desc');
    }

    public function documentsOnPortal(){
        return $this->hasMany(Document::class, 'participation_project_id')->where('document_created_from', 'participant')->where('show_on_portal', true)->orderBy('documents.id', 'desc');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'participation_project_id');
    }

    public function calculator()
    {
        return new ParticipantProjectCalculator($this);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }

    // Return collection with unique mutation statuses
    public function getUniqueMutationStatusesAttribute()
    {
        $mutationStatuses = [];

        // If participant is terminated then return status terminated
        if($this->date_terminated) return [['id' => 'terminated', 'name' => 'Beëindigd']];

        foreach($this->mutations->unique('status_id')->sortBy('status_id') as $mutation) {
            if(!$mutation->status) continue;

            $mutationStatuses[] = $mutation->status;
        }

        return $mutationStatuses;
    }

    // Return first (earliest) date entry of mutations
    public function getDateEntryFirstDepositAttribute()
    {
        $projectType = $this->project->projectType;
        $mutationType = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id', $projectType->id)->first();
        $mutationFirstDeposit = $this->mutationsDefinitive()->where('type_id', $mutationType->id)->first();
        return $mutationFirstDeposit ? $mutationFirstDeposit->date_entry : null;
    }

    // Return if projectparicipant already has a link in a non-concept revenue distribution
    public function getParticipantInDefinitiveRevenueAttribute()
    {
        $projectRevenueDistributions = $this->projectRevenueDistributions()->whereNotIn('status', ['concept']);
        return $projectRevenueDistributions->count() > 0;
    }

    // Return if projectparicipant already has a link in a confirmed revenue distribution
    public function getParticipantInConfirmedRevenueAttribute()
    {
        $projectRevenueDistributions = $this->projectRevenueDistributions()->whereIn('status', ['confirmed']);
        return $projectRevenueDistributions->count() > 0;
    }

    public function getHasNotConfirmedRevenuesKwh(){

        if($this->project->projectType->code_ref == 'postalcode_link_capital') {
            foreach ($this->project->projectRevenues as $revenue) {
                if ($revenue->category->code_ref == 'revenueKwh' && !$revenue->confirmed) {
                    return true;
                }
            }
        }

        return false;
    }

    public function getParticipationsReturnsTotalAttribute()
    {
        $total = 0;

        foreach($this->mutations as $mutation) {
            $total += $mutation->returns;
        }

        return floatval( number_format( $total, 2, '.', ''));
    }

    public function getParticipationsReturnsKwhTotalAttribute()
    {
        $total = 0;

        foreach($this->mutations as $mutation) {
            $total += $mutation->payout_kwh;
        }

        return floatval( number_format( $total, 2, '.', ''));
    }

    public function getParticipationsIndicationOfRestitutionEnergyTaxTotalAttribute()
    {
        $total = 0;

        foreach($this->mutations as $mutation) {
            $total += $mutation->indication_of_restitution_energy_tax;
        }

        return floatval( number_format( $total, 2, '.', ''));
    }

    public function getDateBeginNextRevenueKwhAttribute()
    {
        if(!empty($this->date_next_revenue_kwh)){
            return $this->date_next_revenue_kwh;
        }

        if (empty($this->contact->primaryContactEnergySupplier->member_since)){
            return null;
        }
        $checkDate = $this->contact->primaryContactEnergySupplier->member_since;
        $projectRevenueKhw = $this->getProjectRevenueKhw($checkDate);
        if ($projectRevenueKhw != null) {
            return $projectRevenueKhw->date_begin;
        }elseif(!empty($this->project->date_interest_bearing_kwh) && $checkDate > $this->project->date_interest_bearing_kwh){
            return $this->project->date_interest_bearing_kwh;
        }
        return null;
    }

    public function getDateEndNextRevenueKwhAttribute()
    {
        if(empty($this->date_begin_next_revenue_kwh)){
            return null;
        }
        $memberSince = null;
        if (empty($this->contact->primaryContactEnergySupplier->member_since)){
            return null;
        }
        $memberSince = $this->contact->primaryContactEnergySupplier->member_since;
        if($memberSince && $memberSince <= $this->date_begin_next_revenue_kwh){
            return null;
        }

        $checkDate = $this->date_begin_next_revenue_kwh;
        $projectRevenueKhw = $this->getProjectRevenueKhw($checkDate);
        if ($projectRevenueKhw != null) {
            return $projectRevenueKhw->date_end;
        }

        return Carbon::parse($this->date_begin_next_revenue_kwh)->endOfYear()->format('Y-m-d');
    }

    public function getNextRevenueKwhStartHighAttribute()
    {
        if($this->kwh_start_high_next_revenue != null){
            return $this->kwh_start_high_next_revenue;
        }

        if (empty($this->contact->primaryContactEnergySupplier->member_since)){
            return null;
        }
        $checkDate = $this->contact->primaryContactEnergySupplier->member_since;
        $projectRevenueKhw = $this->getProjectRevenueKhw($checkDate);
        if ($projectRevenueKhw != null) {
            return $projectRevenueKhw->kwh_start_high;
        }elseif(!empty($this->project->kwh_start_high_next_revenue)){
            return $this->project->kwh_start_high_next_revenue;
        }
        return null;
    }

    public function getNextRevenueKwhStartLowAttribute()
    {
        if($this->kwh_start_low_next_revenue != null){
            return $this->kwh_start_low_next_revenue;
        }

        if (empty($this->contact->primaryContactEnergySupplier->member_since)){
            return null;
        }
        $checkDate = $this->contact->primaryContactEnergySupplier->member_since;
        $projectRevenueKhw = $this->getProjectRevenueKhw($checkDate);
        if ($projectRevenueKhw != null) {
            return $projectRevenueKhw->kwh_start_low;
        }elseif(!empty($this->project->kwh_start_low_next_revenue)){
            return $this->project->kwh_start_low_next_revenue;
        }
        return null;
    }

    /**
     * @param $checkDate
     * @return mixed
     */
    protected function getProjectRevenueKhw($checkDate)
    {
        $projectRevenueCategory = ProjectRevenueCategory::where('code_ref', 'revenueKwh')->first();
        $projectRevenuesKhw = ProjectRevenue::where('project_id', $this->project_id)
            ->whereNull('participation_id')
            ->where('category_id', $projectRevenueCategory->id)
            ->where('date_begin', '<=', $checkDate)
            ->where('date_end', '>', $checkDate)
            ->where('confirmed', true)
            ->orderBy('date_end', 'desc');
        if ($projectRevenuesKhw->exists()) {
            $projectRevenueKhw = $projectRevenuesKhw->first();
            $participantInDistribution = ProjectRevenueDistribution::where('revenue_id', $projectRevenueKhw->id)
                ->where('participation_id', $this->id)
                ->whereIn('status', ['confirmed'])
                ->exists();
            if($participantInDistribution) {
                return $projectRevenuesKhw->first();
            }
        }

        return null;
    }

}
