<?php

namespace App\Console\Commands;

use App\Eco\Cooperation\Cooperation;
use App\Eco\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Eco\ContactGroup\ContactGroup;

class contactGroupsContactsForReport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'report:contactGroupsContacts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'contact_groups_contacts_for_report tabel vullen.';

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

        /* first truncate the 'contact_groups_contacts_for_report' table */
        DB::table('contact_groups_contacts_for_report')->truncate();

        $cooperation = Cooperation::first();
        if($cooperation && $cooperation->create_contacts_for_report_table) {

            Log::info('Start opnieuw vullen contact_groups_contacts_for_report tabel.');

            /* now repopulate the table again with the current data */
            $contactGroups = ContactGroup::whereIn('type_id', ['dynamic', 'composed', 'static'])->where('closed', 0)->get();

            foreach($contactGroups as $contactGroup) {
                $allContacts = $contactGroup->all_contact_group_contacts_for_report;

                foreach(array_chunk($allContacts,500) as $chunks){
                    foreach($chunks as $contact) {
                        DB::insert('insert into contact_groups_contacts_for_report (
                        contact_id,
                        contact_group_id,
                        member_to_group_since
                    ) values (?, ?, ?)',
                            [
                                $contact['id'],
                                $contactGroup->id,
                                $contact['member_to_group_since'],
                            ]
                        );
                    }
                }
            }

            Log::info('contact_groups_contacts_for_report tabel opnieuw gevuld.');
        } else {
            Log::info('Vullen contact_groups_contacts_for_report tabel staat niet aan.');
        }
    }
}
