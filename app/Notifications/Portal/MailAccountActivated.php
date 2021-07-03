<?php

namespace App\Notifications\Portal;

use App\Helpers\Settings\PortalSettings;
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
        $name = explode(',', $this->name);

        return (new MailMessage)
            ->subject("Account geactiveerd")
            ->line($name[1] . " " . $name[0] . ", je account is succesvol geactiveerd.")
            ->action('Inloggen', 'https://' . PortalSettings::get("portalUrl") . '/#/login');
    }
}
