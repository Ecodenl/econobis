<?php

namespace App\Console\Commands;

use App\Eco\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class conversionParticipationsToMutationsDefault extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionParticipationsToMutationsDefault';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Maak mutatieregel aan voor aangekochte/verkochte participaties';

    public function __construct()
    {
        parent::__construct();

        Auth::setUser(User::find(1));
        $this->conversionParticipationsToMutations = new conversionParticipationsToMutations();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->conversionParticipationsToMutations->doConversion(false);

        dd('klaar');
    }
}