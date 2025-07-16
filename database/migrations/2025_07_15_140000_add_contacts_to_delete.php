<?php

use App\Eco\Contact\Contact;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Organisation\Organisation;
use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class AddContactsToDelete extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//        Schema::create('contacts_to_delete', function (Blueprint $table) {
//            $table->increments('id');
//            $table->unsignedInteger('contact_id')->nullable();
//            $table->foreign('contact_id')->references('id')->on('contacts');
//            $table->datetime('date_last_invoice')->nullable();
//        });

        Schema::table('cooperations', function (Blueprint $table) {
            $table->unsignedInteger('contact_id_deleted_contacts');
        });

        $this->createContactDeletedContacts();


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $cooperation = Cooperation::first();

        if ($cooperation && $cooperation->contact_id_deleted_contacts > 0) {
            $contactOrganisation = Contact::onlyTrashed()->find($cooperation->contact_id_deleted_contacts);
            $organisation = Organisation::onlyTrashed()->where('contact_id', $cooperation->contact_id_deleted_contacts)->first();

            if ($organisation) {
                $organisation->forceDelete();
            }
            if ($contactOrganisation) {
                $contactOrganisation->forceDelete();
            }
        }

        Schema::table('cooperations', function (Blueprint $table) {
            $table->dropColumn('contact_id_deleted_contacts');
        });

//        Schema::dropIfExists('contacts_to_delete');
    }

    /**
     * @return void
     */
    private function createContactDeletedContacts(): void
    {
        $adminUser = User::where('email', config('app.admin_user.email'))->first();
        $timeStampNow = Carbon::now();

        $contactOrganisation = Contact::create([
            'type_id' => 'organisation',
            'status_id' => 'system',
            'number' => 'XXXXXX',
            'created_by_id' => $adminUser ? $adminUser->id : 1,
            'created_at' => $timeStampNow,
            'created_with' => 'econobis',
            'updated_by_id' => $adminUser ? $adminUser->id : 1,
            'updated_at' => $timeStampNow,
            'updated_with' => 'econobis',
        ]);

        Organisation::create([
            'contact_id' => $contactOrganisation->id,
            'name' => 'Contact verwijderd',
            'statutory_name' => '',
            'created_at' => $timeStampNow,
            'updated_at' => $timeStampNow,
            'deleted_at' => $timeStampNow,
        ]);
        $contactOrganisation->deleted_at = $timeStampNow;
        $contactOrganisation->save();

        $cooperation = Cooperation::first();
        if ($cooperation) {
            $cooperation->contact_id_deleted_contacts = $contactOrganisation->id;
            $cooperation->saveQuietly();
        }
    }
}

//        $contactDeletedContacts = new Contact();
//        $contactDeletedContacts->name = config('');
//        $contactDeletedContacts->type_id = 'organisation';
//        $contactDeletedContacts->xxx_is_coach = false;
//        $contactDeletedContacts->full_name = 'Contact verwijderd';
//        $contactDeletedContacts->number = 'XXXXXX';
//        $contactDeletedContacts->newsletter = false;
//        $contactDeletedContacts->liable = false;
//        $contactDeletedContacts->liability_amount = 0;
//        $contactDeletedContacts->did_agree_avg = false;
//        $contactDeletedContacts->obligations_current = 0;
//        $contactDeletedContacts->participations_current = 0;
//        $contactDeletedContacts->postalcode_link_capital_current = 0;
//        $contactDeletedContacts->loan_current = 0;
//        $contactDeletedContacts->is_collect_mandate = false;
//        $contactDeletedContacts->collect_mandate_code = '';
//        $contactDeletedContacts->collect_mandate_collection_schema = '';
//
//        $adminUser = User::where('email', config('app.admin_user.email'))->first();
//        $contactDeletedContacts->created_by_id = $adminUser ? $adminUser->id : 1;
//        $contactDeletedContacts->updated_by_id = $adminUser ? $adminUser->id : 1;
//        $contactDeletedContacts->created_at = Carbon::now();
//        $contactDeletedContacts->created_with = 'econobis';
//        $contactDeletedContacts->updated_at = Carbon::now();
//        $contactDeletedContacts->updated_with = 'econobis';
//        $contactDeletedContacts->deleted_at = Carbon::now();
//
//        $contactDeletedContacts->saveQuietly();
