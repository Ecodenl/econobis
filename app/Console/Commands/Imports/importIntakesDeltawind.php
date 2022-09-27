<?php

namespace App\Console\Commands\Imports;

use App\Eco\Contact\Contact;
use App\Eco\Intake\Intake;
use App\Eco\Opportunity\Opportunity;
use App\Eco\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class importIntakesDeltawind extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:importIntakesDeltawind';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import intakes Deltawind';

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
        Log::info('Import intakes Deltawind !');

        Auth::setUser(User::find(1));

//        Loop door tabel tmp.
        $tmps = DB::table('tmp_1')->get();
        foreach($tmps as $tmp) {

            $email = $tmp->emailadres;
            $vouchercode = $tmp->code;
            $ID = $tmp->ID;
            $vraag = $tmp->vraag;

            $contact_email = DB::table('email_addresses')
                ->where('email', $email)
                ->where('deleted_at', null)
                ->get();

            if(count($contact_email) == 1){
                $contact_id = $contact_email[0]->contact_id;
            }else{
                $contact = DB::table('tmp2')
                    ->where('ID', $ID)
                    ->whereRaw('ucase(`Voucher toewijzen aan`) = "Y"')
                    ->first();
                $contact_id = $contact ? $contact->contact_id : 0;
            }
            if($contact_id == 0) continue;

            $contact = Contact::find($contact_id);

            //Intake toevoegen
            $newIntake = Intake::make([
                'contact_id' => $contact_id,
                'intake_status_id' => 2,
                'campaign_id' => 9,
                'note' => $vraag,
            ]);
            $newIntake->address_id = $contact->primaryAddress->id;
            $newIntake->created_at = "2022-09-02";
            $newIntake->save();

            $newIntake->measuresRequested()->sync(14);

            $opportunityNew = Opportunity::create([
                'measure_category_id' => 14,
                'status_id' => 3,
                'intake_id' => $newIntake->id,
                'quotation_text' => $vouchercode,
                'desired_date' => null,
                'evaluation_agreed_date' => null,
            ]);
            $opportunityNew->updated_by_id = $opportunityNew->created_by_id;
            $opportunityNew->created_at = "2022-09-02";
            $opportunityNew->updated_at = "2022-09-02";
            $opportunityNew->save();

            $opportunityNew->measures()->sync(120);
        }

    }
}
