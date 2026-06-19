<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Project;

class ProjectRevenueDistributionObserver
{

    public function saved(ProjectRevenueDistribution $projectRevenueDistribution)
    {
        if ($projectRevenueDistribution->isDirty('status')) {
            // Als status van een projectRevenueDistribution is gewijzigd, kijk of we ook status van projectRevenue moeten aanpassen.
            // Op moment dat laatste distribution op processed wordt gezet, ook projectRevenue op processed.
            if($projectRevenueDistribution->status == 'processed'){
                $hasNotProcessedDistributions = $projectRevenueDistribution->revenue->distribution()->where('status', '!=', 'processed')->exists();
                if(!$hasNotProcessedDistributions){
                    $projectRevenueDistribution->revenue->status = 'processed';
                    $projectRevenueDistribution->revenue->save();
                }
            }
        }
    }
}
