<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Administration;


use App\Eco\Administration\Administration;
use App\Eco\User\User;
use App\Helpers\Delete\DeleteHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Administration\Grid\RequestQuery;
use App\Http\Resources\Administration\AdministrationPeek;
use App\Http\Resources\Administration\FullAdministration;
use App\Http\Resources\Administration\GridAdministration;
use App\Http\Resources\User\UserPeek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdministrationController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $administrations = $requestQuery->get();

        $administrations->load(['country']);

        return GridAdministration::collection($administrations)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(Administration $administration)
    {
        $administration->load([
            'country',
            'users',
        ]);

        return FullAdministration::make($administration);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', Administration::class);

        $data = $input
            ->string('name')->validate('required')->next()
            ->integer('administrationNumber')->whenMissing(null)->onEmpty(null)->alias('administration_number')->next()
            ->string('address')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('city')->next()
            ->string('countryId')->validate('nullable|exists:countries,id')->whenMissing(null)->onEmpty(null)->alias('country_id')->next()
            ->integer('kvkNumber')->whenMissing(null)->onEmpty(null)->alias('kvk_number')->next()
            ->string('btwNumber')->validate('required')->alias('btw_number')->next()
            ->string('IBAN')->whenMissing('')->next()
            ->string('email')->whenMissing(null)->onEmpty(null)->next()
            ->string('bic')->whenMissing(null)->onEmpty(null)->next()
            ->string('sepaContractName')->whenMissing(null)->onEmpty(null)->alias('sepa_contract_name')->next()
            ->string('sepaCreditorId')->whenMissing(null)->onEmpty(null)->alias('sepa_creditor_id')->next()
            ->string('rsinNumber')->whenMissing(null)->onEmpty(null)->alias('rsin_number')->next()
            ->integer('defaultPaymentTerm')->whenMissing(null)->onEmpty(null)->alias('default_payment_term')->next()
            ->get();

        $administration = new Administration($data);

        $administration->save();

        $this->checkStorageDir($administration->id);

        //get attachments
        $logo = $request->file('attachment')
            ? $request->file('attachment') : [];

        $this->storeLogo($logo, $administration);

        return $this->show($administration);
    }


    public function update(RequestInput $input, Request $request, Administration $administration)
    {
        $this->authorize('manage', Administration::class);
        $data = $input
            ->string('name')->validate('required')->next()
            ->integer('administrationNumber')->whenMissing(null)->onEmpty(null)->alias('administration_number')->next()
            ->string('address')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('city')->next()
            ->string('countryId')->validate('nullable|exists:countries,id')->whenMissing(null)->onEmpty(null)->alias('country_id')->next()
            ->integer('kvkNumber')->whenMissing(null)->onEmpty(null)->alias('kvk_number')->next()
            ->string('btwNumber')->validate('required')->alias('btw_number')->next()
            ->string('IBAN')->whenMissing('')->next()
            ->string('email')->whenMissing(null)->onEmpty(null)->next()
            ->string('bic')->whenMissing(null)->onEmpty(null)->next()
            ->string('sepaContractName')->whenMissing(null)->onEmpty(null)->alias('sepa_contract_name')->next()
            ->string('sepaCreditorId')->whenMissing(null)->onEmpty(null)->alias('sepa_creditor_id')->next()
            ->string('rsinNumber')->whenMissing(null)->onEmpty(null)->alias('rsin_number')->next()
            ->integer('defaultPaymentTerm')->whenMissing(null)->onEmpty(null)->alias('default_payment_term')->next()
            ->get();

        $administration->fill($data);

        $this->checkStorageDir($administration->id);

        //get attachments
        $logo = $request->file('attachment')
            ? $request->file('attachment') : [];

        $this->storeLogo($logo, $administration);

        return $this->show($administration);
    }

    public function destroy(Administration $administration)
    {
        $this->authorize('manage', Administration::class);

        //remove file from disk, move to DeleteHelper?
        Storage::disk('administration_logos')->delete($administration->logo_filename);

        DeleteHelper::delete($administration);
    }


    public function checkStorageDir($administration_id){
        //Check if storage map exists
        $storageDir = Storage::disk('administrations')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'administration_' . $administration_id . DIRECTORY_SEPARATOR . 'logos';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }

    public function storeLogo($attachment, $administration)
    {
        //store logo
        if (!$attachment->isValid()) {
            abort('422', 'Error uploading file');
        }
        $filename = $attachment->store('administration_' . $administration->id
            . DIRECTORY_SEPARATOR . 'logos', 'administrations');

        $administration->filename = $filename;

        $administration->save();
    }

    public function attachUser(Administration $administration, User $user)
    {
        $this->authorize('manage', Administration::class);

        $administration->users()->attach($user->id);

        return UserPeek::make($user);
    }

    public function detachUser(Administration $administration, User $user)
    {
        $this->authorize('manage', Administration::class);

        $administration->users()->detach($user->id);
    }

    public function peek()
    {
        return AdministrationPeek::collection(Administration::orderBy('id')->whereNull('deleted_at')->get());
    }
}