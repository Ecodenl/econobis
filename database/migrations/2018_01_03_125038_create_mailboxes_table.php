<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMailboxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mailboxes', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')->default('');
            $table->string('email')->default('');
            $table->string('smtp_host')->default('');
            $table->string('smtp_port')->default('');
            $table->string('smtp_encryption')->nullable()->default(null);
            $table->string('imap_host')->default('');
            $table->string('imap_port')->default('');
            $table->string('imap_encryption')->nullable()->default(null);
            $table->string('imap_inbox_prefix')->default('');
            $table->string('username')->default('');
            $table->string('password')->default('');

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
        Schema::dropIfExists('mailboxes');
    }
}
