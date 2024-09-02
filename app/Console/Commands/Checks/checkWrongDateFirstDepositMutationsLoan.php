<?php

namespace App\Console\Commands;

use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\ProjectType;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use ParticipantMutations;

class checkWrongDateFirstDepositMutationsLoan extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'participation:checkWrongDateFirstDepositMutationsLoan';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check wrong date first_deposit for participant mutations Loan';

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
        Log::info('Procedure check op mutaties waar datum Lening afsluiten ligt na datum Bijstorten of Opname');

        $projectTypeLoan = ProjectType::where('code_ref', 'loan')->first()->id;
        $mutationTypeFirstDespositId = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id',  $projectTypeLoan)->first()->id;
        $mutationTypeDespositId = ParticipantMutationType::where('code_ref', 'deposit')->where('project_type_id',  $projectTypeLoan)->first()->id;
        $mutationTypeWithDrawalId = ParticipantMutationType::where('code_ref', 'withDrawal')->where('project_type_id',  $projectTypeLoan)->first()->id;

//        $participationsWithWrongDateEntries = DB::select(DB::raw('SELECT a.id, a.participation_id, a.type_id, a.date_entry, b.id , b.type_id, b.date_entry FROM participant_mutations as a, participant_mutations as b
//            where a.participation_id = b.participation_id
//            and a.type_id = 1
//            and b.type_id = 2
//            and a.date_entry > b.date_entry
//            order by a.participation_id'));

        $participationsWithWrongDateEntries = ParticipantMutation::from('participant_mutations as firstDeposit')
            ->leftJoin('participant_mutations as deposit', function($join) use($mutationTypeDespositId){
                $join->on('firstDeposit.participation_id', '=', 'deposit.participation_id')
                    ->where('deposit.type_id', $mutationTypeDespositId)
                    ->whereColumn('firstDeposit.date_entry', '>', 'deposit.date_entry');
            })
            ->leftJoin('participant_mutations as withDrawal', function($join) use ($mutationTypeWithDrawalId){
                $join->on('firstDeposit.participation_id', '=', 'withDrawal.participation_id')
                    ->where('withDrawal.type_id', $mutationTypeWithDrawalId)
                    ->whereColumn('firstDeposit.date_entry', '>', 'withDrawal.date_entry');
            })
            ->where('firstDeposit.type_id', $mutationTypeFirstDespositId)
            ->where(function($query) {
                $query->whereNotNull('deposit.id')
                    ->orWhereNotNull('withDrawal.id');
            })
            ->select('firstDeposit.id', 'firstDeposit.participation_id', 'firstDeposit.type_id', 'firstDeposit.date_entry',
                'deposit.id as deposit_id', 'deposit.type_id as deposit_type_id', 'deposit.date_entry as deposit_date_entry',
                'withDrawal.id as withDrawal_id', 'withDrawal.type_id as withDrawal_type_id', 'withDrawal.date_entry as withDrawal_date_entry')
            ->orderBy('firstDeposit.participation_id')
            ->get();

        if(count($participationsWithWrongDateEntries) > 0) {
            $this->sendMail($participationsWithWrongDateEntries);
            Log::info('Ongeldige mutaties waar datum Lening afsluiten ligt na datum Bijstorten of Opname, mail gestuurd.');
        } else {
            Log::info('Geen ongeldige mutaties waar datum Lening afsluiten ligt na datum Bijstorten of Opname gevonden.');
        }

        Log::info('Procedure check op mutaties waar datum Lening afsluiten ligt na datum Bijstorten of Opname klaar.');
    }

    private function sendMail($participationsWithWrongDateEntries)
    {
        $subject = 'Ongeldige mutaties waar datum Lening afsluiten ligt na datum Bijstorten of Opname! (' . count($participationsWithWrongDateEntries) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $participationsWithWrongDateEntriesHtml = "<p>De volgende deelname/mutatie id's hebben een datum Lening afsluiten die ligt na datum Bijstorten of Opname:</p>";

        foreach ($participationsWithWrongDateEntries as $participationsWithWrongDateEntry) {
            $participationsWithWrongDateEntriesHtml .=
                "Deelnemer/Mutatie Id: " . $participationsWithWrongDateEntry->participation_id . "/" . $participationsWithWrongDateEntry->id . "</br>";
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $participationsWithWrongDateEntriesHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}

