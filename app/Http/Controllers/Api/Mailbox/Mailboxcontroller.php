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
use App\Eco\User\User;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\GenericResource;
use App\Rules\EnumExists;
use Doctrine\Common\Annotations\Annotation\Enum;

class Mailboxcontroller
{

    public function grid()
    {
        $mailboxes = Mailbox::get();

        return GenericResource::collection($mailboxes);
    }

    public function store(RequestInput $input)
    {
        $data = $input->string('name')->whenMissing('')->onEmpty('')->next()
            ->string('email')->whenMissing('')->onEmpty('')->alias('email')->next()
            ->string('smtpHost')->whenMissing('')->onEmpty('')->alias('smtp_host')->next()
            ->string('smtpPort')->whenMissing('')->onEmpty('')->alias('smtp_port')->next()
            ->string('smtpEncryption')->validate(new EnumExists(SmtpEncryptionType::class))->whenMissing(null)->onEmpty(null)->alias('smtp_encryption')->next()
            ->string('imapHost')->whenMissing('')->onEmpty('')->alias('imap_host')->next()
            ->string('imapPort')->whenMissing('')->onEmpty('')->alias('imap_port')->next()
            ->string('imapEncryption')->validate(new EnumExists(ImapEncryptionType::class))->whenMissing(null)->onEmpty(null)->alias('imap_encryption')->next()
            ->string('imapInboxPrefix')->whenMissing('')->onEmpty('')->alias('imap_inbox_prefix')->next()
            ->string('username')->whenMissing('')->onEmpty('')->alias('username')->next()
            ->string('password')->whenMissing('')->onEmpty('')->alias('password')->next()
            ->get();

        $mailbox = new Mailbox($data);
        $mailbox->save();

        return GenericResource::make($mailbox);
    }

    public function update(Mailbox $mailbox, RequestInput $input)
    {
        $data = $input->string('name')->next()
            ->string('email')->alias('email')->next()
            ->string('smtpHost')->alias('smtp_host')->next()
            ->string('smtpPort')->alias('smtp_port')->next()
            ->string('smtpEncryption')->validate(new EnumExists(SmtpEncryptionType::class))->alias('smtp_encryption')->next()
            ->string('imapHost')->alias('imap_host')->next()
            ->string('imapPort')->alias('imap_port')->next()
            ->string('imapEncryption')->validate(new EnumExists(ImapEncryptionType::class))->alias('imap_encryption')->next()
            ->string('imapInboxPrefix')->alias('imap_inbox_prefix')->next()
            ->string('username')->alias('username')->next()
            ->string('password')->alias('password')->next()
            ->get();

        $mailbox->update($data);
        $mailbox->save();

        return GenericResource::make($mailbox);
    }

    public function addUser(Mailbox $mailbox, User $user)
    {
        $mailbox->users()->attach($user);
    }

    public function removeUser(Mailbox $mailbox, User $user)
    {
        $mailbox->users()->detach($user);
    }
}