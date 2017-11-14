<?php

namespace App\Eco\User;

use App\Cooperation;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Title\Title;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Laracasts\Presenter\PresentableTrait;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Venturecraft\Revisionable\RevisionableTrait;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, RevisionableTrait, HasRoles, PresentableTrait;
    protected $presenter = UserPresenter::class;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'remember_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'visit_count' => 'integer',
        'active' => 'boolean',
    ];

    protected $dates = [
        'last_visit',
    ];

    public function lastNamePrefix()
    {
        return $this->belongsTo(LastNamePrefix::class);
    }

    public function title()
    {
        return $this->belongsTo(Title::class);
    }

    /**
     * Laravel passport checkt op deze functie voor het valideren van logingegevens
     *
     * @param $password
     * @return bool
     */
    public function validateForPassportPasswordGrant($password)
    {
        if(!$this->active) return false;

        return Hash::check($password, $this->getAuthPassword());
    }
}
