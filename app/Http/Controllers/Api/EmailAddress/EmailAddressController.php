<?php

namespace App\Http\Controllers\Api\EmailAddress;

use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\EmailAddress\FullEmailAddress;
use App\Rules\EmailAddressTypeExists;
use App\Rules\EnumExists;
use Illuminate\Http\Request;

class EmailAddressController extends ApiController
{

    public function store(Request $request)
    {

        $data = $request->validate([
            'contactId' => ['required', 'exists:contacts,id'],
            'typeId' => new EnumExists(EmailAddressType::class),
            'email' => '',
            'primary' => 'boolean',
        ]);

        $data = $this->sanitizeData($data, [
            'typeId' => 'nullable',
            'primary' => 'boolean',
        ]);
        $emailAddress = new EmailAddress($this->arrayKeysToSnakeCase($data));

        $this->authorize('create', $emailAddress);
        $emailAddress->save();

        return new FullEmailAddress($emailAddress->fresh());
    }

    public function update(Request $request, EmailAddress $emailAddress)
    {
        $this->authorize('update', $emailAddress);

        $data = $request->validate([
            'contactId' => 'exists:contacts,id',
            'typeId' => new EnumExists(EmailAddressType::class),
            'email' => '',
            'primary' => 'boolean',
        ]);

        $data = $this->sanitizeData($data, [
            'typeId' => 'nullable',
            'primary' => 'boolean',
        ]);
        $emailAddress->fill($this->arrayKeysToSnakeCase($data));
        $emailAddress->save();

        return new FullEmailAddress($emailAddress->fresh());
    }

    public function destroy(EmailAddress $emailAddress)
    {
        $this->authorize('delete', $emailAddress);

        $conceptEmails = Email::where('folder', 'concept')->get();
        $this->convertEmailAddressIdsToEmailAddresses($conceptEmails, 'to', $emailAddress);
        $this->convertEmailAddressIdsToEmailAddresses($conceptEmails, 'cc', $emailAddress);
        $this->convertEmailAddressIdsToEmailAddresses($conceptEmails, 'bcc', $emailAddress);

        $emailAddress->delete();
    }

    private function convertEmailAddressIdsToEmailAddresses($conceptEmails, string $emailRecipientType, EmailAddress $emailAddress): void
    {
        foreach ($conceptEmails as $email) {

            switch ($emailRecipientType) {
                case 'to':
                    $field = $email->to;
                    break;
                case 'cc':
                    $field = $email->cc;
                    break;
                case 'bcc':
                    $field = $email->bcc;
                    break;
                default:
                    $field = null;
            }

            if (is_array($field)) {
                $toBeChanged = false;
                foreach ($field as &$recipient) {
                    if (is_numeric($recipient)) {
                        if ($recipient == $emailAddress->id) {
                            $toBeChanged = true;
                            $recipient = $emailAddress->email;
                        }
                    }
                }

                if($toBeChanged){
                    switch ($emailRecipientType) {
                        case 'to':
                            $email->to  = $field;
                            break;
                        case 'cc':
                            $email->cc  = $field;
                            break;
                        case 'bcc':
                            $email->bcc  = $field;
                            break;
                    }
                    $email->save();
                }
            }

        }
    }

}
