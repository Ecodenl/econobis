<?php

namespace App\Http\Controllers\Api\Contact;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactAvailability;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ContactAvailabilityController
{
    public function getByWeek(Contact $contact, Request $request)
    {
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
                   'from' => $availability->from,
                   'to' => $availability->to,
               ];
            });
    }
    public function update(Contact $contact, Request $request)
    {
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
                'from' => $startOfWeek->copy()->addDays($availability['day'])->format('Y-m-d') . ' ' . $availability['from'] . ':00',
                'to' => $startOfWeek->copy()->addDays($availability['day'])->format('Y-m-d') . ' ' . $availability['to'] . ':00',
            ]);
        }
    }
}