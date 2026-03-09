<?php

namespace App\Http\Controllers\Api\District;

use App\Eco\Contact\Contact;
use App\Eco\District\District;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\District\PeekDistrict;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DistrictController extends Controller
{
    public function index()
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        return District::whereTeamDistrictIds(Auth::user())
            ->orderBy('name')
            ->get()
            ->map(function ($district) {
                return [
                    'id' => $district->id,
                    'name' => $district->name,
                    'closed' => $district->closed,
                ];
            });
    }

    public function peek($active = null)
    {
        $districts = District::query();
        if($active == "active") {
            $districts->where('closed', '!=', 1);
        }
        return PeekDistrict::collection($districts->get());
    }

    public function show(District $district)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $this->districtAutorized($district);

        return [
            'id' => $district->id,
            'name' => $district->name,
            'defaultDurationMinutes' => $district->default_duration_minutes,
            'sendEmailToContactWhenPlanned' => $district->send_email_to_contact_when_planned,
            'emailToContactTemplateId' => $district->email_to_contact_template_id,
            'sendEmailToCoachWhenPlanned' => $district->send_email_to_coach_when_planned,
            'emailToCoachTemplateId' => $district->email_to_coach_template_id,
            'emailToContactTemplate' => $district->emailToContactTemplate ? [
                'name' => $district->emailToContactTemplate->name,
            ] : null,
            'emailToCoachTemplate' => $district->emailToCoachTemplate ? [
                'name' => $district->emailToCoachTemplate->name,
            ] : null,
            'coaches' => $district->coaches->map(function ($coach) {
                return [
                    'id' => $coach->id,
                    'fullName' => $coach->full_name,
                ];
            }),
            'closed' => $district->closed,
        ];
    }

    public function getCalendarItems(District $district, Request $request)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $this->districtAutorized($district);

        $startDate = $request->get('startDate');
        $endDate = $request->get('endDate');

        $bezoekAction = OpportunityAction::where('code_ref', 'visit')->first();

// 7	Geen afspraak gemaakt		default		2
// 8	Afspraak gemaakt			made		2
// 9	Afspraak uitgevoerd			done		2
//14	Afspraak afgezegd			cancelled	2
//20	Geen afspraak kunnen maken	not-made	2

        $quotationRequestsStatussenToShow = [];
        if($bezoekAction){
            $madeQuotationRequestStatus = QuotationRequestStatus::where('opportunity_action_id', $bezoekAction->id)
                ->where('code_ref', 'made')->first();
            if ($madeQuotationRequestStatus) {
                $quotationRequestsStatussenToShow[] = $madeQuotationRequestStatus->id;
            }
            $doneQuotationRequestStatus = QuotationRequestStatus::where('opportunity_action_id', $bezoekAction->id)
                ->where('code_ref', 'done')->first();
            if ($doneQuotationRequestStatus) {
                $quotationRequestsStatussenToShow[] = $doneQuotationRequestStatus->id;
            }
            $notMadeQuotationRequestStatus = QuotationRequestStatus::where('opportunity_action_id', $bezoekAction->id)
                ->where('code_ref', 'not-made')->first();
            if ($notMadeQuotationRequestStatus) {
                $quotationRequestsStatussenToShow[] = $notMadeQuotationRequestStatus->id;
            }
        }

        $quotationRequests = $district->quotationRequests()
            ->where('date_planned', '>=', $startDate)
            ->where('date_planned', '<=', Carbon::make($endDate)->endOfDay())
            ->whereIn('status_id', $quotationRequestsStatussenToShow)
            ->get();

        return [
            'district' => [
                'name' => $district->name,
            ],
            'quotationRequests' => $quotationRequests->map(function ($quotationRequest) {
                $contact = $quotationRequest?->opportunity?->intake?->contact;

                return [
                    'id' => $quotationRequest->id,
                    'coach' => [
                        'id' => $quotationRequest->organisationOrCoach->id,
                        'fullName' => $quotationRequest->organisationOrCoach->full_name,
                    ],
                    'contact' => [
                        'id' => $contact ? $contact->id : null,
                        'fullName' => $contact ? $contact->full_name : 'onbekend',
                        'postalCode' => $contact?->primaryAddress ? $contact?->primaryAddress->postal_code : '',
                    ],
                    'datePlanned' => $quotationRequest->date_planned,
                    'durationMinutes' => $quotationRequest->duration_minutes,
                    'statusCodeRef' => $quotationRequest->status->code_ref,
                    'color' => $quotationRequest->opportunity?->measureCategory->calendar_text_color,
                    'backgroundColor' => $quotationRequest->opportunity?->measureCategory->calendar_background_color,
                ];
            }),
            'availabilities' => $district->coaches->reduce(function ($carry, $coach) use ($startDate, $endDate) {
                $availabilities = $coach->availabilities
                    ->where('from', '>=', $startDate)
                    ->where('from', '<=', Carbon::make($endDate)->endOfDay());

                $availabilities->each(function ($availability) use (&$carry, $coach) {
                    $carry[] = [
                        'id' => $availability->id,
                        'coach' => [
                            'id' => $coach->id,
                            'fullName' => $coach->full_name,
                        ],
                        'from' => $availability->from->format('Y-m-d H:i:s'),
                        'to' => $availability->to->format('Y-m-d H:i:s'),
                    ];
                });

                return $carry;
            }, []),
        ];
    }

    public function create(Request $request)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $request->validate([
            'name' => 'required',
            'defaultDurationMinutes' => [],
            'sendEmailToContactWhenPlanned' => ['boolean'],
            'emailToContactTemplateId' => [],
            'sendEmailToCoachWhenPlanned' => ['boolean'],
            'emailToCoachTemplateId' => [],
        ]);

        $district = new District();
        $district->name = $request->name;
        $district->default_duration_minutes = $request->defaultDurationMinutes;
        $district->send_email_to_contact_when_planned = $request->sendEmailToContactWhenPlanned;
        $district->email_to_contact_template_id = $request->emailToContactTemplateId;
        $district->send_email_to_coach_when_planned = $request->sendEmailToCoachWhenPlanned;
        $district->email_to_coach_template_id = $request->emailToCoachTemplateId;
        $district->closed = $request->closed;
        $district->save();

        return [
            'id' => $district->id,
        ];
    }

    public function update(Request $request, District $district)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $this->districtAutorized($district);

        $request->validate([
            'name' => 'required',
            'defaultDurationMinutes' => [],
            'sendEmailToContactWhenPlanned' => ['boolean'],
            'emailToContactTemplateId' => [],
            'sendEmailToCoachWhenPlanned' => ['boolean'],
            'emailToCoachTemplateId' => [],
        ]);

        $district->name = $request->name;
        $district->default_duration_minutes = $request->defaultDurationMinutes;
        $district->send_email_to_contact_when_planned = $request->sendEmailToContactWhenPlanned;
        $district->email_to_contact_template_id = $request->emailToContactTemplateId;
        $district->send_email_to_coach_when_planned = $request->sendEmailToCoachWhenPlanned;
        $district->email_to_coach_template_id = $request->emailToCoachTemplateId;
        $district->closed = $request->closed;
        $district->save();
    }

    public function delete(District $district)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $this->districtAutorized($district);

        $district->delete();
    }

    public function detachCoach(District $district, Contact $coach)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $this->districtAutorized($district);

        $district->coaches()->detach($coach->id);
    }

    public function attachCoach(District $district, Contact $coach)
    {
        if(!auth()->user()->hasPermissionTo('manage_coach_planning', 'api')) {
            abort(403);
        }

        $this->districtAutorized($district);

        $district->coaches()->attach($coach->id);
    }

    /**
     * @param District $district
     * @return void
     */
    private function districtAutorized(District $district): void
    {
        $districtAutorized = District::whereTeamDistrictIds(Auth::user())->where('id', $district->id)->first();
        if (!$districtAutorized) {
            abort(403, 'Niet geautoriseerd.');
        }
    }
}