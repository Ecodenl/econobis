<?php

namespace App\Eco\Portal;

use App\Eco;
use App\Notifications\Portal\MailAccountActivated;
use App\Notifications\Portal\MailResetPasswordToken;
use Carbon\Carbon;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laracasts\Presenter\PresentableTrait;
use Laravel\Fortify\Contracts\TwoFactorAuthenticationProvider;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Venturecraft\Revisionable\RevisionableTrait;

class PortalUser extends Authenticatable
{
    use Notifiable, HasApiTokens, RevisionableTrait, HasRoles, PresentableTrait, CanResetPassword, TwoFactorAuthenticatable;

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

    public function contact()
    {
        return $this->belongsTo(Eco\Contact\Contact::class);
    }

    public function twoFactorTokens()
    {
        return $this->hasMany(PortalTwoFactorToken::class);
    }

    /**
     * Send a password reset email to the user
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MailResetPasswordToken($token, $this->email));
    }

    /**
     * Send a confirmation email to the user about the activated account.
     */
    public function sendAccountActivatedNotification() {
        $this->notify(new MailAccountActivated($this->contact->full_name_fnf));
    }

    public function hasValidTwoFactorToken($token)
    {
        return $this->twoFactorTokens()
            ->where('token', $token)
            ->where('created_at', '>', Carbon::now()->subMinutes(config('auth.two_factor_token_ttl')))
            ->exists();
    }

    public function hasEnabledTwoFactorAuthentication()
    {
        return !!$this->two_factor_confirmed_at;
    }

    public function twoFactorQrCodeUrl()
    {
        /**
         * Deze functie is overschreven zodat we naam 'Login <coop_naam>' als naam mee te kunnen geven voor de 2fa apps.
         * Zo kunnen de codes in de 2fa app worden onderscheiden voor gebruikers die én Econobis én het portal gebruiken.
         */
        return app(TwoFactorAuthenticationProvider::class)->qrCodeUrl(
            'Login ' . config('app.APP_COOP_NAME'),
            $this->{Fortify::username()},
            decrypt($this->two_factor_secret)
        );
    }

    public function getTeamContactIds(){
        return false;
    }

    public function getDocumentCreatedFromIds(){
        return false;
    }

}
