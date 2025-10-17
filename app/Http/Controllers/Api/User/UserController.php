<?php

namespace App\Http\Controllers\Api\User;

use App\Eco\User\User;
use App\Helpers\Excel\PermissionExcelHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\Intake\Grid\RequestQuery;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function me(Request $request)
    {
        $request->user()->load(['lastNamePrefix', 'title', 'administrations']);

        return FullUser::make($request->user());
    }

    public function show(User $user)
    {
        $this->authorize('view', User::class);

        $user->load(['lastNamePrefix', 'title', 'administrations', 'defaultMailbox', 'teams']);

        return FullUser::make($user);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('create', User::class);

        $data = $input->string('email')->validate(['required', 'email', 'unique:users,email'])->next()
            ->string('titleId')->validate('exists:titles,id')->default(null)->alias('title_id')->next()
            ->string('firstName')->whenMissing('')->alias('first_name')->next()
            ->string('lastNamePrefixId')->validate('exists:last_name_prefixes,id')->default(null)->alias('last_name_prefix_id')->next()
            ->string('lastName')->whenMissing('')->alias('last_name')->next()
            ->string('phoneNumber')->whenMissing('')->alias('phone_number')->next()
            ->string('mobileNumber')->whenMissing('')->alias('mobile')->next()
            ->boolean('active')->whenMissing(true)->next()
            ->string('occupation')->next()
            ->string('teamId')->validate('nullable|exists:teams,id')->default(null)->alias('team_id')->next()
            ->get();
        //create random password
        $data['password'] = Str::random(20);

        // Pak team_id los en haal ’m uit $data zodat het niet in fill() belandt
        // Deze gebruiken dan om gebruiker direct aan opgegeven team te koppelen, zie $user->teams()->attach([$teamId]); verderop
        $teamId = (int) Arr::pull($data, 'team_id');

        $user = new User();
        $user->fill($data);

        // Todo: Alfresco volledig uitgefaseerd nu, maar deze velden moet niet null zijn
        //  later deze velden nog eens helemaal weghalen
        $user->has_alfresco_account = 0;
        $user->alfresco_password = 'nvt';
        $user->save();

        // Team koppelen als gezet
        if ($teamId > 0) {
            $user->teams()->attach([$teamId]);
        }

        $user->assignRole(Role::findByName('Medewerker'));

        //Send link to set password
        (new ForgotPasswordController())->sendResetLinkEmail($request);

        return $this->show($user->fresh());
    }

    public function update(User $user, RequestInput $input, Request $request)
    {
        /**
         * Aparte functie voor default mailbox aanroepen omdat hier andere permissie check op zit.
         */
        $data = $request->all();
        if(count($data) === 2 && array_key_exists('defaultMailboxId', $data) && array_key_exists('id', $data)) {
            return $this->updateDefaultMailbox($user, $request);
        }

        $this->authorize('update', $user);

        $resetTwoFactorAuthentication = false;

        if($user->require_two_factor_authentication && $request->input('requireTwoFactorAuthentication') === false) {
            $resetTwoFactorAuthentication = true;
        }

        $data = $input->string('email')->validate(['required', 'email', Rule::unique('users', 'email')->ignore($user->id)])->next()
            ->password('password')->next()
            ->string('titleId')->validate('exists:titles,id')->onEmpty(null)->alias('title_id')->next()
            ->string('firstName')->alias('first_name')->next()
            ->string('lastNamePrefixId')->validate('exists:last_name_prefixes,id')->onEmpty(null)->alias('last_name_prefix_id')->next()
            ->string('lastName')->alias('last_name')->next()
            ->string('phoneNumber')->alias('phone_number')->next()
            ->boolean('requireTwoFactorAuthentication')->alias('require_two_factor_authentication')->next()
            ->string('mobile')->next()
            ->boolean('active')->next()
            ->string('occupation')->next()
            ->get();

        $user->fill($data);
        $user->save();

        if($resetTwoFactorAuthentication) {
            $this->doResetTwoFactor($user);
        }

        return $this->show($user->fresh());
    }

    public function updateDefaultMailbox(User $user, Request $request)
    {
        /**
         * Mailbox mag elke gebruiker voor zichzelf wijzigen ongeacht zijn rechten.
         */
        $this->authorize('update-default-mailbox', $user);
        $user->default_mailbox_id = $request->input('defaultMailboxId') ? $request->input('defaultMailboxId') : null;
        $user->save();

        return $this->show($user);
    }

    public function withPermission(Permission $permission)
    {
        $users = User::permission($permission)->with(['lastNamePrefix', 'title'])->where('id', '!=', '1')->where('active', true)->get();
        return FullUser::collection($users);
    }

    public function addRole(User $user, Role $role)
    {
        $this->authorize('update', $user);

        $user->assignRole($role);
    }

    public function removeRole(User $user, Role $role)
    {
        $this->authorize('update', $user);

        $user->removeRole($role);
    }

    public function sendResetLinkEmail(Request $request)
    {
        (new ForgotPasswordController())->sendResetLinkEmail($request);
    }

    public function resetTwoFactor(User $user)
    {
        $this->doResetTwoFactor($user);
    }

    private function doResetTwoFactor(User $user)
    {
        $user->twoFactorTokens()->delete();
        $user->two_factor_secret = null;
        $user->two_factor_recovery_codes = null;
        $user->two_factor_confirmed_at = null;

        $user->save();
    }

    public function checkPassword()
    {
        /**
         * Hoeven hier geen check te doen omdat de password check al in de CheckPasswordConfirmationHeader middleware gebeurt.
         * Als we hier al komen is password dus altijd goed.
         */

        return response()->json(['message' => 'Wachtwoord is correct.']);
    }

    public function rolesPermissionsExcel(RequestQuery $requestQuery)
    {
        $this->authorize('update', Auth::user());

        set_time_limit(0);

        $permissionExcelHelper = new PermissionExcelHelper();

        return $permissionExcelHelper->downloadExcel();
    }
}
