<?php

namespace App\Http\Controllers\Api\Address;

use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Project\Project;
use App\Helpers\Delete\Models\DeleteAddress;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Address\FullAddress;
use App\Rules\EnumExists;
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

// todo WM: Hier moet controle komen op dubbele adressen bij deelnemers SCE projecten
//          waar check daarop aanstaat.
//        abort(412, 'Fout produceren 1');

        $address->save();

        return new FullAddress($address->fresh()->load('country'));
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

// todo WM: Hier moet controle komen op dubbele adressen bij deelnemers SCE projecten
//          waar check daarop aanstaat.
//        abort(412, 'Fout produceren 2');

//        $project = Project::find($participantProject->project_id);
//        $contact = Contact::find($participantProject->contact_id);
//
//        $errors = [];
//
//        if($project->check_double_addresses){
//            $hasError = $this->checkDoubleAddresses($errors, $project, $contact);
//            if($hasError){
//                return ['id' => 0, 'message' => $errors];
//            }
//        }

        $address->save();

        // Twinfield customer hoeven we vanuit hier (contact) alleen bij te werken als er een koppeling is.
        // Nieuw aanmaken gebeurt vooralsnog alleen vanuit synchroniseren notas
        if($address->contact->twinfieldNumbers())
        {
            $messages = [];
            foreach (Administration::where('twinfield_is_valid', 1)->where('uses_twinfield', 1)->get() as $administration) {

                $twinfieldCustomerHelper = new TwinfieldCustomerHelper($administration, null);
                $errorMessages = $twinfieldCustomerHelper->updateCustomer($address->contact);
                if($errorMessages)
                {
                    array_push($messages, $errorMessages);
                }
            }
            if( !empty($messages) )
            {
                abort(412, implode(';', $messages));
            }
        }
        return new FullAddress($address->fresh()->load('country'));
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
            if (array_key_exists('straat', $address[0])) {
                $street = $address[0]['straat'];
            }

            if (array_key_exists('woonplaats', $address[0])) {
                $city = $address[0]['woonplaats'];
            }
        }

        return ['street' => $street, 'city' => $city];

    }
}
