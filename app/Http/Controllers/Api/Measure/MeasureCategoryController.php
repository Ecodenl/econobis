<?php

namespace App\Http\Controllers\Api\Measure;

use App\Eco\Measure\MeasureCategory;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;

class MeasureCategoryController extends Controller
{

    public function jory(Request $request)
    {
        return Jory::on(MeasureCategory::class);
    }

    public function update(RequestInput $input, MeasureCategory $measureCategory, Request $request)
    {
        $this->authorize('update', MeasureCategory::class);

        $data = $input
            ->boolean('usesWfCreateOpportunity')->alias('uses_wf_create_opportunity')->next()
            ->integer('measureIdWfCreateOpportunity')->validate('nullable|exists:measures,id')->onEmpty(null)->whenMissing(null)->alias('measure_id_wf_create_opportunity')->next()
            ->integer('opportunityStatusIdWfCreateOpportunity')->validate('nullable|exists:opportunity_status,id')->onEmpty(null)->whenMissing(null)->alias('opportunity_status_id_wf_create_opportunity')->next()
            ->boolean('usesWfCreateQuotationRequest')->alias('uses_wf_create_quotation_request')->next()
            ->integer('organisationIdWfCreateQuotationRequest')->validate('nullable|exists:organisations,id')->onEmpty(null)->whenMissing(null)->alias('organisation_id_wf_create_quotation_request')->next()
            ->boolean('usesWfEmailQuotationRequest')->alias('uses_wf_email_quotation_request')->next()
            ->integer('emailTemplateIdWfCreateQuotationRequest')->validate('nullable|exists:email_templates,id')->onEmpty(null)->whenMissing(null)->alias('email_template_id_wf_create_quotation_request')->next()
            ->string('calendarBackgroundColor')->onEmpty(null)->alias('calendar_background_color')->next()
            ->string('calendarTextColor')->onEmpty(null)->alias('calendar_text_color')->next()
            ->get();

        $measureCategory->fill($data);
        $measureCategory->save();

        return Jory::on($measureCategory);
    }

}