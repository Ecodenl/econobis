<?php

use App\Eco\User\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('title_id')->unsigned()->nullable()->default(null);
            $table->foreign('title_id')->references('id')->on('titles') ->onDelete('restrict');

            $table->string('first_name')->default('');
            $table->integer('last_name_prefix_id')->unsigned()->nullable()->default(null);
            $table->foreign('last_name_prefix_id')->references('id')->on('last_name_prefixes') ->onDelete('restrict');
            $table->string('last_name')->default('');

            $table->string('phone_number')->default('');
            $table->string('mobile')->default('');
            $table->string('occupation')->default('');

            $table->dateTime('last_visit')->nullable()->default(null);
            $table->integer('visit_count')->default(0);

            $table->boolean('active')->default(1);

            $table->dropColumn('name');
        });

        User::firstOrCreate(['id' => 1], [
            'first_name' => config('app.admin_user.first_name'),
            'last_name_prefix_id' => config('app.admin_user.last_name_prefix_id') ?: null,
            'last_name' => config('app.admin_user.last_name'),
            'email' => config('app.admin_user.email'),
            'password' => bcrypt(config('app.admin_user.password')),
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
}
