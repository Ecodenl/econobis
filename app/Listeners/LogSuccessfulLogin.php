<?php

namespace App\Listeners;

use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Login;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Laravel\Passport\Events\AccessTokenCreated;

class LogSuccessfulLogin
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Login  $event
     * @return void
     */
    public function handle(AccessTokenCreated $event)
    {
        $user = User::find($event->userId);

        /**
         * Check of er een user is aangezien deze functie ook wordt
         * aangeroepen bij het inloggen van een PortalUser, dan
         * hoeft er geen visit count worden bijgehouden.
         */
        if($user){
            $user->visit_count = $user->visit_count + 1;
            $user->last_visit = new Carbon();

            $user->save();
        }
    }
}
