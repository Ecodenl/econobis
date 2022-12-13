<?php

namespace App\Http\Controllers\Api\District;

use App\Eco\Contact\Contact;
use App\Eco\District\District;
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
}