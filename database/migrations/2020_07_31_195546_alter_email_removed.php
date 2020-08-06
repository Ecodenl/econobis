<?php

use App\Eco\Email\Email;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterEmailRemoved extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedInteger('removed_by_id')->nullable()->default(null)->after('closed_by_id');
            $table->foreign('removed_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->dateTime('date_removed')->nullable()->default(null)->after('closed_by_id');
        });

        $emails = Email::where('folder', 'removed')->get();
        foreach ($emails as $email){
            $email->date_removed = $email->updated_at;
            $email->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropForeign(['removed_by_id']);
            $table->dropColumn('removed_by_id');
            $table->dropColumn('date_removed');
        });

    }
}
