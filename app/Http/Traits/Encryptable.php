<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 29-1-2018
 * Time: 12:00
 */

namespace App\Http\Traits;


use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;


/**
 * Based on: https://laracasts.com/discuss/channels/laravel/encrypting-model-data Please read before using
 *
 * DO NOT USE FOR FOREIGN KEYS!!
 *
**/
trait Encryptable
{
    public function getAttribute($key)
    {
        $value = parent::getAttribute($key);
        if (in_array($key, $this->encryptable)) {
            try {
                if($value) {
                    $value = Crypt::decrypt($value);
                }
            } catch (DecryptException $e) {
                Log::error('Value not decryptable');
                return $value;
            }
        }
        return $value;
    }
    public function setAttribute($key, $value, $encrypt = true)
    {
        if($encrypt)
        {
            if (in_array($key, $this->encryptable)) {
                $value = Crypt::encrypt($value);
            }
        }
        return parent::setAttribute($key, $value);
    }
}