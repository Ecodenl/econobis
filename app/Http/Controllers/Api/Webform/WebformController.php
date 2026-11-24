<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 10:59
 */

namespace App\Http\Controllers\Api\Webform;


use App\Eco\Webform\WebformActionCode;
use App\Eco\Webform\WebformApiType;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use App\Eco\Webform\Webform;
use App\Http\Resources\Webform\FullWebform;
use Illuminate\Http\Request;

class WebformController extends Controller
{

    public function __construct()
    {
    }

    public function grid()
    {
        $this->authorize('view', Webform::class);

        $webforms = Webform::orderBy('created_at', 'desc')->get();

        return GenericResource::collection($webforms);
    }

    public function store(Request $request, RequestInput $input)
    {
        $this->authorize('manage', Webform::class);

        $data = $input->string('name')->validate('required')->next()
            ->string('apiType')->alias('api_type')->validate('required')->next()
            ->string('apiKey')->alias('api_key')->validate('required')->next()
            ->string('emailAddressErrorReport')->alias('email_address_error_report')->next()
            ->boolean('mailErrorReport')->alias('mail_error_report')->next()
            ->integer('maxRequestsPerMinute')->alias('max_requests_per_minute')->validate('required')->next()
            ->date('dateStart')->alias('date_start')->whenMissing(null)->onEmpty(null)->next()
            ->date('dateEnd')->alias('date_end')->whenMissing(null)->onEmpty(null)->next()
            ->integer('responsibleUserId')->validate('exists:users,id', 'required_unless, responsible_team_id')->whenMissing(null)->onEmpty(null)->alias('responsible_user_id')->next()
            ->integer('responsibleTeamId')->validate('exists:teams,id', 'required_unless, responsible_user_id')->whenMissing(null)->onEmpty(null)->alias('responsible_team_id')->next()
            ->boolean('canCreateParticipations')->whenMissing(false)->next()
            ->boolean('canCreateOrders')->whenMissing(false)->next()
            ->get();

        $canCreateParticipations = $data['canCreateParticipations'];
        $allowedParticipationStatusIds = $request->input('allowedParticipationStatusIds', []);
        $canCreateOrders = $data['canCreateOrders'];

        unset(
            $data['canCreateParticipations'],
            $data['canCreateOrders']
        );

        $webform = new Webform($data);
        $webform->last_requests = [];
        $webform->save();

        if ($webform->api_type === WebformApiType::WEBFORM_API) {
            $this->syncAction(
                $webform,
                WebformActionCode::PARTICIPATION_CREATE,
                $canCreateParticipations,
                [
                    [
                        'field' => 'status_id',
                        'operator' => 'in',
                        'value' => json_encode($allowedParticipationStatusIds),
                    ],
                ]
            );

            $this->syncAction(
                $webform,
                WebformActionCode::ORDER_CREATE,
                $canCreateOrders
            );
        }

        return $this->show($webform);
    }

    public function update(Webform $webform, Request $request, RequestInput $input)
    {
        $this->authorize('manage', Webform::class);

        $data = $input->string('name')->validate('required')->next()
            ->string('apiKey')->alias('api_key')->validate('required')->next()
            ->string('emailAddressErrorReport')->alias('email_address_error_report')->next()
            ->boolean('mailErrorReport')->alias('mail_error_report')->next()
            ->integer('maxRequestsPerMinute')->alias('max_requests_per_minute')->validate('required')->next()
            ->date('dateStart')->alias('date_start')->whenMissing(null)->onEmpty(null)->next()
            ->date('dateEnd')->alias('date_end')->whenMissing(null)->onEmpty(null)->next()
            ->integer('responsibleUserId')->validate('exists:users,id', 'required_unless, responsible_team_id')->whenMissing(null)->onEmpty(null)->alias('responsible_user_id')->next()
            ->integer('responsibleTeamId')->validate('exists:teams,id', 'required_unless, responsible_user_id')->whenMissing(null)->onEmpty(null)->alias('responsible_team_id')->next()
            ->boolean('canCreateParticipations')->whenMissing(false)->next()
            ->boolean('canCreateOrders')->whenMissing(false)->next()
            ->get();

        // zolang niet alle webform api_type's gezet zijn, moeten we bij wijzigen wel gezet kunnen worden (verplicht).
        if ($webform->api_type === null) {
            $apiType = $request->input('apiType');

            if (!$apiType) {
                abort(422, 'Api type is verplicht.');
            }

            $webform->api_type = WebformApiType::from($apiType);
        }

        $canCreateParticipations = $data['canCreateParticipations'];
        $allowedParticipationStatusIds = $request->input('allowedParticipationStatusIds', []);
        $canCreateOrders = $data['canCreateOrders'];

        unset(
            $data['canCreateParticipations'],
            $data['canCreateOrders']
        );
        $webform->fill($data);
        $webform->save();

        if ($webform->api_type === WebformApiType::WEBFORM_API) {
            $this->syncAction(
                $webform,
                WebformActionCode::PARTICIPATION_CREATE,
                $canCreateParticipations,
                [
                    [
                        'field' => 'status_id',
                        'operator' => 'in',
                        'value' => json_encode($allowedParticipationStatusIds),
                    ],
                ]
            );

            $this->syncAction(
                $webform,
                WebformActionCode::ORDER_CREATE,
                $canCreateOrders
            );
        }

        return $this->show($webform);
    }

    private function syncAction(Webform $webform, string $actionCode, bool $enabled, array $filters = []): void
    {
        $action = $webform->actions()->firstOrNew([
            'action_code' => $actionCode,
        ]);

        $action->enabled = $enabled;
        $action->save();

        if (!$enabled) {
            return;
        }

        foreach ($filters as $filterData) {
            $action->filters()->updateOrCreate(
                [
                    'field' => $filterData['field'],
                    'operator' => $filterData['operator'],
                ],
                [
                    'value' => $filterData['value'],
                ]
            );
        }
    }

    protected function show(Webform $webform)
    {
        $this->authorize('view', Webform::class);

        $webform->load(['actions.filters', 'responsibleTeam', 'responsibleUser']);
        return FullWebform::make($webform);
    }

    protected function delete(Webform $webform)
    {
        $this->authorize('manage', Webform::class);

        $webform->delete();
    }
}