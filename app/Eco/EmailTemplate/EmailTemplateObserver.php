<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\EmailTemplate;

use Illuminate\Support\Facades\Auth;

class EmailTemplateObserver
{

    public function creating(EmailTemplate $emailTemplate)
    {
        $userId = Auth::id();
        $emailTemplate->created_by_id = $userId;
    }
}