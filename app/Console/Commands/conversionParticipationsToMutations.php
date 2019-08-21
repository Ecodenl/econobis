<?php

namespace App\Console\Commands;

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

class conversionParticipationsToMutations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionParticipationsToMutations';

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

        Auth::setUser(User::find(1));
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->makeFirstDepositMutations();
        $this->makeWithDrawalMutations();

        dd('klaar');
    }

    /**
     * Make first deposit mutation for participants which has participations granted
     *
     * @return mixed
     */
    public function makeFirstDepositMutations()
    {
        $participants = ParticipantProject::where('participations_granted', '>', 0)->where('participations_definitive', 0)->get();

        foreach ($participants as $participant) {
            $projectType = $participant->project->projectType;
            $mutationType = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id', $projectType->id)->first();

            /* STATUSSEN CONVERSIE  ---
            | Oud = Nieuw
            | 4 = 1(Interesse)
            | 1 = 2(Optie/Inschrijving)
            | 2 = 4(Definitief)
            | 5 = 4 (Beeindigd, nu Definitief, later verkoopmutatie? + datum beeindigd)
            | 3 = 4 (Overgedragen, nu Definitief, later verkoopmutatie? + datum beeindigd)
            | null = 3(Toegekend)
            --------------------------- */
            switch($participant->status_id) {
                case 4:
                    $statusId = 1;
                    break;
                case 1:
                    $statusId = 2;
                    break;
                case 2:
                case 3:
                case 5:
                    $statusId = 4;
                    break;
                default:
                    $statusId = null;
                    break;
            }

            $participantMutation = new ParticipantMutation();
            $participantMutation->participation_id = $participant->id;
            $participantMutation->type_id = $mutationType->id;
            $participantMutation->status_id = $statusId;

            switch($statusId) {
                case 1:
                    if($projectType->code_ref == 'loan') {
                        $participantMutation->amount = $participant->participations_requested / 100; // Loan is filled in cents
                        $participantMutation->amount_interest = $participant->participations_requested / 100; // Loan is filled in cents
                    } else {
                        $participantMutation->quantity = $participant->participations_requested;
                        $participantMutation->quantity_interest = $participant->participations_requested;
                    }
                    break;
                case 2:
                    if($projectType->code_ref == 'loan') {
                        $participantMutation->amount = $participant->participations_requested / 100; // Loan is filled in cents
                        $participantMutation->amount_option = $participant->participations_requested / 100; // Loan is filled in cents
                    } else {
                        $participantMutation->quantity = $participant->participations_requested;
                        $participantMutation->quantity_option = $participant->participations_requested;
                    }
                    break;
                case 3:
                case 4:
                case 5:
                    if($projectType->code_ref == 'loan') {
                        $participantMutation->amount = $participant->participations_granted / 100; // Loan is filled in cents
                        $participantMutation->amount_final = $participant->participations_granted / 100; // Loan is filled in cents
                    } else {
                        $participantMutation->quantity = $participant->participations_granted;
                        $participantMutation->quantity_final = $participant->participations_granted;
                    }
                    $participantMutation->date_entry = $participant->date_register;
                    $participantMutation->date_payment = $participant->date_payed;
                    break;
                default:
                    $statusId = null;
                    break;
            }

//            dd($participantMutation);
            DB::transaction(function () use ($participantMutation, $projectType) {
                // Calculate participation worth based on current book worth of project
                if($participantMutation->status->code_ref === 'final' && $projectType->code_ref !== 'loan') {
                    $bookWorth = ProjectValueCourse::where('project_id', $participantMutation->participation->project_id)
                        ->where('date', '<=', $participantMutation->date_entry)
                        ->orderBy('date', 'desc')
                        ->value('book_worth');

                    $participantMutation->participation_worth = $bookWorth * $participantMutation->quantity;
                }

                $participantMutation->save();

                // Herbereken de afhankelijke gegevens op het participantProject
                $participantMutation->participation->calculator()->run()->save();

                // Herbereken de afhankelijke gegevens op het project
                $participantMutation->participation->project->calculator()->run()->save();
            });
        }
    }

    /**
     * Make first deposit mutation for participants which has participations granted
     *
     * @return mixed
     */
    public function makeWithDrawalMutations()
    {
        $participants = ParticipantProject::where('participations_sold', '!=', 0)->where('participations_definitive', '!=', 0)->get();

        foreach ($participants as $participant) {
            $mutationType = ParticipantMutationType::where('code_ref', 'withDrawal')->where('project_type_id', $participant->project->project_type_id)->first();

            $participantTransactions = DB::table('participant_transactions')->where('participation_id', $participant->id)->where('type_id', 3)->get();

            $project = $participant->project;

            foreach($participantTransactions as $participantTransaction) {
                $quantity = $participantTransaction->amount / $project->participation_worth;
//                dd($quantity);
                $participantMutation = new ParticipantMutation();
                $participantMutation->participation_id = $participant->id;
                $participantMutation->type_id = $mutationType->id;
                $participantMutation->status_id = 4; // 4 is final
                $participantMutation->quantity = '-' . $quantity;
                $participantMutation->quantity_final = '-' . $quantity;
                $participantMutation->date_entry = $participantTransaction->date_transaction;
                $participantMutation->date_payment = $participantTransaction->date_booking;

                $participantMutation->participation_worth = $participantTransaction->amount;

                DB::transaction(function () use ($participantMutation, $participantTransaction) {
                    // Calculate participation worth based on current book worth of project
                    if($participantMutation->status->code_ref === 'final' && $participantMutation->participation->project->projectType->code_ref !== 'loan') {
                        $participantMutation->participation_worth = $participantTransaction->amount;
                    }
//                    dd($participantMutation->participation_worth);
                    $participantMutation->save();

                    // Herbereken de afhankelijke gegevens op het participantProject
                    $participantMutation->participation->calculator()->run()->save();

                    // Herbereken de afhankelijke gegevens op het project
                    $participantMutation->participation->project->calculator()->run()->save();
                });
            }
        }
    }
}
