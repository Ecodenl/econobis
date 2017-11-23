<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Laracasts\Presenter\PresentableTrait;

class ContactGroup extends Model
{
    use PresentableTrait;
    protected $presenter = ContactGroupPresenter::class;

    protected $casts = [
        'closed' => 'boolean',
    ];

    protected $dates = [
        'date_started',
        'date_finished',
        'created_at',
        'updated_at',
    ];

    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'contact_groups_pivot');
    }

    public function responsibleUser()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

}
