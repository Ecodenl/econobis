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

class AddSoftdeletes2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        //New softdeletes
        $newSoftDeletes = ['email_templates', 'document_templates', 'documents'];

        foreach ($newSoftDeletes as $newSoftDelete) {
            Schema::table($newSoftDelete, function (Blueprint $table) {
                $table->softdeletes();
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
        //New softdeletes
        $newSoftDeletes = ['email_templates', 'document_templates', 'documents'];

        foreach ($newSoftDeletes as $newSoftDelete) {
            Schema::table($newSoftDelete, function (Blueprint $table) {
                $table->dropColumn('deleted_at');
            });
        }
    }
}
