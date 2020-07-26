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
use Illuminate\Support\Facades\Validator;

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

        $email->to = $email->to ? json_decode($email->to) : [];
        $email->cc = $email->cc ? json_decode($email->cc) : [];
        $email->bcc = $email->bcc ? json_decode($email->bcc) : [];

        $email->mailbox_id = $this->mailbox->id;
        $email->from = $this->mailbox->email;
        $email->folder = 'concept';

        $email->save();

        return $email;
    }
}