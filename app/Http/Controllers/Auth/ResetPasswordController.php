<?php

namespace App\Http\Controllers\Auth;

use App\Eco\User\User;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Http\Controllers\Controller;
use App\Notifications\MailSuccessfulReset;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Contracts\Auth\CanResetPassword  $user
     * @param  string  $password
     * @return void
     */
    protected function resetPassword($user, $password)
    {
        $user->password = Hash::make($password);

        $user->setRememberToken(Str::random(60));

        $user->save();

        event(new PasswordReset($user));
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        $this->validate($request, $this->rules(), $this->validationErrorMessages());

        if(User::where('email', $request->input('email'))->count() === 0){
            abort(404, 'E-mail niet gevonden.');
        }

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
            $this->resetPassword($user, $password);
        }
        );

        $user = User::where('email', $request->input('email'))->first();

        $mailText = 'U heeft al een Econobis Alfresco account. U kunt hier mee inloggen op: https://alfresco.econobis.nl/share/page/';

        if(!$user->has_alfresco_account){
            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_ADMIN_USERNAME'), \Config::get('app.ALFRESCO_ADMIN_PASSWORD'));
            if(!$alfrescoHelper->checkIfAccountExists($user)) {
                $alfrescoHelper->createNewAccount($user, $request->input('password'));
                $mailText = 'Er is ook een Alfresco Account voor u gemaakt. U kunt hier mee inloggen op: https://alfresco.econobis.nl/share/page/';
                $user->has_alfresco_account = 1;
            }
            else{
                $user->has_alfresco_account = 1;
            }
        }
        $user->save();

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        return $response == Password::PASSWORD_RESET
            ? $this->sendResetResponse($mailText, $user)
            : $this->sendResetFailedResponse($request, $response);
    }

    //redirect is handled by react, we send succes e-mail
    protected function sendResetResponse($mailText, User $user)
    {
        $user->notify(new MailSuccessfulReset($mailText));
    }
}