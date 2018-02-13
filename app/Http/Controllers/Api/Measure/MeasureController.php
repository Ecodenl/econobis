<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Measure;

use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureFaq;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Measure\Grid\RequestQuery;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Measure\GridMeasure;
use App\Http\Resources\Opportunity\FullOpportunity;

class MeasureController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $measures = $requestQuery->get();

        return GridMeasure::collection($measures);
    }

    public function show(Measure $measure)
    {
        $measure->load(['campaigns',
            'faqs',
            'deliveredByOrganisations.contact.primaryAddress',
            'opportunities.campaign',
            'opportunities.contact',
            'intakes.contact',
            'addresses.housingFile',
            'addresses.contact',
            'createdBy',
            'addresses'
        ]);

        return FullMeasure::make($measure);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('description')->onEmpty(null)->next()
            ->get();

        $measure = new Measure();
        $measure->fill($data);
        $measure->save();

        return FullMeasure::make($measure->fresh());
    }

    public function update(RequestInput $requestInput, Measure $measure)
    {

        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('number')->validate('required')->next()
            ->string('description')->onEmpty(null)->next()
            ->get();

        $measure->fill($data);
        $measure->save();

        return FullMeasure::make($measure->fresh());
    }

    //TODO NOT WORKING!!
    public function destroy(Measure $measure)
    {
        $this->authorize('manage', Measure::class);

        //First delete relations
        $measure->addresses()->detach();

        foreach ($measure->opportunities as $opportunity) {
            $opportunity->measure()->dissociate();
            $opportunity->save();
        }

        $measure->faqs()->delete();
        $measure->measuresTaken()->delete();
        $measure->measuresRequested()->delete();

        $measure->delete();
    }

    public function storeFaq(RequestInput $requestInput, Measure $measure)
    {
        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('question')->validate('required')->next()
            ->string('answer')->validate('required')->next()
            ->get();

        $measureFaq = new MeasureFaq();
        $measureFaq->fill($data);
        $measureFaq->measure()->associate($measure);
        $measureFaq->save();

        return FullMeasure::make($measure->fresh());
    }

    public function updateFaq(RequestInput $requestInput, MeasureFaq $measureFaq)
    {

        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('question')->validate('required')->next()
            ->string('answer')->validate('required')->next()
            ->get();

        $measureFaq->fill($data);
        $measureFaq->save();
    }

    public function destroyFaq(MeasureFaq $measureFaq)
    {
        $measureFaq->delete();
    }

    public function attachSupplier(Measure $measure, Organisation $organisation)
    {
        $this->authorize('manage', Measure::class);
        $measure->deliveredByOrganisations()->attach($organisation);
    }

    public function detachSupplier(Measure $measure, Organisation $organisation)
    {
        $this->authorize('manage', Measure::class);
        $measure->deliveredByOrganisations()->detach($organisation);
    }

    public function associateOpportunity(Measure $measure, Opportunity $opportunity)
    {
        $this->authorize('manage', Measure::class);
        $opportunity->measure()->associate($measure);
        $opportunity->save();

        return FullMeasure::make($measure->fresh());
    }
}