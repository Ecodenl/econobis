<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cleanup_item_selections', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('cooperation_id');
            $table->unsignedBigInteger('cleanup_item_id');

            $table->string('code_ref', 64);

            // polymorphic target
            $table->string('model', 191);
            $table->unsignedBigInteger('model_id');

            $table->string('label', 255)->nullable();

            // batch/snapshot
            $table->uuid('batch_id');
            $table->timestamp('determined_at');

            // processing
            $table->timestamp('cleaned_at')->nullable();
            $table->string('status', 32)->default('determined'); // determined|cleaned|failed
            $table->text('error')->nullable();

            $table->timestamps();

            // indexes
            $table->index(['cleanup_item_id', 'status']);
            $table->index(['cooperation_id', 'code_ref']);
            $table->index(['model', 'model_id']);

            // unique inside a batch
            $table->unique(['batch_id', 'model', 'model_id'], 'cleanup_item_selections_batch_unique');

            // optional foreign keys (als je FK’s wil afdwingen)
            // $table->foreign('cooperation_id')->references('id')->on('cooperations');
            // $table->foreign('cleanup_item_id')->references('id')->on('cleanup_items');
        });

//        Schema::table('cooperation_cleanup_items', function (Blueprint $table) {
//            $table->uuid('current_batch_id')->nullable()->after('date_determined');
//            $table->index('current_batch_id', 'cci_current_batch_id_idx');
//        });

    }

    public function down(): void
    {
//        Schema::table('cooperation_cleanup_items', function (Blueprint $table) {
//            $table->dropIndex('cci_current_batch_id_idx');
//            $table->dropColumn('current_batch_id');
//        });

        Schema::dropIfExists('cleanup_item_selections');
    }
};
