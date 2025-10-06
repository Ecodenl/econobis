<?php

namespace App\Notifications\Portal;

use App\Helpers\Settings\PortalSettings;
use Config;
//use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PortalUserPermanentlyBlocked extends Notification
{
//    use Queueable;

//    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token, $email)
    {
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
            ->subject('Jouw account is geblokkeerd')
            ->greeting('Beste '.$notifiable->fullNameFnF.',')
//            ->line('<p style="text-align:center">
//            <a href="' . PortalSettings::get("portalUrl") . '" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; position: relative; color: #3d4852; font-size: 19px; font-weight: bold; text-decoration: none; display: inline-block;" target="_blank">
//' . PortalSettings::get("portalName")  . '</a></p>')
            ->line('Jouw account is permanent geblokkeerd voor <a href="' . PortalSettings::get("portalUrl") . '" style="text-decoration: none;" target="_blank">**' . PortalSettings::get("portalName")  . '**</a> wegens herhaaldelijk mislukte inlogpogingen.')
            ->line('Vraag je beheerder om jouw account te herstellen.')
            ->salutation(" ");
    }
}
