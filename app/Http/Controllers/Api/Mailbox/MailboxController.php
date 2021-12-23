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
use App\Eco\Mailbox\MailboxGmailApiSettings;
use App\Eco\Mailbox\MailboxIgnore;
use App\Eco\Mailbox\MailFetcher;
use App\Eco\Mailbox\MailFetcherGmail;
use App\Eco\Mailbox\MailValidator;
use App\Eco\Mailbox\SmtpEncryptionType;
use App\Eco\User\User;
use App\Helpers\Gmail\GmailConnectionManager;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\Email\GridEmailTemplate;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Mailbox\FullMailbox;
use App\Http\Resources\Mailbox\FullMailboxIgnore;
use App\Http\Resources\Mailbox\GridMailbox;
use App\Http\Resources\Mailbox\LoggedInEmailPeek;
use App\Http\Resources\User\UserPeek;
use Doctrine\Common\Annotations\Annotation\Enum;
use http\Header;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MailboxController extends Controller
{

    public function grid()
    {
        $this->authorize('view', Mailbox::class);

        $mailboxes = Mailbox::get();

        $mailboxes->load(['mailgunDomain']);

        return GridMailbox::collection($mailboxes);
    }

    public function store(Request $request, RequestInput $input)
    {
        $this->authorize('create', Mailbox::class);

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
            ->integer('mailgunDomainId')->whenMissing(null)->onEmpty(null)->alias('mailgun_domain_id')->next()
            ->string('incomingServerType')->whenMissing('imap')->onEmpty('imap')->alias('incoming_server_type')->next()
            ->string('outgoingServerType')->whenMissing('smtp')->onEmpty('smtp')->alias('outgoing_server_type')->next()
            ->boolean('isActive')->alias('is_active')->next()
            ->boolean('primary')->next()
            ->boolean('linkContactFromEmailToAddress')->alias('link_contact_from_email_to_address')->whenMissing(false)->onEmpty(false)->next()
            ->boolean('emailMarkAsSeen')->alias('email_mark_as_seen')->whenMissing(true)->onEmpty(true)->next()
            ->get();

        $mailbox = new Mailbox($data);
        $mailbox->save();

        // Als de mailbox als primair is gemarkeerd, functie aanroepen om te zorgen dat alle andere mailboxen niet meer primair zijn.
        if ($mailbox->primary) {
            $this->makePrimary($mailbox);
        }

        if ($mailbox->incoming_server_type == 'gmail' || $mailbox->outgoing_server_type == 'gmail') {
            $this->storeOrUpdateGmailApiSettings($mailbox, $request->gmailApiSettings);
        }

        $mailbox->users()->attach(Auth::user());

        //Create a new mailfetcher. This will check if the mailbox is valid and set it in the db.
        if ($mailbox->incoming_server_type === 'gmail') {
            $gmailConnectionManager = new GmailConnectionManager($mailbox);
            $client = $gmailConnectionManager->connect();

            if (isset($client['message']) && $client['message'] == 'gmail_unauthorised') {
                return response()->json($client, 401);
            }
        } else {
            new MailFetcher($mailbox);
        }

        return GenericResource::make($mailbox);
    }

    public function show(Mailbox $mailbox)
    {
        $this->authorize('view', Mailbox::class);

        $mailbox->load(['users', 'mailboxIgnores', 'gmailApiSettings']);

        return FullMailbox::make($mailbox);
    }

    public function update(Mailbox $mailbox, Request $request, RequestInput $input)
    {
        $this->authorize('create', Mailbox::class);

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
            ->string('password')->whenMissing($mailbox->password)->onEmpty($mailbox->password)->alias('password')->next()
            ->integer('mailgunDomainId')->whenMissing(null)->onEmpty(null)->alias('mailgun_domain_id')->next()
            ->string('incomingServerType')->alias('incoming_server_type')->next()
            ->string('outgoingServerType')->alias('outgoing_server_type')->next()
            ->boolean('isActive')->alias('is_active')->next()
            ->boolean('primary')->next()
            ->boolean('linkContactFromEmailToAddress')->alias('link_contact_from_email_to_address')->whenMissing(false)->onEmpty(false)->next()
            ->boolean('emailMarkAsSeen')->alias('email_mark_as_seen')->whenMissing(true)->next()
            ->get();

        $mailbox->login_tries = 0;
        $mailbox->update($data);
        $mailbox->save();

        if ($mailbox->incoming_server_type == 'gmail' || $mailbox->outgoing_server_type == 'gmail') {
            $this->storeOrUpdateGmailApiSettings($mailbox, $request->gmailApiSettings);
        }

        // Als de mailbox als primair is gemarkeerd, functie aanroepen om te zorgen dat alle andere mailboxen niet meer primair zijn.
        if ($mailbox->primary) {
            $this->makePrimary($mailbox);
        }

        //Create a new mailfetcher. This will check if the mailbox is valid and set it in the db.
        if ($mailbox->incoming_server_type === 'gmail') {
            $gmailConnectionManager = new GmailConnectionManager($mailbox);
            $client = $gmailConnectionManager->connect();

            if (isset($client['message']) && $client['message'] == 'gmail_unauthorised') {
                return response()->json($client, 401);
            }
        } else {
            new MailFetcher($mailbox);
        }

        return $this->show($mailbox);
    }

    public function addUser(Mailbox $mailbox, User $user)
    {
        $this->authorize('create', Mailbox::class);

        $mailbox->users()->attach($user);

        return UserPeek::make($user);
    }

    public function removeUser(Mailbox $mailbox, User $user)
    {
        $this->authorize('create', Mailbox::class);

        $mailbox->users()->detach($user);
    }

    public function receive(Mailbox $mailbox)
    {
        $this->authorize('view', Mailbox::class);

        if (!$mailbox->is_active) {
            return 'This mailbox is not active';
        }
        if (!$mailbox->valid) {
            return 'This mailbox is invalid';
        }

        if ($mailbox->incoming_server_type === 'gmail') {
            $mailFetcher = new MailFetcherGmail($mailbox);
        } else {
            $mailFetcher = new MailFetcher($mailbox);
        }
        return $mailFetcher->fetchNew();
    }

    public function receiveMailFromMailboxesUser()
    {
        $this->authorize('view', Mailbox::class);

        $user = Auth::user();

        $mailboxes = $user->mailboxes()->get();

        $errorMessages = false;
        foreach ($mailboxes as $mailbox) {
            $errorMessage = $this->receive($mailbox);
            if($errorMessage){
                $responseArray = json_decode($errorMessage, true);
                if(isset($responseArray['error'])){
                    $errorMessages[] = "Error mailbox " . $mailbox->name . " (" . $mailbox->id . "): " . $responseArray['error'] . (isset($responseArray['error_description']) ? " - " . $responseArray['error_description'] : '');
                }
            }
        }
        if($errorMessages) {
            abort("412", implode("\n", $errorMessages));
        }
    }

    public function loggedInEmailPeek()
    {
        $user = Auth::user();

        $mailboxes = $user->mailboxes()->select('mailbox_id', 'email')->where('is_active', 1)->get();

        return LoggedInEmailPeek::collection($mailboxes);
    }

    //called by cronjob
    static public function receiveAllEmail()
    {
        $mailboxes = Mailbox::where('valid', 1)->where('is_active', 1)->get();
        foreach ($mailboxes as $mailbox) {
            if ($mailbox->incoming_server_type === 'gmail') {
                $mailFetcher = new MailFetcherGmail($mailbox);
            } else {
                $mailFetcher = new MailFetcher($mailbox);
            }
            $mailFetcher->fetchNew();
        }
    }

    public function storeIgnore(RequestInput $input)
    {
        $this->authorize('create', Mailbox::class);

        $data = $input
            ->integer('mailboxId')->validate('required|exists:mailboxes,id')->alias('mailbox_id')->next()
            ->string('value')->validate('required')->next()
            ->string('typeId')->validate('required')->alias('type_id')->next()
            ->get();

        $mailboxIgnore = new MailboxIgnore($data);
        $mailboxIgnore->save();

        return FullMailboxIgnore::make($mailboxIgnore);
    }

    public function deleteIgnore(MailboxIgnore $mailboxIgnore)
    {
        $this->authorize('create', Mailbox::class);

        $mailboxIgnore->delete();
    }

    public function makePrimary(Mailbox $mailbox)
    {
        // Oude primary mailbox niet meer primary maken
        foreach (Mailbox::where('primary', 1)
                     ->where('id', '<>', $mailbox->id) // Is onnodig voor huidige mailbox
            ->get() as $mb) {
            // Zal er eigenlijk altijd exact één moeten zijn, maar voor de zekerheid toch maar in een loop
            $mb->primary = false;
            $mb->save();
        }

        $mailbox->primary = true;
        $mailbox->save();
    }

    private function storeOrUpdateGmailApiSettings(Mailbox $mailbox, array $inputGmailApiSettings): void
    {
        $gmailApiSettings = MailboxGmailApiSettings::firstOrNew(['mailbox_id' => $mailbox->id]);

        $gmailApiSettings->client_id = $inputGmailApiSettings['clientId'];
        $gmailApiSettings->project_id = $inputGmailApiSettings['projectId'];
        $gmailApiSettings->client_secret = $inputGmailApiSettings['clientSecret'];
        $gmailApiSettings->token = '';

        $gmailApiSettings->save();
    }

    public function gmailApiConnectionCallback(Request $request)
    {
        $state = json_decode(base64_decode($request->state));

        $mailbox = Mailbox::where('email', $state->email)->first();

        if (!$mailbox || !$request->code) return;

        $gmailConnectionManager = new GmailConnectionManager($mailbox);

        $appUrl = config('app.url');

        // TODO If callback is not valid then show message to the user
        if ($gmailConnectionManager->callback($request->code)) {
            header("Location: {$appUrl}/#/mailbox/{$mailbox->id}");
            exit;
        } else {
            Log::error("Callback vanuit gmail is NIET ok");
            header("Location: {$appUrl}/#/mailbox/{$mailbox->id}");
            exit;
        }
    }
}