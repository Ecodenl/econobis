<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 03-01-2018
 * Time: 14:09
 */

namespace App\Http\Controllers\Api\Mailbox;


use App\Eco\Email\Email;
use App\Eco\Mailbox\ImapEncryptionType;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailFetcher;
use App\Eco\Mailbox\SmtpEncryptionType;
use App\Eco\User\User;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\Email\GridEmailTemplate;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Mailbox\FullMailbox;
use App\Http\Resources\Mailbox\LoggedInEmailPeek;
use App\Http\Resources\User\UserPeek;
use App\Rules\EnumExists;
use Doctrine\Common\Annotations\Annotation\Enum;
use Illuminate\Support\Facades\Auth;

class MailboxController
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
            ->string('smtpEncryption')->whenMissing(null)->onEmpty(null)->alias('smtp_encryption')->next()
            ->string('imapHost')->whenMissing('')->onEmpty('')->alias('imap_host')->next()
            ->string('imapPort')->whenMissing('')->onEmpty('')->alias('imap_port')->next()
            ->string('imapEncryption')->whenMissing(null)->onEmpty(null)->alias('imap_encryption')->next()
            ->string('imapInboxPrefix')->whenMissing('')->onEmpty('')->alias('imap_inbox_prefix')->next()
            ->string('username')->whenMissing('')->onEmpty('')->alias('username')->next()
            ->string('password')->whenMissing('')->onEmpty('')->alias('password')->next()
            ->get();

        $mailbox = new Mailbox($data);
        $mailbox->save();

        return GenericResource::make($mailbox);
    }

    public function show(Mailbox $mailbox)
    {
        $mailbox->load('users');
        return FullMailbox::make($mailbox);
    }

    public function update(Mailbox $mailbox, RequestInput $input)
    {
        $data = $input->string('name')->next()
            ->string('email')->alias('email')->next()
            ->string('smtpHost')->alias('smtp_host')->next()
            ->string('smtpPort')->alias('smtp_port')->next()
            ->string('smtpEncryption')->onEmpty(null)->alias('smtp_encryption')->next()
            ->string('imapHost')->alias('imap_host')->next()
            ->string('imapPort')->alias('imap_port')->next()
            ->string('imapEncryption')->onEmpty(null)->alias('imap_encryption')->next()
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

        return UserPeek::make($user);
    }

    public function removeUser(Mailbox $mailbox, User $user)
    {
        $mailbox->users()->detach($user);
    }

    public function receive(Mailbox $mailbox)
    {
        $mailFetcher = new MailFetcher($mailbox);
        $mailFetcher->fetchNew();
    }
    public function loggedInEmailPeek()
    {
        $user = Auth::user();

        $mailboxes = $user->mailboxes()->select('mailbox_id', 'email')->get();

        return LoggedInEmailPeek::collection($mailboxes);
    }


}