<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 13:02
 */

namespace App\Eco\Measure;


use Illuminate\Database\Eloquent\Collection;

class MeasureRequestedCollection extends Collection
{

    public function measures()
    {
        $result = (new Measure)->newCollection();

        $this->load('measure');

        foreach($this as $measureRequested){
            $result->add($measureRequested->measure);
        }

        return $result;
    }

}