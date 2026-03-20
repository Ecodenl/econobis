<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSystemCheckRunsTable extends Migration
{
    public function up(): void
    {
        Schema::create('system_check_runs', function (Blueprint $table) {
            $table->id();

            $table->string('app_cooperation_name');
            $table->string('command_ref');
            $table->string('check_code');
            $table->string('check_name');
            $table->string('batch_key')->nullable();

            $table->dateTime('start_at');
            $table->dateTime('end_at')->nullable();

            $table->boolean('finished')->default(false);
            $table->boolean('created_in_shared')->default(false);

            $table->string('status')->default('ok'); // ok|warning|recovered|error
            $table->unsignedInteger('issues_found')->default(0);
            $table->boolean('is_recover_mode')->default(false);

            $table->boolean('mail_sent')->default(false);
            $table->string('mail_to')->nullable();

            $table->text('summary')->nullable();

            $table->timestamps();

            $table->index('batch_key', 'scr_batch_key_idx');
            $table->index('app_cooperation_name');
            $table->index('command_ref');
            $table->index('check_code');
            $table->index('status');
            $table->index('finished');
            $table->index('created_in_shared');
            $table->index('start_at');
        });

        Schema::create('system_check_run_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('system_check_run_id')
                ->constrained('system_check_runs')
                ->cascadeOnDelete();

            $table->string('severity')->default('warning');

            $table->string('entity_type')->nullable();
            $table->unsignedBigInteger('entity_id')->nullable();

            $table->string('related_entity_type')->nullable();
            $table->unsignedBigInteger('related_entity_id')->nullable();

            $table->text('message')->nullable();
            $table->json('context_json')->nullable();

            $table->timestamps();

            $table->index('system_check_run_id', 'scri_run_id_idx');
            $table->index(['entity_type', 'entity_id'], 'scri_entity_idx');
            $table->index(['related_entity_type', 'related_entity_id'], 'scri_related_entity_idx');
            $table->index('severity', 'scri_severity_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('system_check_run_items');
        Schema::dropIfExists('system_check_runs');
    }
}