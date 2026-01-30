<?php

namespace App\Eco\DataCleanup;

//use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\Project\ProjectRevenue;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\Task\Task;
use App\Helpers\CleanupItem\CleanupItemHelper;
//use App\Helpers\Delete\Models\DeleteContact;
use App\Helpers\Delete\Models\DeleteFinancialOverview;
use App\Helpers\Delete\Models\DeleteHousingFile;
use App\Helpers\Delete\Models\DeleteIntake;
use App\Helpers\Delete\Models\DeleteInvoice;
use App\Helpers\Delete\Models\DeleteMail;
use App\Helpers\Delete\Models\DeleteOpportunity;
use App\Helpers\Delete\Models\DeleteOrder;
use App\Helpers\Delete\Models\DeleteParticipation;
use App\Helpers\Delete\Models\DeletePaymentInvoice;
use App\Helpers\Delete\Models\DeleteRevenue;
use App\Helpers\Delete\Models\DeleteRevenuesKwh;
use App\Helpers\Delete\Models\DeleteTask;
use Illuminate\Database\Eloquent\Builder;

final class CleanupRegistry
{
    public static function definitions(): array
    {
        return [
            'invoices' => [
                'model' => Invoice::class,
                'query' => fn (CleanupItemHelper $h) => $h->getInvoicesToDelete(),
                'deleter' => fn ($model) => new DeleteInvoice($model),
                'label' => fn (Invoice $m) => "Invoice #{$m->number} id {$m->id}",
            ],
            'ordersOneoff' => [
                'model' => Order::class,
                'query' => fn (CleanupItemHelper $h) => $h->getOrdersOneoffToDelete(),
                'deleter' => fn ($model) => new DeleteOrder($model),
                'label' => fn (Order $m) => "Order {$m->number} id {$m->id}",
            ],
            'ordersPeriodic' => [
                'model' => Order::class,
                'query' => fn (CleanupItemHelper $h) => $h->getOrdersPeriodicToDelete(),
                'deleter' => fn ($model) => new DeleteOrder($model),
                'label' => fn (Order $m) => "Order {$m->number} id {$m->id}",
            ],
            'financialOverviews' => [
                'model' => FinancialOverview::class,
                'query' => fn (CleanupItemHelper $h) => $h->getFinancialOverviewsToDelete(),
                'deleter' => fn ($model) => new DeleteFinancialOverview($model),
                'label' => fn (FinancialOverview $m) => "FinancialOverview {$m->administration_id}-{$m->year} id {$m->id}",
            ],
            'tasks' => [
                'model' => Task::class,
                'query' => fn (CleanupItemHelper $h) => $h->getTasksToDelete(),
                'deleter' => fn ($model) => new DeleteTask($model),
                'label' => fn (Task $m) => "Task id {$m->id}",
            ],
            'opportunities' => [
                'model' => Opportunity::class,
                'query' => fn (CleanupItemHelper $h) => $h->getOpportunitiesToDelete(),
                'deleter' => fn ($model) => new DeleteOpportunity($model),
                'label' => fn (Opportunity $m) => "Opportunity id {$m->id}",
            ],
            'intakes' => [
                'model' => Intake::class,
                'query' => fn (CleanupItemHelper $h) => $h->getIntakesToDelete(),
                'deleter' => fn ($model) => new DeleteIntake($model),
                'label' => fn (Intake $m) => "Intake id {$m->id}",
            ],
            'housingFiles' => [
                'model' => HousingFile::class,
                'query' => fn (CleanupItemHelper $h) => $h->getHousingFilesToDelete(),
                'deleter' => fn ($model) => new DeleteHousingFile($model),
                'label' => fn (HousingFile $m) => "HousingFile id {$m->id}",
            ],
            'paymentInvoices' => [
                'model' => PaymentInvoice::class,
                'query' => fn (CleanupItemHelper $h) => $h->getPaymentInvoicesToDelete(),
                'deleter' => fn ($model) => new DeletePaymentInvoice($model),
                'label' => fn (PaymentInvoice $m) => "PaymentInvoice {$m->number} id {$m->id}",
            ],
            'revenues' => [
                'model' => ProjectRevenue::class,
                'query' => fn (CleanupItemHelper $h) => $h->getRevenuesToDelete(),
                'deleter' => fn ($model) => new DeleteRevenue($model),
                'label' => fn (ProjectRevenue $m) => "ProjectRevenue id {$m->id}",
            ],
            'revenuesKwh' => [
                'model' => RevenuesKwh::class,
                'query' => fn (CleanupItemHelper $h) => $h->getRevenuesKwhToDelete(),
                'deleter' => fn ($model) => new DeleteRevenuesKwh($model),
                'label' => fn (RevenuesKwh $m) => "RevenuesKwh id {$m->id}",
            ],
            'participationsWithoutStatusDefinitive' => [
                'model' => ParticipantProject::class,
                'query' => fn (CleanupItemHelper $h) => $h->getParticipationsWithoutStatusDefinitiveToDelete(),
                'deleter' => fn ($model) => new DeleteParticipation($model),
                'label' => fn (ParticipantProject $m) => "ParticipantProject id {$m->id}",
            ],
            'participationsFinished' => [
                'model' => ParticipantProject::class,
                'query' => fn (CleanupItemHelper $h) => $h->getParticipationsFinishedToDelete(),
                'deleter' => fn ($model) => new DeleteParticipation($model),
                'label' => fn (ParticipantProject $m) => "ParticipantProject id {$m->id}",
            ],
            'incomingEmails' => [
                'model' => Email::class,
                'query' => fn (CleanupItemHelper $h) => $h->getIncomingEmailsToDelete(),
                'deleter' => fn ($model) => new DeleteMail($model),
                'label' => fn (Email $m) => "Email id {$m->id}",
            ],
            'outgoingEmails' => [
                'model' => Email::class,
                'query' => fn (CleanupItemHelper $h) => $h->getOutgoingEmailsToDelete(),
                'deleter' => fn ($model) => new DeleteMail($model),
                'label' => fn (Email $m) => "Email id {$m->id}",
            ],
            // contactsToDelete/contactsSoftDeleted voorlopig buiten registry laten
//            'contactsToDelete' => [
//                'model' => Contact::class,
//                'query' => fn (CleanupItemHelper $h) => $h->getContactsToDeleteToDelete(),
//                'deleter' => fn ($model) => new DeleteContact($model),
//                'label' => fn (Contact $m) => "Contact {$m->number}",
//            ],
        ];
    }

    public static function types(): array
    {
        return array_keys(self::definitions());
    }

    public static function has(string $type): bool
    {
        return isset(self::definitions()[$type]);
    }

    public static function get(string $type): array
    {
        $defs = self::definitions();
        return $defs[$type];
    }

    public static function modelFor(string $type): string
    {
        return self::get($type)['model'];
    }

    public static function labelFor(string $type, $model): ?string
    {
        $def = self::get($type);
        return isset($def['label']) ? ($def['label'])($model) : null;
    }
    public static function labelerFor(string $type): ?callable
    {
        $def = self::get($type);
        return $def['label'] ?? null;
    }
    public static function queryFor(string $type, CleanupItemHelper $h): Builder
    {
        /** @var callable $q */
        $q = self::get($type)['query'];
        return $q($h);
    }

}
