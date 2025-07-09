<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Document;

use App\Eco\PortalSettings\PortalSettings;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DocumentObserver
{

    public function creating(Document $document)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $document->number = 'temp';

        $userId = Auth::id();
        if(Auth::isPortalUser()) {
            $responsibleUserId = PortalSettings::first()?->responsible_user_id;
            if ($responsibleUserId) {
                $document->created_by_id = $responsibleUserId;
            }
            $document->created_by_portal_user_id = $userId;
        } else {
            $document->created_by_id = $userId;
        }
    }

    public function created(Document $document)
    {
        $document->number = 'D' . Carbon::now()->year . '-' .$document->id;
        $document->save();
    }
}