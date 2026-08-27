<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class MailNewAccount extends Notification
{
    public $emailAddress;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($emailAddress)
    {
        $this->emailAddress = $emailAddress;
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
        return (new MailMessage)
            ->subject("Bevestiging gebruik Econobis")
            ->greeting(" ")
            ->line('<p style="text-align:center">
            <a href="' . config('app.url') . '" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; position: relative; color: #3d4852; font-size: 19px; font-weight: bold; text-decoration: none; display: inline-block;" target="_blank">
' . config('app.name')  . '</a></p>')
            ->line("<h1>Hallo! Je bent nu gebruiker van Econobis</h1>")
            ->line("Je bent nu gebruiker van de Econobis van " . \Config::get('app.name') . ". Met jouw account bestaande uit je gebruikersnaam " . $this->emailAddress . " en je aangemaakte wachtwoord, kun je inloggen op de Econobis-omgeving van je organisatie:")
            ->line(\Config::get('app.url'))
            ->line('<b>Econobis Wiki</b>')
            ->line('Voor handleidingen en hulp hebben wij een wiki omgeving: <a href="https://wiki.econobis.nl/">https://wiki.econobis.nl/</a>.')
            ->line('Dit is een informatiesite voor gebruikers van Econobis.')
            ->line("NB. De wikipagina’s van Econobis zijn ‘work in progress’. We doen onze uiterste best om deze pagina’s volledig en up to date te houden, maar het kan voorkomen dat informatie (nog) niet compleet of verouderd is. Heb je informatie of werkwijzen die interessant zijn voor deze wiki, geef dit dan door aan de beheerder van je organisatie.")
            ->line("<b>Econobis beheerder</b>")
            ->line("Heb je vragen over het gebruik van Econobis? Raadpleeg dan eerst de Econobis beheerder van je organisatie. Hij of zij kan indien nodig contact opnemen met Econobis.");
    }

}