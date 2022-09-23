<?php

namespace App\Eco\User;

use App\Eco\Administration\Administration;
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
    ];

    protected $dates = [
        'last_visit',
    ];

    protected $encryptable = [
        'alfresco_password'
    ];

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
}
