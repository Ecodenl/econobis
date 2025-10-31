<?php

namespace App\Eco\User;

use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Cooperation\Cooperation;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Team\Team;
use App\Eco\Title\Title;
use App\Http\Traits\Encryptable;
use App\Notifications\MailResetPasswordToken;
use App\Notifications\MailResetPasswordTokenFirstTime;
use Carbon\Carbon;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laracasts\Presenter\PresentableTrait;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Venturecraft\Revisionable\RevisionableTrait;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, RevisionableTrait, HasRoles, PresentableTrait, CanResetPassword, Encryptable, HasFactory, TwoFactorAuthenticatable;
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
        'require_two_factor_authentication' => 'boolean',
        'show_two_factor_notification' => 'boolean',
        'last_visit' => 'datetime',
        'blocked_until' => 'datetime',
        'blocked_permanent' => 'bool',
        'failed_logins' => 'int',
    ];

    protected $encryptable = [
        'alfresco_password'
    ];

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

    public function twoFactorTokens()
    {
        return $this->hasMany(TwoFactorToken::class);
    }

    public function defaultMailbox()
    {
        return $this->belongsTo(Mailbox::class);
    }

    public function getFullNameFnfAttribute()
    {
        $firstName = $this->first_name ? $this->first_name . ' ' : "";
        $prefix = $this->last_name_prefix ? $this->last_name_prefix . ' ' : '';
        $fullNameFnf = ($firstName . $prefix . $this->last_name);
        return $fullNameFnf;
    }

    public function requiresTwoFactorAuthentication()
    {
        $cooperation = Cooperation::first();

        if($cooperation && $cooperation->require_two_factor_authentication){
            return true;
        }

        return $this->require_two_factor_authentication;
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

    public function hasValidTwoFactorToken($token)
    {
        return $this->twoFactorTokens()
            ->where('token', $token)
            ->where('created_at', '>', Carbon::now()->subMinutes(config('auth.two_factor_token_ttl')))
            ->exists();
    }

    public function hasTwoFactorActivated()
    {
        return !!$this->two_factor_confirmed_at;
    }

    public function twoFactorQrCodeUrl()
    {
        /**
         * Deze functie is overschreven zodat we naam 'Econobis <coop_naam>' als naam mee te kunnen geven voor de 2fa apps.
         * Zo kunnen de codes in de 2fa app worden onderscheiden voor gebruikers die én Econobis én het portal gebruiken.
         */
        return app(TwoFactorAuthenticationProvider::class)->qrCodeUrl(
            'Econobis ' . config('app.APP_COOP_NAME'),
            $this->{Fortify::username()},
            decrypt($this->two_factor_secret)
        );
    }

    public function getTeamContactIds()
    {
        if ($this->teamContactIds !== null) {
            return $this->teamContactIds;
        }

        // Geen teams? Volledige toegang.
        if (!$this->teams || $this->teams()->count() === 0) {
            return false;
        }

        // Teams zonder enige contactGroups? Ook volledige toegang.
        $hasAnyContactGroup = $this->teams()->whereHas('contactGroups')->exists();
        if (!$hasAnyContactGroup) {
            return false;
        }

        $teamContactIds = [];
        foreach ($this->teams as $team) {
            foreach ($team->contactGroups as $contactGroup) {
                $teamContactIds = array_merge($teamContactIds, $contactGroup->getAllContacts()->pluck('id')->toArray());
            }
        }

        // Voeg contacten toe die door deze gebruiker zijn aangemaakt
        $createdByIds = Contact::where('created_by_id', $this->id)->pluck('id')->toArray();

        // Combineer en maak uniek
        $combinedIds = array_unique(array_merge($teamContactIds, $createdByIds));

        // Als er contactgroepen waren maar er zijn geen contacten in, gebruik [-1] als fallback
        if (count($combinedIds) === 0) {
            $this->teamContactIds = [-1];
        } else {
            $this->teamContactIds = $combinedIds;
        }

        return $this->teamContactIds;
    }

    public function getDocumentCreatedFromIds(){
        if($this->teamDocumentCreatedFromIds !== null){
            return $this->teamDocumentCreatedFromIds;
        }
        // Geen teams? Volledige toegang.
        if (!$this->teams || $this->teams()->count() === 0) {
            return false;
        }

        // Teams zonder enige documentCreatedFroms? Ook volledige toegang.
        $hasAnyDocumentCreatedFroms = $this->teams()->whereHas('documentCreatedFroms')->exists();
        if (!$hasAnyDocumentCreatedFroms) {
            return false;
        }

        $teamDocumentCreatedFromIds = [];
        foreach ($this->teams as $team){
            $teamDocumentCreatedFromIds = array_merge($teamDocumentCreatedFromIds, $team->documentCreatedFroms->pluck('id')->toArray());
        }
        $teamDocumentCreatedFromIds = array_unique($teamDocumentCreatedFromIds);

        if(count($teamDocumentCreatedFromIds) === 0){
            $this->teamDocumentCreatedFromIds = [-1];
        } else {
            $this->teamDocumentCreatedFromIds = $teamDocumentCreatedFromIds;
        }

        return $this->teamDocumentCreatedFromIds;
    }

    public function getDefaultMailboxWithFallback()
    {
        if($this->defaultMailbox){
            return $this->defaultMailbox;
        }

        $cooperationDefaultMailbox = Mailbox::getDefault();
        $mailboxes = $this->mailboxes()->where('is_active', true)->get();

        if($cooperationDefaultMailbox && $mailboxes->contains($cooperationDefaultMailbox)){
            return $cooperationDefaultMailbox;
        }

        if($mailboxes->count() > 0){
            return $mailboxes->first();
        }

        return null;
    }
}
