<?php

namespace App\Eco\Person;

use App\Eco\Account\Account;
use App\Eco\Contact\Contact;
use App\Eco\LastNamePrefix\LastNamePrefix;
use App\Eco\Occupation\Occupation;
use App\Eco\PersonType\PersonType;
use App\Eco\Title\Title;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class Person extends Model
{
    use RevisionableTrait, SoftDeletes, PresentableTrait;
    protected $presenter = PersonPresenter::class;

    protected $guarded = ['id'];

    protected $casts = [
        'primary' => 'boolean',
    ];

    protected $dates = [
        'date_of_birth',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function lastNamePrefix()
    {
        return $this->belongsTo(LastNamePrefix::class);
    }

    public function title()
    {
        return $this->belongsTo(Title::class);
    }

    public function type()
    {
        return $this->belongsTo(PersonType::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function occupation()
    {
        return $this->belongsTo(Occupation::class);
    }

}
