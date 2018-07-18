<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Laracasts\Presenter\PresentableTrait;

class DynamicContactGroupFilter extends Model
{
    use PresentableTrait;

    protected $table = 'dynamic_contact_group_filter';
    protected $guarded = ['id'];


}
