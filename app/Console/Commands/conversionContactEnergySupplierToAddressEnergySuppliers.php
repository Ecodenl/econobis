<?php

namespace App\Console\Commands;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\ParticipantProject\ParticipantProject;
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
                    'end_date' => Carbon::parse('1999-12-31')->format('Y-m-d'),
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

        $addressEnergySuppliers = AddressEnergySupplier::orderBy('member_since', 'desc')->get();
        foreach($addressEnergySuppliers as $addressEnergySupplier) {

            if(!$addressEnergySupplier->is_current_supplier && $addressEnergySupplier->member_since==null && $addressEnergySupplier->end_date==null) {
                $addressEnergySupplier->member_since = Carbon::parse('1900-01-01')->format('Y-m-d');
                $addressEnergySupplier->end_date = Carbon::parse('1999-12-31')->format('Y-m-d');
                $addressEnergySupplier->save();
                continue;
            }

            if($addressEnergySupplier->member_since == null){
                if($addressEnergySupplier->is_current_supplier){
                    $addressEnergySupplier->member_since = Carbon::parse('2000-01-01')->format('Y-m-d');
                } else {
                    $addressEnergySupplier->member_since = Carbon::parse('1900-01-01')->format('Y-m-d');
                }
                $addressEnergySupplier->save();
            }

        }

        $addressEnergySuppliers = AddressEnergySupplier::where('member_since', '2000-01-01')
            ->where('is_current_supplier', true)
            ->get();
        foreach($addressEnergySuppliers as $addressEnergySupplier) {
            $filterTypeIdArray = [1, 2, 3];
            if($addressEnergySupplier->energy_supply_type_id == 1 ){
                $filterTypeIdArray = [1, 3];
            }
            if($addressEnergySupplier->energy_supply_type_id == 2 ){
                $filterTypeIdArray = [2, 3];
            }
            $previousAddressEnergySuppliers = AddressEnergySupplier::where('address_id', $addressEnergySupplier->address_id)
                ->whereIn('energy_supply_type_id', $filterTypeIdArray )
                ->whereNotNull('member_since')
                ->where('member_since', '<', $addressEnergySupplier->member_since)
                ->orderBy('member_since', 'asc');
            if(!$previousAddressEnergySuppliers->exists()){
                $addressEnergySupplier->member_since = Carbon::parse('1900-01-01')->format('Y-m-d');
                $addressEnergySupplier->save();
            }
        }

        $addressEnergySuppliers = AddressEnergySupplier::whereNull('end_date')
            ->orderBy('member_since', 'desc')->get();
        foreach($addressEnergySuppliers as $addressEnergySupplier) {

            if($addressEnergySupplier->member_since_next != '9999-12-31'){
                $addressEnergySupplier->end_date = Carbon::parse($addressEnergySupplier->member_since_next)->subDay()->format('Y-m-d');
                $addressEnergySupplier->save();
            } else if (!$addressEnergySupplier->is_current_supplier){
                $addressEnergySupplier->end_date = Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d');
                $addressEnergySupplier->save();
            }
        }

        $addressEnergySupplierController = new AddressEnergySupplierController();
        $addressEnergySuppliers = AddressEnergySupplier::all();
        foreach($addressEnergySuppliers as $addressEnergySupplier) {
            $addressEnergySupplierController->determineIsCurrentSupplier($addressEnergySupplier);
        }


        $participationsWithoutAddress = ParticipantProject::whereNull('address_id')->get();
        foreach ($participationsWithoutAddress as $participationToChange){
            if(!$participationToChange->contact->primaryAddress){
                $addressNew = Address::create([
                    'contact_id' => $participationToChange->contact->id,
                    'type_id' => 'old',
                    'end_date' => Carbon::parse('1999-12-31')->format('Y-m-d'),
                    'street' => 'Onbekend',
                    'number' => 0,
                    'addition' => '',
                    'city' => 'Onbekend',
                    'postal_code' => '9999ZZ',
                    'primary' => true,
                ]);
                $participationToChange->address_id = $addressNew->id;
            } else {
                $participationToChange->address_id = $participationToChange->contact->primaryAddress->id;
            }
            $participationToChange->save();
        }

        // Re-add Dispatcher
        AddressEnergySupplier::setEventDispatcher($dispatcher);

    }
}
