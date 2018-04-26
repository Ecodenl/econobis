<?php

namespace App\Http\Controllers\Api\Address;

use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Helpers\Delete\DeleteHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Address\FullAddress;
use App\Rules\AddressTypeExists;
use App\Rules\EnumExists;
use Ecodenl\PicoWrapper\PicoClient;
use Illuminate\Http\Request;

class AddressController extends ApiController
{

    public function store(Request $request)
    {
        $data = $request->validate([
            'contactId' => ['required', 'exists:contacts,id'],
            'countryId' => 'nullable|exists:countries,id',
            'typeId' => new EnumExists(AddressType::class),
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
        $address = new Address($this->arrayKeysToSnakeCase($data));

        $this->authorize('create', $address);

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
        $address->fill($this->arrayKeysToSnakeCase($data));
        $address->save();

        return new FullAddress($address->fresh()->load('country'));
    }

    public function destroy(Address $address)
    {
        $this->authorize('delete', $address);

        DeleteHelper::delete($address);
    }

    public function getPicoAddress(Request $request){
        $pico = app()->make('pico');
        $address = $pico->bag_adres_pchnr(['query' => ['pc' => $request->input('postalCode'), 'hnr' => $request->input('number')]]);

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
