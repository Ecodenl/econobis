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
use Ecodenl\LvbagPhpWrapper\Client;
use Ecodenl\LvbagPhpWrapper\Lvbag;

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
                    $messages = array_merge($messages, $twinfieldCustomerHelper->messages);
                }
            }
            if( !empty($messages) )
            {
                abort(412, implode(';', $messages));
            }
        }
        return new FullAddress($address->fresh()->load('addressEnergySuppliers.energySupplier', 'addressEnergySuppliers.energySupplyType', 'addressEnergySuppliers.energySupplyStatus', 'addressDongles', 'country'));
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

    public function getLvbagAddress(Request $request){

        $pc = $request->input('postalCode');
        $huisnummer = $request->input('number');

        $secret = config('lvbag.lvbag_key');

        if(empty($secret)){
            return [
                'street' => "",
                'city' => "",
            ];
        }
        // crs is not static, you should change it accordingly to the desired call.
        $acceptCRS = 'epsg:28992';

        // Establish the connection
        $client = Client::init($secret, $acceptCRS);

        // Using the production environment endpoint
        $shouldUseProductionEndpoint = config('lvbag.lvbag_production');
        $client = Client::init($secret, $acceptCRS, $shouldUseProductionEndpoint);

        // To get extensive logging from each request
        // the client accepts any logger that follows the (PSR-3 standard)[https://github.com/php-fig/log]
        // This example uses the logger from laravel, but feel free to pass any logger that implements the \Psr\Log\LoggerInterface
//        $logger = \Illuminate\Support\Facades\Log::getLogger();
//        $client = Client::init($secret, $acceptCRS, $shouldUseProductionEndpoint, $logger);

        $lvbag = Lvbag::init($client);

        if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $pc)){
            $pc = preg_replace('/\s+/', '', $pc);
        }

        // Only get address from Lvbag if the postalcode is default NL format: 4 times numeric, directly followed by two times alphanumeric (for example 1616AA)
        // and the housenumber is between 1 and 99999
        if(!preg_match('/^\d{4}[A-Za-z]{2}$/', $pc) || !is_numeric($huisnummer) || $huisnummer <= 0 || $huisnummer > 99999) {
            return [
                'street' => "",
                'city' => "",
            ];
        }

        $addresses = $lvbag->adresUitgebreid()
        ->list([
            'postcode' => $pc,
            'huisnummer' => $huisnummer,
        ]);

        $street = ($addresses && $addresses[0]) ? $addresses[0]['korteNaam'] : "";
        $city = ($addresses && $addresses[0]) ? $addresses[0]['woonplaatsNaam'] : "";

        return [
            'street' => $street,
            'city' => $city
        ];
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
