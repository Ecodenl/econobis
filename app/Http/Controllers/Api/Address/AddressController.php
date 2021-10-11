<?php

namespace App\Http\Controllers\Api\Address;

use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\Project\Project;
use App\Helpers\Delete\Models\DeleteAddress;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\ParticipationProject\ParticipationProjectController;
use App\Http\Resources\Address\FullAddress;
use App\Rules\EnumExists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddressController extends ApiController
{

    public array $messages;
    private $regexPostalCode = '~\A[1-9]\d{3}?[a-zA-Z]{2}\z~';

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

        $contact = Contact::find($data['contactId']);
        if($contact){
            $contactAddressAllowed = $this->checkDoubleAddressAllowed($contact, $address);
            $checkAddressOk = $this->checkAddress($contact, $address, null, true);
        }

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

        $contact = Contact::find($address->contact_id);
        if($contact){
            $contactAddressAllowed = $this->checkDoubleAddressAllowed($contact, $address);
            $checkAddressOk = $this->checkAddress($contact, $address, null, true);
        }

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

    /**
     * @param $contact
     * @param Address $address
     * @return bool
     */
    protected function checkDoubleAddressAllowed($contact, Address $address): bool
    {
        foreach ($contact->participations as $participation) {
            if ($participation->project->check_double_addresses) {
                $participationProjectController = new ParticipationProjectController();
                if( $participationProjectController->checkDoubleAddress($participation->project, $contact->id, $address->postalCodeNumberAddition) ) {
                    abort(412, 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.');
                    return false;
                }
            }
        }
        return true;
    }

    public function checkAddress($contact, Address $address, $projectId = null, $abort = true)
    {
        // Bij personen alleen checken indien primary address
        if($contact->type_id === ContactType::PERSON && !$address->primary) {
            return null;
        }
        // Bij organisaties alleen checken indien eerste visit address
        if($contact->type_id === ContactType::ORGANISATION && $contact->addressForPostalCodeCheck->id !== $address->id) {
            return null;
        }

        $messages = [];

        if ($projectId) {
            $project = Project::find($projectId);
            if($project){
                $messages = $this->checkAddressProject($project, $address, $messages);
            }
        }
        foreach ($contact->participations as $participation) {
            $messages = $this->checkAddressProject($participation->project, $address, $messages);
        }

        if( !empty($messages) )
        {
            if($abort){
                abort(412, implode(';', $messages));
            }else{
                $this->messages = $messages;
                return false;
            }
        }

        return true;
    }

    /**
     * @param $participation
     * @param string $regex
     * @param Address $address
     * @param array $messages
     * @return array
     */
    private function checkAddressProject($project, Address $address, array $messages): array
    {
        $validPostalCodeAreas = [];
        $checkPostalCodeAreas = false;
        $validPostalCodes = [];
        $checkPostalCodes = false;
        $validAddressNumbers = [];
        $checkAddressNumbers = false;
        $validAddressNumberAdditions = [];
        $checkAddressNumberAdditions = false;

        if ($project->check_postalcode_link && !empty($project->postalcode_link)) {

//todo WM opschonen Log regels
//            Log::info('Project: ' . $project->id);
            $oneFullPostalCode = preg_match($this->regexPostalCode, $project->postalcode_link, $matches);
//            Log::info('Postcoderoosgebied: ' . $project->postalcode_link . ', volledige postcode: ' . $oneFullPostalCode);
//            Log::info('Huisnummerreeks   : ' . $project->address_number_series);

            if ($oneFullPostalCode && (!empty($project->address_number_series))) {
                $checkPostalCodes = true;
                $validPostalCodes[] = strtoupper($project->postalcode_link);

                // Check / get array address number series from address_number_series. Address number series may be separted by a comma+space ('1, 2-5') or comma ('1,2-5');
                if (strpos($project->address_number_series, ',') !== false) {
                    $projectAddressNumberSeries = str_replace(" ", "", $project->address_number_series);
                    $addressNumberSeries = explode(',', $projectAddressNumberSeries);
                } else {
                    $addressNumberSeries[] = $project->address_number_series;
                }
                // Check / get ranges address number series from address_number_series. Address number series may be separted by a comma+space ('1, 2-5') or comma ('1,2-5');
                foreach ($addressNumberSeries as $addressNumberSerie) {
                    if (strpos($addressNumberSerie, ':') !== false) {
                        $checkAddressNumbers = true;
                        $begin = substr($addressNumberSerie, 0, strpos($addressNumberSerie, ':'));
                        $end = substr($addressNumberSerie, strpos($addressNumberSerie, ':') + 1);
                        if (is_numeric($begin) && is_numeric($end) && $begin <= $end) {
                            for ($number = $begin; $number <= $end; $number++) {
                                $validAddressNumbers[] = strval($number);
                            }
                        }
                    } else {
                        if (strpos($addressNumberSerie, '-') !== false) {
                            $checkAddressNumberAdditions = true;
                            $validAddressNumberAdditions[] = strtoupper($addressNumberSerie);
                        } else {
                            $checkAddressNumbers = true;
                            $validAddressNumbers[] = strtoupper($addressNumberSerie);
                        }
                    }

                }
            } else {

                // Check / get array postalcodes from postalcode_link. Postalcodes may be separted by a comma+space ('1001, 1002') or comma ('1001,1002') or space ('1001 1002');
                if (strpos($project->postalcode_link, ',') !== false) {
                    $projectPostalcodeLink = str_replace(" ", "", $project->postalcode_link);
                    $postalCodes = explode(',', $projectPostalcodeLink);
                } else {
                    $postalCodes = explode(' ', $project->postalcode_link);
                }


                // Check / get ranges address number series from address_number_series. Address number series may be separted by a comma+space ('1, 2-5') or comma ('1,2-5');
                foreach ($postalCodes as $postalCode) {

                    $isFullPostalCode = preg_match($this->regexPostalCode, $postalCode, $matches);
                    if ($isFullPostalCode) {
                        $checkPostalCodes = true;
                        $validPostalCodes[] = strtoupper($postalCode);
                    } else {
                        $checkPostalCodeAreas = true;
                        $validPostalCodeAreas[] = $postalCode;
                    }

                }
            }

//todo WM opschonen Log regels
//                Log::info('Check Postcoderoosgebied: ' . $checkPostalCodeAreas );
//                Log::info($validPostalCodeAreas );
//                Log::info('Check Postcodes: ' . $checkPostalCodes );
//                Log::info($validPostalCodes );
//                Log::info('Check Huisnummerreeks: ' . $checkAddressNumbers );
//                Log::info($validAddressNumbers );
//                Log::info('Check Huisnummerreeks met toevoeging: ' . $checkAddressNumberAdditions );
//                Log::info($validAddressNumberAdditions );

            if ($checkPostalCodeAreas || $checkPostalCodes) {
                $postalCodeAreaContact = substr($address->postal_code, 0, 4);
                $postalCodeContact = strtoupper(str_replace(" ", "", $address->postal_code));

                if (!in_array($postalCodeAreaContact, $validPostalCodeAreas) && !in_array($postalCodeContact, $validPostalCodes)) {
                    $messages[] = 'Postcode ' . $address->postal_code . ' komt niet voor bij deelnemende postcodes "' . $project->postalcode_link . '" bij project ' . $project->name . ".";
                }
            }
            if ($checkAddressNumbers || $checkAddressNumberAdditions) {
                $addressNumberContact = $address->number;
                $addressNumberAdditionContact = strtoupper(str_replace(" ", "", $address->number . '-' . $address->addition));

                if (!in_array($addressNumberContact, $validAddressNumbers) && !in_array($addressNumberAdditionContact, $validAddressNumberAdditions)) {
                    $messages[] = 'Postcode ' . $address->postal_code . ' en huisnummer ' . $address->number . '-' . $address->addition . ' komt niet voor bij deelnemende huisnummers "' . $project->address_number_series . '" bij project ' . $project->name . ".";
                }
            }
        }
        return $messages;
    }

}
