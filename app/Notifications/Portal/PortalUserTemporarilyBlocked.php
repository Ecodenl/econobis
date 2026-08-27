<?php

namespace App\Notifications\Portal;

use App\Eco\PortalSettings\PortalSettings;
use Config;
//use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;

class PortalUserTemporarilyBlocked extends Notification
{
//    use Queueable;

    protected Carbon $blockedUntil;

//    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
//    public function __construct($token, $email)
    public function __construct($blockedUntil)
    {
        $this->blockedUntil = $blockedUntil;
//        $this->token = $token;
//        $this->email = $email;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Tijdelijke blokkade van jouw account')
            ->greeting('Beste '.$notifiable->fullNameFnF.',')
//            ->line('<p style="text-align:center">
//            <a href="' . PortalSettings::get("portalUrl") . '" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; position: relative; color: #3d4852; font-size: 19px; font-weight: bold; text-decoration: none; display: inline-block;" target="_blank">
//' . PortalSettings::get("portalName")  . '</a></p>')
            ->line('Jouw account is tijdelijk geblokkeerd voor <a href="' . (PortalSettings::first()?->portal_url) . '" style="text-decoration: none;" target="_blank">**' . (PortalSettings::first()?->portal_name) . '**</a> wegens meerdere mislukte inlogpogingen.')
            ->line('Je kunt opnieuw proberen in te loggen vanaf: **'.$this->blockedUntil->locale('nl_NL')->isoFormat('dddd D MMMM YYYY HH:mm').'**.')
            ->line('Als je deze pogingen niet zelf hebt gedaan, raden wij je aan om na afloop direct je wachtwoord te wijzigen.')
            ->salutation(" ");
    }
}
