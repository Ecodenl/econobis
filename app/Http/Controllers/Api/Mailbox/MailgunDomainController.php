<?php

namespace App\Http\Controllers\Api\Mailbox;


use App\Eco\Mailbox\MailgunDomain;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;

class MailgunDomainController extends Controller
{

    public function jory(Request $request)
    {
        return MailgunDomain::jory()->applyRequest($request);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('create', MailgunDomain::class);

        $data = $input->string('domain')->whenMissing('')->onEmpty('')->next()
            ->string('secret')->whenMissing('')->onEmpty('')->next()
            ->boolean('isVerified')->whenMissing(false)->onEmpty(false)->alias('is_verified')->next()
            ->get();

        $mailgunDomain = new MailgunDomain($data);
        $mailgunDomain->save();

        return MailgunDomain::jory()->onModel($mailgunDomain)->applyRequest($request);
    }

    public function update(RequestInput $input, MailgunDomain $mailgunDomain)
    {
        $this->authorize('update', MailgunDomain::class);

        $data = $input->string('domain')->whenMissing($mailgunDomain->domain)->onEmpty('')->next()
            ->string('secret')->whenMissing($mailgunDomain->secret)->onEmpty('')->next()
            ->boolean('isVerified')->whenMissing($mailgunDomain->is_verified)->onEmpty(false)->alias('is_verified')->next()
            ->get();

        $mailgunDomain->fill($data);
        $mailgunDomain->save();

        return GenericResource::make($mailgunDomain);
    }

}