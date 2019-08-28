<?php

use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Order\Order;
use App\Eco\Organisation\Organisation;
use App\Eco\ParticipantTransaction\ParticipantTransaction;
use App\Eco\Person\Person;
use App\Eco\Product\Product;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class ResetSoftdeletes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Participant transacties zijn geen softdelete meer
        Schema::table('participant_transactions', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
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
