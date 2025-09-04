<?php

namespace App\Http\Controllers\Api\IntakeSource;

use App\Eco\IntakeSource\IntakeSource;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;

class IntakeSourceController extends Controller
{

    public function jory()
    {
        return Jory::on(IntakeSource::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage_intake_sources');

        $data = $input->string('name')->whenMissing('')->onEmpty('')->next()
            ->string('nameCustom')->alias('name_custom')->next()
            ->string('visible')->next()
            ->get();

        $source = new IntakeSource($data);
        $source->save();

        return Jory::on($source);
    }

    public function update(RequestInput $input, IntakeSource $source)
    {
        $this->authorize('manage_intake_sources');

        $data = $input->string('name')->whenMissing('')->onEmpty('')->next()
            ->string('nameCustom')->alias('name_custom')->next()
            ->string('visible')->whenMissing(0)->onEmpty(0)->next()
            ->get();

        $source->fill($data);
        $source->save();

        return GenericResource::make($source);
    }

}