<?php

namespace App\Http\Controllers\Api\District;

use App\Eco\Contact\Contact;
use App\Eco\District\District;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DistrictController
{
    public function index()
    {
        return District::all()->map(function ($district) {
            return [
                'id' => $district->id,
                'name' => $district->name,
            ];
        });
    }

    public function show(District $district)
    {
        return [
            'id' => $district->id,
            'name' => $district->name,
            'coaches' => $district->coaches->map(function ($coach) {
                return [
                    'id' => $coach->id,
                    'fullName' => $coach->full_name,
                ];
            }),
        ];
    }

    public function getCalendarItems(District $district, Request $request)
    {
        $startDate = $request->get('startDate');
        $endDate = $request->get('endDate');

        $quotationRequests = $district->quotationRequests()
            ->where('date_planned', '>=', $startDate)
            ->where('date_planned', '<=', Carbon::make($endDate)->endOfDay())
            ->get();

        return [
            'quotationRequests' => $quotationRequests->map(function ($quotationRequest) {
                return [
                    'id' => $quotationRequest->id,
                    'coach' => [
                        'id' => $quotationRequest->organisationOrCoach->id,
                        'fullName' => $quotationRequest->organisationOrCoach->full_name,
                    ],
                    'datePlanned' => $quotationRequest->date_planned,
                    'durationMinutes' => $quotationRequest->duration_minutes,
                ];
            }),
            'availabilities' => $district->coaches->reduce(function ($carry, $coach) use ($startDate, $endDate) {
                $availabilities = $coach->availabilities
                    ->where('from', '>=', $startDate)
                    ->where('from', '<=', Carbon::make($endDate)->endOfDay());

                $availabilities->each(function ($availability) use (&$carry, $coach) {
                    $carry[] = [
                        'id' => $availability->id,
                        'coach' => [
                            'id' => $coach->id,
                            'fullName' => $coach->full_name,
                        ],
                        'from' => $availability->from->format('Y-m-d H:i:s'),
                        'to' => $availability->to->format('Y-m-d H:i:s'),
                    ];
                });

                return $carry;
            }, []),
        ];
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $district = new District();
        $district->name = $request->name;
        $district->save();

        return [
            'id' => $district->id,
        ];
    }

    public function update(Request $request, District $district)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $district->name = $request->name;
        $district->save();
    }

    public function delete(District $district)
    {
        $district->delete();
    }

    public function detachCoach(District $district, Contact $coach)
    {
        $district->coaches()->detach($coach->id);
    }

    public function attachCoach(District $district, Contact $coach)
    {
        $district->coaches()->attach($coach->id);
    }
}