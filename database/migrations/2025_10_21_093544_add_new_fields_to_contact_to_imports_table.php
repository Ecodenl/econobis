<?php

use App\Eco\Contact\ContactToImportSupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_to_imports', function (Blueprint $table) {
            $table->date('member_since')->nullable()->change();
            $table->string('title')->after('id')->nullable();
            $table->string('gender')->after('id')->nullable();
            $table->date('date_of_birth')->after('last_name_prefix')->nullable();
            $table->text('iban')->after('phone_number')->nullable();
            $table->string('email_contact_financial')->after('email_contact')->nullable();
            $table->string('chamber_of_commerce_number')->after('phone_number')->nullable();
            $table->date('end_date_gas')->after('end_date')->nullable();
            $table->date('member_since_gas')->after('end_date')->nullable();
            $table->string('ean_gas')->after('end_date');
        });

        $samenOmSupplier = ContactToImportSupplier::where('code_ref', 'OM')->first();
        $samenOmSupplier->file_header = 'Reference;Person_Gender;Person_Title;Person_FirstName;Person_Infix;Person_LastName;Person_BirthDate;MailingAddress_Street;MailingAddress_Number;MailingAddress_Addition;MailingAddress_ZipCode;MailingAddress_City;MailingAddress_Country;Delivery_Street;Delivery_Number;Delivery_Addition;Delivery_City;Delivery_ZipCode;Debtor_BankAccount_Number;EmailAddress;FinancialEmailAddress;PhoneNumber;KvKNumber;Channel;EAN;MarketSegment;GasUsage;OffPeakUsage;OffPeakUsageODN;PeakUsage;PeakUsageODN;SingleUsage;SingleUsageODN;ExpectedGasUsage;ExpectedOffPeakUsage;ExpectedOffPeakUsageODN;ExpectedPeakUsage;ExpectedPeakUsageODN;ExpectedSingleUsage;ExpectedSingleUsageODN;Meter_CommunicationStatusCode;Meter_MultiplicationFactor;ZipAreaProjectName;ExpectedLatestSettlementDate;MinContractStartDate;MaxContractEndDate;resellerOrganizationId';
        $samenOmSupplier->save();

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contact_to_imports', function (Blueprint $table) {
            $table->date('member_since')->nullable(false)->change();
            $table->dropColumn('end_date_gas');
            $table->dropColumn('member_since_gas');
            $table->dropColumn('ean_gas');
            $table->dropColumn('chamber_of_commerce_number');
            $table->dropColumn('email_contact_financial');
            $table->dropColumn('iban');
            $table->dropColumn('date_of_birth');
            $table->dropColumn('gender');
            $table->dropColumn('title');
        });

        $samenOmSupplier = ContactToImportSupplier::where('code_ref', 'OM')->first();
        $samenOmSupplier->file_header = 'Coöperatie;Aanhef;Klant_Voornaam;Klant_Achternaam;Klant_Type;WebID;Klantnummer;EAN;EAN_Status;EAN_Type;EAN_Start;EAN_Eind;EAN_Adres;EAN_Postcode;EAN_Plaats;Verblijfsfunctie;Contract;Contract_Start;Contract_Eind;Termijnbedrag;SJV_LVR;SJV_TLV;NB_SJV_LVR;NB_SJV_TLV;Meterstatus;FacturenVia;Rekeningnummer;Betaalwijze;Email_Contact;Email_Facturen;Telefoonnummer;Geboortedatum;KvK;Nieuwsbrief_coöp;Nieuwsbrief_om;Herkomst;Bron;Jaarafrekenmoment;Actiecode;Marge_Factor;Marge_Factor_Reden;Ambassadeurscode';
        $samenOmSupplier->save();
    }
};
