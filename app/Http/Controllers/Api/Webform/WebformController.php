<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 12-09-2018
 * Time: 10:59
 */

namespace App\Http\Controllers\Api\Webform;


use App\Eco\Cooperation\Cooperation;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use App\Eco\Webform\Webform;
use App\Http\Resources\Webform\FullWebform;
use Request;

class WebformController extends Controller
{

    public function __construct()
    {
        //todo WM: check of dit goed is
//        $this->authorize('manage', Webform::class);
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
            ->string('apiKey')->alias('api_key')->validate('required')->next()
            ->string('emailAddressErrorReport')->alias('email_address_error_report')->next()
            ->boolean('mailErrorReport')->alias('mail_error_report')->next()
            ->integer('maxRequestsPerMinute')->alias('max_requests_per_minute')->validate('required')->next()
            ->date('dateStart')->alias('date_start')->whenMissing(null)->onEmpty(null)->next()
            ->date('dateEnd')->alias('date_end')->whenMissing(null)->onEmpty(null)->next()
            ->integer('responsibleUserId')->validate('exists:users,id', 'required_unless, responsible_team_id')->whenMissing(null)->onEmpty(null)->alias('responsible_user_id')->next()
            ->integer('responsibleTeamId')->validate('exists:teams,id', 'required_unless, responsible_user_id')->whenMissing(null)->onEmpty(null)->alias('responsible_team_id')->next()
            ->get();

        $webform = new Webform($data);
        $webform->last_requests = [];
        $webform->save();

        return $this->show($webform);
    }

    public function update(Webform $webform, RequestInput $input)
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
            ->get();

        $webform->fill($data);
        $webform->save();

        return $this->show($webform);
    }

    protected function show(Webform $webform)
    {
        $this->authorize('view', Webform::class);

        $webform->load(['responsibleTeam', 'responsibleUser']);
        return FullWebform::make($webform);
    }

    protected function delete(Webform $webform)
    {
        $this->authorize('manage', Webform::class);

        $webform->delete();
    }
}