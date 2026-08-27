<?php

namespace App\Http\Controllers\Auth;

use App\Eco\User\User;
use App\Http\Controllers\Controller;
use App\Notifications\MailNewAccount;
use App\Notifications\MailPasswordReset;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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
        $errorMessage = "";
        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        if($response == Password::PASSWORD_RESET){
            $user = User::where('email', $request->input('email'))->first();
            $this->sendResetResponse($user);
        }else{
            Log::info('Response: ' . $response . '.' );
            $errorMessage = $response;
            $this->sendResetFailedResponse($request, $response);
        }

        return $errorMessage;
    }

    //redirect is handled by react, we send succes e-mail
    protected function sendResetResponse(User $user)
    {
        if($user->visit_count !== 0){
            $user->notify(new MailPasswordReset());
        }else{
            $user->notify(new MailNewAccount($user->email));
            $this->sendAdministrationEmail($user);
        }
    }

    protected function sendAdministrationEmail(User $user){
        $mailContent = '<h1>Er is een gebruiker aangemaakt voor coöperatie '  . config('app.name') . '</h1><br><br>';
        $mailContent .= '<ul>';
        $mailContent .= '<li>Id: ' . $user->id . '</li>';
        $mailContent .= '<li>Aanspreektitel: ' . ($user->title ? $user->title->name : '') . '</li>';
        $mailContent .= '<li>Voornaam: ' . $user->first_name . '</li>';
        $mailContent .= '<li>Tussenvoegsel: ' . ($user->lastNamePrefix ? $user->lastNamePrefix->name : '') . '</li>';
        $mailContent .= '<li>Achternaam: ' . $user->last_name . '</li>';
        $mailContent .= '<li>E-mail: ' . $user->email . '</li>';
        $mailContent .= '<li>Telefoonnummer: ' . $user->phone_number . '</li>';
        $mailContent .= '<li>Mobiel: ' . $user->mobile . '</li>';
        $mailContent .= '<li>Functie: ' . $user->occupation . '</li>';
        $mailContent .= '</ul>';

        Mail::send('emails.generic', ['html_body' => $mailContent], function ($message) {
            $message->subject('Nieuwe gebruiker voor ' . config('app.name'));
            $message->to(['gebruikers@econobis.nl']);
        });
    }
}