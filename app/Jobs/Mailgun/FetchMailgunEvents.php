<?php

namespace App\Jobs\Mailgun;


use App\Eco\Mailbox\MailgunDomain;
use App\Eco\Mailbox\MailgunEvent;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Mailgun\Mailgun;
use Mailgun\Model\Event\Event;
use Mailgun\Model\Event\EventResponse;

class FetchMailgunEvents implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected MailgunDomain $mailgunDomain;

    protected int $minutes = 0;

    public function __construct(MailgunDomain $mailgunDomain, int $minutes)
    {
        $this->mailgunDomain = $mailgunDomain;
        $this->minutes = $minutes;
    }

    public function handle()
    {
        $mailgunClient = Mailgun::create($this->mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $events = $this->getPaginatedEvents($mailgunClient);

        foreach ($events as $event) {
            $this->processEvent($event);
        }
    }

    /**
     * De events worden door mailgun gepagineerd teruggegeven.
     *
     * Daarom deze recursieve functie om evt. via meerdere aanroepen alle events op te halen.
     *
     * @see: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
     */
    private function getPaginatedEvents(Mailgun $mailgunClient, EventResponse $previousEventResponse = null, $events = [])
    {
        /**
         * @var \Mailgun\Model\Event\EventResponse $eventResponse
         */
        if(!$previousEventResponse){
            /**
             * Geen $previousEventResponse; dit is de eerste aanroep.
             */
            $eventResponse = $mailgunClient->events()->get($this->mailgunDomain->domain, [
                'begin' => Carbon::now()->subMinutes($this->minutes)->timestamp,
                'ascending' => 'yes',
                'limit' => 300, // 300 is maximum
            ]);
        }else {
            /**
             * Wel een $previousEventResponse; dit is een recursieve aanroep voor een volgende pagina.
             */
            $eventResponse = $mailgunClient->events()->nextPage($previousEventResponse);
        }

        $newEvents = $eventResponse->getItems();

        if(!$newEvents){
            /**
             * Geen events meer gevonden in mailgun api call, dan was dit de laatste pagina
             * en kunnen we dus het resultaat teruggeven.
             */
            return $events;
        }

        /**
         * Er waren wel events gevonden; deze toevoegen aan het totaalresultaat en via recursieve aanroep de volgende pagina checken.
         */
        $events = array_merge($events, $eventResponse->getItems());

        return $this->getPaginatedEvents($mailgunClient, $eventResponse, $events);
    }

    private function processEvent(Event $event)
    {
        if(MailgunEvent::where('mailgun_id', $event->getId())->exists()){
            return;
        }

        $eventCode = $event->getEvent();

        if($eventCode === 'failed'){
            /**
             * Onderscheid maken tussen failed permanent en failed temporary.
             * Deze worden door mailgun beide als 'failed' teruggegeven.
             */
            $eventCode = 'failed_' . $event->getSeverity();
        }

        $mailgunEvent = new MailgunEvent([
            'mailgun_domain_id' => $this->mailgunDomain->id,
            'mailgun_id' => $event->getId(),
            'mailgun_message_id' => $event->getMessage()['headers']['message-id'] ?? '',
            'event' => $eventCode,
            'recipient' => $event->getRecipient(),
            'subject' => $event->getMessage()['headers']['subject'] ?? '',
            'event_date' => $event->getEventDate(),
            'delivery_status' => $event->getDeliveryStatus()['message'] ?? '',
        ]);
        $mailgunEvent->save();
    }
}