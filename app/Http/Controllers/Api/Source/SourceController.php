<?php

namespace App\Http\Controllers\Api\Source;

use App\Eco\Source\Source;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;

class SourceController extends Controller
{

    public function jory()
    {
        //$this->authorize('view', Source::class);

        return Jory::on(Source::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        //$this->authorize('manage', Source::class);

        $data = $input->string('name')->whenMissing('')->onEmpty('')->next()
            ->string('nameCustom')->alias('name_custom')->next()
            ->get();

        $source = new Source($data);
        $source->save();

        return Jory::on($source);
    }

    public function update(RequestInput $input, Source $source)
    {
        //$this->authorize('manage', Source::class);
        $data = $input->string('name')->whenMissing('')->onEmpty('')->next()
            ->string('nameCustom')->alias('name_custom')->next()
            ->get();

        $source->fill($data);
        $source->save();

        return GenericResource::make($source);
    }

}