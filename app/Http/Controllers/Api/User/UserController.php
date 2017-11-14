<?php

namespace App\Http\Controllers\Api\User;

use App\Eco\User\User;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;

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

    public function store(RequestInput $input)
    {
        $data = $input->string('email')->validate(['required', 'email', 'unique:users,email'])->next()
            ->password('password')->validate('required')->next()
            ->string('titleId')->validate('exists:titles,id')->default(null)->alias('title_id')->next()
            ->string('firstName')->whenMissing('')->alias('first_name')->next()
            ->string('lastNamePrefixId')->validate('exists:last_name_prefixes,id')->default(null)->alias('last_name_prefix_id')->next()
            ->string('lastName')->whenMissing('')->alias('last_name')->next()
            ->string('phoneNumber')->whenMissing('')->alias('phone_number')->next()
            ->string('mobile')->whenMissing('')->next()
            ->string('occupation')->whenMissing('')->next()
            ->boolean('active')->whenMissing(true)->next()
            ->get();

        $user = new User();
        $user->fill($data);
        $user->save();

        return $this->show($user->fresh());
    }

    public function update(User $user, RequestInput $input)
    {
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
}
