<?php

namespace App\Eco\QuotationRequest;

use App\Eco\Contact\Contact;
use App\Eco\District\District;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\User\User;
use App\Jobs\Email\SendEmailsWithVariablesDeprecated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Venturecraft\Revisionable\RevisionableTrait;

class QuotationRequest extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $table = 'quotation_requests';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $casts = [
        'duration_minutes' => 'integer',
        'uses_planning' => 'boolean',
    ];

   public function organisationOrCoach()
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

   public function projectManager()
    {
        return $this->belongsTo(Contact::class, 'project_manager_id');
    }

   public function externalParty()
    {
        return $this->belongsTo(Contact::class, 'external_party_id');
    }

    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }

    public function status()
    {
        return $this->belongsTo(QuotationRequestStatus::class);
    }

    public function opportunityAction()
    {
        return $this->belongsTo(OpportunityAction::class);
    }

    public function documents(){
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function emails(){
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function actionsLog(){
        return $this->hasMany(QuotationRequestActionsLog::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function getOrganisastionsOrCoachsToSelect()
    {
        return Contact::whereIn('id', $this->opportunity->intake->campaign->organisationsOrCoachesIds())
            ->orWhere('id', $this->contact_id)->orderBy('full_name')->get();
    }
    public function getProjectManagersToSelect()
    {
        return Contact::whereIn('id', $this->opportunity->intake->campaign->projectManagersIds())
            ->orWhere('id', $this->project_manager_id)->orderBy('full_name')->get();
    }
    public function getExternalPartiesToSelect()
    {
        return Contact::whereIn('id', $this->opportunity->intake->campaign->externalPartiesIds())
            ->orWhere('id', $this->external_party_id)->orderBy('full_name')->get();
    }

    public function newEloquentBuilder($query)
    {
        return new QuotationRequestBuilder($query);
    }

    public function sendPlannedInDistrictMails()
    {
        if(!$this->district){
            return;
        }

        $district = $this->district;

        $mails = [];
        if($district->send_email_to_contact_when_planned && $district->emailToContactTemplate){
            $mails[] = [
                'contact' => $this->opportunity->intake->contact,
                'template' => $district->emailToContactTemplate,
            ];
        }
        if($district->send_email_to_coach_when_planned && $district->emailToCoachTemplate){
            $mails[] = [
                'contact' => $this->organisationOrCoach,
                'template' => $district->emailToCoachTemplate,
            ];
        }

        $mailbox = Mailbox::getDefault();
        foreach($mails as $mail){
            if($mail['contact']->primaryEmailAddress){
                $email = new Email();
                $email->mailbox_id = $mailbox->id;
                $email->from = $mailbox->email;
                $email->to = [$mail['contact']->primaryEmailAddress->email];
                $email->cc = [];
                $email->bcc = [];
                $email->subject = $mail['template']->subject;
                $email->folder = 'concept';
                $email->quotation_request_id = $this->id;
                $email->html_body
                    = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                    . $mail['template']->subject . '</title></head><body>'
                    . $mail['template']->html_body . '</body></html>';
                $email->sent_by_user_id = Auth::id();
                $email->save();

                $email->contacts()->attach([$mail['contact']->id]);

                SendEmailsWithVariablesDeprecated::dispatch($email, [$mail['contact']->primaryEmailAddress->id], Auth::id());
            }
        }
    }
}
