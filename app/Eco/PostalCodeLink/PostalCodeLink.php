<?php

namespace App\Eco\PostalCodeLink;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Measure\Measure;
use App\Eco\Intake\Intake;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class PostalCodeLink extends Model
{
    use RevisionableTrait;

    protected $table = 'postalcode_links';

    protected $guarded = ['id'];

    public function postalCodes(){
        return $this->hasMany(PostalCodeLink::class, 'postalcode_link', 'postalcode_main');
    }
}
