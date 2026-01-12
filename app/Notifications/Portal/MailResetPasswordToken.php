<?php

namespace App\Notifications\Portal;

use App\Eco\PortalSettings\PortalSettings;
use Config;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MailResetPasswordToken extends Notification
{
    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = 'https://' . PortalSettings::first()?->portal_url . '/#/wachtwoord-vergeten';
        return (new MailMessage)
            ->subject("Wijzig je wachtwoord")
            ->greeting(" ")
            ->line('<p style="text-align:center">
            <a href="' . PortalSettings::first()?->portal_url . '" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; position: relative; color: #3d4852; font-size: 19px; font-weight: bold; text-decoration: none; display: inline-block;" target="_blank">
' . PortalSettings::first()?->portal_name . '</a></p>')
            ->line("Wil je je wachtwoord wijzigen? Klik dan op de knop Wijzig wachtwoord.")
            ->action('Wijzig wachtwoord', 'https://' . PortalSettings::first()?->portal_url . '/#/wachtwoord-wijzigen/' . $this->token . '/' . $this->email)
            ->line('Als je je wachtwoord niet wilt wijzigen, dan hoef je geen actie te ondernemen.')
            ->line('De link om je wachtwoord opnieuw in te stellen is <strong>' . Config::get('auth.passwords.portal.expire'). ' minuten geldig</strong> en kan maar één keer worden gebruikt. Als je link verlopen is, ga dan naar <a href="' . $url . '">' . $url . '</a> vul daar je e-mail adres in en er wordt een nieuwe activatie link via mail toegestuurd. Als je meerdere keren een link hebt aangevraagd, gebruik dan de link in de meest recente e-mail.')
            ->salutation(" ");

    }

}