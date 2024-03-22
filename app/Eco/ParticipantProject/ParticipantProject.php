<?php

namespace App\Eco\ParticipantProject;

use App\Eco\Address\Address;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\Project\ProjectType;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;
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

    public function address()
    {
        return $this->belongsTo(Address::class);
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

    public function projectRevenueDistributions()
    {
        return $this->hasMany(ProjectRevenueDistribution::class, 'participation_id');
    }

    public function revenueDistributionKwh()
    {
        return $this->hasMany(RevenueDistributionKwh::class, 'participation_id');
    }

    public function projectRevenues(){
        return $this->hasManyThrough(ProjectRevenue::class, ProjectRevenueDistribution::class, 'participation_id', 'id','id', 'revenue_id');
    }

// todo WM terminated :  opsachonen
//    public function projectRevenuesParticipant(){
//        return $this->hasMany(ProjectRevenue::class, 'participation_id');
//    }

//    public function getParticipantProjectRevenues(){
//		$participantProjectRevenuesCollection = new Collection();
//
//		forEach($this->projectRevenues as $projectRevenue){
//            $projectRevenueDistribution = $projectRevenue->distribution->where('participation_id', $this->id)->first();
//            $projectRevenue->project_revenue_distribution_status = $projectRevenueDistribution ? $projectRevenueDistribution->status : null;
//            $participantProjectRevenuesCollection->push($projectRevenue);
//		}
//
//        return $participantProjectRevenuesCollection;
//    }
    public function revenuesKwh()
    {
        return $this->hasManyThrough(RevenuesKwh::class, RevenueDistributionKwh::class, 'participation_id', 'id', 'id', 'revenue_id');
    }

// todo WM terminated :  opsachonen
//    public function getParticipantProjectRevenuesKwh(){
//        $participantProjectRevenuesKwhCollection = new Collection();
//
//        forEach($this->revenuesKwh as $revenueKwh){
//            $revenueKwhDistribution = $revenueKwh->distributionKwh->where('participation_id', $this->id)->first();
//            $revenueKwh->revenue_kwh_distribution_status = $revenueKwhDistribution ? $revenueKwhDistribution->status : null;
//            $participantProjectRevenuesKwhCollection->push($revenueKwh);
//        }
//
//        return $participantProjectRevenuesKwhCollection;
//    }

    public function financialOverviewParticipantProjects()
    {
        return $this->hasMany(FinancialOverviewParticipantProject::class);
    }

    public function mutations()
    {
        return $this->hasMany(ParticipantMutation::class, 'participation_id')->orderBy('id', 'desc');
    }

    public function mutationsAsc()
    {
        return $this->hasMany(ParticipantMutation::class, 'participation_id')->orderBy('id', 'asc');
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

    public function mutationsDefinitiveDesc()
    {
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;

        return $this->hasMany(ParticipantMutation::class, 'participation_id')->where('status_id', $mutationStatusFinal)->orderBy('date_entry', 'desc');
    }

    public function mutationsDefinitiveForKwhPeriod()
    {
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
        $mutationTypeFirstDesposit = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id',  $this->project->projectType->id)->first();
        $mutationTypeWithDrawal = ParticipantMutationType::where('code_ref', 'withDrawal')->where('project_type_id',  $this->project->projectType->id)->first();
        $mutationTypes = [];
        if($mutationTypeFirstDesposit) {
//            array_push($mutationTypes, $mutationTypeFirstDesposit->id);
            $mutationTypes[] = $mutationTypeFirstDesposit->id;
        }
        if($mutationTypeWithDrawal) {
//            array_push($mutationTypes, $mutationTypeWithDrawal->id);
            $mutationTypes[] = $mutationTypeWithDrawal->id;
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
        $documentCreatedFromParticipantId = DocumentCreatedFrom::where('code_ref', 'participant')->first()->id;
        return $this->hasMany(Document::class, 'participation_project_id')->where('document_created_from_id', $documentCreatedFromParticipantId)->where('show_on_portal', false)->orderBy('documents.id', 'desc');
    }

    public function documentsOnPortal(){
        $documentCreatedFromParticipantId = DocumentCreatedFrom::where('code_ref', 'participant')->first()->id;
        return $this->hasMany(Document::class, 'participation_project_id')->where('document_created_from_id', $documentCreatedFromParticipantId)->where('show_on_portal', true)->orderBy('documents.id', 'desc');
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

    // Return last date entry of mutations
    public function getDateEntryLastMutationAttribute()
    {
        $projectType = $this->project->projectType;
        $depositTypes = ParticipantMutationType::whereIn('code_ref', ['first_deposit', 'deposit'])->where('project_type_id', $projectType->id)->get()->pluck('id')->toArray();
        $lastMutationTypes = ParticipantMutationType::whereIn('code_ref', ['first_deposit', 'deposit', 'withDrawal', 'redemption', 'result_deposit'])->where('project_type_id', $projectType->id)->get()->pluck('id')->toArray();
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
        $mutationDefinitiveLast =  ParticipantMutation::where('participation_id', $this->id)
            ->whereIn('type_id', $lastMutationTypes)
            ->where(function ($query) use ($depositTypes, $mutationStatusFinal) {
                $query
                    ->where(function ($query) use ($depositTypes, $mutationStatusFinal) {
                        $query->whereIn('type_id', $depositTypes)
                            ->where('status_id', $mutationStatusFinal);
                    })
                    ->orWhereNotIn('type_id', $depositTypes);
            })
            ->orderByDesc('date_entry')
            ->first();

        return $mutationDefinitiveLast ? $mutationDefinitiveLast->date_entry : null;
    }

    public function getDateTerminatedAllowedFromAttribute()
    {
        $dateEntryLastMutation = $this->date_entry_last_mutation
            ? Carbon::parse($this->date_entry_last_mutation)->format('Y-m-d')
            : null;
        if($this->participations_definitive == 0 && $this->amount_definitive == 0 && $dateEntryLastMutation){
            return Carbon::parse($dateEntryLastMutation)->subDay()->format('Y-m-d');
        }

//        $dateTerminatedAllowedFrom = Carbon::parse('2000-01-01')->format('Y-m-d');
//        $dateInterestBearing = $this->project->date_interest_bearing
//            ? Carbon::parse($this->project->date_interest_bearing)->format('Y-m-d')
//            : null;
//        $dateInterestBearingRedemption = $this->project->date_interest_bearing_redemption
//            ? Carbon::parse($this->project->date_interest_bearing_redemption)->format('Y-m-d')
//            : null;

//        $lastRevenueWithProcessedDistribution2 = $this->projectRevenues()->whereIn('project_revenue_distribution.status', ['processed'])->orderByDesc('date_end')->first();

        $revenueIdsWithProcessedDistributions = $this->projectRevenueDistributions()->whereIn('status', ['processed'])->get()->pluck('revenue_id')->toArray();
        $lastRevenueWithProcessedDistribution = ProjectRevenue::whereIn('id', $revenueIdsWithProcessedDistributions)->orderByDesc('date_end')->first();
        $dateTerminatedAllowedFrom = $lastRevenueWithProcessedDistribution ? Carbon::parse($lastRevenueWithProcessedDistribution->date_end)->addDay()->format('Y-m-d') : Carbon::parse('2000-01-01')->format('Y-m-d');
        Log::info('lastRevenueWithProcessedDistribution next begin date: ' . $dateTerminatedAllowedFrom);

        $dateInterestBearingKwh = $this->project->date_interest_bearing_kwh
            ? Carbon::parse($this->project->date_interest_bearing_kwh)->format('Y-m-d')
            : null;
//        if ($dateInterestBearing != null && $dateInterestBearing > $dateTerminatedAllowedFrom) {
//            $dateTerminatedAllowedFrom = $dateInterestBearing;
//        }
//        if ($dateInterestBearingRedemption != null && $dateInterestBearingRedemption > $dateTerminatedAllowedFrom) {
//            $dateTerminatedAllowedFrom = $dateInterestBearingRedemption;
//        }

        if ($dateInterestBearingKwh != null && $dateInterestBearingKwh > $dateTerminatedAllowedFrom) {
            $dateTerminatedAllowedFrom = $dateInterestBearingKwh;
            Log::info('dateInterestBearingKwh next begin date: ' . $dateTerminatedAllowedFrom);
        }

        if ($dateEntryLastMutation != null && $dateEntryLastMutation > $dateTerminatedAllowedFrom) {
            $dateTerminatedAllowedFrom = $dateEntryLastMutation;
            Log::info('dateEntryLastMutation next begin date: ' . $dateTerminatedAllowedFrom);
        }



        return Carbon::parse($dateTerminatedAllowedFrom)->subDay()->format('Y-m-d');
    }

//    const [dateBegin, setDateBegin] = useState(dateInterestBearing ? dateInterestBearing : '');
//    const [dateEnd, setDateEnd] = useState(
//        dateInterestBearing
//            ? moment(dateInterestBearing)
//                  .endOf('year')
//                  .format('Y-MM-DD')
//            : ''
//    );
    public function getDateBeginRevenueTerminatedAttribute()
    {
        // todo WM terminated: Indien participant in concept of definitieve verdeling dan laatste begindatum daarvan.
        //  anders date_interest_bearing

        $revenueIdsWithNotProcessedDistributions = $this->projectRevenueDistributions()->whereIn('status', ['concept', 'confirmed'])->get()->pluck('revenue_id')->toArray();
        $lastRevenueWithNotProcessedDistributions = ProjectRevenue::whereIn('id', $revenueIdsWithNotProcessedDistributions)->orderByDesc('date_end')->first();
        if( $lastRevenueWithNotProcessedDistributions){
            $dateBegin = Carbon::parse($lastRevenueWithNotProcessedDistributions->date_begin)->format('Y-m-d');
        } else {
            $dateBegin = $this->project->date_interest_bearing
                ? Carbon::parse($this->project->date_interest_bearing)->format('Y-m-d')
                : null;
        }
        return $dateBegin;
    }
    public function getDateEndRevenueTerminatedAttribute()
    {
        $dateEnd = $this->date_begin_revenue_terminated
            ? Carbon::parse($this->date_begin_revenue_terminated)->endOfYear()->format('Y-m-d')
            : null;
        return $dateEnd;
    }

    public function getDateTerminatedAllowedToAttribute()
    {
        $dateEntryLastMutation = $this->date_entry_last_mutation
            ? Carbon::parse($this->date_entry_last_mutation)->format('Y-m-d')
            : null;
        if($this->participations_definitive == 0 && $this->amount_definitive == 0 && $dateEntryLastMutation){
            return Carbon::parse($dateEntryLastMutation)->subDay()->format('Y-m-d');
        }

        return Carbon::parse('9999-12-31')->format('Y-m-d');
    }

    public function getTerminatedAllowedAttribute()
    {
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;

        return $this->date_terminated == null && ($this->date_terminated_allowed_to >= $this->date_terminated_allowed_from) && $this->mutations()->where('status_id', $mutationStatusFinal)->exists();
    }
    public function getUndoTerminatedAllowedAttribute()
    {
        if ($this->date_terminated != null && $this->project->projectType->code_ref == 'loan' || $this->project->projectType->code_ref == 'obligation') {
            // indien date_terminated is gezet, check bij leningen en obligaties of die datum voorkomt in een opbrengst deelnemer.
            // zo ja, dan mogen we beeindiging terugdraaien, anders niet want dan gaan we voorlopig er even van uit
            // dat deze deelname is beeindigd in oude situatie (directe aanmaak uitkeringsmutatie)
            return $this->projectRevenues()
                ->where('date_begin', '<=', Carbon::parse($this->date_terminated)->format('Y-m-d'))
                ->where('date_end', '>=', Carbon::parse($this->date_terminated)->format('Y-m-d'))
                ->where('project_revenues.participation_id', $this->id )
                ->exists();
        }
        return $this->date_terminated != null;
    }

    // Return if projectparicipant already has a link in a non-concept revenue distribution
//    public function getParticipantInDefinitiveRevenueAttribute()
//    {
//        $projectRevenueDistributions = $this->projectRevenueDistributions()->whereNotIn('status', ['concept']);
//        $revenueDistributionKwh = $this->revenueDistributionKwh()->whereNotIn('status', ['concept']);
//        return $projectRevenueDistributions->count() > 0 || $revenueDistributionKwh->count() > 0;
//    }

    public function getParticipantBelongsToMembershipGroupAttribute()
    {
        return in_array( $this->project->question_about_membership_group_id, $this->contact->getAllGroups() );
    }

    // Return if projectparicipant is in a sce or pcr project
    public function getParticipantInSceOrPcrProjectAttribute()
    {
        if($this->date_terminated != null){
            return false;
        }

        $pcrTypeId = ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id;
        return ($this->project->is_sce_project == true || $this->project->project_type_id == $pcrTypeId);
    }

    // Return if projectparicipant is not in a sce and not in pcr project
    public function getParticipantNotInSceOrPcrProjectAttribute()
    {
        if($this->date_terminated != null){
            return false;
        }

        $pcrTypeId = ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id;
        return ($this->project->is_sce_project == false && $this->project->project_type_id != $pcrTypeId);
    }

// todo WM terminated :  opsachonen
//    public function getHasNotConfirmedRevenuesKwh(){
//
//        if($this->project->projectType->code_ref == 'postalcode_link_capital') {
//            foreach ($this->project->revenuesKwh as $revenuesKwh) {
//                if ($revenuesKwh->category->code_ref == 'revenueKwh' && !$revenuesKwh->confirmed) {
//                    return true;
//                }
//            }
//        }
//
//        return false;
//    }

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

// todo WM terminated :  opsachonen
//    public function getAddressEnergySupplierInAPeriod($dateBegin, $dateEnd)
//    {
//        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $this->address_id)
//            ->whereIn('energy_supply_type_id', [2, 3] )
//            ->where(function ($addressEnergySupplier) use ($dateBegin) {
//                $addressEnergySupplier
//                    ->where(function ($addressEnergySupplier) use ($dateBegin) {
//                        $addressEnergySupplier->whereNotNull('member_since')
//                            ->where('member_since', '<=', $dateBegin);
//                    })
//                    ->orWhereNull('member_since');
//            })
//            ->where(function ($addressEnergySupplier) use ($dateBegin) {
//                $addressEnergySupplier
//                    ->where(function ($addressEnergySupplier) use ($dateBegin) {
//                        $addressEnergySupplier->whereNotNull('end_date')
//                            ->where('end_date', '>=', $dateBegin);
//                    })
//                    ->orWhereNull('end_date');
//            })->first();
//        return $addressEnergySupplier;
//    }

}
