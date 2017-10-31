<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 11:09
 */

namespace App\Eco\Contact;


use Laracasts\Presenter\Presenter;

class ContactPresenter extends Presenter
{

    public function type()
    {
        $type = $this->entity->getType();

        if(!$type) return '';

        return $type->name;
    }

    public function status()
    {
        $status = $this->entity->getStatus();

        if(!$status) return '';

        return $status->name;
    }

}