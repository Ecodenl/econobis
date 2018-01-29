<?php

namespace App\Eco\User;

use App\Cooperation;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Title\Title;
use App\Http\Traits\Encryptable;
use App\Notifications\MailResetPasswordToken;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laracasts\Presenter\PresentableTrait;
use Laravel\Passport\HasApiTokens;
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
        $this->notify(new MailResetPasswordToken($token));
    }

}
