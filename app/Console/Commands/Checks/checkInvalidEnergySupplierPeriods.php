<?php

namespace App\Console\Commands\Checks;

use App\Eco\Address\Address;
use App\Helpers\Mail\MailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class checkInvalidEnergySupplierPeriods extends Command
{
    protected $signature = 'addressEnergySupplier:checkInvalidEnergySupplierPeriods';
    protected $mailTo = 'xaris.software@econobis.nl';

    protected $description = 'Check op ongeldige, overlappende of niet aansluitende energieleveranciers periodes hebben';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        Log::info('Procedure check op ongeldige, overlappende of niet aansluitende energieleveranciers periodes gestart');

        $invalidPeriodAddressEnergySuppliers = [];
        $overlappingAddresses = [];
        $gapAddresses = [];

        $addresses = Address::all();

        foreach ($addresses as $address) {
            $addressEnergySuppliers = $address->addressEnergySuppliers()->get();

            if ($addressEnergySuppliers->isEmpty()) {
                continue;
            }

            foreach ($addressEnergySuppliers as $addressEnergySupplier) {
                $memberSince = $addressEnergySupplier->member_since
                    ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d')
                    : '1900-01-01';

                $endDate = $addressEnergySupplier->end_date
                    ? Carbon::parse($addressEnergySupplier->end_date)->format('Y-m-d')
                    : '9999-12-31';

                if ($endDate < $memberSince) {
                    $invalidPeriodAddressEnergySuppliers[] =
                        ($address->contact ? $address->contact->id : 'onbekend')
                        . '/' . $address->id
                        . ' (record ' . $addressEnergySupplier->id . ')';
                }
            }

            $gasIssues = $this->checkSequenceForTypes($address, [1, 3], 'Gas');
            if ($gasIssues['hasOverlap']) {
                $overlappingAddresses[] = $gasIssues['message'];
            }
            if ($gasIssues['hasGap']) {
                $gapAddresses[] = $gasIssues['message'];
            }

            $electricityIssues = $this->checkSequenceForTypes($address, [2, 3], 'Elektriciteit');
            if ($electricityIssues['hasOverlap']) {
                $overlappingAddresses[] = $electricityIssues['message'];
            }
            if ($electricityIssues['hasGap']) {
                $gapAddresses[] = $electricityIssues['message'];
            }
        }

        if (!empty($invalidPeriodAddressEnergySuppliers) || !empty($overlappingAddresses) || !empty($gapAddresses)) {
            $this->sendMail($invalidPeriodAddressEnergySuppliers, $overlappingAddresses, $gapAddresses);
            Log::info('Ongeldige / overlappende / niet aansluitende energieleverancier periodes gevonden, mail gestuurd');
        } else {
            Log::info('Geen ongeldige / overlappende / niet aansluitende energieleverancier periodes gevonden');
        }

        Log::info('Procedure check ongeldige, overlappende of niet aansluitende energieleveranciers periodes klaar');
    }

    private function checkSequenceForTypes(Address $address, array $types, string $label): array
    {
        $records = \App\Eco\AddressEnergySupplier\AddressEnergySupplier::query()
            ->where('address_id', $address->id)
            ->whereIn('energy_supply_type_id', $types)
            ->orderByRaw('CASE WHEN member_since IS NULL THEN 0 ELSE 1 END')
            ->orderBy('member_since', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        if ($records->count() <= 1) {
            return [
                'hasOverlap' => false,
                'hasGap' => false,
                'message' => null,
            ];
        }

        $hasOverlap = false;
        $hasGap = false;
        $details = [];

        $previous = null;

        foreach ($records as $current) {
            if (!$previous) {
                $previous = $current;
                continue;
            }

            $previousEndDate = $previous->end_date
                ? Carbon::parse($previous->end_date)
                : null;

            $currentMemberSince = $current->member_since
                ? Carbon::parse($current->member_since)
                : null;

            // Open einddatum terwijl er nog een volgende is -> fout / overlap-achtig probleem
            if ($previousEndDate === null) {
                $hasOverlap = true;
                $details[] =
                    'open einddatum in record ' . $previous->id
                    . ' vóór volgend record ' . $current->id;
                $previous = $current;
                continue;
            }

            // Geen member_since op huidig record is ook problematisch in een reeks
            if ($currentMemberSince === null) {
                $hasOverlap = true;
                $details[] =
                    'lege klant-sinds datum in record ' . $current->id;
                $previous = $current;
                continue;
            }

            if ($previousEndDate->gte($currentMemberSince)) {
                $hasOverlap = true;
                $details[] =
                    'overlap tussen record ' . $previous->id
                    . ' (' . ($previous->member_since ?: 'null') . ' t/m ' . ($previous->end_date ?: 'null') . ')'
                    . ' en record ' . $current->id
                    . ' (' . ($current->member_since ?: 'null') . ' t/m ' . ($current->end_date ?: 'null') . ')';
            } elseif ($previousEndDate->copy()->addDay()->lt($currentMemberSince)) {
                $hasGap = true;
                $details[] =
                    'gat tussen record ' . $previous->id
                    . ' (' . ($previous->member_since ?: 'null') . ' t/m ' . ($previous->end_date ?: 'null') . ')'
                    . ' en record ' . $current->id
                    . ' (' . ($current->member_since ?: 'null') . ' t/m ' . ($current->end_date ?: 'null') . ')';
            }

            $previous = $current;
        }

        return [
            'hasOverlap' => $hasOverlap,
            'hasGap' => $hasGap,
            'message' => !empty($details)
                ? (($address->contact ? $address->contact->id : 'onbekend')
                    . '/' . $address->id
                    . ' [' . $label . '] - '
                    . implode('; ', $details))
                : null,
        ];
    }

    private function sendMail($invalidPeriodAddressEnergySuppliers, $overlappingAddresses, $gapAddresses)
    {
        $subject = 'Controle energie leveranciers ('
            . count($invalidPeriodAddressEnergySuppliers) . '/'
            . count($overlappingAddresses) . '/'
            . count($gapAddresses) . ') - '
            . \Config::get('app.APP_COOP_NAME');

        $mail = MailHelper::to($this->mailTo);

        $htmlBody = "<!DOCTYPE html><html><head><meta http-equiv='content-type' content='text/html;charset=UTF-8'/><title>"
            . $subject
            . "</title></head><body><p>"
            . $subject
            . "</p>";

        $htmlBody .= "<p>De volgende contact/adres id's hebben ongeldige energie leverancier periodes:<br>"
            . (!empty($invalidPeriodAddressEnergySuppliers) ? implode('<br>', $invalidPeriodAddressEnergySuppliers) : 'geen')
            . "</p>";

        $htmlBody .= "<p>De volgende contact/adres id's hebben overlappende energie leverancier periodes:<br>"
            . (!empty($overlappingAddresses) ? implode('<br>', $overlappingAddresses) : 'geen')
            . "</p>";

        $htmlBody .= "<p>De volgende contact/adres id's hebben gaten in energie leverancier periodes:<br>"
            . (!empty($gapAddresses) ? implode('<br>', $gapAddresses) : 'geen')
            . "</p>";

        $htmlBody .= "</body></html>";

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}