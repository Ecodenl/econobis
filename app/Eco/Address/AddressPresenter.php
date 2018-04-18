<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 28-09-2017
 * Time: 14:30
 */

namespace App\Eco\Address;


class AddressPresenter extends \Laracasts\Presenter\Presenter
{
    public function streetAndNumber()
    {
        return $this->entity->street . ' ' . $this->entity->number . $this->entity->addition;
    }
}