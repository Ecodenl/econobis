<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class MailPasswordReset extends Notification
{

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
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
            ->subject("Econobis wachtwoord gewijzigd")
            ->greeting("Hallo! Je Econobis wachtwoord is gewijzigd.")
            ->line("Je Econobis-wachtwoord voor de Econobis-omgeving van " . \Config::get('app.name') . " is gewijzigd.")
            ->line("Ben jij niet degene die dit gedaan heeft? Neem dan z.s.m. contact op met de key user van " . \Config::get('app.name') . ". Als deze niet bereikbaar is stuur een mail naar support@econobis.nl");
    }

}