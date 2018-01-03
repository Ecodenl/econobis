<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 03-01-2018
 * Time: 14:09
 */

namespace App\Http\Controllers\Api\Mailbox;


use App\Eco\Mailbox\ImapEncryptionType;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\SmtpEncryptionType;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\GenericResource;
use App\Rules\EnumExists;
use Doctrine\Common\Annotations\Annotation\Enum;

class Mailboxcontroller
{

    public function store(RequestInput $input)
    {
        $data = $input->string('name')->validate('')->whenMissing('')->onEmpty('')->next()
            ->string('email')->whenMissing('')->onEmpty('')->alias('email')->next()
            ->string('smtpHost')->whenMissing('')->onEmpty('')->alias('smtp_host')->next()
            ->string('smtpPort')->whenMissing('')->onEmpty('')->alias('smtp_port')->next()
            ->string('smtpEncryption')->validate(new EnumExists(SmtpEncryptionType::class))->whenMissing(null)->onEmpty(null)->alias('smtp_encryption')->next()
            ->string('ImapHost')->whenMissing('')->onEmpty('')->alias('imap_host')->next()
            ->string('ImapPort')->whenMissing('')->onEmpty('')->alias('imap_port')->next()
            ->string('ImapEncryption')->validate(new EnumExists(ImapEncryptionType::class))->whenMissing(null)->onEmpty(null)->alias('imap_encryption')->next()
            ->string('ImapInboxPrefix')->whenMissing('')->onEmpty('')->alias('imap_inbox_prefix')->next()
            ->string('username')->whenMissing('')->onEmpty('')->alias('username')->next()
            ->string('password')->whenMissing('')->onEmpty('')->alias('password')->next()
            ->get();

        $mailbox = new Mailbox($data);
        $mailbox->save();

        return GenericResource::make($mailbox);
    }
}