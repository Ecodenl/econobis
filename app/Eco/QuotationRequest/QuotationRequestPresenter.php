<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 11:09
 */

namespace App\Eco\QuotationRequest;


use Laracasts\Presenter\Presenter;

class QuotationRequestPresenter extends Presenter
{

    public function name()
    {
        if(!$this->entity->name) {
            return $this->entity->name;
        }

//        return $this->entity->name_default;
        return $this->entity->name . " - default";
    }

}