<?php

namespace App\Eco\User;

use App\Eco\Administration\Administration;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Team\Team;
use App\Eco\Title\Title;
use App\Http\Traits\Encryptable;
use App\Notifications\MailResetPasswordToken;
use App\Notifications\MailResetPasswordTokenFirstTime;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laracasts\Presenter\PresentableTrait;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;
use Venturecraft\Revisionable\RevisionableTrait;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, RevisionableTrait, HasRoles, PresentableTrait, CanResetPassword, Encryptable;
    protected $presenter = UserPresenter::class;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'remember_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'visit_count' => 'integer',
        'active' => 'boolean',
    ];

    protected $dates = [
        'last_visit',
    ];

    protected $encryptable = [
        'alfresco_password'
    ];

    protected $teamContactGroupids = null;
    protected $teamContactIds = null;
    protected $teamDocumentCreatedFromIds = null;

    public function lastNamePrefix()
    {
        return $this->belongsTo(LastNamePrefix::class);
    }

    public function title()
    {
        return $this->belongsTo(Title::class);
    }

    public function mailboxes()
    {
        return $this->belongsToMany(Mailbox::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class);
    }

    public function administrations()
    {
        return $this->belongsToMany(Administration::class);
    }

    /**
     * Laravel passport checkt op deze functie voor het valideren van logingegevens
     *
     * @param $password
     * @return bool
     */
    public function validateForPassportPasswordGrant($password)
    {
        if(!$this->active) return false;

        return Hash::check($password, $this->getAuthPassword());
    }

    /**
     * Send a password reset email to the user
     */
    public function sendPasswordResetNotification($token)
    {
        if($this->visit_count === 0) {
            $this->notify(new MailResetPasswordTokenFirstTime($token, $this->email));
        }
        else{
            $this->notify(new MailResetPasswordToken($token, $this->email));
        }
    }

    public function getTeamContactGroupIds(){
        if(!$this->teamContactGroupids === null){
            return $this->teamContactGroupids;
        } else {
            if (!$this->teams){
                $this->teamContactGroupids =  false;
            }

            $teamContactGroupIds = [];
            $hasContactGroup = false;
            foreach ($this->teams as $team){
                $teamContactGroupIds = $team->contactGroups->pluck('id')->toArray();
                if(count($teamContactGroupIds) > 0) {
                    $hasContactGroup = true;
                }
                $teamContactGroupIds = array_unique(array_merge($teamContactGroupIds, $team->contactGroups->pluck('id')->toArray()));
            }
            if($hasContactGroup && count($teamContactGroupIds) == 0){
                $this->teamContactGroupids = [-1];
            } else {
                $this->teamContactGroupids = $teamContactGroupIds;
            }

            return $this->teamContactGroupids;
        }
    }
    public function getTeamContactIds(){
        if(!$this->teamContactids === null){
            return $this->teamContactids;
        } else {
            if (!$this->teams){
                $this->teamContactids =  false;
            }

            $teamContactIds = [];
            $hasContactGroup = false;
            foreach ($this->teams as $team){
                foreach($team->contactGroups as $contactGroup){
                    $hasContactGroup = true;
                    $teamContactIds = array_unique(array_merge($teamContactIds, $contactGroup->getAllContacts()->pluck('id')->toArray()));
                }
            }
            if($hasContactGroup && count($teamContactIds) == 0){
                $this->teamContactids = [-1];
            } else {
                $this->teamContactids = $teamContactIds;
            }

            return $this->teamContactids;
        }
    }
    public function getDocumentCreatedFromIds(){
        if(!$this->teamDocumentCreatedFromIds === null){
            return $this->teamDocumentCreatedFromIds;
        } else {
            if (!$this->teams){
                $this->teamDocumentCreatedFromIds =  false;
            }

            $teamDocumentCreatedFromIds = [];
            $hasDocumentCreatedFrom = false;
            foreach ($this->teams as $team){
                foreach($team->documentCreatedFroms as $documentCreatedFrom){
                    $hasDocumentCreatedFrom = true;
                    array_push($teamDocumentCreatedFromIds,$documentCreatedFrom->id);
                }
            }
            if($hasDocumentCreatedFrom && count($teamDocumentCreatedFromIds) == 0){
                $this->teamDocumentCreatedFromIds = [-1];
            } else {
                $this->teamDocumentCreatedFromIds = array_unique($teamDocumentCreatedFromIds);
            }

            return $this->teamDocumentCreatedFromIds;
        }
    }
}
