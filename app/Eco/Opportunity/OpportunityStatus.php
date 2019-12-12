<?php

namespace App\Eco\Opportunity;

use App\Eco\EmailTemplate\EmailTemplate;
use Illuminate\Database\Eloquent\Model;

class OpportunityStatus extends Model
{

    protected $table = 'opportunity_status';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function emailTemplateWorkflow()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_wf');
    }

}
