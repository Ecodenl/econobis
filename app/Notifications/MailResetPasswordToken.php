<?php

namespace App\Notifications;

use Config;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

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
            ->action('Wijzig wachtwoord', url('/#/wachtwoord-wijzig', [$this->token, $this->email]))
            ->line('Als je je wachtwoord niet wilt wijzigen, dan hoef je geen actie te ondernemen.')
            ->line('De link om je wachtwoord opnieuw in te stellen is <strong>' . Config::get('auth.passwords.users.expire'). ' minuten geldig</strong> en kan maar één keer worden gebruikt. Als je link verlopen is, vraag dan een nieuwe aan. Als je meerdere keren een link hebt aangevraagd, gebruik dan de link in de meest recente e-mail.');

    }

}