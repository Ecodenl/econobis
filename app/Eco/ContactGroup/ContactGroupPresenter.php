<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 23-11-2017
 * Time: 15:48
 */

namespace App\Eco\ContactGroup;


use Laracasts\Presenter\Presenter;

class ContactGroupPresenter extends Presenter
{

    public function closedStatus()
    {
        return $this->entity->closed ? 'Gesloten' : 'Open';
    }
}