<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\Project\Grid;

use App\Eco\Project\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RequestQuery extends \App\Helpers\RequestQuery\RequestQuery
{

    public function __construct(
        Request $request,
        Filter $filter,
        Sort $sort,
        Joiner $joiner
    ) {
        parent::__construct($request, $filter, $sort, $joiner);
    }

    protected function baseQuery()
    {
        $user = Auth::user();

        $baseQuery = Project::query()->select('projects.*');
        $baseQuery->whereAdministrationIds($user);

        $canViewProjects = $user->hasPermissionTo('view_project', 'api');
        $canViewEnergyCommunities = $user->hasPermissionTo('view_energy_community', 'api');

        if (!$canViewProjects || !$canViewEnergyCommunities) {
            $baseQuery->whereHas('projectType', function ($query) use ($canViewProjects, $canViewEnergyCommunities) {
                if ($canViewProjects && !$canViewEnergyCommunities) {
                    $query->where('code_ref', '!=', 'energy_community');
                } elseif (!$canViewProjects && $canViewEnergyCommunities) {
                    $query->where('code_ref', 'energy_community');
                } else {
                    $query->whereRaw('1 = 0');
                }
            });
        }

        return $baseQuery;
    }
}