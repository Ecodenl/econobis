<?php

namespace App\Eco\Order;

use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Venturecraft\Revisionable\RevisionableTrait;

class Order extends Model
{
    use RevisionableTrait, SoftDeletes, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable
        = [
            'IBAN'
        ];

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class)->orderBy('date_start');
    }

    public function activeOrderProducts()
    {
        return $this->hasMany(OrderProduct::class)
            ->where(function ($query) {
                $query->where('date_end', '>=', Carbon::today())
                    ->orWhereNull('date_end');
            });
    }

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class)->orderBy('tasks.id', 'desc');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class)->orderBy('invoices.id', 'desc');
    }

    public function invoicesToSend()
    {
        return $this->hasMany(Invoice::class)->where('invoices.status_id', 'to-send');
    }

    public function invoicesPaidCollection()
    {
        return $this->hasMany(Invoice::class)->where('payment_type_id', 'collection')->where('status_id', 'paid')
            ->orderBy('invoices.id', 'desc');
    }

    public function invoicesPaidTransfer()
    {
        return $this->hasMany(Invoice::class)->where('payment_type_id', 'transfer')->where('status_id', 'paid')
            ->orderBy('invoices.id', 'desc');
    }

    public function documents()
    {
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function emails()
    {
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function emailTemplateCollection(){
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_collection');
    }

    public function emailTemplateTransfer(){
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_transfer');
    }

    public function emailTemplateReminder()
    {
        return $this->belongsTo(EmailTemplate::class);
    }

    public function emailTemplateExhortation()
    {
        return $this->belongsTo(EmailTemplate::class);
    }

    public function getCollectionFrequency()
    {
        if (!$this->collection_frequency_id) {
            return null;
        }

        return OrderCollectionFrequency::get($this->collection_frequency_id);
    }

    public function getPaymentType()
    {
        if (!$this->payment_type_id) {
            return null;
        }

        return OrderPaymentType::get($this->payment_type_id);
    }

    public function getStatus()
    {
        if (!$this->status_id) {
            return null;
        }

        return OrderStatus::get($this->status_id);
    }

    public function getTotalPriceInclVatAttribute()
    {
        $total = 0;

        foreach ($this->orderProducts as $orderProduct) {
            if($orderProduct->is_one_time_and_paid_product){
                continue;
            }
            if ((Carbon::parse($orderProduct->date_end)->gte(Carbon::today()) || $orderProduct->date_end === null)
            ) {
                $total += $orderProduct->total_price_incl_vat_and_reduction;
            }
        }

        return $total;
    }

    public function getTotalPriceExVatAttribute()
    {
        $total = 0;

        foreach ($this->orderProducts as $orderProduct) {
            if($orderProduct->is_one_time_and_paid_product){
                continue;
            }
            if ((Carbon::parse($orderProduct->date_end)->gte(Carbon::today()) || $orderProduct->date_end === null)
            ) {
                $total += $orderProduct->total_price_ex_vat_incl_reduction;
            }
        }

        return $total;
    }

    public function getTotalPriceInclVatPerYearAttribute()
    {
        $total = 0;

        foreach ($this->orderProducts as $orderProduct) {
            if($orderProduct->is_one_time_and_paid_product){
                continue;
            }
            if ((Carbon::parse($orderProduct->date_end)->gte(Carbon::today()) || $orderProduct->date_end === null)
            ) {
                $total += $orderProduct->total_price_incl_vat_and_reduction_per_year;
            }
        }

        return $total;
    }

    public function getCanCreateInvoiceAttribute()
    {
        if($this->status_id === 'concept' || $this->status_id === 'closed'){
            return false;
        }
        if ($this->invoices()->where('status_id', 'to-send')->exists()) {
            return false;
        }
        if ($this->invoices()->where('status_id', 'in-progress')->exists()) {
            return false;
        }
        if ($this->invoices()->where('status_id', 'error-making')->exists()) {
            return false;
        }
        if ($this->invoices()->where('status_id', 'is-sending')->exists()) {
            return false;
        }
        if ($this->invoices()->where('status_id', 'error-sending')->exists()) {
            return false;
        }

        if(!$this->date_next_invoice){
            return false;
        }
        
        return true;
    }
    
    //Adds the collection frequency to a carbon date
    public function addDurationToDate($date){
        switch ($this->collection_frequency_id) {
            case 'once':
                return $date;
                break;
            case 'monthly':
                return $date->addMonth();
                break;
            case 'quarterly':
                return $date->addQuarter();
                break;
            case 'half-year':
                return $date->addMonth(6);
                break;
            case 'yearly':
                return $date->addYear();
                break;
            default:
                return $date;
        }
    }

    public function participation(){
        $this->belongsTo(ParticipantProject::class, 'participation_id');
    }
}
