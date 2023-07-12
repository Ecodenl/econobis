<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\HousingFile\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{

    protected function applyAddressJoin($query)
    {
        $query->join('addresses', 'housing_files.address_id', '=', 'addresses.id');
    }

    protected function applyContactJoin($query)
    {
        $query->join('addresses as contactAddress', 'housing_files.address_id', '=', 'contactAddress.id');
        $query->join('contacts', 'contactAddress.contact_id', '=', 'contacts.id');
    }

    protected function applyEnergyLabelJoin($query)
    {
        $query->join('energy_labels', 'housing_files.energy_label_id', '=', 'energy_labels.id', 'left outer');
    }

    protected function applyBuildingTypeJoin($query)
    {
        $query->join('building_types', 'housing_files.building_type_id', '=', 'building_types.id', 'left outer');
    }

}