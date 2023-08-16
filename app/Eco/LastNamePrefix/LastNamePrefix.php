<?php

namespace App\Eco\LastNamePrefix;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class LastNamePrefix extends Model
{
    protected $connection = 'econobis_shared';

    protected $table = 'shared_last_name_prefixes';

    use RevisionableTrait;
}
