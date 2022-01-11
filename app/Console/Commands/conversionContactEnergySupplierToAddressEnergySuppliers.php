<?php

namespace App\Console\Commands;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\EnergySupplier\AddressEnergySupplier;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
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
        $dispatcher = AddressEnergySupplier::getEventDispatcher();
        // Remove Dispatcher
        AddressEnergySupplier::unsetEventDispatcher();

        $contactEnergySuppliers = DB::table('xxx_contact_energy_supplier')->get();

        foreach($contactEnergySuppliers as $contactEnergySupplier) {

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

            $newAddress = false;
            if(!$address){
                $address = Address::create([
                    'contact_id' => $contact->id,
                    'type_id' => 'old',
                    'end_date' => Carbon::parse('1999-12-31'),
                    'street' => 'Onbekend',
                    'number' => 0,
                    'addition' => '',
                    'city' => 'Onbekend',
                    'postal_code' => '9999ZZ',
                    'primary' => true,
                ]);
                $newAddress = true;
            }

            $addressEnergySupplier = AddressEnergySupplier::create([
                'address_id' => $address->id,
                'energy_supplier_id' => $contactEnergySupplier->energy_supplier_id,
                'es_number' => $contactEnergySupplier->es_number,
                'energy_supply_type_id' => $contactEnergySupplier->contact_energy_supply_type_id,
                'member_since' => $contactEnergySupplier->member_since,
                'switch_date' => $contactEnergySupplier->switch_date,
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

            if($newAddress){
                $addressConversionText = 'Geen adres gevonden. Adres Onbekend toevoegd. ';
            }else{
                $addressConversionText = $address->getType()->name . ' ';
            }
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
            DB::table('project_revenues')->where('xxx_contact_energy_supplier_id', $contactEnergySupplier->id)->update([
                "address_energy_supplier_id" => $addressEnergySupplier->id,
            ]);

        }

        $addressEnergySuppliers = AddressEnergySupplier::all();
        foreach($addressEnergySuppliers as $addressEnergySupplier) {

            if(!$addressEnergySupplier->is_current_supplier && $addressEnergySupplier->member_since==null && $addressEnergySupplier->end_date==null) {
                $addressEnergySupplier->member_since = Carbon::parse('1900-01-01');
                $addressEnergySupplier->end_date = Carbon::parse('1999-12-31');
                $addressEnergySupplier->save();
                continue;
            }

            if($addressEnergySupplier->member_since == null){
                $addressEnergySupplier->member_since = Carbon::parse('1900-01-01');
            }
            $previousAddressEnergySuppliers = AddressEnergySupplier::where('address_id', $addressEnergySupplier->address_id)
                ->whereNotNull('member_since')
                ->where('member_since', '<', $addressEnergySupplier->member_since)
                ->orderBy('member_since', 'desc');

            if($previousAddressEnergySuppliers->exists()){
                $previousAddressEnergySupplier = $previousAddressEnergySuppliers->first();
                $previousAddressEnergySupplier->end_date = Carbon::parse($addressEnergySupplier->member_since)->subDay();
                $previousAddressEnergySupplier->save();
            }
        }

        $addressEnergySuppliers = AddressEnergySupplier::where('is_current_supplier', true)->whereNull('member_since')->get();
        foreach($addressEnergySuppliers as $addressEnergySupplier) {

            $hasOldAddressEnergySupplier = AddressEnergySupplier::where('address_id', $addressEnergySupplier->address_id)
                ->where('member_since', '1900-01-01')
                ->exists();

            if($hasOldAddressEnergySupplier){
                $addressEnergySupplier->member_since = Carbon::parse('2000-01-01');
                $addressEnergySupplier->save();
            }else{
                $addressEnergySupplier->member_since = Carbon::parse('1900-01-01');
                $addressEnergySupplier->save();
            }
        }

        $addressEnergySupplierController = new AddressEnergySupplierController();
        $addressEnergySuppliers = AddressEnergySupplier::all();
        foreach($addressEnergySuppliers as $addressEnergySupplier) {
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);
        }


// Onderstaand moet per type electra / gas !
//        $addressEnergySuppliers = AddressEnergySupplier::where('is_current_supplier', false)->whereNull('end_date')->orderBy('member_since', 'asc')->orderBy('id', 'asc')->get();
//        foreach($addressEnergySuppliers as $addressEnergySupplier) {
//
//            $nextAddressEnergySuppliers = AddressEnergySupplier::where('id', '!=', $addressEnergySupplier->id)
//                ->where('address_id', $addressEnergySupplier->address_id)
//                ->whereNotNull('member_since')
//                ->where('member_since', '>=', $addressEnergySupplier->member_since)
//                ->orderBy('member_since', 'asc')
//                ->orderBy('id', 'asc');
//
//            if($nextAddressEnergySuppliers->exists()){
//                $nextAddressEnergySupplier = $nextAddressEnergySuppliers->first();
//                Log::info('Id                 : ' . $nextAddressEnergySupplier->id);
//                Log::info('Klant sinds (next) : ' . $nextAddressEnergySupplier->member_since);
//                Log::info('Einddatum (next)   : ' . $nextAddressEnergySupplier->end_date);
//                Log::info('Id                 : ' . $addressEnergySupplier->id);
//                Log::info('Klant sinds        : ' . $addressEnergySupplier->member_since);
//                Log::info('Einddatum (oud)    : ' . $addressEnergySupplier->end_date);
//                $addressEnergySupplier->end_date = Carbon::parse($nextAddressEnergySupplier->member_since)->subDay();
//                Log::info('Einddatum (nieuw)! : ' . $addressEnergySupplier->end_date);
////                $addressEnergySupplier->save();
//            }
//        }

        // Re-add Dispatcher
        AddressEnergySupplier::setEventDispatcher($dispatcher);

    }
}
