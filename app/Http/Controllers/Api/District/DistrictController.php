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
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        return District::all()->map(function ($district) {
            return [
                'id' => $district->id,
                'name' => $district->name,
            ];
        });
    }

    public function show(District $district)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

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
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

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
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

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
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $request->validate([
            'name' => 'required',
        ]);

        $district->name = $request->name;
        $district->save();
    }

    public function delete(District $district)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $district->delete();
    }

    public function detachCoach(District $district, Contact $coach)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $district->coaches()->detach($coach->id);
    }

    public function attachCoach(District $district, Contact $coach)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $district->coaches()->attach($coach->id);
    }
}