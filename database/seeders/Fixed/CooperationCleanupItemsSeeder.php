<?php

namespace Database\Seeders\Fixed;

use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationCleanupItem;
use Illuminate\Database\Seeder;

class CooperationCleanupItemsSeeder extends Seeder
{
    public function run(): void
    {
        $cooperationId = Cooperation::first()?->id ?? 1;

        $cooperationCleanupItems = [
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Nota\'s',
                'code_ref' => 'invoices',
                'date_ref' => 'Datum verstuurd'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Eenmalige orders',
                'code_ref' => 'ordersOneoff',
                'date_ref' => 'Volgende notadatum (of Aanvraagdatum)'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Afgesloten periodieke orders',
                'code_ref' => 'ordersPeriodic',
                'date_ref' => 'Volgende notadatum (of Aanvraagdatum)'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Waardestaten contacten',
                'code_ref' => 'financialOverviewContacts',
                'date_ref' => 'Waardestaat einde jaar'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Taken',
                'code_ref' => 'tasks',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Kansacties',
                'code_ref' => 'quotationRequests',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Kansen',
                'code_ref' => 'opportunities',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Intakes',
                'code_ref' => 'intakes',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Woningdossiers',
                'code_ref' => 'housingFiles',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Uitkeringsnota\'s',
                'code_ref' => 'paymentInvoices',
                'date_ref' => 'Betaalopdrachtdatum'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Opbrengsten Euro / Aflossing',
                'code_ref' => 'revenues',
                'date_ref' => 'Datum einde periode'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Opbrengsten Kwh',
                'code_ref' => 'revenuesKwh',
                'date_ref' => 'Datum einde periode'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Deelnames zonder status Definitief',
                'code_ref' => 'participationsWithoutStatusDefinitive',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Deelnames met status Beëindigd',
                'code_ref' => 'participationsFinished',
                'date_ref' => 'Beëindigingsdatum'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Verplaats binnengekomen e-mailcorrespondentie naar de e-mailarchief map',
                'code_ref' => 'incomingEmails',
                'date_ref' => 'Datum ontvangen'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Verplaats uitgaande e-mailcorrespondentie naar de e-mailarchief map',
                'code_ref' => 'outgoingEmails',
                'date_ref' => 'Datum verzonden'
            ],
            [
                'cooperation_id' => $cooperationId,
                'name' => 'Contacten',
                'code_ref' => 'contacts',
                'date_ref' => 'Aanmaakdatum'
            ],
        ];

        // We voegen ontbrekende (nieuwe) records toe en wijzigen van bestaande alleen: name en date_ref.
        // We gebruiken hier daarom firstOrCreate() en doen daarna een update() voor niet muteerbare velden (voor gebruiker).
        foreach ($cooperationCleanupItems as $cooperationCleanupItem) {
            $existingCooperationCleanupItem = CooperationCleanupItem::firstOrCreate(
                [
                    'cooperation_id' => $cooperationCleanupItem['cooperation_id'],
                    'code_ref' => $cooperationCleanupItem['code_ref'],
                ],
                $cooperationCleanupItem
            );
            $existingCooperationCleanupItem->update([
                'name' => $cooperationCleanupItem['name'],
                'date_ref' => $cooperationCleanupItem['date_ref'],
            ]);
        }

    }
}