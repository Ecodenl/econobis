<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 13:19
 */

namespace App\Eco\Webform;


use Carbon\Carbon;

class WebformObserver
{

    public function saving(Webform $webform)
    {
        if($webform->isDirty(['api_key'])) $webform->api_key_date = new Carbon();
    }
    
}