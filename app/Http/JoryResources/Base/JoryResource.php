<?php

namespace App\Http\JoryResources\Base;

use Illuminate\Support\Facades\Auth;
use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryResource as Original;

abstract class JoryResource extends Original
{

    abstract protected function configureForPortal(): void;

    public function getConfig(): Config
    {
        if (!$this->config) {
            $this->config = new Config($this->modelClass);

            if(Auth::isAppUser()){
                $this->configure();
            }elseif (Auth::isPortalUser()){
                $this->configureForPortal();
            }
        }

        return $this->config;
    }

}
