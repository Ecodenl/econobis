<?php

namespace App\Eco\Portal;

use App\Eco;
use App\Helpers\Email\EmailHelper;
use App\Notifications\Portal\MailAccountActivated;
use App\Notifications\Portal\MailResetPasswordToken;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laracasts\Presenter\PresentableTrait;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Venturecraft\Revisionable\RevisionableTrait;

class PortalUser extends Authenticatable
{
    use Notifiable, HasApiTokens, RevisionableTrait, HasRoles, PresentableTrait, CanResetPassword;

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
        // Emails moeten vanuit de default mailbox worden verstuurd ipv de mail instellingen in .env
        // Daarom hier eerst de emailconfiguratie overschrijven voordat we gaan verzenden.
        (new EmailHelper())->setConfigToDefaultMailbox();
        $this->notify(new MailAccountActivated($this->contact->full_name));
    }
}
