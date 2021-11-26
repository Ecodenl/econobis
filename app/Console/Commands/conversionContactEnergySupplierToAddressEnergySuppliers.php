<?php

namespace App\Console\Commands;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\EnergySupplier\AddressEnergySupplier;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class conversionContactEnergySupplierToAddressEnergySuppliers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionContactESToAddressES';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Conversie contact energy suppliers to address energy suppliers';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $contactEnergySuppliers = DB::table('xxx_contact_energy_supplier')->get();

        foreach($contactEnergySuppliers as $contactEnergySupplier) {
//            print_r("contactEnergySupplier Id: " . $contactEnergySupplier->id . "\n");

            $contact = Contact::find($contactEnergySupplier->contact_id);
            if(!$contact){
                DB::table('xxx_contact_energy_supplier')->where('id', $contactEnergySupplier->id)->update(["address_conversion_text" => "Geen conversie, contact kon niet bepaald worden!"]);
                continue;
            }

            $address = $contact->primaryAddress;
            if(!$address){
                $address = Address::where('contact_id', $contactEnergySupplier->contact_id)->where('type_id', 'visit')->orderBy('id', 'desc')->first();
                if(!$address){
                    $address = Address::where('contact_id', $contactEnergySupplier->contact_id)->orderBy('id', 'desc')->first();
                }
            }
            if(!$address){
                DB::table('xxx_contact_energy_supplier')->where('id', $contactEnergySupplier->id)->update(["address_conversion_text" => "Geen conversie, adres kon niet bepaald worden!"]);
                continue;
            }

            $addressEnergySupplier = AddressEnergySupplier::create([
                'address_id' => $address->id,
                'energy_supplier_id' => $contactEnergySupplier->energy_supplier_id,
                'es_number' => $contactEnergySupplier->es_number,
                'energy_supply_type_id' => $contactEnergySupplier->contact_energy_supply_type_id,
                'member_since' => $contactEnergySupplier->member_since,
                'energy_supply_status_id' => $contactEnergySupplier->contact_energy_supply_status_id,
                'is_current_supplier' => $contactEnergySupplier->is_current_supplier,
            ]);

            $address->ean_electricity = $contactEnergySupplier->ean_electricity;
            $address->ean_gas = $contactEnergySupplier->ean_gas;
            $address->save();

            foreach ($contact->participations as $participation){
                $participation->address_id = $address->id;
                $participation->save();
            }

            $addressConversionText = $address->getType()->name . ' ';
            if($address->primary){
                $addressConversionText .= '(primaire) ';
            }
            if($address->street){
                $addressConversionText .= $address->street . ' ';
            }
            if($address->number){
                $addressConversionText .= $address->number . ' ';
            }
            if($address->addition){
                $addressConversionText .= $address->addition . ' ';
            }
            if($address->postal_code){
                $addressConversionText .= $address->postal_code . ' ';
            }
            if($address->city){
                $addressConversionText .= $address->city . ' ';
            }
            if($address->country_id){
                $addressConversionText .= '(' . $address->country_id . ') ';
            }

            DB::table('xxx_contact_energy_supplier')->where('id', $contactEnergySupplier->id)->update([
                "address_id" => $address->id,
                "address_energy_supplier_id" => $addressEnergySupplier->id,
                "address_conversion_text" => $addressConversionText
            ]);

        }

        $addressEnergySuppliers = AddressEnergySupplier::all();
        foreach($addressEnergySuppliers as $addressEnergySupplier) {
//            print_r("addressEnergySupplier Id: " . $addressEnergySupplier->id . "\n");

            $previousAddressEnergySuppliers = $addressEnergySupplier->address->addressEnergySuppliers
            ->whereNotNull('member_since')
            ->where('member_since', '<', $addressEnergySupplier->member_since)
            ->sortByDesc('member_since');
        if($previousAddressEnergySuppliers && count($previousAddressEnergySuppliers) > 0){
            $previousAddressEnergySupplier = $previousAddressEnergySuppliers->first();
            $previousAddressEnergySupplier->end_date = Carbon::parse($addressEnergySupplier->member_since)->subDay();
            $previousAddressEnergySupplier->save();
//            print_r("Current klant sinds: " . $addressEnergySupplier->member_since . "\n");
//            print_r("Previous AddressEnergySupplier: " . $previousAddressEnergySupplier->id . "\n");
//            print_r("Previous klant sinds: " . $previousAddressEnergySupplier->member_since . "\n");
//            print_r("Previous Eind datum: " . $previousAddressEnergySupplier->end_date . "\n");
        }
    }

    }
}
