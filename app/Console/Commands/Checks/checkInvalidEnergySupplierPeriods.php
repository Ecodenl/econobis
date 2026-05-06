<?php

namespace App\Console\Commands\Checks;

use App\Eco\Address\Address;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Helpers\Mail\MailHelper;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class checkInvalidEnergySupplierPeriods extends Command
{
    protected $signature = 'addressEnergySupplier:checkInvalidEnergySupplierPeriods {--recover=false}';
    protected $mailTo = 'xaris.software@econobis.nl';

    protected $description = 'Check op ongeldige, overlappende of niet aansluitende energieleveranciers periodes';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        Log::info('Procedure check op ongeldige, overlappende of niet aansluitende energieleveranciers periodes gestart');

        $doRecover = $this->option('recover') == 'true';

        if ($doRecover) {
            Log::info('Procedure draait MET HERSTEL van gaten.');
        }

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

            $gasIssues = $this->checkSequenceForTypes($address, [1, 3], 'Gas', $doRecover);
            if ($gasIssues['hasOverlap']) {
                $overlappingAddresses[] = $gasIssues['message'];
            }
            if ($gasIssues['hasGap']) {
                $gapAddresses[] = $gasIssues['message'];
            }

            $electricityIssues = $this->checkSequenceForTypes($address, [2, 3], 'Elektriciteit', $doRecover);
            if ($electricityIssues['hasOverlap']) {
                $overlappingAddresses[] = $electricityIssues['message'];
            }
            if ($electricityIssues['hasGap']) {
                $gapAddresses[] = $electricityIssues['message'];
            }
        }

        if (!empty($invalidPeriodAddressEnergySuppliers) || !empty($overlappingAddresses) || !empty($gapAddresses)) {
            $this->sendMail($invalidPeriodAddressEnergySuppliers, $overlappingAddresses, $gapAddresses, $doRecover);
            Log::info('Ongeldige / overlappende / niet aansluitende energieleverancier periodes gevonden, mail gestuurd');
        } else {
            Log::info('Geen ongeldige / overlappende / niet aansluitende energieleverancier periodes gevonden');
        }

        Log::info('Procedure check ongeldige, overlappende of niet aansluitende energieleveranciers periodes klaar');
    }
    private function checkSequenceForTypes(Address $address, array $types, string $label, bool $doRecover = false): array
    {
        $records = AddressEnergySupplier::query()
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

                $gapStart = $previousEndDate->copy()->addDay()->format('Y-m-d');
                $gapEnd = $currentMemberSince->copy()->subDay()->format('Y-m-d');

                $details[] =
                    'gat tussen record ' . $previous->id
                    . ' (' . ($previous->member_since ?: 'null') . ' t/m ' . ($previous->end_date ?: 'null') . ')'
                    . ' en record ' . $current->id
                    . ' (' . ($current->member_since ?: 'null') . ' t/m ' . ($current->end_date ?: 'null') . ')'
                    . ' => gat ' . $gapStart . ' t/m ' . $gapEnd;

                if ($doRecover) {
                    $this->recoverGap($address, $label, $gapStart, $gapEnd);
                }
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

    private function sendMail($invalidPeriodAddressEnergySuppliers, $overlappingAddresses, $gapAddresses, $doRecover)
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

        if($doRecover){
            $htmlBody .= "<p>MET HERSTEL van gaten!</p>";
        }

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

    private function recoverGap(Address $address, string $label, string $gapStart, string $gapEnd): void
    {
        $energySupplierUnknown = EnergySupplier::where('abbreviation', 'ONB')->first();

        if (!$energySupplierUnknown) {
            Log::error('Gat niet hersteld: energieleverancier ONB niet gevonden.');
            return;
        }

        $energySupplyTypeId = $label === 'Gas' ? 1 : 2;

        $addressEnergySupplier = new AddressEnergySupplier();
        $addressEnergySupplier->fill([
            'address_id' => $address->id,
            'energy_supplier_id' => $energySupplierUnknown->id,
            'es_number' => '',
            'energy_supply_type_id' => $energySupplyTypeId,
            'member_since' => $gapStart,
            'end_date' => $gapEnd,
            'is_current_supplier' => false,
        ]);

        $addressEnergySupplierController = new AddressEnergySupplierController();
        $response = $addressEnergySupplierController->validateAddressEnergySupplier($addressEnergySupplier, false);

        if ($response) {
            Log::error(
                'Gat niet hersteld voor contact/adres '
                . ($address->contact ? $address->contact->id : 'onbekend')
                . '/' . $address->id
                . ' [' . $label . '] '
                . $gapStart . ' t/m ' . $gapEnd
                . ': ' . $response
            );
            return;
        }

        $addressEnergySupplier->save();

        Log::info(
            'Gat hersteld voor contact/adres '
            . ($address->contact ? $address->contact->id : 'onbekend')
            . '/' . $address->id
            . ' [' . $label . '] '
            . $gapStart . ' t/m ' . $gapEnd
            . ' met energieleverancier ONB/N.v.t.'
        );
    }


}