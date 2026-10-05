<?php

namespace App\Jobs\Laposta;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Laposta;
use Laposta_Member;

class DeleteMemberToLaposta implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    private $lapostaKey;
    private $contactGroupId;
    private $lapostaListId;
    private $contactId;
    private $lapostaMemberId;
    private $userId;

    public function __construct($lapostaKey, $contactGroupId, $lapostaListId, $contactId, $lapostaMemberId, $userId)
    {
        $this->lapostaKey = $lapostaKey;
        $this->contactGroupId = $contactGroupId;
        $this->lapostaListId = $lapostaListId;
        $this->contactId = $contactId;
        $this->lapostaMemberId = $lapostaMemberId;
        $this->userId = $userId;
    }

    public function handle()
    {
        Auth::setUser(User::find($this->userId));

        Laposta::setApiKey($this->lapostaKey);

        $member = new Laposta_Member($this->lapostaListId ?: '');

        try {
            // wait for 1,5 second
            sleep(1);
            usleep(500000);

            $member->delete($this->lapostaMemberId);

            $contactGroup = ContactGroup::find($this->contactGroupId);

            if (
                $contactGroup
                && $contactGroup->contacts()
                    ->where('contact_id', $this->contactId)
                    ->exists()
            ) {
                $contactGroup->contacts()->updateExistingPivot(
                    $this->contactId,
                    [
                        'laposta_member_id' => null,
                        'laposta_member_state' => null,
                        'laposta_last_error_message' => null,
                    ]
                );
            }
        } catch (\Exception $e) {
            // Mogelijke foutmeldingen laposta:
            // 'Connection error: TCP connection reset by peer ...'
            // 'API error: Email address exists ...'
            // 'API error: No valid API-key provided ...'
            // 'API error: Missing required parameter list_id ...'
            // 'API error: Unknown list%'
            // 'API error: Rate limit exceeded ...';
            if ($e->getMessage()) {
                $message = strlen($e->getMessage()) > 191
                    ? substr($e->getMessage(), 0, 188) . '...'
                    : $e->getMessage();
            } else {
                $message = 'Fout onbekend';
            }

            $contactGroup = ContactGroup::find($this->contactGroupId);

            if (
                $contactGroup
                && $contactGroup->contacts()
                    ->where('contact_id', $this->contactId)
                    ->exists()
            ) {
                $contactGroup->contacts()->updateExistingPivot(
                    $this->contactId,
                    ['laposta_last_error_message' => $message]
                );
            }
        }
    }

    public function failed(\Throwable $exception)
    {
    }

}