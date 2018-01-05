<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\Email;


use App\Eco\Email\Email;
use App\Eco\Email\Jobs\SendEmail;
use App\Eco\Email\Jobs\StoreConceptEmail;
use App\Eco\Mailbox\Mailbox;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\Email\GridEmail;
use Config;

class EmailController
{

    public function grid($folder)
    {
        $emails = Email::whereFolder($folder)
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

    public function send(Mailbox $mailbox, RequestInput $input)
    {
        // Todo; deze hele functie is nog in aanbouw

        $data = $input->string('from')->next()
            ->string('to')->validate('json')->next()
            ->string('cc')->validate('json')->next()
            ->string('bcc')->validate('json')->next()
            ->string('subject')->next()
            ->string('htmlBody')->whenMissing('')->onEmpty('')->alias('html_body')->next()
            ->string('date')->validate('date')->next()
            ->string('contactId')->alias('contact_id')->next()
            ->get();

        $email = (new StoreConceptEmail($mailbox, $data))->handle();

        (new SendEmail($email))->handle();
    }

}