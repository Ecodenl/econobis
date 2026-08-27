<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactAvailability;
use App\Eco\District\District;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ContactAvailabilityController
{
    public function getByWeek(Contact $contact, Request $request)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $request->validate([
            'startOfWeek' => ['required', 'date'],
        ]);

        $startOfWeek = Carbon::make($request->startOfWeek);
        $endOfWeek = $startOfWeek->copy()->endOfWeek();
        return $contact->availabilities()
            ->whereBetween('from', [$startOfWeek, $endOfWeek])
            ->get()
            ->map(function(ContactAvailability $availability){
               return [
                   'from' => $availability->from->format('Y-m-d H:i:s'),
                   'to' => $availability->to->format('Y-m-d H:i:s'),
               ];
            });
    }

    public function getDistrictAvailabilityByWeek(District $district, Request $request)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $startOfWeek = Carbon::make($request->input('startOfWeek'))->startOfWeek();
        $endOfWeek = $startOfWeek->copy()->endOfWeek();
        $opportunityActionVisitId = OpportunityAction::where('code_ref', 'visit')->first()->id;
        $quotationRequestStatusVisitCancelledId = QuotationRequestStatus::where('opportunity_action_id', $opportunityActionVisitId)->where('code_ref', QuotationRequestStatus::STATUS_VISIT_CANCELLED_CODE_REF)->first()->id;

        return $district->coaches->map(function(Contact $coach) use ($endOfWeek, $startOfWeek, $quotationRequestStatusVisitCancelledId) {
            /**
             * getPlannableAvailabilitiesInPeriod() resultaat in tijdelijke variabele op coach opslaan
             * zodat we deze hieronder niet meerdere keren hoeven te berekenen.
             */
            $coach->temp_availabilities = $coach->getPlannableAvailabilitiesInPeriod($startOfWeek, $endOfWeek);

            return $coach;
        })->filter(function(Contact $coach) {
            return $coach->temp_availabilities->count() > 0;
        })
        ->load(['quotationRequests' => function($query) use ($startOfWeek, $request, $quotationRequestStatusVisitCancelledId){
            $endOfWeek = $startOfWeek->copy()->endOfWeek();
            $query->whereBetween('date_planned', [$startOfWeek, $endOfWeek])
                ->where('uses_planning', true)
                ->where('status_id', '!=', $quotationRequestStatusVisitCancelledId);
        }])
        ->map(function(Contact $coach) {
            return [
                'id' => $coach->id,
                'fullName' => $coach->full_name,
                'coachMinMinutesBetweenAppointments' => $coach->coach_min_minutes_between_appointments,
                'availabilities' => $coach->temp_availabilities
                    ->map(function(ContactAvailability $availability){
                        return [
                            'from' => $availability->from->format('Y-m-d H:i:s'),
                            'to' => $availability->to->format('Y-m-d H:i:s'),
                        ];
                    })->values(),
                'quotationRequests' => $coach->quotationRequests
                    ->map(function($quotationRequest){
                        return [
                            'datePlanned' => $quotationRequest->date_planned,
                            'durationMinutes' => $quotationRequest->duration_minutes,
                        ];
                    }),
            ];
        })->values();
    }

    public function update(Contact $contact, Request $request)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $request->validate([
            'startOfWeek' => ['required', 'date'],
            'availabilities' => ['array'],
            'availabilities.*.day' => ['required', 'integer', 'min:0', 'max:6'],
            'availabilities.*.from' => ['required', 'date_format:H:i'],
            'availabilities.*.to' => ['required', 'date_format:H:i'],
        ]);

        // Delete all existing availabilities in this week
        $startOfWeek = Carbon::make($request->startOfWeek);
        $endOfWeek = $startOfWeek->copy()->endOfWeek();
        $contact->availabilities()->whereBetween('from', [$startOfWeek, $endOfWeek])->delete();

        // Create new availabilities
        foreach ($request->availabilities as $availability) {
            $contact->availabilities()->create([
                'from' => $startOfWeek->copy()->addDays((int) $availability['day'])->format('Y-m-d') . ' ' . $availability['from'] . ':00',
                'to' => $startOfWeek->copy()->addDays((int) $availability['day'])->format('Y-m-d') . ' ' . $availability['to'] . ':00',
            ]);
        }
    }

    public function copyWeeks(Contact $contact, Request $request)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $request->validate([
            'copyFromWeek' => ['required', 'date'],
            'copyToWeek' => ['required', 'date'],
            'numberOfWeeks' => ['required', 'integer', 'min:1'],
        ]);

        $startOfWeekToCopyFrom = Carbon::make($request->copyFromWeek);
        $availabilitiesToBeCopied = $contact->availabilities()
            ->whereBetween('from', [$startOfWeekToCopyFrom, $startOfWeekToCopyFrom->copy()->endOfWeek()])
            ->get();

        $numberOfWeeks = $request->numberOfWeeks;

        $startOfWeekToCopyTo = Carbon::make($request->copyToWeek);
        $diffInWeeks = $startOfWeekToCopyTo->diffInWeeks($startOfWeekToCopyFrom, true);
        $contact->availabilities()->whereBetween('from', [$startOfWeekToCopyTo, $startOfWeekToCopyTo->copy()->addWeeks($numberOfWeeks - 1)->endOfWeek()])->delete();

        for ($i = 0; $i < $numberOfWeeks; $i++) {
            foreach ($availabilitiesToBeCopied as $availabilityToBeCopied) {
                $copy = $availabilityToBeCopied->replicate();
                $copy->from = Carbon::make($copy->from)->addWeeks($diffInWeeks + $i);
                $copy->to = Carbon::make($copy->to)->addWeeks($diffInWeeks + $i);
                $copy->save();
            }
        }
    }
}