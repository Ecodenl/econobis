<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('portal_users', function (Blueprint $table) {
            $table->unsignedInteger('failed_logins')->default(0);
            $table->timestamp('blocked_until')->nullable();
            $table->boolean('blocked_permanent')->default(false);
        });

        Schema::create('portal_user_login_attempts', function (Blueprint $table) {
            $table->increments('id'); // unsigned INT
            $table->unsignedInteger('portal_user_id')->nullable(); // unsigned INT
            $table->foreign('portal_user_id')
                ->references('id')->on('portal_users')
                ->nullOnDelete();
            $table->string('identifier')->nullable();   // bv. email/username zoals gepost
            $table->string('ip', 45)->nullable();       // IPv4/IPv6
            $table->string('user_agent', 512)->nullable();
            $table->boolean('succeeded')->default(false);
            $table->string('result')->nullable();       // 'ok', 'invalid_grant', 'blocked_until', 'blocked_permanent', 'rate_limited', etc.
            $table->unsignedInteger('failed_logins_after')->nullable(); // teller na deze poging
            $table->timestamp('blocked_until')->nullable(); // indien blokkade gezet/actief
            $table->boolean('blocked_permanent')->default(false);
            $table->timestamps();

            $table->index(['identifier', 'created_at']);
            $table->index('ip');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portal_user_login_attempts');

        Schema::table('portal_users', function (Blueprint $table) {
            $table->dropColumn('failed_logins');
            $table->dropColumn('blocked_until');
            $table->dropColumn('blocked_permanent');
        });
    }
};
