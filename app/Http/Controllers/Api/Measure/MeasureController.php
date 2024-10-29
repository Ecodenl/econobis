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
use App\Http\Resources\Measure\MeasurePeek;
use Illuminate\Support\Facades\Auth;

class MeasureController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $measures = $requestQuery->get();
        $measures->load(['measureCategory']);
        $sortedMeasures = $measures->sortBy(function($item) {
            return $item->measureCategory->name.'-'.$item->name;
        }, SORT_NATURAL|SORT_FLAG_CASE)->values()->all();

        return GridMeasure::collection($sortedMeasures);
    }

    public function show(Measure $measure)
    {
        $measure->load([
            'faqs',
            'deliveredByOrganisations.contact.primaryAddress',
            'createdBy',
            'updatedBy',
            'measureCategory',
            'documents',
            'opportunities.intake.campaign',
            'opportunities.intake.contact',
        ]);

        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $measure->relatedDocuments = $measure->documents()->whereIn('document_created_from_id', $teamDocumentCreatedFromIds)->get();
        } else{
            $measure->relatedDocuments = $measure->documents()->get();
        }

        return FullMeasure::make($measure);
    }

    public function update(RequestInput $requestInput, Measure $measure)
    {

        $this->authorize('manage', Measure::class);

        $data = $requestInput
            ->string('description')->onEmpty(null)->next()
            ->string('name_custom')->onEmpty(null)->next()
            ->boolean('visible')->validate('boolean')->onEmpty(false)->whenMissing(false)->next()
            ->get();

        $measure->fill($data);
        $measure->save();

        return FullMeasure::make($measure->fresh());
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

    public function peek()
    {
        return MeasurePeek::collection(Measure::orderBy('id')->get());
    }
}