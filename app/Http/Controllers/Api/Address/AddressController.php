<?php

namespace App\Http\Controllers\Api\Address;

use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Address\FullAddress;
use App\Rules\AddressTypeExists;
use App\Rules\EnumExists;
use Illuminate\Http\Request;

class AddressController extends ApiController
{

    public function store(Request $request)
    {
        $data = $request->validate([
            'contactId' => ['required', 'exists:contacts,id'],
            'countryId' => ['exists:countries,id'],
            'typeId' => new EnumExists(AddressType::class),
            'street' => '',
            'number' => '',
            'city' => '',
            'postalCode' => '',
            'primary' => 'boolean',
        ]);

        $data = $this->sanitizeData($data, [
            'typeId' => 'nullable',
            'primary' => 'boolean',
        ]);
        $address = new Address($this->arrayKeysToSnakeCase($data));

        $this->authorize('create', $address);

        $address->save();

        return new FullAddress($address->fresh());
    }

    public function update(Request $request, Address $address)
    {
        $this->authorize('update', $address);

        $data = $request->validate([
            'contactId' => 'exists:contacts,id',
            'countryId' => ['exists:countries,id'],
            'typeId' => new EnumExists(AddressType::class),
            'street' => '',
            'number' => '',
            'city' => '',
            'postalCode' => '',
            'primary' => 'boolean',
        ]);

        $data = $this->sanitizeData($data, [
            'typeId' => 'nullable',
            'primary' => 'boolean',
        ]);
        $address->fill($this->arrayKeysToSnakeCase($data));
        $address->save();

        return new FullAddress($address->fresh());
    }

    public function destroy(Address $address)
    {
        $this->authorize('delete', $address);

        $address->forceDelete();
    }
}
