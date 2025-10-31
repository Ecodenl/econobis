<?php

namespace App\Eco\Administration;

use App\Eco\Country\Country;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\Invoice\Invoice;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Order\Order;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Eco\Product\Product;
use App\Eco\Project\Project;
//use App\Eco\Twinfield\TwinfieldConnectionTypeWithIdAndName;
use App\Eco\Twinfield\TwinfieldCustomerNumber;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mollie\Api\MollieApiClient;
use Venturecraft\Revisionable\RevisionableTrait;

class Administration extends Model
{
    use RevisionableTrait, SoftDeletes, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'IBAN',
        'twinfield_password',
        'twinfield_client_secret',
        'mollie_api_key',
    ];

    protected $casts = [
        'uses_mollie' => 'bool',
    ];

    //Per administratie heeft de contact een ander twinfield nummer
    public function twinfieldNumbers()
    {
        return $this->hasMany(TwinfieldCustomerNumber::class);
    }

//    public function getTwinfieldConnectionTypeWithIdAndName()
//    {
//        if(!$this->twinfield_connection_type) return null;
//
//        return TwinfieldConnectionTypeWithIdAndName::get($this->twinfield_connection_type);
//    }

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

    public function documents()
    {
        return $this->belongsToMany(Document::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function paymentInvoices()
    {
        return $this->hasMany(PaymentInvoice::class);
    }

    public function financialOverviews()
    {
        return $this->hasMany(FinancialOverview::class);
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

    public function emailTemplateFinancialOverview()
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

    public function portalSettingsLayout()
    {
        return $this->belongsTo(PortalSettingsLayout::class);
    }

    public function documentsNotOnPortal(){
        $documentCreatedFromAdministrationId = DocumentCreatedFrom::where('code_ref', 'administration')->first()->id;
        return $this->hasMany(Document::class)->where('document_created_from_id', $documentCreatedFromAdministrationId)->where('show_on_portal', false)->orderBy('documents.id', 'desc');
    }

    public function documentsOnPortal(){
        $documentCreatedFromAdministrationId = DocumentCreatedFrom::where('code_ref', 'administration')->first()->id;
        return $this->hasMany(Document::class)->where('document_created_from_id', $documentCreatedFromAdministrationId)->where('show_on_portal', true)->orderBy('documents.id', 'desc');
    }


    //appended fields
    public function getPortalSettingsLayoutAssignedAttribute()
    {
        if($this->portal_settings_layout_id)
        {
            $portalSettingsLayout = PortalSettingsLayout::where('id', $this->portal_settings_layout_id)->first();
        }else{
            $portalSettingsLayout = PortalSettingsLayout::where('is_default', true)->first();
        }

        if(empty($portalSettingsLayout->portal_logo_file_name_header))
        {
            $portalSettingsLayout->portal_logo_file_name_header = $portalSettingsLayout->portal_logo_file_name;
        }
        if(empty($portalSettingsLayout->portal_image_bg_file_name_login))
        {
            $portalSettingsLayout->portal_image_bg_file_name_login = 'page-head5.png';
        }
        if(empty($portalSettingsLayout->portal_image_bg_file_name_header))
        {
            $portalSettingsLayout->portal_image_bg_file_name_header = $portalSettingsLayout->portal_image_bg_file_name_login;
        }

        return $portalSettingsLayout;
    }

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
                $q->where(function ($q2) {
                    $q2->where('orders.collection_frequency_id', 'once')
                        ->orWhereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ]);
                });
            })->count();
    }

    public function getTotalOrdersToCreateInvoicesAttribute()
    {
        return $this->orders()
            ->where('orders.status_id', 'active')
            ->where('orders.date_next_invoice', '<=', Carbon::today()->addDays(14))
            ->whereDoesntHave('invoices', function ($q) {
                $q->where(function ($q2) {
                    $q2->where('orders.collection_frequency_id', 'once')
                        ->orWhereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ]);
                });
            })->count();
    }

    public function getTotalOrdersInProgressInvoicesAttribute()
    {
        return $this->orders()->where('status_id', 'in-progress')->count();
    }

    public function getTotalOrdersToSendInvoicesAttribute()
    {
        return $this->orders()
            ->where('orders.status_id', 'active')
            ->whereHas('invoices', function ($q) {
                $q->whereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ]);
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

    public function getTotalInvoicesErrorSendingCollectionAttribute()
    {
        return $this->invoices()->where('status_id', 'error-sending')->whereNull('date_reminder_1')->whereNull('date_reminder_2')->whereNull('date_reminder_3')->whereNull('date_exhortation')->where('payment_type_id', 'collection')->count();
    }

    public function getTotalInvoicesErrorSendingTransferAttribute()
    {
        return $this->invoices()->where('status_id', 'error-sending')->whereNull('date_reminder_1')->whereNull('date_reminder_2')->whereNull('date_reminder_3')->whereNull('date_exhortation')->where('payment_type_id', 'transfer')->count();
    }

    public function getTotalInvoicesInProgressAttribute()
    {
        return $this->invoices()->where('status_id', 'in-progress')->count();
    }

    public function getTotalInvoicesIsSendingAttribute()
    {
        return $this->invoices()->where('status_id', 'is-sending')->count();
    }

    public function getTotalInvoicesErrorMakingAttribute()
    {
        return $this->invoices()->where('status_id', 'error-making')->count();
    }

    public function getTotalInvoicesIsResendingAttribute()
    {
        return $this->invoices()->where('status_id', 'is-resending')->count();
    }

    public function getTotalInvoicesIsExportingAttribute()
    {
        return $this->invoices()->where('status_id', 'is-exporting')->count();
    }

    public function getTotalInvoicesErrorExportingAttribute()
    {
        return $this->invoices()->where('status_id', 'error-exporting')->count();
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
            })->whereIn('invoices.status_id', ['sent', 'error-exporting'])->whereNull('date_reminder_1')
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
                        $q->whereIn('invoices.status_id', ['sent', 'error-exporting'])->where('invoices.payment_type_id', 'transfer')
                            ->where('invoices.days_to_expire', '<=', '0');
                    });
            })
            ->whereNotIn('invoices.status_id', ['to-send', 'paid', 'irrecoverable'])
            ->whereNull('invoices.date_exhortation')
            ->whereDoesntHave('molliePayments', function ($q) {
                $q->whereNotNull('date_paid');
            })
            ->count();

    }

    public function getTotalInvoicesExhortationAttribute()
    {
        return $this->invoices()->whereNotNull('date_exhortation')->whereNotIn('status_id', ['to-send', 'paid', 'irrecoverable'])->count();
    }

    public function getTotalInvoicesPaidAttribute()
    {
        return $this->invoices()->where(function ($query) {
            $query->where('status_id', 'paid')
                ->orWhereHas('molliePayments', function ($query) {
                    $query->whereNotNull('date_paid');
                });
        })->count();
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
            $canCreateInvoices['message'] = 'Kan SEPA niet aanmaken. De administratie velden ' . implode(', ', $canCreateInvoices['requiredFields'] ) . ' zijn verplicht.';
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
            $canCreatePaymentInvoices['message'] = 'Kan SEPA niet aanmaken. De administratie velden ' . implode(', ', $canCreatePaymentInvoices['requiredFields'] ) . ' zijn verplicht.';
        }

        return $canCreatePaymentInvoices;
    }

    public function getCanCreateFinancialOverviewContactsAttribute()
    {
        $canCreateFinancialOverviewContacts['can'] = true;
        $canCreateFinancialOverviewContacts['message'] = '';
        $canCreateFinancialOverviewContacts['requiredFields'] = [];

        return $canCreateFinancialOverviewContacts;
    }

    public function getLastYearFinancialOverviewDefinitiveAttribute()
    {
        $financialOverview = $this->financialOverviews()->where('definitive', true)->get()->sortByDesc('year')->first();
        return $financialOverview ? (int) $financialOverview->year : null;
    }

    public function getPendingInvoicesPresentAttribute() {

        return $this->invoices()->whereIn('invoices.status_id', ['in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending', 'is-exporting', 'error-exporting' ])->exists();

    }

    public function getOldestUnpaidInvoiceDateAttribute() {
        $oldestUnpaidInvoice = $this->invoices()->whereIn('invoices.status_id', ['sent', 'exported', 'error-exporting'])->whereNotNull('invoices.date_sent')->orderBy('invoices.date_sent')->first();
        return $oldestUnpaidInvoice ? $oldestUnpaidInvoice->date_sent : null;
    }

    public function getOldestTwinfieldInvoiceDateAttribute() {
        $oldestTwinfieldInvoice = $this->invoices()->whereNotNull('invoices.twinfield_number')->whereNotNull('invoices.date_sent')->orderBy('invoices.date_sent')->first();
        return $oldestTwinfieldInvoice ? $oldestTwinfieldInvoice->date_sent : null;
    }

    /**
     * Mollie is ingesteld per administratie en kunnen de Mollie Api Key dus niet in .env zetten.
     * Daardoor is de standaard Mollie Facade ook niet bruikbaar.
     *
     * Via deze functie kan een Mollie object obv administratie worden opgehaald ipv via Mollie::api().
     */
    public function getMollieApiFacade()
    {
        if (!$this->uses_mollie) {
            return null;
        }

        $mollie = new MollieApiClient();
        $mollie->setApiKey($this->mollie_api_key);

        return $mollie;
    }}
