<?php

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\ContactNote\ContactNote;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Task\Task;
use App\Eco\Task\TaskPropertyValue;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeSoftdeletes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        //Current softdeletes
        $email_addresses = EmailAddress::whereNotNull('deleted_at')->get();
        $tasks = Task::whereNotNull('deleted_at')->get();
        $task_property_values = TaskPropertyValue::whereNotNull('deleted_at')->get();
        $people = Person::whereNotNull('deleted_at')->get();
        $organisations = Organisation::whereNotNull('deleted_at')->get();
        $contact_notes = ContactNote::whereNotNull('deleted_at')->get();
        $phone_numbers = PhoneNumber::whereNotNull('deleted_at')->get();
        $contacts = Contact::whereNotNull('deleted_at')->get();
        $addresses = Address::whereNotNull('deleted_at')->get();

        $variationsToRefactor = ['tasks', 'people', 'organisations', 'contacts', 'addresses'];
        $variationsLost = ['email_addresses', 'task_property_values', 'contact_notes', 'phone_numbers'];

        foreach ($variationsToRefactor as $variationToRefactor) {
            Schema::table($variationToRefactor, function (Blueprint $table) {
                $table->boolean('is_deleted')->default(0);
            });

            foreach($$variationToRefactor as $item){
                $item->is_deleted = 1;
                $item->save();
            }

            Schema::table($variationToRefactor, function (Blueprint $table) {
                $table->dropColumn('deleted_at');
            });
        }


        foreach ($variationsLost as $variationLost) {
            foreach($$variationLost as $item){
                $item->delete();
            }

            Schema::table($variationLost, function (Blueprint $table) {
                $table->dropColumn('deleted_at');
            });
        }

        //New softdeletes
        $newSoftDeletes = ['participation_production_project', 'participant_transactions'];


        foreach ($newSoftDeletes as $newSoftDelete) {
            Schema::table($newSoftDelete, function (Blueprint $table) {
                $table->boolean('is_deleted')->default(0);
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
