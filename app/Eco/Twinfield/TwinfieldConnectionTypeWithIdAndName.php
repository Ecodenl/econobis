<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 06-10-2017
 * Time: 15:19
 */

namespace App\Eco\Twinfield;


use JosKolenberg\Enum\EnumWithIdAndName;

class TwinfieldConnectionTypeWithIdAndName extends EnumWithIdAndName
{

    const WEBSERVICE = 'webservice';
    const OPENID = 'openid';

    protected static function seed()
    {
        return [
            new static(static::WEBSERVICE, 'Webservice connection'),
            new static(static::OPENID, 'OpenId connection (Oauth2)'),
        ];
    }
}