<?php

use App\Eco\Contact\ContactEmail;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contact_email', function (Blueprint $table) {
            $table->unsignedInteger('email_address_id')->nullable()->after('email_id');;
            $table->string('status_code', 16)->nullable()->default(null)->after('email_address_id');
        });

        // Conversie met Eloquent
        ContactEmail::with(['email', 'contact.primaryEmailAddress'])
            ->chunkById(200, function ($rows) {
                foreach ($rows as $contactEmail) {
                    // Zorg dat email geladen is
                    $email = $contactEmail->email;

                    if ($email && in_array($email->folder, ['removed', 'sent'])) {
                        $contactEmail->status_code = ContactEmail::STATUS_SENT;

                        // primaryEmailAddress is een Eloquent-relatie op Contact
                        $primary = $contactEmail->contact?->primaryEmailAddress;

                        // alleen id invullen als er echt een adres is
                        $contactEmail->email_address_id = $primary?->id;

                        $contactEmail->save();
                    }
                }
            });


        Schema::table('contact_email', function (Blueprint $table) {
            $table->foreign('email_address_id')
                ->references('id')
                ->on('email_addresses')
                ->onDelete('restrict');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_email', function (Blueprint $table) {
            $table->dropColumn('status_code');
            $table->dropForeign(['email_address_id']);
            $table->dropColumn('email_address_id');
        });
    }
};
