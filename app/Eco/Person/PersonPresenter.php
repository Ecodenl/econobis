<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 11:09
 */

namespace App\Eco\Person;


use Laracasts\Presenter\Presenter;

class PersonPresenter extends Presenter
{

    public function fullName()
    {
        $person = $this->entity;

        if(empty($person->last_name)) return $person->first_name;
        if(empty($person->first_name)) return $person->last_name;
        return $person->last_name . ', ' . $person->first_name . ($person->last_name_prefix ? ' ' . $person->last_name_prefix : '');
    }

}