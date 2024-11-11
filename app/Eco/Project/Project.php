<?php

namespace App\Eco\Project;

use App\Eco\Administration\Administration;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Venturecraft\Revisionable\RevisionableTrait;

class Project extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $table = 'projects';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $casts = [
        'uses_mollie' => 'bool',
    ];

    //relations

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function projectStatus(){
        return $this->belongsTo(ProjectStatus::class)->withTrashed();
    }

    public function projectType(){
        return $this->belongsTo(ProjectType::class)->withTrashed();
    }
    public function projectLoanType(){
        return $this->belongsTo(ProjectLoanType::class, 'loan_type_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)->orderBy('tasks.id', 'desc');
    }

    public function documents(){
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function documentsNotOnPortal(){
        $documentCreatedFromProjectId = DocumentCreatedFrom::where('code_ref', 'project')->first()->id;
        return $this->hasMany(Document::class)->where('document_created_from_id', $documentCreatedFromProjectId)->where('show_on_portal', false)->orderBy('documents.id', 'desc');
    }

    public function documentsOnPortal(){
        $documentCreatedFromProjectId = DocumentCreatedFrom::where('code_ref', 'project')->first()->id;
        return $this->hasMany(Document::class)->where('document_created_from_id', $documentCreatedFromProjectId)->where('show_on_portal', true)->orderBy('documents.id', 'desc');
    }

    public function emails()
    {
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function ownedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }

    public function projectValueCourses(){
        return $this->hasMany(ProjectValueCourse::class)->orderBy('date');
    }

    public function projectRevenues(){
        return $this->hasMany(ProjectRevenue::class)->whereNull('participation_id')->where('category_id', '!=', 1);
    }

    public function revenuesKwh()
    {
        return $this->hasMany(RevenuesKwh::class, 'project_id');
    }

    public function participantsProject(){
        return $this->hasMany(ParticipantProject::class, 'project_id');
    }

    public function financialOverviewProjects()
    {
        return $this->hasMany(FinancialOverviewProject::class);
    }

    public function requiresContactGroups(){
        return $this->belongsToMany(ContactGroup::class, 'contact_group_participation', 'project_id', 'group_id');
    }

    public function documentAgreeTerms(){
        return $this->belongsTo(Document::class, 'document_id_agree_terms');
    }

    public function documentUnderstandInfo(){
        return $this->belongsTo(Document::class, 'document_id_understand_info');
    }

    public function documentProjectInfo(){
        return $this->belongsTo(Document::class, 'document_id_project_info');
    }

    public function documentTemplateAgreement(){
        return $this->belongsTo(DocumentTemplate::class, 'document_template_agreement_id');
    }

    public function emailTemplateAgreement(){
        return $this->belongsTo(EmailTemplate::class, 'email_template_agreement_id');
    }

    public function documentTemplateIncreaseParticipations(){
        return $this->belongsTo(DocumentTemplate::class, 'document_template_increase_participations_id');
    }

    public function emailTemplateIncreaseParticipations(){
        return $this->belongsTo(EmailTemplate::class, 'email_template_increase_participations_id');
    }

    public function questionAboutMembershipGroup(){
        return $this->belongsTo(ContactGroup::class, 'question_about_membership_group_id');
    }

    public function memberGroup(){
        return $this->belongsTo(ContactGroup::class, 'member_group_id');
    }

    public function noMemberGroup(){
        return $this->belongsTo(ContactGroup::class, 'no_member_group_id');
    }

    public function getTransactionCostsCodeRef()
    {
        if (!$this->transaction_costs_code_ref) return null;

        return TransactionCostsCodeRef::get($this->transaction_costs_code_ref);
    }

    public function getBaseProjectCodeRef()
    {
        if (!$this->base_project_code_ref) return null;

        return BaseProjectCodeRef::get($this->base_project_code_ref);
    }

    public function getCurrentParticipations(){
        $participants = $this->participantsProject()->get();

        $totalParticipations = 0;

        foreach ($participants as $participant) {
            $totalParticipations += $participant->participations_current;
        }

        return $totalParticipations;
    }

    public function getHasPaymentInvoices(){

        foreach($this->projectRevenues as $revenue){
            foreach ($revenue->distribution as $distribution) {
                if($distribution->paymentInvoices()->count() > 0){
                    return true;
                }
            }
        }

        return false;
    }

    public function getHasRevenueKwh(){

        if($this->projectType->code_ref == 'postalcode_link_capital') {
              if ($this->revenuesKwh()->count() > 0) {
                  return true;
              }
        }
        return false;
    }

    public function getHasConfirmedLoanRedemptionRevenue(){

        if($this->projectType->code_ref == 'loan') {
            $projectRevenueCategoryRedemptionEuro = ProjectRevenueCategory::where('code_ref', 'redemptionEuro' )->first()->id;
            return $this->projectRevenues()->where('category_id', $projectRevenueCategoryRedemptionEuro)->where('confirmed', 1)->exists();
        }
        return false;
    }

    public function participantMutations()
    {
        return $this->hasManyThrough(ParticipantMutation::class ,ParticipantProject::class, 'project_id', 'participation_id');
    }

    public function calculator()
    {
        return new ProjectCalculator($this);
    }

    public function currentBookWorth()
    {
        $activeProjectValueCourse = $this->projectValueCourses()->where('active', 1)->first();
        if(!$activeProjectValueCourse) return null;

        return $activeProjectValueCourse->book_worth;
    }

    public function getcurrentBookWorthAttribute(){
        return $this->currentBookWorth();
    }

    public function currentTransferWorth()
    {
        $activeProjectValueCourse = $this->projectValueCourses()->where('active', 1)->first();
        if(!$activeProjectValueCourse) return 0;

        return $activeProjectValueCourse->transfer_worth;
    }

    public function getLastYearFinancialOverviewDefinitiveAttribute()
    {
        $financialOverviewProjectIds = $this->financialOverviewProjects()->where('definitive', true)->pluck('financial_overview_id')->toArray();;
        $financialOverviews = FinancialOverview::whereIn('id', $financialOverviewProjectIds)->get()->sortByDesc('year')->first();
        return $financialOverviews ? (int) $financialOverviews->year : null;
    }

    public function getDateInterestBearingWrong() {
        $projectRevenueCategoryRevenueEuro = ProjectRevenueCategory::where('code_ref', 'revenueEuro' )->first()->id;
        $confirmedProjectRevenuesEuro = $this->projectRevenues()->where('category_id', $projectRevenueCategoryRevenueEuro)->where('confirmed', 1)->orderBy('date_end', 'desc');
        $dateEnd = $confirmedProjectRevenuesEuro->count() > 0 ? Carbon::parse($confirmedProjectRevenuesEuro->first()->date_end) : null;
        $dateEndPlusOneDay = $dateEnd ? $dateEnd->addDay(1)->format('Y-m-d') : 'onbekend';

        //Geen date_interest_bearing maar wel confirmed projectRevenues van category 2 revenueEuro
        if (
            $this->date_interest_bearing === null &&
            $confirmedProjectRevenuesEuro->count() > 0
        ) {
            return true;
        }
        //Wel date_interest_bearing maar geen confirmed projectRevenues van category 2 revenueEuro
        if (
            $this->date_interest_bearing !== null &&
            $confirmedProjectRevenuesEuro->count() === 0
        ) {
            return true;
        }

        //Wel date_interest_bearing en projectRevenues van category 2 revenueEuro, maar nieuwe startdatum is niet goed
        if ($confirmedProjectRevenuesEuro->count() > 0) {
            if (
                $this->date_interest_bearing !== null &&
                $confirmedProjectRevenuesEuro->count() > 0 &&
                Carbon::parse($this->date_interest_bearing)->format('Y-m-d') != $dateEndPlusOneDay
            ) {
                return true;
            }
        }

        return false;
    }

    public function getDateInterestBearingRedemptionWrong() {
        $projectRevenueCategoryRedemptionEuro = ProjectRevenueCategory::where('code_ref', 'redemptionEuro' )->first()->id;
        $confirmedProjectRedemptionsEuro = $this->projectRevenues()->where('category_id', $projectRevenueCategoryRedemptionEuro)->where('confirmed', 1)->orderBy('date_end', 'desc');

        //Geen date_interest_bearing_redemption maar wel confirmed projectRevenues van category 3 redemptionEuro
        if (
            $this->date_interest_bearing_redemption === null &&
            $confirmedProjectRedemptionsEuro->count() > 0
        ) {
            return true;
        }
        //wel date_interest_bearing_redemption maar geen confirmed projectRevenues van category 3 redemptionEuro
        if(
            $this->date_interest_bearing_redemption !== null &&
            $confirmedProjectRedemptionsEuro->count() === 0
        ) {
            return true;
        }
        //wel date_interest_bearing_redemption en confirmed projectRevenues van category 3, maar nieuwe startdatum is niet goed
        if(
            $confirmedProjectRedemptionsEuro->count() > 0
        ) {
            $dateEnd = Carbon::parse($confirmedProjectRedemptionsEuro->first()->date_end);
            $dateEndPlusOneDay = $dateEnd->addDay(1)->format('Y-m-d');
            if (
                $this->date_interest_bearing_redemption !== null &&
                $confirmedProjectRedemptionsEuro->count() > 0 &&
                Carbon::parse($this->date_interest_bearing_redemption)->format('Y-m-d') != $dateEndPlusOneDay
            ) {
                return true;
            }
        }

        return false;
    }

    public function getKwhStartHighNextRevenueWrong() {
        // kwh_start_high_next_revenue alleen van belang bij pcr project.
        if($this->projectType->code_ref != 'postalcode_link_capital') {
            return false;
        }

        $confirmedRevenuesKwh = $this->revenuesKwh()->where('confirmed', 1)->orderBy('date_end', 'desc');

        //wel date_interest_bearing_kwh en revenuesKwh, maar kwh_start_high_next_revenue is niet goed
        if(
            $this->date_interest_bearing_kwh !== null &&
            $confirmedRevenuesKwh->count() > 0 &&
            (
                $this->kwh_start_high_next_revenue != $confirmedRevenuesKwh->first()->kwh_end_high
            )
        ) {
            return true;
        }

        return false;
    }

    public function getKwhStartLowNextRevenueWrong() {
        // kwh_start_low_next_revenue alleen van belang bij pcr project.
        if($this->projectType->code_ref != 'postalcode_link_capital') {
            return false;
        }

        $confirmedRevenuesKwh = $this->revenuesKwh()->where('confirmed', 1)->orderBy('date_end', 'desc');

        //wel date_interest_bearing_kwh en revenuesKwh, maar kwh_start_low_next_revenue is niet goed
        if(
            $this->date_interest_bearing_kwh !== null &&
            $confirmedRevenuesKwh->count() > 0 &&
            (
                $this->kwh_start_low_next_revenue != $confirmedRevenuesKwh->first()->kwh_end_low
            )
        ) {
            return true;
        }

        return false;
    }

    public function getDateInterestBearingKwhWrong() {
        // date_interest_bearing_kwh alleen van belang bij pcr project.
        if($this->projectType->code_ref != 'postalcode_link_capital') {
            return false;
        }

        $confirmedRevenuesKwh = $this->revenuesKwh()->where('confirmed', 1)->orderBy('date_end', 'desc');
        //wel date_interest_bearing_kwh en revenuesKwh, maar kwh_start_low_next_revenue is niet goed
        if(
            $this->date_interest_bearing_kwh === null &&
            $confirmedRevenuesKwh->count() > 0
        ) {
            return true;
        }

        //wel date_interest_bearing_kwh maar geen confirmed revenuesKwh
        if(
            $this->date_interest_bearing_kwh !== null &&
            $confirmedRevenuesKwh->count() === 0
        ) {
            return true;
        }

        return false;
    }
}
