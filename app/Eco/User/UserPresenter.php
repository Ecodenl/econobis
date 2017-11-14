<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-11-2017
 * Time: 14:07
 */

namespace App\Eco\User;


use Laracasts\Presenter\Presenter;

class UserPresenter extends Presenter
{

    public function fullName()
    {
        if(empty($this->entity->last_name)) return $this->entity->first_name;
        if(empty($this->entity->first_name)) return $this->entity->last_name;
        return $this->entity->last_name . ', ' . $this->entity->first_name . ($this->entity->lastNamePrefix ? ' ' . $this->entity->lastNamePrefix->name : '');
    }

    public function fullLastName()
    {
        return ($this->entity->lastNamePrefix ? $this->entity->lastNamePrefix->name . ' ' : '') . $this->entity->last_name;
    }
}