<?php

namespace App\Notifications;

use Config;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class MailResetPasswordTokenFirstTime extends Notification
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
        $url = url('/#/wachtwoord-vergeten');
        return (new MailMessage)
            ->subject("Welkom bij Econobis")
            ->greeting(" ")
            ->line('<p style="text-align:center">
            <a href="' . config('app.url') . '" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; position: relative; color: #3d4852; font-size: 19px; font-weight: bold; text-decoration: none; display: inline-block;" target="_blank">
' . config('app.name')  . '</a></p>')
            ->line("<h1>Hallo! Welkom bij Econobis</h1>")
            ->line("Er is een account voor je aangemaakt op de Econobis-omgeving van jouw organisatie. Dit account bestaat uit:")
            ->line("<ul>")
            ->line("<li><p>Gebruikersnaam: je e-mailadres</p></li>")
            ->line("<li><p>Wachtwoord: nog in te stellen</p></li>")
            ->line("</ul>")
            ->line("Je gebruikersnaam is het e-mailadres waarop je dit bericht hebt ontvangen. Dit kan je niet aanpassen.")
            ->line("Voordat je met Econobis kunt gaan werken, moet je een wachtwoord aanmaken.")
            ->line("Klik op de knop om je wachtwoord in te stellen.")
            ->action('Stel wachtwoord in', url('/#/wachtwoord-wijzig', [$this->token, $this->email]))
            ->line('Nadat je succesvol je wachtwoord hebt ingesteld, ontvang je van ons een e-mail ter bevestiging.')
            ->line('De link om je wachtwoord opnieuw in te stellen is <strong>' . Config::get('auth.passwords.users.expire'). ' minuten geldig</strong> en kan maar één keer worden gebruikt. Als je link verlopen is, ga dan naar <a href="' . $url . '">' . $url . '</a> vul daar je e-mail adres in en er wordt een nieuwe activatie link via mail toegestuurd. Als je meerdere keren een link hebt aangevraagd, gebruik dan de link in de meest recente e-mail.');
    }

}