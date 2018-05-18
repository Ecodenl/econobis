<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\Email\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{
    protected function applyMailboxesJoin($query)
    {
        $query->join('mailboxes', 'emails.mailbox_id', '=', 'mailboxes.id');
    }

    protected function applyContactJoin($query)
    {
        $query->join('contact_email', 'contact_email.email_id', '=', 'emails.id');
        $query->join('contacts', 'contact_email.contact_id', '=', 'contacts.id');
    }

    protected function applyUsersJoin($query)
    {
        $query->leftJoin('users', 'emails.responsible_user_id', '=', 'users.id');
        $query->leftJoin('last_name_prefixes', 'users.last_name_prefix_id', '=', 'last_name_prefixes.id');
    }

}