<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\HousingFileSpecification\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{

    protected function applyAddressJoin($query)
    {
        $query->join('housing_files as housingFile', 'housing_file_specifications.housing_file_id', '=', 'housingFile.id');
        $query->join('addresses', 'housingFile.address_id', '=', 'addresses.id');
    }

    protected function applyContactJoin($query)
    {
        $query->join('housing_files as housingFile2', 'housing_file_specifications.housing_file_id', '=', 'housingFile2.id');
        $query->join('addresses as contactAddress', 'housingFile2.address_id', '=', 'contactAddress.id');
        $query->join('contacts', 'contactAddress.contact_id', '=', 'contacts.id');
    }

    protected function applyMeasureJoin($query)
    {
//        $query->join('measures', 'housing_file_specifications.measure_id', '=', 'measures.id', 'left outer');
        $query->join('measures', 'housing_file_specifications.measure_id', '=', 'measures.id');
    }

    protected function applyMeasureCategoryJoin($query)
    {
        $query->join('measures as measures2', 'housing_file_specifications.measure_id', '=', 'measures2.id');
        $query->join('measure_categories', 'measures2.measure_category_id', '=', 'measure_categories.id');
    }

//    protected function applyEnergyLabelJoin($query)
//    {
//        $query->join('energy_labels', 'housing_files.energy_label_id', '=', 'energy_labels.id', 'left outer');
//    }
//
//    protected function applyBuildingTypeJoin($query)
//    {
//        $query->join('building_types', 'housing_files.building_type_id', '=', 'building_types.id', 'left outer');
//    }

}