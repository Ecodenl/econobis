<?php

namespace App\Http\Controllers\Api\User;

use App\Eco\User\User;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function me(Request $request)
    {
        return $this->show($request->user());
    }

    public function show(User $user)
    {
        $user->load(['lastNamePrefix', 'title']);
        return FullUser::make($user);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('create', User::class);

        $data = $input->string('email')->validate(['required', 'email', 'unique:users,email'])->next()
            ->string('alfrescoPassword')->validate('required')->alias('alfresco_password')->next()
            ->string('titleId')->validate('exists:titles,id')->default(null)->alias('title_id')->next()
            ->string('firstName')->whenMissing('')->alias('first_name')->next()
            ->string('lastNamePrefixId')->validate('exists:last_name_prefixes,id')->default(null)->alias('last_name_prefix_id')->next()
            ->string('lastName')->whenMissing('')->alias('last_name')->next()
            ->string('phoneNumber')->whenMissing('')->alias('phone_number')->next()
            ->string('mobile')->whenMissing('')->next()
            ->string('occupation')->whenMissing('')->next()
            ->boolean('active')->whenMissing(true)->next()
            ->get();

        //create random password
        $data['password'] = Str::random(20);

        $user = new User();
        $user->fill($data);

        $alfrescoHelper = new AlfrescoHelper(env('ALFRESCO_ADMIN_USERNAME'), env('ALFRESCO_ADMIN_PASSWORD'));

        //creates new account in alfresco and assigns to site
        $alfrescoHelper->createNewAccount($user);

        $user->save();

        $user->assignRole(Role::findByName('superuser'));

        //Send link to set password
        $forgotPassWordController = new ForgotPasswordController();
        $forgotPassWordController->sendResetLinkEmail($request);

        return $this->show($user->fresh());
    }

    public function update(User $user, RequestInput $input)
    {
        $this->authorize('update', $user);

        $data = $input->string('email')->validate(['required', 'email', Rule::unique('users', 'email')->ignore($user->id)])->next()
            ->password('password')->next()
            ->string('titleId')->validate('exists:titles,id')->onEmpty(null)->alias('title_id')->next()
            ->string('firstName')->alias('first_name')->next()
            ->string('lastNamePrefixId')->validate('exists:last_name_prefixes,id')->onEmpty(null)->alias('last_name_prefix_id')->next()
            ->string('lastName')->alias('last_name')->next()
            ->string('phoneNumber')->alias('phone_number')->next()
            ->string('mobile')->next()
            ->string('occupation')->next()
            ->boolean('active')->next()
            ->get();


        $user->fill($data);
        $user->save();

        return $this->show($user->fresh());
    }

    public function withPermission(Permission $permission){
        $users = User::permission($permission)->with(['lastNamePrefix', 'title'])->get();
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
}
