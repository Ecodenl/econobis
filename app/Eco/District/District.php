<?php

namespace App\Eco\District;

use App\Eco\Contact\Contact;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Team\Team;
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
        'closed' => 'boolean',
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

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_district');
    }

}
