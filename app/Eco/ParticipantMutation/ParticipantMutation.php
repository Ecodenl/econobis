<?php

namespace App\Eco\ParticipantMutation;

use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\ProjectValueCourse;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutation extends Model
{
    protected $table = 'participant_mutations';

    use RevisionableTrait, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'paid_on',
    ];

    protected $dates = [
//        'date_interest',
//        'date_option',
//        'date_granted',
//        'date_contract_retour',
//        'date_payment',
//        'date_entry',
        'created_at',
        'updated_at',
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

}
