<?php

namespace App\Mail;

use App\Eco\Mailbox\Mailbox;
use Illuminate\Mail\Mailer;

class MailManager extends \Illuminate\Mail\MailManager
{
    public function mailer($name = null)
    {
        if (config('mail.ignore_custom_mailboxes')) {
            /**
             * Als deze op true staat negeren we de mailboxes in de databases en gebruiken we altijd de standaard mailer o.b.v. .env.
             */
            return parent::mailer($name);
        }

        /**
         * We mailen standaard altijd vanuit de default mailbox.
         * Mailen o.b.v. .env kan in productie helemaal niet, dus er moet altijd een mailbox zijn.
         *
         * Deze aanpassing zorgt ervoor dat de Mail facade standaard de default mailbox gebruikt ipv .env.
         * Bijv Mail::to('piet@puk.nl')->send(new TestMail()); verzendt vanuit de default mailbox in de database.
         */
        return $this->fromDefaultMailbox();
    }

    public function fromDefaultMailbox()
    {
        $mailbox = Mailbox::getDefault();

        if(!$mailbox){
            throw new \Exception('No default mailbox has been set.');
        }

        return $this->fromMailbox($mailbox);
    }

    /**
     * Eigenlijk een kopie van de resolve() functie maar dan obv custom config uit de database.
     *
     * LET OP: Dit werkt niet i.c.m. queued emails.
     * Om een mail te queue-en moet deze via een job lopen waarin ook de mailbox wordt meegegeven en moet de fromMailbox() binnen de queued job worden aangroepen.
     */
    public function fromMailbox(Mailbox $mailbox)
    {
        if (config('mail.ignore_custom_mailboxes')) {
            /**
             * Als deze op true staat negeren we de mailboxes in de databases en gebruiken we altijd de standaard mailer o.b.v. .env.
             */
            return $this->mailer();
        }

        $config = $mailbox->getConfig();

        // Once we have created the mailer instance we will set a container instance
        // on the mailer. This allows us to resolve mailer classes via containers
        // for maximum testability on said classes instead of passing Closures.
        $mailer = new Mailer('custom_' . $mailbox->id, $this->app['view'], $this->createSymfonyTransport($config), $this->app['events']);

        if ($this->app->bound('queue')) {
            $mailer->setQueue($this->app['queue']);
        }

        // Next we will set all of the global addresses on this mailer, which allows
        // for easy unification of all "from" addresses as well as easy debugging
        // of sent messages since these will be sent to a single email address.
        foreach (['from', 'reply_to', 'to', 'return_path'] as $type) {
            $this->setGlobalAddress($mailer, $config, $type);
        }

        return $mailer;
    }
}
