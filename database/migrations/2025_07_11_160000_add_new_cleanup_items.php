<?php

use App\Eco\Cooperation\Cooperation;
use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddNewCleanupItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cooperation_cleanup_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('cooperation_id')->nullable();
            $table->foreign('cooperation_id')->references('id')->on('cooperations');
            $table->index(['cooperation_id', 'code_ref'], 'cci_coop_code_ref_idx');

            $table->string('name');
            $table->string('code_ref');
            $table->string('date_ref')->nullable();

            $table->unsignedInteger('years_for_delete')->default(7);
//            $table->boolean('has_retention_period')->default(false);

            $table->uuid('current_batch_id')->nullable();
            $table->index('current_batch_id', 'cci_current_batch_id_idx');

            $table->string('status')->default('idle');;

            $table->unsignedInteger('determined_count')->default(0);
            $table->unsignedInteger('cleaned_count')->default(0);
            $table->unsignedInteger('failed_count')->default(0);

            $table->datetime('date_determined')->nullable();
            $table->datetime('date_cleaned_up')->nullable();

            $table->timestamps();
        });

        Schema::create('cooperation_cleanup_contacts_excluded_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('cooperation_id')->nullable();
            $table->foreign('cooperation_id', 'ccuc_excluded_group_cooperation_foreign')->references('id')->on('cooperations');
            $table->unsignedInteger('contact_group_id');
            $table->foreign('contact_group_id', 'ccuc_excluded_group_contact_group_foreign')->references('id')->on('contact_groups')->onDelete('restrict');

            $table->timestamps();
        });

        Schema::table('cooperations', function (Blueprint $table) {
            $table->boolean('cleanup_email')->default(false);
            $table->datetime('cleanup_years_contact_date_last_run_at')->nullable();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->boolean('cleanup_exception')->default(false);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('cleanup_exception');
        });

        Schema::table('cooperations', function (Blueprint $table) {
            $table->dropColumn(['cleanup_years_contact_date_last_run_at', 'cleanup_email']);
        });

        Schema::dropIfExists('cooperation_cleanup_contacts_excluded_groups');

        Schema::dropIfExists('cooperation_cleanup_items');
    }

}
