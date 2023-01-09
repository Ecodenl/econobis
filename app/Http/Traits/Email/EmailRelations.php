<?php

namespace App\Http\Traits\Email;

use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;

trait EmailRelations
{
    private function addRelationToContacts(Email $email): bool
    {

        $emailAddressesIds = [];
        // Link contact from email to address
        if ($email->mailbox->link_contact_from_email_to_address) {
            if (!empty($email->to) && is_array($email->to)) {
                $emailAddressesIds = EmailAddress::whereIn('email', $email->to)->pluck('id')->toArray();
            }
            // Link contact from email from address
        } else {
            if (!empty($email->from)) {
                $emailAddressesIds = EmailAddress::where('email', $email->from)->pluck('id')->toArray();
            }
        }

        if (!empty($emailAddressesIds)) {
            $uniqueEmailAddressesIds = array_unique($emailAddressesIds);

            //soms niet koppelen
            $validatedEmailAddressesIds = $this->checkEmailAddressToIgnore($email, $uniqueEmailAddressesIds);

            if(!empty($validatedEmailAddressesIds)){
                $emailAddressesContactIds = array_unique(EmailAddress::whereIn('id', $validatedEmailAddressesIds)->pluck('contact_id')->toArray());
                $email->contacts()->attach($emailAddressesContactIds);
            }

        }

        return true;
    }

    /**
     * @param $mailboxIgnores
     * @param $uniqueEmailAddressesId
     * @return bool
     */
    private function checkEmailAddressToIgnore($email, $uniqueEmailAddressesIds): array
    {
        $mailboxIgnores = $email->mailbox->mailboxIgnores;
        $validatedEmailAddressesIds = [];
        foreach ($uniqueEmailAddressesIds as $uniqueEmailAddressesId) {
            $uniqueEmailAddress = EmailAddress::find($uniqueEmailAddressesId)->email;
            $addEmailToContacts = true;
            foreach ($mailboxIgnores as $ignore) {
                switch ($ignore->type_id) {
                    case 'e-mail':
                        if (strtolower($ignore->value) === strtolower($uniqueEmailAddress)) {
                            $addEmailToContacts = false;
                            break 2;
                        }
                        break;
                    case 'domain':
                        $domain = preg_replace('!^.+?([^@]+)$!', '$1', $uniqueEmailAddress);
                        if (strtolower($ignore->value) === strtolower($domain)) {
                            $addEmailToContacts = false;
                            break 2;
                        }
                        break;
                }
            }
            if($addEmailToContacts){
                $validatedEmailAddressesIds[] = $uniqueEmailAddressesId;
            }
        }

        return $validatedEmailAddressesIds;
    }
}