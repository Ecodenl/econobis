<?php

namespace App\Console\Commands\DontUseAnyMore;

use App\Console\Command\DontUseAnyMores\conversionParticipationsToMutations;
use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\ProjectValueCourse;
use App\Eco\User\User;
use App\Http\Controllers\Api\ParticipantMutation\ParticipantMutationController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use ParticipantTransactions;

class conversionParticipationsToMutationsLoanDiv100 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionParticipationsToMutationsLoanDiv100';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Maak mutatieregel aan voor aangekochte/verkochte participaties';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Auth::setUser(User::find(1));
        $this->conversionParticipationsToMutations = new conversionParticipationsToMutations();
        $this->conversionParticipationsToMutations->doConversion(true);

        dd('klaar');
    }
}