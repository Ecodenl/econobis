<?php

namespace App\Eco\Administration;

use App\Eco\Country\Country;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Invoice\Invoice;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Order\Order;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\Product\Product;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\Twinfield\TwinfieldCustomerNumber;
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
        'IBAN',
        'twinfield_password'
    ];

    //Per administratie heeft de contact een ander twinfield nummer
    public function twinfieldNumbers()
    {
        return $this->hasMany(TwinfieldcustomerNumber::class);
    }

    public function ledgers()
    {
        return $this->hasMany(Ledger::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function sepas()
    {
        return $this->hasMany(Sepa::class)->orderBy('created_at', 'desc');
    }

    public function productionProjects()
    {
        return $this->hasMany(ProductionProject::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function paymentInvoices()
    {
        return $this->hasMany(PaymentInvoice::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function emailTemplateCollection()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_collection');
    }

    public function emailTemplateTransfer()
    {
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

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function mailbox(){
        return $this->belongsTo(Mailbox::class);
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
                        ->where('days_to_expire', '>', '0');
                })->orWhere(function ($q) {
                    $q->where('payment_type_id', '!=', 'transfer');
                });
            })->where('status_id', 'sent')->whereNull('date_reminder_1')
            ->whereNull('date_reminder_2')->whereNull('date_reminder_3')
            ->whereNull('date_exhortation')->count();
    }

    public function getTotalInvoicesExportedAttribute()
    {
        return $this->invoices()
            ->where(function ($q) {
                $q->where(function ($q) {
                    $q->where('payment_type_id', 'transfer')
                        ->where('days_to_expire', '>', '0');
                })->orWhere(function ($q) {
                    $q->where('payment_type_id', '!=', 'transfer');
                });})->where('status_id', 'exported')->whereNull('date_reminder_1')
            ->whereNull('date_reminder_2')->whereNull('date_reminder_3')
            ->whereNull('date_exhortation')->count();  }

    public function getTotalInvoicesReminderAttribute()
    {
        return $this->invoices()
            ->where(function ($q) {
                $q->where(function ($q) {
                    $q->whereNotNull('invoices.date_reminder_1');
                })
                    ->orWhere(function ($q) {
                        $q->where('invoices.status_id', 'exported')->where('invoices.payment_type_id', 'transfer')
                            ->where('invoices.days_to_expire', '<=', '0');

                    })->orWhere(function ($q) {
                        $q->where('invoices.status_id', 'sent')->where('invoices.payment_type_id', 'transfer')
                            ->where('invoices.days_to_expire', '<=', '0');
                    });
            })
            ->whereNotIn('invoices.status_id', ['to-send', 'paid', 'irrecoverable'])->whereNull('invoices.date_exhortation')->count();

    }

    public function getTotalInvoicesExhortationAttribute()
    {
        return $this->invoices()->whereNotNull('date_exhortation')->whereNotIn('status_id', ['to-send', 'paid', 'irrecoverable'])->count();
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

    public function getCanCreateInvoicesAttribute()
    {
        $canCreateInvoices['can'] = true;
        $canCreateInvoices['message'] = '';
        $canCreateInvoices['requiredFields'] = [];

        if (empty($this->IBAN)) {
            $canCreateInvoices['requiredFields'][] = 'IBAN';
            $canCreateInvoices['can'] = false;
        }

        if (empty($this->bic)) {
            $canCreateInvoices['requiredFields'][] = 'bic';
            $canCreateInvoices['can'] = false;
        }

        //22-11-2018 SEPA crediteur is alleen voor sepa's verplicht
//        if(empty($this->sepa_creditor_id)) {
//            $canCreateInvoices['requiredFields'][] = 'SEPA crediteur id';
//            $canCreateInvoices['can'] = false;
//        }

        if (!$canCreateInvoices['can']) {
            $canCreateInvoices['message'] = 'Kan SEPA niet aanmaken. De velden ' . implode($canCreateInvoices['requiredFields'], ', ') . ' zijn verplicht.';
        }

        return $canCreateInvoices;
    }

    public function getCanCreatePaymentInvoicesAttribute()
    {
        $canCreatePaymentInvoices['can'] = true;
        $canCreatePaymentInvoices['message'] = '';
        $canCreatePaymentInvoices['requiredFields'] = [];

        if (empty($this->IBAN)) {
            $canCreatePaymentInvoices['requiredFields'][] = 'IBAN';
            $canCreatePaymentInvoices['can'] = false;
        }


        if (empty($this->bic)) {
            $canCreatePaymentInvoices['requiredFields'][] = 'bic';
            $canCreatePaymentInvoices['can'] = false;
        }

        if (!$canCreatePaymentInvoices['can']) {
            $canCreatePaymentInvoices['message'] = 'Kan SEPA niet aanmaken. De velden ' . implode($canCreatePaymentInvoices['requiredFields'], ', ') . ' zijn verplicht.';
        }

        return $canCreatePaymentInvoices;
    }

}
