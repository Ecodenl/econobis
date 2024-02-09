<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Campaign;

use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignWorkflow;
use App\Helpers\Delete\Models\DeleteCampaign;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CampaignWorkflowController extends ApiController
{
    public function delete(Campaignworkflow $campaignworkflow)
    {
        //todo van Patrick: specifieker maken?
        $this->authorize('manage', Campaign::class);

        $campaignworkflow->delete();
    }
}