<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ParticipantProductionProject\Grid;


use App\Helpers\RequestQuery\RequestExtraFilter;

class ExtraFilter extends RequestExtraFilter
{
    protected $fields = [
        'currentParticipations',
    ];

    protected function applyCurrentParticipationsFilter($query, $type, $data)
    {
        switch ($type) {
            case 'eq':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) =' . $data);
                break;
            case 'neq':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) !=' . $data);
                break;
            case 'ct':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) LIKE %' . $data . '%');
                break;
            case 'lt':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) < ' . $data);
                break;
            case 'lte':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) <= ' . $data);
                break;
            case 'gt':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) > ' . $data);
                break;
            case 'gte':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) >=' . $data);
                break;
            case 'bw':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) LIKE' . $data . '%');
                break;
            case 'nbw':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) NOT LIKE' . $data . '%');
                break;
            case 'ew':
                $$query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) LIKE %' . $data);
                break;
            case 'new':
                $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) NOT LIKE %' . $data);
                break;
        }

        return false;
    }
}