<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Team;

use App\Eco\Cooperation\Cooperation;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Cooperation\CreateCooperation;
use App\Http\Requests\Cooperation\UpdateCooperation;
use App\Http\Resources\Cooperation\FullCooperation;

class CooperationController extends ApiController
{
    public function show(Cooperation $team)
    {
        $this->authorize('manage_cooperation_settings', Cooperation::class);

        return FullCooperation::make($team);
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