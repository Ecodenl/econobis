<?php

namespace App\Http\Controllers\Api\Address;

use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Task\Task;
use App\Eco\Task\TaskType;
use App\Helpers\Address\AddressHelper;
use App\Helpers\Delete\Models\DeleteAddress;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use App\Helpers\Workflow\TaskWorkflowHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Address\FullAddress;
use App\Rules\EnumExists;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddressController extends ApiController
{

    public function store(Request $request)
    {
        $data = $request->validate([
            'contactId' => ['required', 'exists:contacts,id'],
            'countryId' => 'nullable|exists:countries,id',
            'typeId' => new EnumExists(AddressType::class),
            'endDate' => 'date|nullable',
            'street' => '',
            'number' => 'integer',
            'addition' => 'string',
            'city' => '',
            'postalCode' => '',
            'primary' => 'boolean',
            'eanElectricity' => '',
            'eanGas' => '',
        ]);

        $data = $this->sanitizeData($data, [
            'typeId' => 'nullable',
            'countryId' => 'nullable',
            'primary' => 'boolean',
        ]);

        if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $data['postalCode'])){
            $data['postalCode'] = preg_replace('/\s+/', '', $data['postalCode']);
        }

        $address = new Address($this->arrayKeysToSnakeCase($data));

        $this->authorize('create', $address);

        $contact = Contact::find($data['contactId']);
        if($contact){
            $addressHelper = new AddressHelper($contact, $address);
            $contactAddressAllowed = $addressHelper->checkDoubleAddressAllowed(true);
            $checkAddressOk = $addressHelper->checkAddress(null, true);
        }

        $address->save();

        return new FullAddress($address->fresh()->load('addressEnergySuppliers.energySupplier', 'addressEnergySuppliers.energySupplyType', 'addressEnergySuppliers.energySupplyStatus', 'country'));
    }

    public function update(Request $request, Address $address)
    {
        $this->authorize('update', $address);

        $data = $request->validate([
            'contactId' => 'exists:contacts,id',
            'countryId' => 'nullable|exists:countries,id',
            'typeId' => new EnumExists(AddressType::class),
            'endDate' => 'date|nullable',
            'street' => '',
            'number' => 'integer',
            'addition' => 'string',
            'city' => '',
            'postalCode' => '',
            'primary' => 'boolean',
            'eanElectricity' => '',
            'eanGas' => '',
        ]);

        $data = $this->sanitizeData($data, [
            'typeId' => 'nullable',
            'countryId' => 'nullable',
            'primary' => 'boolean',
        ]);

        if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $data['postalCode'])){
            $data['postalCode'] = preg_replace('/\s+/', '', $data['postalCode']);
        }

        $address->fill($this->arrayKeysToSnakeCase($data));

        $contact = Contact::find($address->contact_id);
        if($contact){
            $addressHelper = new AddressHelper($contact, $address);
            $contactAddressAllowed = $addressHelper->checkDoubleAddressAllowed(true);
            $checkAddressOk = $addressHelper->checkAddress(null, true);
        }

        $address->save();

        // Twinfield customer hoeven we vanuit hier (contact) alleen bij te werken als er een koppeling is.
        // Nieuw aanmaken gebeurt vooralsnog alleen vanuit synchroniseren notas
        if($address->contact->twinfieldNumbers())
        {
            $messages = [];
            foreach (Administration::where('twinfield_is_valid', 1)->where('uses_twinfield', 1)->get() as $administration) {

                $twinfieldCustomerHelper = new TwinfieldCustomerHelper($administration, null);
                $customer = $twinfieldCustomerHelper->updateCustomer($contact);
                if($twinfieldCustomerHelper->messages)
                {
                    array_merge($messages, $twinfieldCustomerHelper->messages);
                }
            }
            if( !empty($messages) )
            {
                abort(412, implode(';', $messages));
            }
        }
        return new FullAddress($address->fresh()->load('addressEnergySuppliers.energySupplier', 'addressEnergySuppliers.energySupplyType', 'addressEnergySuppliers.energySupplyStatus', 'country'));
    }

    public function destroy(Address $address)
    {
        $this->authorize('delete', $address);

        try {
            DB::beginTransaction();

            $deleteAddress = new DeleteAddress($address);
            $result = $deleteAddress->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    public function getPicoAddress(Request $request){
        $pico = app()->make('pico');

        $pc = $request->input('postalCode');

        if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $pc)){
            $pc = preg_replace('/\s+/', '', $pc);
        }

        $address = $pico->bag_adres_pchnr(['query' => ['pc' => $pc, 'hnr' => $request->input('number')]]);

        //Be carefull when retrieving extra values. In the normal flow this method is called only once, with the first housenumber entered(e.g. 1 for house number 18).
        $street = '';
        $city = '';

        if(!empty($address[0])) {
            if (isset($address['straat'][0])) {
                $street = $address[0]['straat'];
            }

            if (isset($address['woonplaats'][0])) {
                $city = $address[0]['woonplaats'];
            }
        }

        return ['street' => $street, 'city' => $city];

    }

    public function createTaskEndDateAddress(Address $address)
    {
        //Make task note of changes
        $note = "Einddatum oud adres is bereikt voor adres:\n";
        $note = $note . "Contact  : " . $address->contact->full_name . "\n";
        $note = $note . "Adres  : " . $address->street . ' ' . $address->number . ($address->addition ? ('-' . $address->addition) : '') . "\n";
        $note = $note . "Postcode  : " . $address->postal_code . "\n";
        $note = $note . "Plaats  : " . $address->city . "\n";

        // todo WM: vooralsnog maar een default portal tasktype.
        $taskTypeForPortal = TaskType::where('default_portal_task_type', true)->first();

        $newTask = new Task();
        $newTask->note = $note;
        $newTask->type_id = $taskTypeForPortal->id;
        $newTask->contact_id = $address->contact_id;
        $newTask->responsible_user_id = $address->contact->owner_id;
        $newTask->responsible_team_id = null;
        $newTask->date_planned_start = Carbon::today();

        $newTask->save();

        if ($newTask->type && $newTask->type->uses_wf_new_task) {
            $taskWorkflowHelper = new TaskWorkflowHelper($newTask);
            $processed = $taskWorkflowHelper->processWorkflowEmailNewTask();
            if($processed)
            {
                $newTask->date_sent_wf_new_task =  Carbon::now();
                $newTask->save();
            }
        }
    }

}
