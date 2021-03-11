<?php

namespace App\Http\Controllers\Portal\ParticipationProject;

use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationMolliePayment;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\Project\ProjectValueCourse;
use App\Eco\User\User;
use App\Helpers\Settings\PortalSettings;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\ParticipantMutation\ParticipantMutationController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ParticipantMutationMolliePaymentController extends ApiController
{
    /**
     * Dit is de webhook die Mollie aanroept na het uitvoeren van een betaling.
     */
    public function webhook(Request $request)
    {
        $participantMutationMolliePayment = ParticipantMutationMolliePayment::firstWhere('mollie_id', $request->input('id'));

        if(!$participantMutationMolliePayment){
            return;
        }

        $participantMutation = $participantMutationMolliePayment->participantMutation;

        $mollieApi = $participantMutation->participation->project->administration->getMollieApiFacade();

        /**
         * @var $payment \Mollie\Api\Resources\Payment
         */
        $payment = $mollieApi->payments->get($participantMutationMolliePayment->mollie_id);

        if ($payment->isPaid())
        {
            /**
             * Hackje; Tijdelijk usersetten om alle observers tevreden te houden.
             */
            $responsibleUserId = PortalSettings::get('responsibleUserId');
            if (!$responsibleUserId) {
                abort(501, 'Er is helaas een fout opgetreden.');
            }
            Auth::setUser(User::find($responsibleUserId));

            $participantMutationMolliePayment->date_paid = \Illuminate\Support\Carbon::now();
            if($iban = optional($payment->details)->consumerAccount){
                $participantMutationMolliePayment->iban = $iban;
            }
            $participantMutationMolliePayment->save();

            $status = ParticipantMutationStatus::where('code_ref', 'final')->first();

            $participantMutation->status_id = $status->id;
            $participantMutation->date_payment = Carbon::now()->format('Y-m-d');
            $participantMutation->date_entry = $participantMutation->participation->project->date_entry ?: Carbon::now();
            $participantMutation->save();

            $participantMutationController = new ParticipantMutationController;
            $participantMutationController->recalculateParticipantMutation($participantMutation);
        }
    }

    /**
     * Deze link wordt door inschrijver geopend bij betaling.
     * Hier maken we de Mollie transactie aan en redirecten we de gebruiker naar de betaalpagina.
     */
    public function pay($participantMutationCode)
    {
        $participantMutation = ParticipantMutation::firstWhere('code', $participantMutationCode);

        if(!$participantMutation){
            return view('mollie.404');
        }

        if($participantMutation->is_paid_by_mollie){
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
        $payment = $mollieApi->payments()->create($molliePostData);

        return ParticipantMutationMolliePayment::create([
            'participant_mutation_id' => $participantMutation->id,
            'mollie_id' => $payment->id,
            'checkout_url' => $payment->getCheckoutUrl(),
            'date_activated' => \Illuminate\Support\Carbon::now(),
        ]);
    }
}