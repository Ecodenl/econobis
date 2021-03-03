<?php

namespace App\Http\JoryResources\Base;

use Illuminate\Support\Facades\Auth;
use JosKolenberg\LaravelJory\JoryResource as Original;

abstract class JoryResourceAuthorized extends Original
{

    abstract protected function authorizeForApp($builder, $user): void;
    abstract protected function authorizeForPortal($builder, $user): void;

    public function authorize($builder, $user = null): void
    {
        if(Auth::isAppUser()){
            $this->authorizeForApp($builder, $user);
        }elseif (Auth::isPortalUser()){
            $this->authorizeForPortal($builder, $user);
        }
    }

    abstract protected function configureForApp(): void;
    abstract protected function configureForPortal(): void;

    protected function configure(): void
    {
        if(Auth::isAppUser()){
            $this->configureForApp();
        }elseif (Auth::isPortalUser()){
            $this->configureForPortal();
        }
    }
}
