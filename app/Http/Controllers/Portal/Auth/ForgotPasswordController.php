<?php

namespace App\Http\Controllers\Portal\Auth;

use App\Eco\Portal\PortalUser;
use App\Helpers\Email\EmailHelper;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails {
        sendResetLinkEmail as parentSendResetLinkEmail;
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Validate the email for the given request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateEmail(Request $request)
    {
        $this->validate($request, ['email' => 'required|email']);

        if(PortalUser::where('email', $request->input('email'))->count() === 0){
            abort(404, 'E-mail niet gevonden.');
        }
    }

    //redirect is handled by react
    protected function sendResetLinkResponse()
    {}

    public function sendResetLinkEmail(Request $request)
    {
        // Emails moeten vanuit de default mailbox worden verstuurd ipv de mail instellingen in .env
        // Daarom hier eerst de emailconfiguratie overschrijven voordat we gaan verzenden.
        (new EmailHelper())->setConfigToDefaultMailbox();

        $this->parentSendResetLinkEmail($request);
    }
}
