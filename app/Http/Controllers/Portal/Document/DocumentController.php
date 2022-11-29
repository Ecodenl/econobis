<?php

namespace App\Http\Controllers\Portal\Document;

use App\Eco\Document\Document;
use App\Eco\Portal\PortalUser;
use App\Helpers\Alfresco\AlfrescoHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController
{
    public function downloadDocument(Document $document)
    {
        $portalUser = Auth::user();

        $this->authorizeDocument($portalUser, $document);

        if (\Config::get('app.ALFRESCO_COOP_USERNAME') == 'local') {
            if($document->alfresco_node_id == null){
                $filePath = Storage::disk('documents')->getDriver()
                    ->getAdapter()->applyPathPrefix($document->filename);
                header('X-Filename:' . $document->filename);
                header('Access-Control-Expose-Headers: X-Filename');
                return response()->download($filePath, $document->filename);
            } else {
                return null;
            }
        }

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        return $alfrescoHelper->downloadFile($document->alfresco_node_id);
    }

    public function downLoadRawDocument(Document $document)
    {
        if (\Config::get('app.ALFRESCO_COOP_USERNAME') == 'local') {
            if ($document->alfresco_node_id == null) {
                return Storage::disk('documents')->get($document->filename);
            } else {
                return null;
            }
        }

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        return $alfrescoHelper->downloadFile($document->alfresco_node_id);
    }

    private function authorizeDocument(PortalUser $portalUser, Document $document)
    {
//        if (!$portalUser->contact->quotationRequests->contains($quotationRequest)) {
//            abort(403, 'Geen toegang tot deze offerteaanvraag.');
//        }
    }
}