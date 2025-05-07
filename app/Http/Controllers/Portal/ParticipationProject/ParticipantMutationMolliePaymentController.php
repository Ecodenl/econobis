<?php

namespace App\Http\Controllers\Portal\ParticipationProject;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationMolliePayment;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\Task\Task;
use App\Eco\Task\TaskType;
use App\Eco\User\User;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Workflow\TaskWorkflowHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\ContactGroup\ContactGroupController;
use App\Http\Controllers\Api\ParticipantMutation\ParticipantMutationController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mollie\Api\Exceptions\ApiException;

class ParticipantMutationMolliePaymentController extends ApiController
{
    /**
     * Dit is de webhook die Mollie aanroept na het uitvoeren van een betaling.
     */
    public function webhook(Request $request)
    {
        $participantMutationMolliePayment = ParticipantMutationMolliePayment::firstWhere('mollie_id', $request->input('id'));

        if (!$participantMutationMolliePayment) {
            return;
        }

        $participantMutation = $participantMutationMolliePayment->participantMutation;
        $mollieApi = $participantMutation->participation->project->administration->getMollieApiFacade();

        /**
         * @var $payment \Mollie\Api\Resources\Payment
         */
        $payment = $mollieApi->payments->get($participantMutationMolliePayment->mollie_id);

        if ($payment->isPaid()) {
            /**
             * Hackje; Tijdelijk user setten om alle observers tevreden te houden.
             */
            $responsibleUser = User::find(PortalSettings::get('responsibleUserId'));
            $responsibleUser->occupation = '@portal-update@';
            Auth::setUser($responsibleUser);

            $participantMutationMolliePayment->date_paid = \Illuminate\Support\Carbon::now();
            if ($payment->details) {
                $participantMutationMolliePayment->iban = $payment->details->consumerAccount;
                $participantMutationMolliePayment->iban_name = $payment->details->consumerName;;
            }
            $participantMutationMolliePayment->save();

            $participantMutation->status_id = ParticipantMutationStatus::where('code_ref', 'final')->first()->id;
            $participantMutation->date_payment = Carbon::now()->format('Y-m-d');
            if($participantMutation->date_entry === null){
                $participantMutation->date_entry = $participantMutation->participation->project->date_entry ?: Carbon::now()->format('Y-m-d');
            }
            $participantMutation->save();

            (new ParticipantMutationController())->recalculateParticipantMutation($participantMutation);

            /**
             * Koppelen aan juiste contactgroup
             */
            $contactGroupController = new ContactGroupController();
            // indien gekozen voor member of no_member, maak koppeling met juiste contactgroup.
            switch ($participantMutation->participation->choice_membership) {
                case 1:
                    // koppel aan member_group_id
                    $contactGroupMember = ContactGroup::find($participantMutation->participation->project->member_group_id);
                    $contactGroupPivotExists = $participantMutation->participation->contact->groups()->where('id', $participantMutation->participation->project->member_group_id)->exists();
                    if ($contactGroupMember && !$contactGroupPivotExists) {
                        $contactGroupController->addContact($contactGroupMember, $participantMutation->participation->contact);
                    }
                    break;
                case 2:
                    // koppel aan no_member_group_id
                    $contactGroupNoMember = ContactGroup::find($participantMutation->participation->project->no_member_group_id);
                    $contactGroupPivotExists = $participantMutation->participation->contact->groups()->where('id', $participantMutation->participation->project->no_member_group_id)->exists();
                    if ($contactGroupNoMember && !$contactGroupPivotExists) {
                        $contactGroupController->addContact($contactGroupNoMember, $participantMutation->participation->contact);
                    }
                    break;
                default:
                    // no action
                    break;
            }

            (new ParticipationProjectController())->createAndSendRegistrationDocument(
                $participantMutation->participation->contact,
                $participantMutation->participation->project,
                $participantMutation->participation,
                $responsibleUser->id,
                $participantMutation,
            );

            /**
             * Als de gebruikte iban niet overeenkomt met de iban van het
             * contact maken we hier ter controle een taak voor aan.
             *
             * Checken of consumerBic is gevuld om zeker te weten dat iban ook echt een iban bevat, bij bijv.
             * PayPal komt hier nl. een e-mailadres in te staan en kunnen we dus geen zinvolle check doen.
             */
            if ($payment->details &&
                $payment->details->consumerBic &&
                trim($participantMutationMolliePayment->iban) !== trim($participantMutationMolliePayment->participantMutation->participation->contact->iban)) {

                $this->createIbanMismatchTask($participantMutationMolliePayment);
            }
        }
    }

    /**
     * Deze link wordt door inschrijver geopend bij betaling.
     * Hier maken we de Mollie transactie aan en redirecten we de gebruiker naar de betaalpagina.
     */
    public function pay($participantMutationCode)
    {
        $participantMutation = ParticipantMutation::firstWhere('code', $participantMutationCode);

// todo WM: Moeten in portal anders doen
//        kan mij niet voorstellen dat dit werk ?!

        if (!$participantMutation) {
            return view('mollie.404');
        }

        if ($participantMutation->is_paid_by_mollie) {
            /**
             * Factuur is al betaald, redirect naar resultaatpagina.
             */
            return redirect()->route('portal.mollie.redirect', [
                'participantMutationCode' => $participantMutation->code
            ]);
        }

        /**
         * Er is nog niet betaald, maak een mollie transactie aan, en redirect daar naartoe.
         */
        $participantMutationMolliePayment = $this->createParticipantMutationMolliePayment($participantMutation);

// todo WM: Moeten in portal anders doen
//        if(!$participantMutationMolliePayment){
//            return view('mollie.422');
//        }

        return redirect($participantMutationMolliePayment->checkout_url);
    }

    /**
     * Maak een transactie aan via de Mollie api en sla deze op op het ParticipantMutationMolliePayment model.
     */
    private function createParticipantMutationMolliePayment(ParticipantMutation $participantMutation)
    {
        $molliePostData = [
            "amount" => [
                'currency' => 'EUR',
                'value' => $participantMutation->getMollieAmountFormatted(),
            ],
            "description" => $participantMutation->participation->project->name . ' ' . config('app.name'),
            "redirectUrl" => 'https://' . PortalSettings::get("portalUrl") . '/#/inschrijven/mollie-resultaat/' . $participantMutation->code,
        ];

        /**
         * Webhook url moet een openbare url zijn welke voor Mollie te benaderen is.
         * Aangezien dat lokaal niet kan deze dan maar uitschakelen.
         */
        if (config('app.env') !== 'local') {
            $molliePostData['webhookUrl'] = route('portal.mollie.webhook');
        }

        $mollieApi = $participantMutation->participation->project->administration->getMollieApiFacade();
        try{
            $payment = $mollieApi->payments->create($molliePostData);
        } catch (ApiException $exception) {
            return null;
        }

        return ParticipantMutationMolliePayment::create([
            'participant_mutation_id' => $participantMutation->id,
            'mollie_id' => $payment->id,
            'checkout_url' => $payment->getCheckoutUrl(),
            'date_activated' => \Illuminate\Support\Carbon::now(),
        ]);
    }

    private function createIbanMismatchTask(ParticipantMutationMolliePayment $participantMutationMolliePayment)
    {
        $note = "IBAN gegevens van contact komen niet overeen met Mollie betaling:\n" .
            "Contact IBAN: " . $participantMutationMolliePayment->participantMutation->participation->contact->iban . "\n" .
            "Mollie betaling IBAN: " . $participantMutationMolliePayment->iban . "\n";

        $checkContactTaskResponsibleUserId = PortalSettings::get('checkContactTaskResponsibleUserId');
        $checkContactTaskResponsibleTeamId = PortalSettings::get('checkContactTaskResponsibleTeamId');
        $taskTypeForPortal = TaskType::where('default_portal_task_type', true)->first();

        if($taskTypeForPortal){
            $newTask = new Task();
            $newTask->note = $note;
            $newTask->type_id = $taskTypeForPortal->id;
            $newTask->contact_id = $participantMutationMolliePayment->participantMutation->participation->contact_id;
            $newTask->responsible_user_id = !empty($checkContactTaskResponsibleUserId) ? $checkContactTaskResponsibleUserId
                : null;
            $newTask->responsible_team_id = !empty($checkContactTaskResponsibleTeamId) ? $checkContactTaskResponsibleTeamId
                : null;
            $newTask->date_planned_start = Carbon::today();

            $newTask->save();

            if ($newTask->type && $newTask->type->uses_wf_new_task) {
                $taskWorkflowHelper = new TaskWorkflowHelper($newTask);
                $processed = $taskWorkflowHelper->processWorkflowEmailNewTask();
                if($processed)
                {
                    $newTask->date_sent_wf_new_task =  Carbon::now();
                    $newTask->save();
                }
            }
        }
    }
}