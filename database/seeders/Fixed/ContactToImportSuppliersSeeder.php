<?php

namespace Database\Seeders\Fixed;

use App\Eco\Contact\ContactToImportSupplier;
use Illuminate\Database\Seeder;

class ContactToImportSuppliersSeeder extends Seeder
{
    public function run(): void
    {
        $contactToImportSuppliers = [
            [
                'type' => 'csv',
                'code_ref' => 'OM',
                'supplier' => 'Samen OM',
                'file_header' => 'Reference;Person_Gender;Person_Title;Person_FirstName;Person_Infix;Person_LastName;Person_BirthDate;MailingAddress_Street;MailingAddress_Number;MailingAddress_Addition;MailingAddress_ZipCode;MailingAddress_City;MailingAddress_Country;Delivery_Street;Delivery_Number;Delivery_Addition;Delivery_City;Delivery_ZipCode;Debtor_BankAccount_Number;EmailAddress;FinancialEmailAddress;PhoneNumber;KvKNumber;Channel;EAN;MarketSegment;GasUsage;OffPeakUsage;OffPeakUsageODN;PeakUsage;PeakUsageODN;SingleUsage;SingleUsageODN;ExpectedGasUsage;ExpectedOffPeakUsage;ExpectedOffPeakUsageODN;ExpectedPeakUsage;ExpectedPeakUsageODN;ExpectedSingleUsage;ExpectedSingleUsageODN;Meter_CommunicationStatusCode;Meter_MultiplicationFactor;ZipAreaProjectName;ExpectedLatestSettlementDate;MinContractStartDate;MaxContractEndDate;resellerOrganizationId',
            ],
        ];

        foreach ($contactToImportSuppliers as $contactToImportSupplier) {
            ContactToImportSupplier::updateOrCreate(
                ['code_ref' => $contactToImportSupplier['code_ref']],
                $contactToImportSupplier
            );
        }
    }
}