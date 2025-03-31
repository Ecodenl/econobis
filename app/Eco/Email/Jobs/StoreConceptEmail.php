<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 15:29
 */

namespace App\Eco\Email\Jobs;


use App\Eco\Email\Email;
use App\Eco\Mailbox\Mailbox;
use App\Helpers\Settings\PortalSettings;

class StoreConceptEmail
{
    /**
     * @var Mailbox
     */
    private $mailbox;
    private $data;

    public function __construct(Mailbox $mailbox, $data)
    {
        $this->mailbox = $mailbox;
        $this->data = $data;
    }

    public function handle()
    {
        $email = new Email($this->data);

        $portalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $subject = $email->subject;
        if(!empty($subject)){
            $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
            $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);
        }
        $email->subject = !empty($subject) ? $subject : 'Econobis';
        $email->subject_for_filter = trim(mb_substr($email->subject ?? '', 0, 150));

        $email->mailbox_id = $this->mailbox->id;
        $email->from = $this->mailbox->email;
        $email->folder = 'concept';

        $email->save();

        $email->inlineImagesService()->convertInlineImagesToCid();
        $email->save();

        return $email;
    }
}