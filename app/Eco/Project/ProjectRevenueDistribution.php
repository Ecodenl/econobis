<?php

namespace App\Eco\Project;

use App\Eco\Contact\Contact;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\PaymentInvoice\PaymentInvoice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ProjectRevenueDistribution extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $table = 'project_revenue_distribution';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function participation()
    {
        return $this->belongsTo(ParticipantProject::class,'participation_id');
    }

    public function revenue()
    {
        return $this->belongsTo(ProjectRevenue::class, 'revenue_id');
    }

    public function paymentInvoices(){
        return $this->hasMany(PaymentInvoice::class, 'revenue_distribution_id');
    }

// todo WM: opschonen: deliveredKwhPeriod gebruiken we niet meer
//    public function deliveredKwhPeriod(){
//        return $this->hasMany(xxxProjectRevenueDeliveredKwhPeriod::class, 'distribution_id');
//    }

    public function participantProjectPayoutType(){
        return $this->belongsTo(ParticipantProjectPayoutType::class, 'payout_type_id');
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function getKwhReturnAttribute(){
        $deliveredTotal = $this->delivered_total ? $this->delivered_total : 0;
        $payoutKwh = $this->payout_kwh ? $this->payout_kwh : 0;
        return $deliveredTotal * $payoutKwh;
    }

    public function getDeliveredTotalStringAttribute()
    {
        return number_format( $this->delivered_total, '2',',', '.' );
    }

    public function getKwhReturnEndCalendarYearAttribute(){
        $deliveredEndCalendarYear = $this->delivered_total_end_calendar_year ? $this->delivered_total_end_calendar_year : 0;
        $payoutKwh = $this->payout_kwh ? $this->payout_kwh : 0;
        return $deliveredEndCalendarYear * $payoutKwh;
    }

    public function getDeliveredEndCalendarYearStringAttribute()
    {
        return number_format( $this->delivered_total_end_calendar_year, '2',',', '.' );
    }

    public function calculator()
    {
        return new ProjectRevenueDistributionCalculator($this);
    }

}
