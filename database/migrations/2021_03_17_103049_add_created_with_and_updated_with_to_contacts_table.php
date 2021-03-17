<?php

use App\Eco\Contact\Contact;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCreatedWithAndUpdatedWithToContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('created_with', 16)->nullable()->default(null)->after('created_at');
            $table->string('updated_with', 16)->nullable()->default(null)->after('updated_at');
        });
        foreach (Contact::all() as $contact){
            $createdWith = null;
            $updatedWith = null;
            switch ($contact->status_id){
                case 'portal':
                    $createdWith =  $contact->status_id;
                    break;
                case 'webform':
                    $createdWith =  $contact->status_id;
                    break;
                default:
                    if($contact->portalUser()->count() == 0 && $contact->created_at != null) {
                        $createdWith = 'econobis';
                    }
                    if($contact->portalUser()->count() == 0 && $contact->updated_at != null){
                        $updatedWith =  'econobis';
                    }
                    break;
            }
            \Illuminate\Support\Facades\DB::table('contacts')
                ->whereId($contact->id)
                ->update([
                    'created_with' => $createdWith,
                    'updated_with' => $updatedWith,
                ]);
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contacts', 'created_with'))
        {
            Schema::table('contacts', function (Blueprint $table)
            {
                $table->dropColumn('created_with');
            });
        }
        if (Schema::hasColumn('contacts', 'updated_with'))
        {
            Schema::table('contacts', function (Blueprint $table)
            {
                $table->dropColumn('updated_with');
            });
        }

    }
}
