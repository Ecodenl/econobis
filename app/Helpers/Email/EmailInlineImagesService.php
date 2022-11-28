<?php

namespace App\Helpers\Email;

use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Helper class om met inline afbeeldingen in html om te gaan.
 *
 * Econobis ondersteunt zelf niet het invoegen van inline afbeeldingen (alleen het linken naar afbeeldingen op het web) maar bij het binnenhalen van mail kunnen wel inline afbeeldingen aanwezig zijn.
 * 20221128; Op dit moment werkt het inladen van inline afbeeldingen alleen bij de mails die binnen komen via Mailgun forward.
 *
 * Basisopzet;
 * - De html van de email slaan we altijd op met de cid verwijzingen en bij het weergeven versturen hiervan converteren we de cid's naar het format dat op dat moment nodig is.
 * - Bij importeren van een mail kan de html "as is" worden opgeslagen, bij de bijlages wordt de cid opgeslagen als er in de html een verwijzing naar deze inline bijlage staat. (in email_attachments.cid)
 * - Bij het weergeven van de mail aan de voorkant converteren we de cid's naar inline base64 encoded images.
 * - Bij opslaan van mails naar database onverteren we altijd weer terug naar cid.
 * - Bij verzenden van mail met inline bijlages maken we gebruik van Laravel's embed functie. (https://laravel.com/docs/9.x/mail#inline-attachments)
 * - Aan de voorkant verbergen we inline bijlages als normale bijlage door alleen bijlages met lege "cid" te tonen.
 */
class EmailInlineImagesService
{
    protected Email $email;

    public function __construct(Email $email)
    {
        $this->email = $email;
    }

    public function getHtmlBodyWithCidsConvertedToEmbeddedImages()
    {
        $html = $this->email->html_body;

        foreach($this->email->attachments()->whereNotNull('cid')->get() as $attachment){
            $html = str_replace('src="cid:' . $attachment->cid . '"', 'data-cid="' . $attachment->cid . '" src="' . $this->getBase64ImageForAttachment($attachment) . '"', $html);
        }

        return $html;
    }

    /**
     * Als een mail is gebaseerd op een andere mail (reply of forward) dan kunnen er inline images aanwezig zijn.
     * Aan de voorkant tonen we deze dmv base64 inline images, maar bij opslaan moet dit een bijlage zijn waarbij er een verwijzing dmv cid in de html staat.
     *
     * Als dit de eerste keer is dat de mail wordt opgeslagen moeten de afbeeldingen ook worden gekopieerd van de mail waar deze op is gebaseeerd.
     */
    public function convertInlineImagesToCid()
    {
        $html = $this->email->html_body;

        /**
         * Haal een array met alle img tags met "data-cid" uit de html.
         * "data-cid" is een attribuut dat we zelf hebben toegevoegd in getHtmlBodyWithCidsConvertedToEmbeddedImages(), overige afbeeldoingen zijn links naar internet afbeeldingen en hoeven we dus niets mee te doen.
         *
         * $imageTags = [
         *     0 => '<img data-cid="cid:1234567890" src="..." />',
         *     1 => '<img data-cid="cid:0987654321" src="..." />',
         *     ...
         * ]
         */
        preg_match_all('/<img[^>]+data-cid=[^>]*>/i', $html, $result);
        $imageTags = $result[0];

        /**
         * Vervang elke img tag met een cid link door een img tag met een bijlage link.
         */
        foreach($imageTags as $imageTag){
            /**
             * Haal de cid code uit de img tag.
             */
            preg_match('/data-cid="([^"]*)"/i', $imageTag, $result);
            $cid = $result[1];

            $attachment = $this->email->attachments()->where('cid', $cid)->first();

            if(!$attachment){
                /**
                 * Als er geen bijlage is met deze cid code, dan is deze afbeelding afkomstig van de mail waar deze op is gebaseerd.
                 * Deze afbeelding moet dus worden gekopieerd naar de nieuwe mail.
                 */
                $this->copyAttachmentFromOldEmail($cid);
            }

            /**
             * Verwijderen het originele src attribuut.
             */
            $newImageTag = preg_replace('/src="[^"]*"/i', '', $imageTag);

            /**
             * data-cid hebben we niet meer nodig, dus die kunnen we nu omzetten naar nieuwe src attribuut.
             */
            $newImageTag = str_replace('data-cid="', 'src="cid:', $newImageTag);

            /**
             * Update de html met de nieuwe img tag.
             */
            $html = str_replace($imageTag, $newImageTag, $html);
        }

        $this->email->html_body = $html;
    }

    /**
     * Maak gebruik van Laravel's embed() functie om inline afbeeldingen te mailen.
     */
    public function embedCidImagesForSending(string $html, Message $message)
    {
        \Log::info('service: ' . $html);
        foreach($this->email->attachments()->whereNotNull('cid')->get() as $attachment){
            $search = 'src="cid:' . $attachment->cid . '"';

            if(strpos($html, $search) === false){
                continue;
            }

            $html = str_replace($search, 'src="' . $message->embed(Storage::disk('mail_attachments')->path($attachment->filename)) . '"', $html);
        }

        return $html;
    }

    protected function getBase64ImageForAttachment(EmailAttachment $emailAttachment)
    {
        return 'data:image/jpeg;base64,' . base64_encode(Storage::disk('mail_attachments')->get($emailAttachment->filename));
    }

    protected function copyAttachmentFromOldEmail($cid)
    {
        if(!$this->email->oldEmail){
            return;
        }

        $attachmentFromOldEmail = $this->email->oldEmail->attachments()->where('cid', $cid)->first();

        if(!$attachmentFromOldEmail){
            return;
        }

        $newFilename = 'mailbox_' . $this->email->mailbox_id . '/outbox' . '/' . Str::random(40) . '.' . pathinfo($attachmentFromOldEmail->filename, PATHINFO_EXTENSION);
        Storage::disk('mail_attachments')->copy($attachmentFromOldEmail->filename, $newFilename);

        $attachment = $attachmentFromOldEmail->replicate();
        $attachment->email_id = $this->email->id;
        $attachment->filename = $newFilename;
        $attachment->save();
    }
}