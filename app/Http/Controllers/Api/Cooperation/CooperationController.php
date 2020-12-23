<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Cooperation;

use App\Eco\Cooperation\Cooperation;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Cooperation\CreateCooperation;
use App\Http\Requests\Cooperation\UpdateCooperation;
use App\Http\Resources\Cooperation\FullCooperation;

class CooperationController extends ApiController
{
    public function show()
    {
        $this->authorize('manage', Cooperation::class);

        if(Cooperation::doesntExist()) return null;

        $cooperation = Cooperation::first();

        $cooperation->load(['createdBy', 'updatedBy', 'contactGroup', 'emailTemplate']);

        return FullCooperation::make($cooperation);
    }

    public function store(CreateCooperation $request)
    {
        $cooperation = new Cooperation($request->validatedSnake());
        $cooperation->save();

        return $this->show($cooperation);
    }

    public function update(UpdateCooperation $request, Cooperation $cooperation)
    {
        $cooperation->fill($request->validatedSnake());
        $cooperation->save();

        return $this->show($cooperation);
    }
}