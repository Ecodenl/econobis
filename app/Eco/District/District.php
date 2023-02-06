<?php

namespace App\Eco\District;

use App\Eco\Contact\Contact;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'default_duration_minutes' => 'integer',
        'send_email_to_contact_when_planned' => 'boolean',
        'email_to_contact_template_id' => 'integer',
        'send_email_to_coach_when_planned' => 'boolean',
        'email_to_coach_template_id' => 'integer',
    ];

    public function coaches()
    {
        return $this->belongsToMany(Contact::class, 'district_has_coaches', 'district_id', 'contact_id');
    }

    public function quotationRequests()
    {
        return $this->hasMany(QuotationRequest::class);
    }

    public function emailToContactTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_to_contact_template_id');
    }

    public function emailToCoachTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_to_coach_template_id');
    }

    public function getAvailableCoachesInWeek(Carbon $startDate)
    {
        $endDate = $startDate->copy()->addWeek();

        $coaches = $this->coaches()->whereHas('availabilities', function($query) use ($startDate, $endDate){
            $query->whereBetween('from', [$startDate, $endDate]);
        })->get();

        $coaches->loadCount(['quotationRequests' => function($query) use ($endDate, $startDate) {
            $query->whereBetween('date_planned', [$startDate, $endDate])
                ->where('status_id', '!=', QuotationRequestStatus::STATUS_VISIT_CANCELLED_ID);
        }]);

        return $coaches->filter(function(Contact $contact){
            return $contact->quotation_requests_count < $contact->coach_max_appointments_per_week;
        })->values();
    }
}
