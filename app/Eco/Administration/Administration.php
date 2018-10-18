<?php

namespace App\Eco\Administration;

use App\Eco\Country\Country;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Invoice\Invoice;
use App\Eco\Order\Order;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\Product\Product;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Administration extends Model
{
    use RevisionableTrait, SoftDeletes, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'IBAN'
    ];

    protected $appends
        = [
            'total_orders',
            'total_orders_concepts',
            'total_orders_upcoming',
            'total_orders_to_create_invoices',
            'total_orders_to_send_invoices',
            'total_orders_closed',
            'total_invoices',
            'total_invoices_to_send_collection',
            'total_invoices_to_send_transfer',
            'total_invoices_sent',
            'total_invoices_exported',
            'total_invoices_reminder',
            'total_invoices_exhortation',
            'total_invoices_paid',
            'total_invoices_irrecoverable',
            'total_payment_invoices',
            'total_payment_invoices_sent',
            'total_payment_invoices_not_paid',
        ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function products(){
        return $this->hasMany(Product::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function sepas(){
        return $this->hasMany(Sepa::class)->orderBy('created_at','desc');
    }

    public function productionProjects(){
        return $this->hasMany(ProductionProject::class);
    }

    public function invoices(){
        return $this->hasMany(Invoice::class);
    }

    public function paymentInvoices(){
        return $this->hasMany(PaymentInvoice::class);
    }

    public function country(){
        return $this->belongsTo(Country::class);
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

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }


    //appended fields
    public function getTotalOrdersAttribute()
    {
        return $this->orders()->count();
    }

    public function getTotalOrdersConceptsAttribute()
    {
        return $this->orders()->where('status_id', 'concept')->count();
    }

    public function getTotalOrdersUpcomingAttribute()
    {
        return $this->orders()
            ->where('orders.status_id', 'active')
            ->where(function ($q) {
                $q->whereNull('orders.date_next_invoice')
                    ->orWhere('orders.date_next_invoice', '>', Carbon::today()->addDays(14));
            })
            ->whereDoesntHave('invoices', function ($q) {
                $q->where('invoices.status_id', 'to-send');
            })->count();
    }

    public function getTotalOrdersToCreateInvoicesAttribute()
    {
        return $this->orders()
            ->where('orders.status_id', 'active')
            ->where('orders.date_next_invoice', '<=', Carbon::today()->addDays(14))
            ->whereDoesntHave('invoices', function ($q) {
                $q->where('invoices.status_id', 'to-send');
            })->count();
    }

    public function getTotalOrdersToSendInvoicesAttribute()
    {
        return $this->orders()
            ->where('orders.status_id', 'active')
            ->whereHas('invoices', function ($q) {
                $q->where('invoices.status_id', 'to-send');
            })->count();
    }


    public function getTotalOrdersClosedAttribute()
    {
        return $this->orders()->where('status_id', 'closed')->count();
    }

    public function getTotalInvoicesAttribute()
    {
        return $this->invoices()->count();
    }

    public function getTotalInvoicesToSendCollectionAttribute()
    {
        return $this->invoices()->where('status_id', 'to-send')->whereNull('date_reminder_1')->whereNull('date_reminder_2')->whereNull('date_reminder_3')->whereNull('date_exhortation')->where('payment_type_id', 'collection')->count();
    }

    public function getTotalInvoicesToSendTransferAttribute()
    {
        return $this->invoices()->where('status_id', 'to-send')->whereNull('date_reminder_1')->whereNull('date_reminder_2')->whereNull('date_reminder_3')->whereNull('date_exhortation')->where('payment_type_id', 'transfer')->count();
    }

    public function getTotalInvoicesSentAttribute()
    {
        return $this->invoices()
            ->where(function ($q) {
                $q->where(function ($q) {
                    $q->where('payment_type_id', 'transfer')
                        ->where('date_requested', '>=',
                            Carbon::today()->subMonth());
                })->orWhere(function ($q) {
                    $q->where('payment_type_id', '!=', 'transfer');
                });})->where('status_id', 'sent')->whereNull('date_reminder_1')
            ->whereNull('date_reminder_2')->whereNull('date_reminder_3')
            ->whereNull('date_exhortation')->count();
    }

    public function getTotalInvoicesExportedAttribute()
    {
        return $this->invoices()->where('status_id', 'exported')->whereNull('date_reminder_1')->whereNull('date_reminder_2')->whereNull('date_reminder_3')->whereNull('date_exhortation')->where('date_requested', '>=', Carbon::today()->subMonth())->count();
    }

    public function getTotalInvoicesReminderAttribute()
    {
        return $this->invoices()
            ->where(function ($q) {
            $q->whereNotNull('date_reminder_1')->whereNull('date_exhortation')->whereNotIn('status_id', ['paid' ,'irrecoverable']);
        })->orWhere(function ($q) {
            $q->where('status_id', 'exported')->where('date_requested', '<', Carbon::today()->subMonth());
        })->orWhere(function ($q) {
            $q->where('status_id', 'sent')->where('payment_type_id', 'transfer')->where('date_requested', '<', Carbon::today()->subMonth());
        })->count();

    }

    public function getTotalInvoicesExhortationAttribute()
    {
        return $this->invoices()->whereNotNull('date_exhortation')->whereNotIn('status_id', ['paid' ,'irrecoverable'])->count();
    }

    public function getTotalInvoicesPaidAttribute()
    {
        return $this->invoices()->where('status_id', 'paid')->count();
    }

    public function getTotalInvoicesIrrecoverableAttribute()
    {
        return $this->invoices()->where('status_id', 'irrecoverable')->count();
    }

    public function getTotalPaymentInvoicesAttribute()
    {
        return $this->paymentInvoices()->count();
    }

    public function getTotalPaymentInvoicesSentAttribute()
    {
        return $this->paymentInvoices()->where('status_id', 'sent')->count();
    }

    public function getTotalPaymentInvoicesNotPaidAttribute()
    {
        return $this->paymentInvoices()->where('status_id', 'not-paid')->count();
    }

}
