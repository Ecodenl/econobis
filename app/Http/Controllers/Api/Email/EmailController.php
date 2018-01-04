<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\Email;


use App\Eco\Email\Email;
use App\Eco\Mailbox\Mailbox;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\Email\GridEmail;
use Config;

class EmailController
{

    public function grid(Mailbox $mailbox, $folder)
    {
        $emails = Email::whereFolder($folder)
            ->whereMailboxId($mailbox->id)
            ->get();

        $emails->load('mailbox');

        return GridEmail::collection($emails);
    }

    public function show(Email $email){
        return FullEmail::make($email);
    }

    public function update(Email $email, RequestInput $input)
    {
        $data = $input->string('contactId')->validate('exists:contacts,id')->alias('contact_id')->next()
            ->get();

        $email->fill($data);

        $email->save();

        return FullEmail::make($email);
    }

}