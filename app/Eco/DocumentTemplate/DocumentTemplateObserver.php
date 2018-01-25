<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\DocumentTemplate;

use App\Eco\DocumentTemplate\DocumentTemplate;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DocumentTemplateObserver
{

    public function creating(DocumentTemplate $documentTemplate)
    {
        // number kolom willen we NOT NULL houden, deze wordt meteen na opslaan bepaald op basis van het ID
        // Daarom tijdelijke waarde erin zetten zodat query niet onderuit gaat.
        $documentTemplate->number = 'temp';

        $userId = Auth::id();
        $documentTemplate->created_by_id = $userId;
    }

    public function created(DocumentTemplate $documentTemplate)
    {
        $documentTemplate->number = 'T' . Carbon::now()->year . '-' .$documentTemplate->id;
        $documentTemplate->save();
    }
}