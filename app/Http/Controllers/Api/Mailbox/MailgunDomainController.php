<?php

namespace App\Http\Controllers\Api\Mailbox;


use App\Eco\Mailbox\MailgunDomain;
use App\Helpers\Mailgun\MailgunHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;

class MailgunDomainController extends Controller
{

    public function jory()
    {
        return Jory::on(MailgunDomain::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('create', MailgunDomain::class);

        $data = $input->string('domain')->whenMissing('')->onEmpty('')->next()
            ->string('secret')->whenMissing('')->onEmpty('')->next()
            ->get();

        $mailgunDomain = new MailgunDomain($data);
        $mailgunDomain->is_verified = (new MailgunHelper())->checkCredentials($mailgunDomain->domain, $mailgunDomain->secret);
        $mailgunDomain->save();

        return Jory::on($mailgunDomain);
    }

    public function update(RequestInput $input, MailgunDomain $mailgunDomain)
    {
        $this->authorize('update', MailgunDomain::class);

        $data = $input->string('domain')->whenMissing($mailgunDomain->domain)->onEmpty('')->next()
            ->string('secret')->whenMissing($mailgunDomain->secret)->onEmpty('')->next()
            ->get();

        $mailgunDomain->fill($data);
        $mailgunDomain->is_verified = (new MailgunHelper())->checkCredentials($mailgunDomain->domain, $mailgunDomain->secret);
        $mailgunDomain->save();

        return GenericResource::make($mailgunDomain);
    }

}