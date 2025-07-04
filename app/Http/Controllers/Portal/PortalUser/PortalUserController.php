<?php

namespace App\Http\Controllers\Portal\PortalUser;

use App\Eco\Portal\PortalUser;
use App\Eco\User\User;
use App\Eco\PortalSettings\PortalSettings;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use JosKolenberg\LaravelJory\Facades\Jory;

class PortalUserController extends Controller
{

    public function me()
    {
        return Jory::on(Auth::user()->contact);
    }

    public function portalUserEmail()
    {
        return Auth::user()->email;
    }

    public function changeEmail(Request $request )
    {
        if (!isset($request) || !isset($request->email) || !isset($request->changePrimaryEmailAddress)) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        // todo wellicht checken of portalUser (en/of contact) ondertussen gewijzigd is?

        // ophalen portal user en check contact relatie
        $portalUserAuth = Auth::user();
        if (!Auth::isPortalUser() || !$portalUserAuth->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        // Voor aanmaak van contact gegevens wordt created by and updated by via ContactObserver altijd bepaald obv Auth::id
        // todo wellicht moeten we hier nog wat op anders verzinnen, voornu gebruiken we responisibleUserId from settings.json, verderop zetten we dat weer terug naar portal user
        $responsibleUserId = PortalSettings::first()?->responsible_user_id;
        if (!$responsibleUserId) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        $this->validateEmail($request, $portalUserAuth);

        Auth::setUser(User::find($responsibleUserId));
        $portalUser = null;
        DB::transaction(function () use ($request, $portalUserAuth, $portalUser) {

            $portalUser = PortalUser::find($portalUserAuth->id);
            $portalUser->email = $request->email;
            if($request->changePrimaryEmailAddress){
                $portalUser->contact->primaryEmailAddress->email = $request->email;
                $portalUser->contact->primaryEmailAddress->save();
            }
            $portalUser->save();

        });

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser ? $portalUser : $portalUserAuth);

    }

    public function changePassword(Request $request)
    {
        if (!isset($request) || !isset($request->password)) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        // ophalen portal user
        $portalUserAuth = Auth::user();
        if (!Auth::isPortalUser()) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        $portalUser = null;
        DB::transaction(function () use ($request, $portalUserAuth, $portalUser) {

            $portalUser = PortalUser::find($portalUserAuth->id);
            $portalUser->password = Hash::make($request->password);
            $portalUser->save();

        });

        // todo wellicht moeten we hier nog wat op anders verzinnen, voor nu hebben we responisibleUserId from settings.json tijdelijk in Auth user gezet hierboven
        // Voor zekerheid hierna weer even Auth user herstellen met portal user
        Auth::setUser($portalUser ? $portalUser : $portalUserAuth);
    }

    protected function validateEmail(Request $request, PortalUser $portalUserAuth)
    {
        $this->validate($request, ['email' => 'required|email']);

        if(PortalUser::where('email', $request->input('email'))->where('id', '!=', $portalUserAuth->id)->count() !== 0){
            abort(404, 'E-mail bestaat al bij een andere Portal gebruiker.');
        }
        //todo zelfde primaire email bij meerder contacten is wel toegestaan toch ?
//        if(EmailAddress::where('email', $request->input('email'))->where('primary', true)->where('contact_id', '!=', $portalUserAuth->contact->id)->count() !== 0){
//            abort(404, 'E-mail bestaat als primary e-mail bij een andere contact.');
//        }
    }

    public function checkPassword(Request $request)
    {
        /**
         * Hoeven hier geen check te doen omdat de password check al in de CheckPasswordConfirmation middleware gebeurt.
         * Als we hier al komen is password dus altijd goed.
         */

        return response()->json(['message' => 'Wachtwoord is correct.'], 200);
    }
}