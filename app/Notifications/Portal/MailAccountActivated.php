<?php

namespace App\Notifications\Portal;

use App\Eco\PortalSettings\PortalSettings;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MailAccountActivated extends Notification
{
    use Queueable;

    private string $name;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(string $name)
    {
        $this->name = $name;
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
            ->subject("Account geactiveerd")
            ->greeting(" ")
            ->line('<p style="text-align:center">
            <a href="' . PortalSettings::first()?->portal_url . '" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; position: relative; color: #3d4852; font-size: 19px; font-weight: bold; text-decoration: none; display: inline-block;" target="_blank">
' . PortalSettings::first()?->portal_name . '</a></p>')
            ->line("<h1>Beste " . $this->name . ",</h1>")
            ->line("Je account is succesvol geactiveerd.")
            ->action('Inloggen', 'https://' . PortalSettings::first()?->portal_url . '/#/login')
            ->salutation(' ');
    }
}
