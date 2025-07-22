<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 03-01-2018
 * Time: 14:09
 */

namespace App\Http\Controllers\Api\Mailbox;


use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailboxOauthApiSettings;
use App\Eco\Mailbox\MailboxIgnore;
use App\Eco\Mailbox\MailFetcher;
use App\Eco\Mailbox\MailFetcherMsOauth;
use App\Eco\User\User;
use App\Helpers\Mailgun\MailgunHelper;
use App\Helpers\MsOauth\MsOauthConnectionManager;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Middleware\EncryptCookies;
use App\Http\RequestQueries\Invoice\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Mailbox\FullMailbox;
use App\Http\Resources\Mailbox\FullMailboxIgnore;
use App\Http\Resources\Mailbox\GridMailbox;
use App\Http\Resources\Mailbox\LoggedInEmailPeek;
use App\Http\Resources\Mailbox\LoggedInUserOnlyActive;
use App\Http\Resources\Mailbox\MailboxPeek;
use App\Http\Resources\User\UserPeek;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MailboxController extends Controller
{

    public function __construct()
    {
        $this->middleware([EncryptCookies::class, StartSession::class])->only('update');
    }

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', Mailbox::class);

        $active = trim($requestQuery->getRequest()->onlyActive);

        if ($active == "\"ja\"") {
            $mailboxes = Mailbox::where('is_active', 1)->get();
        } elseif($active == "\"nee\"") {
            $mailboxes = Mailbox::where('is_active', 0)->get();
        } else {
            $mailboxes = Mailbox::get();
        }

        $mailboxes->load(['mailgunDomain']);

        return GridMailbox::collection($mailboxes);
    }

    public function store(Request $request, RequestInput $input, MailgunHelper $mailgunHelper)
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

        //if incomingServerType is not mailgun clear some fields just to be safe
        if($data['incoming_server_type'] != 'mailgun'){
            $data['inbound_mailgun_email'] = null;
            $data['inbound_mailgun_post_token'] = null;
            $data['inbound_mailgun_route_id'] = null;
        }

        $mailbox = new Mailbox($data);
        $mailbox->save();

        // Als de mailbox als primair is gemarkeerd, functie aanroepen om te zorgen dat alle andere mailboxen niet meer primair zijn.
        if ($mailbox->primary) {
            $this->makePrimary($mailbox);
        }

        if ($mailbox->incoming_server_type == 'ms-oauth' || $mailbox->outgoing_server_type == 'ms-oauth'
        ) {
            $this->storeOrUpdateOauthApiSettings($mailbox, $request->oauthApiSettings);
        }

        $mailbox->users()->attach(Auth::user());

        //Create a new mailfetcher. This will check if the mailbox is valid and set it in the db.
        if ($mailbox->incoming_server_type === 'ms-oauth') {
            $msOauthConnectionManage = new MsOauthConnectionManager($mailbox);
            $client = $msOauthConnectionManage->connect();

            if (isset($client['message']) && $client['message'] == 'ms_oauth_unauthorised') {
                return response()->json($client, 401);
            }
        } else if ($mailbox->incoming_server_type === 'mailgun'){
            $mailgunHelper->updateMailgunForwarding($mailbox);
        } else if ($mailbox->incoming_server_type !== 'mailgun'){
            new MailFetcher($mailbox);
        }

        return GenericResource::make($mailbox);
    }

    public function show(Mailbox $mailbox)
    {
        $this->authorize('view', Mailbox::class);

        $mailbox->load(['users', 'mailboxIgnores', 'oauthApiSettings']);

        return FullMailbox::make($mailbox);
    }

    public function update(Mailbox $mailbox, Request $request, RequestInput $input, MailgunHelper $mailgunHelper)
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

        //if incomingServerType is not mailgun clear some fields just to be safe
        if($data['incoming_server_type'] != 'mailgun'){
            $data['inbound_mailgun_email'] = null;
            $data['inbound_mailgun_post_token'] = null;
            $data['inbound_mailgun_route_id'] = null;
        }

        $mailbox->login_tries = 0;
        $mailbox->fill($data);
        $updateMailgunForwarding = $mailbox->isDirty('incoming_server_type');
        $mailbox->save();

        if($updateMailgunForwarding){
            try{
                $mailgunHelper->updateMailgunForwarding($mailbox);
            }catch (\Exception $e){
                /**
                 * Error loggen maar niet hele script laten stoppen.
                 */
                Log::info('Mailgun forwarding update failed: ' . $e->getMessage());
            }
        }

        if ($mailbox->incoming_server_type == 'ms-oauth' || $mailbox->outgoing_server_type == 'ms-oauth') {
            $this->storeOrUpdateOauthApiSettings($mailbox, $request->oauthApiSettings);
        }

        // Als de mailbox als primair is gemarkeerd, functie aanroepen om te zorgen dat alle andere mailboxen niet meer primair zijn.
        if ($mailbox->primary) {
            $this->makePrimary($mailbox);
        }

        //Create a new mailfetcher. This will check if the mailbox is valid and set it in the db.
        if ($mailbox->incoming_server_type === 'ms-oauth') {
            $msOauthConnectionManage = new MsOauthConnectionManager($mailbox);
            $client = $msOauthConnectionManage->connect();

            if (isset($client['message']) && $client['message'] == 'ms_oauth_unauthorised') {
                return response()->json($client, 401);
            }
        } else if ($mailbox->incoming_server_type !== 'mailgun'){
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

    public function peek()
    {
        return MailboxPeek::collection(Mailbox::orderBy('name')->get());
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

        $mailboxes = $user->mailboxes()->select('mailbox_id', 'email', 'name')->where('is_active', 1)->get();

        return LoggedInEmailPeek::collection($mailboxes);
    }

    /**
     * Geef de mailboxen van een ingelogde gebruiker voor tonen statussen.
     */
    public function loggedInUserOnlyActive()
    {
        $user = Auth::user();

        $mailboxes = $user->mailboxes()->select('mailbox_id', 'email', 'name', 'date_last_fetched', 'valid')->where('is_active', 1)->get();

        $time15MinutesAgo = Carbon::now()->subMinutes(15)->format('Y-m-d H:i:s');
        $activateAutomaticRefreshEmailData = $user->mailboxes()->where('is_active', 1)
            ->where('valid', true )
            ->whereIn('incoming_server_type', ['imap', 'ms-oauth'] )
            ->where(function ($query) use($time15MinutesAgo) {
                $query->whereNull('date_last_fetched')
                    ->orwhere('date_last_fetched', '<', $time15MinutesAgo );
            })->exists();

        return LoggedInUserOnlyActive::collection($mailboxes)
            ->additional(['meta' => [
                'activateAutomaticRefreshEmailData' => $activateAutomaticRefreshEmailData,
            ]
            ]);
    }

    /**
     * Geef de mailboxen voor een specifieke gebruiker zodat een andere (key)user d mailbox aan de gebruiker kan koppelen.
     * In dit geval wil de keyuser dus een lijst met de mailboxen van de gebruiker zien en niet die van zichzelf.
     */
    public function forUserEmailPeek(User $user)
    {
        if(!Auth::user()->hasPermissionTo('manage_user', 'api') && $user->id !== Auth::id()){
            /**
             * Alleen toegankelijk voor 'manage_user' rechten (dit zijn normaal gesproken de keyusers) of voor de eigen gebruiker.
             * (gebruikers mogen eigen mailbox instellen)
             */
            abort(403);
        }

        $mailboxes = $user->mailboxes()->select('mailbox_id', 'email', 'name')->where('is_active', 1)->get();

        return LoggedInEmailPeek::collection($mailboxes);
    }

    //called by cronjob
    static public function receiveAllEmail()
    {
        $mailboxes = Mailbox::where('valid', 1)->where('is_active', 1)->get();
        foreach ($mailboxes as $mailbox) {
            if ($mailbox->incoming_server_type === 'ms-oauth') {
                $mailFetcher = new MailFetcherMsOauth($mailbox);
            } else if ($mailbox->incoming_server_type !== 'mailgun'){
                $mailFetcher = new MailFetcher($mailbox);
            } else {
                return;
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

    public function msOauthApiConnectionCallback(Request $request)
    {
//todo WM oauth: opschonen
//        Log::error("XXxxxxxxxxxxxxxxxxxxxxxxxxxx");

        $mailboxId= session('msOauthMailboxId');
        $request->session()->forget('msOauthMailboxId');
        $mailbox = Mailbox::find($mailboxId);

        $appUrl = config('app.url');

        if (!$mailbox){
            Log::error("Callback vanuit ms-oauth is NIET ok - mailbox niet meer gevonden");
            header("Location: {$appUrl}/#/mailboxen");
            exit;
        }
        if (!$request->code){
            Log::error("Callback vanuit ms-oauth is NIET ok - geen authorization code");
            header("Location: {$appUrl}/#/mailbox/{$mailbox->id}");
            exit;
        }

        $msOauthConnectionManager = new MsOauthConnectionManager($mailbox);

        // TODO If callback is not valid then show message to the user
        if ($msOauthConnectionManager->callback($request, $mailbox)) {
            header("Location: {$appUrl}/#/mailbox/{$mailbox->id}");
            exit;
        } else {
            Log::error("Callback vanuit ms-oauth is NIET ok");
            header("Location: {$appUrl}/#/mailbox/{$mailbox->id}");
            exit;
        }
    }

    private function receive(Mailbox $mailbox)
    {
        $this->authorize('view', Mailbox::class);

        if (!$mailbox->is_active) {
            return 'This mailbox is not active';
        }
        if (!$mailbox->valid) {
            return 'This mailbox is invalid';
        }

        //Create a new mailfetcher. This will check if the mailbox is valid and set it in the db.
        if ($mailbox->incoming_server_type === 'ms-oauth') {
            $mailFetcher = new MailFetcherMsOauth($mailbox);
        } else if ($mailbox->incoming_server_type !== 'mailgun'){
            $mailFetcher = new MailFetcher($mailbox);
        } else {
            return;
        }

        return $mailFetcher->fetchNew();
    }

    private function storeOrUpdateOauthApiSettings(Mailbox $mailbox, array $inputOauthApiSettings): void
    {
        $oauthApiSettings = MailboxOauthApiSettings::firstOrNew(['mailbox_id' => $mailbox->id]);

        $oauthApiSettings->client_id = $inputOauthApiSettings['clientId'];
        $oauthApiSettings->project_id = $inputOauthApiSettings['projectId'];
        if(isset($inputOauthApiSettings['clientSecret'])){
            $oauthApiSettings->client_secret = $inputOauthApiSettings['clientSecret'];
        }
        if(isset($inputOauthApiSettings['tenantId']) && !empty($inputOauthApiSettings['tenantId'])) {
            $oauthApiSettings->tenant_id = $inputOauthApiSettings['tenantId'];
        } else {
            $oauthApiSettings->tenant_id = null;
        }
        $oauthApiSettings->token = '';

        $oauthApiSettings->save();
    }

}