<?php

namespace App\Jobs;

use App\Eco\User\User;
use App\Helpers\Alfresco\AlfrescoHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CreateAlfrescoUserJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user, $password;

    /**
     * Create a new job instance.
     *
     * @param $user User the user which we have to create an alfresco account for
     * @param $password String the unencrypted/unhashed password of the new user.
     *
     * @return void
     */
    public function __construct(User $user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $alfrescoHelper = new AlfrescoHelper(env('ALFRESCO_ADMIN_USERNAME'), env('ALFRESCO_ADMIN_PASSWORD'));

        $alfrescoHelper->createNewAccount($this->user, $this->password);
    }
}
