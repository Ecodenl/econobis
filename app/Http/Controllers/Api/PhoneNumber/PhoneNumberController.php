<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 9:02
 */

namespace App\Http\Controllers\Api\PhoneNumber;


use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\PhoneNumber\FullPhoneNumber;
use App\Rules\EnumExists;
use App\Rules\PhoneNumberTypeExists;
use Illuminate\Http\Request;

class PhoneNumberController extends ApiController
{

    public function store(Request $request)
    {
        $data = $request->validate([
            'contactId' => ['required', 'exists:contacts,id'],
            'typeId' => new EnumExists(PhoneNumberType::class),
            'number' => '',
            'primary' => 'boolean',
        ]);

        $data = $this->sanitizeData($data, [
            'typeId' => 'nullable',
            'primary' => 'boolean',
        ]);
        $phoneNumber = new PhoneNumber($this->arrayKeysToSnakeCase($data));

        $this->authorize('create', $phoneNumber);

        $phoneNumber->save();

        return new FullPhoneNumber($phoneNumber->fresh());
    }

    public function update(Request $request, PhoneNumber $phoneNumber)
    {
        $this->authorize('update', $phoneNumber);

        $data = $request->validate([
            'contactId' => 'exists:contacts,id',
            'typeId' => new EnumExists(PhoneNumberType::class),
            'number' => '',
            'primary' => 'boolean',
        ]);

        $data = $this->sanitizeData($data, [
            'typeId' => 'nullable',
            'primary' => 'boolean',
        ]);
        $phoneNumber->fill($this->arrayKeysToSnakeCase($data));
        $phoneNumber->save();

        return new FullPhoneNumber($phoneNumber->fresh());
    }

    public function destroy(PhoneNumber $phoneNumber)
    {
        $this->authorize('delete', $phoneNumber);

        $phoneNumber->delete();
    }
}