<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
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
        /* first truncate the 'contact_groups_contacts_for_report' table */
        DB::table('contact_groups_contacts_for_report')->truncate();

        /* now repopulate the table again with the current data */
//todo nog aanpassen naar alles behalve gesimuleerde groepen
        $contactGroups = ContactGroup::whereIn('type_id', ['dynamic', 'composed'])->get();

        foreach($contactGroups as $contactGroup) {
            $allContacts = $contactGroup->getAllContacts();

            foreach($allContacts as $contact) {
                DB::insert('insert into contact_groups_contacts_for_report (
                    contact_id, 
                    contact_group_id,
                    member_to_group_since
                ) values (?, ?, ?)',
                    [
                        $contact->id,
                        $contactGroup->id,
                        $contact->member_since
                    ]
                );
            }
        }

        Log::info('contact_groups_contacts_for_report tabel opnieuw gevuld.');
    }
}
