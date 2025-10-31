<?php

namespace App\Http\Controllers\Api\PortalUser;

use App\Eco\Portal\PortalUser;
use App\Eco\Portal\PortalUserLoginAttempt;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;

class PortalUserController extends ApiController
{
    public function update(Request $request, PortalUser $portalUser)
    {
        $this->validateEmail($request, $portalUser);

        $this->authorize('update', $portalUser);

        $data = $request->validate([
            'email' => '',
        ]);
        $portalUser->fill($this->arrayKeysToSnakeCase($data));
        $portalUser->save();

//        return new FullPortalUser($portalUser->fresh()->load('createdBy', 'updatedBy'));
        return new $portalUser;
    }

    public function unblock(PortalUser $portalUser, Request $request)
    {
        $this->authorize('unblockUser', Auth::user());

        $portalUser->failed_logins   = 0;
        $portalUser->blocked_until   = null;
        $portalUser->blocked_permanent = false;
        $portalUser->save();

        // Veiligheid: email kan ook tot 191 lang zijn; DB kolom result is 191
        $result = (string) 'Unblocked by: ' . Auth::user()->email . ' (id: ' . Auth::user()->id . ')';
        if (strlen($result) > 191) {
            $result = substr($result, 0, 191);
        }

        PortalUserLoginAttempt::create([
            'portal_user_id'      => $portalUser?->id,
            'identifier'          => $portalUser?->email,
            'ip'                  => null,
            'user_agent'          => null,
            'succeeded'           => true,
            'result'              => $result,
            'failed_logins_after' => null,
            'blocked_until'       => null,
            'blocked_permanent'   => false,
        ]);

        return $portalUser;
    }

    protected function validateEmail(Request $request, PortalUser $portalUser)
    {
        $this->validate($request, ['email' => 'required|email']);

        if(PortalUser::where('email', $request->input('email'))->where('id', '!=', $portalUser->id)->count() !== 0){
            abort(404, 'E-mail bestaat al bij een andere Portal gebruiker.');
        }
    }

    public function destroy(PortalUser $portalUser)
    {
        $contact =  $portalUser->contact;
        if($contact)
        {
            $this->authorize('delete', $portalUser);

            foreach ($portalUser->documentsCreated as $document){
                $document->createdByPortalUser()->dissociate();
                $document->save();
            }

            $portalUser->delete();

            $contact->portal_registration_code = Str::random(32);
            $contact->save();
        }else{
            abort(404, 'Geen contact bekend.');
        }
    }

    public function resetTwoFactor(PortalUser $portalUser, DisableTwoFactorAuthentication $disable)
    {
        $disable($portalUser);

        $portalUser->two_factor_confirmed_at = null;
        $portalUser->save();

        $portalUser->twoFactorTokens()->delete();

        return new JsonResponse('', 200);
    }
}