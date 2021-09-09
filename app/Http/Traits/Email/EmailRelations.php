<?php

namespace App\Http\Traits\Email;

use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;

trait EmailRelations
{
    private function addRelationToContacts(Email $email): bool
    {

        //soms niet koppelen
        $mailboxIgnores = $email->mailbox->mailboxIgnores;

        foreach ($mailboxIgnores as $ignore) {
            switch ($ignore->type_id) {
                case 'e-mail':
                    if ($ignore->value === $email->from) {
                        return false;
                    }
                    break;
                case 'domain':
                    $domain = preg_replace('!^.+?([^@]+)$!', '$1', $email->from);
                    if ($ignore->value === $domain) {
                        return false;
                    }
                    break;
            }
        }

        $emailAddressesIds = [];
        // Link contact from email to address
        if ($email->mailbox->link_contact_from_email_to_address) {
            if (!empty($email->to)) {
                $emailAddressesIds = EmailAddress::where('email', $email->to)->pluck('contact_id')->toArray();
            }
            // Link contact from email from address
        } else {
            if (!empty($email->from)) {
                $emailAddressesIds = EmailAddress::where('email', $email->from)->pluck('contact_id')->toArray();
            }
        }

        if (!empty($emailAddressesIds)) {
            //If contact has twice same emailaddress
            $uniqueEmailAddressesIds = array_unique($emailAddressesIds);
            $email->contacts()->attach($uniqueEmailAddressesIds);
        }

        return true;
    }
}