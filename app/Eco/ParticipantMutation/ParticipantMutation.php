<?php

namespace App\Eco\ParticipantMutation;

use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutation extends Model
{
    protected $table = 'participant_mutations';

    use RevisionableTrait, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'paid_on',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function participation()
    {
        return $this->belongsTo(ParticipantProject::class);
    }

    public function type()
    {
        return $this->belongsTo(ParticipantMutationType::class);
    }

    public function status()
    {
        return $this->belongsTo(ParticipantMutationStatus::class);
    }

    public function statusLog()
    {
        return $this->hasMany(ParticipantMutationStatusLog::class)->orderBy('id', 'desc');
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }

    public function molliePayments()
    {
        return $this->hasMany(ParticipantMutationMolliePayment::class);
    }

    public function getIsPaidByMollieAttribute()
    {
        return $this->molliePayments()->whereNotNull('date_paid')->exists();
    }

    public function getEconobisPaymentLinkAttribute()
    {
        return route('portal.mollie.pay', [
            'participantMutationCode' => $this->code,
        ]);
    }

    public function getDateSortAttribute()
    {
        if($this->date_entry !== null) {
            $dateSort = Carbon::parse($this->date_entry)->timestamp;
        } else if ($this->date_payment !== null) {
            $dateSort = Carbon::parse($this->date_payment)->timestamp;
        } else {
            $dateSort = Carbon::parse($this->created_at)->timestamp;;
        }

        return $dateSort;
    }

    public function getMollieAmount()
    {
        switch ($this->participation->project->projectType->code_ref){
            case 'loan':
                return $this->amount_option + $this->transaction_costs_amount;
            case 'obligation':
            case 'capital':
            case 'postalcode_link_capital':
                $bookWorth = $this->participation->project->currentBookWorth();
                if($bookWorth == null){
                    throw new \Exception('Geen huidige boekwaarde kunnen bepalen.');
                }

                return ($bookWorth * $this->quantity) + $this->transaction_costs_amount;
            default:
                throw new \Exception('Onverwacht mutatie type ontvangen.');
        }
    }
    public function getMollieAmountFormatted()
    {
        return number_format($this->getMollieAmount(), 2, '.', '');
    }
    public function getChangeAllowedAttribute()
    {
        if($this->participation->date_terminated != null){
            return false;
        }

        if ($this->participation->project->projectType->code_ref === 'loan') {
            $mutationTypeFirstDesposit = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id',  $this->participation->project->projectType->id)->first();

            if($mutationTypeFirstDesposit && $this->type_id === $mutationTypeFirstDesposit->id) {
                $participationHasMutationsWithStatusDepositOrWithDrawal = $this->participation->mutations()
                    ->whereHas('type', function ($query) {
                        $query->whereIn('code_ref', ['deposit', 'withDrawal']);
                    })->exists();
                if($participationHasMutationsWithStatusDepositOrWithDrawal){
                    return false;
                }
            }
        }

        $projectRevenueDistributions = $this->participation->projectRevenueDistributions()->whereNotIn('status', ['concept'])
            ->whereHas('revenue', function ($query) {
                $query->where('date_begin', '<=', Carbon::parse($this->date_entry)->format('Y-m-d'));
                $query->where('date_end', '>=', Carbon::parse($this->date_entry)->format('Y-m-d'));
            });
        $revenueDistributionKwh = $this->participation->revenueDistributionKwh()->whereNotIn('status', ['concept'])
            ->whereHas('distributionPartsKwh', function ($query) {
                $query->whereHas('partsKwh', function ($query) {
                    $query->where('date_begin', '<=', Carbon::parse($this->date_entry)->format('Y-m-d'));
                    $query->where('date_end', '>=', Carbon::parse($this->date_entry)->format('Y-m-d'));
                });
            });
        return $projectRevenueDistributions->count() == 0 && $revenueDistributionKwh->count() == 0;
    }

}
