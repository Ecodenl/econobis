<?php


namespace App\Http\Controllers\Portal\Auth;


use App\Eco\Contact\Contact;
use App\Eco\Portal\PortalUser;
use App\Eco\User\User;
use App\Eco\PortalSettings\PortalSettings;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use JosKolenberg\LaravelJory\Facades\Jory;
use Laravel\Passport\Passport;

class RegisterController extends Controller
{

    public function register(Request $request)
    {
        Log::info("Registratie poging van: |" . $request->get('email') . "| met portal registration code: |" . $request->get('registrationCode') . "|");

        // Voor aanmaak van Contact wordt created by and updated by via ContactObserver altijd bepaald obv Auth::id
        $responsibleUserId = PortalSettings::first()?->responsible_user_id;
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden (1).');
        }

        if(PortalUser::where('email', $request->get('email'))->exists()){
            Log::info("Account is reeds geactiveerd van: |" . $request->get('email') . "|.");
            abort(423, 'Account is reeds geactiveerd. Om in te loggen of wachtwoord vergeten:');
//            throw ValidationException::withMessages(['misc', 'An account already exists for this contact.']);
        }

        $responsibleUser = User::find($responsibleUserId);
        $responsibleUser->occupation = '@portal-update@';
        Auth::setUser($responsibleUser);

        $this->validate($request, [
            'email' => ['required', 'exists:email_addresses,email'],
            'password' => ['required'],
            'registrationCode' => ['required', 'exists:contacts,portal_registration_code'],
        ]);

        $contact = Contact::where('portal_registration_code', $request->input('registrationCode'))->first();

        if (!$contact->emailAddresses()->where('email', $request->input('email'))->exists()) {
            throw ValidationException::withMessages(['misc', 'Invalid email or code']);
        }

        if(PortalUser::where('contact_id', $contact->id)->exists()){
            throw ValidationException::withMessages(['misc', 'An account already exists for this contact.']);
        }

        DB::beginTransaction();

        $contact->portal_registration_code = null;
        $contact->save();

        $portalUser = new PortalUser();
        $portalUser->email = $request->input('email');
        $portalUser->password = bcrypt($request->input('password'));
        $portalUser->contact_id = $contact->id;
        $portalUser->remember_token = Str::random(60);
        $portalUser->save();

        DB::commit();

        $portalUser->sendAccountActivatedNotification();

//        Passport::actingAs($portalUser);

        return Jory::on($contact);
    }

}