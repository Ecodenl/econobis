<?php

namespace App\Http\JoryResources\Base;

use Illuminate\Support\Facades\Auth;
use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryResource as Original;

abstract class JoryResource extends Original
{
    public function getConfig(): Config
    {
        if (!$this->config) {
            $this->config = new Config($this->modelClass);

            if(Auth::isAppUser()){
                $this->configure();
            }elseif (Auth::isPortalUser() && method_exists($this, 'configureForPortal')){
                $this->configureForPortal();
            }
        }

        return $this->config;
    }

}
