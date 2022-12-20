<?php

namespace App\Eco\District;

use App\Eco\Contact\Contact;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    public function coaches()
    {
        return $this->belongsToMany(Contact::class, 'district_has_coaches', 'district_id', 'contact_id');
    }

    public function getAvailableCoachesInWeek(Carbon $startDate)
    {
        $endDate = $startDate->copy()->addWeek();

        $coaches = $this->coaches()->whereHas('availabilities', function($query) use ($startDate, $endDate){
            $query->whereBetween('from', [$startDate, $endDate]);
        })->get();

        $coaches->loadCount(['quotationRequests' => function($query) use ($endDate, $startDate) {
            $query->whereBetween('date_planned', [$startDate, $endDate]);
        }]);

        return $coaches->filter(function(Contact $contact){
            return $contact->quotation_requests_count < $contact->coach_max_appointments_per_week;
        });
    }
}
