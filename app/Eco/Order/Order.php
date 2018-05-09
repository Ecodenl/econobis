<?php

namespace App\Eco\Order;

use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Invoice\Invoice;
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

    protected $encryptable = [
        'IBAN'
    ];

    protected $appends
        = [
            'total_price_incl_vat',
            'total_price_incl_vat_per_year',
            'date_next_collection',
        ];

    //Dont boot softdelete scopes. We handle this ourselves
    public static function bootSoftDeletes()
    {
        return false;
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class)->orderBy('date_start');
    }

    public function activeOrderProducts()
    {
        return $this->hasMany(OrderProduct::class)->where('date_start', '<=', Carbon::today())->where('date_end', '>=', Carbon::today())->orderBy('date_start');
    }

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function emails()
    {
        return $this->hasMany(Email::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function emailTemplate(){
        return $this->belongsTo(EmailTemplate::class);
    }

    public function emailTemplateReminder(){
        return $this->belongsTo(EmailTemplate::class);
    }

    public function emailTemplateExhortation(){
        return $this->belongsTo(EmailTemplate::class);
    }

    public function getCollectionFrequency()
    {
        if(!$this->collection_frequency_id) return null;

        return OrderCollectionFrequency::get($this->collection_frequency_id);
    }

    public function getPaymentType()
    {
        if(!$this->payment_type_id) return null;

        return OrderPaymentType::get($this->payment_type_id);
    }

    public function getStatus()
    {
        if(!$this->status_id) return null;

        return OrderStatus::get($this->status_id);
    }

    public function getTotalPriceInclVatAttribute()
    {
        $total = 0;

        foreach ($this->orderProducts as $orderProduct) {
            if(Carbon::parse($orderProduct->date_start)->lte(Carbon::today()) && Carbon::parse($orderProduct->date_end)->gte(Carbon::today())) {
                $total += $orderProduct->total_price_incl_vat_and_reduction;
            }
        }

        return $total;
    }

    public function getTotalPriceInclVatPerYearAttribute()
    {
        $total = 0;

        foreach ($this->orderProducts as $orderProduct) {
            if(Carbon::parse($orderProduct->date_start)->lte(Carbon::today()) && Carbon::parse($orderProduct->date_end)->gte(Carbon::today())) {
                $total += $orderProduct->total_price_incl_vat_and_reduction_per_year;
            }
        }

        return $total;
    }

    public function getDateNextCollectionAttribute()
    {
        $date = null;

        foreach($this->invoices as $invoice){
            if($invoice->date_collection && (Carbon::parse($invoice->date_collection)->lt(Carbon::parse($date)) || $date === null) && Carbon::parse($invoice->date_collection)->gte(Carbon::today())){
                $date = $invoice->date_collection;
                }
        }

        return $date;
    }
}
