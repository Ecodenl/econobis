<?php

namespace App\Notifications\Portal;

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
        return (new MailMessage)
            ->subject("Wijzig je wachtwoord")
            ->line("Wil je je wachtwoord wijzigen? Klik dan op de knop Wijzig wachtwoord.")
            ->action('Wijzig wachtwoord', url('/#/portal/wachtwoord-wijzigen', [$this->token, $this->email]))
            ->line('Als je je wachtwoord niet wilt wijzigen, dan hoef je geen actie te ondernemen.');
    }

}