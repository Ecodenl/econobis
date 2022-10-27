<?php

namespace App\Http\JoryResources\Base;

use Illuminate\Support\Facades\Auth;
use JosKolenberg\LaravelJory\JoryResource as Original;

abstract class JoryResource extends Original
{

    abstract protected function configureForApp(): void;
    abstract protected function configureForPortal(): void;
    abstract protected function checkAuthorize(): void;

    protected function configure(): void
    {
        if(Auth::isAppUser()){
            $this->checkAuthorize();
            $this->configureForApp();
        }elseif (Auth::isPortalUser()){
            $this->configureForPortal();
        }
    }
}
