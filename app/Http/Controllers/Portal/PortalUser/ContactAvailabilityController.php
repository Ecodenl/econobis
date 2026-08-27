<?php

namespace App\Http\Controllers\Portal\PortalUser;

use App\Eco\Contact\ContactAvailability;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactAvailabilityController
{
    public function getByWeek(Request $request)
    {
        $contact = Auth::user()->contact;

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

    public function update(Request $request)
    {
        $contact = Auth::user()->contact;

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

    public function copyWeeks(Request $request)
    {
        $contact = Auth::user()->contact;

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