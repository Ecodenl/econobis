<?php

use App\Eco\Email\Email;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeEmailContactRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //reset all foreign keys
        $emails = Email::all();

        foreach ($emails as $email){
            $email->contact_id = null;
            $email->save();
        }

        Schema::table('emails', function (Blueprint $table) {
            $table->dropForeign(['contact_id']);
            $table->dropColumn('contact_id');
        });

        Schema::create('contact_email', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unsignedInteger('email_id');
            $table->foreign('email_id')
                ->references('id')->on('emails')
                ->onDelete('restrict');

            $table->unique(['contact_id', 'email_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contact_email');

        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedInteger('contact_id')->nullable()->default(null);
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');
        });
    }
}
