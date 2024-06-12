<?php

namespace App\Eco\Contact;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ContactToImport extends Model
{
    use RevisionableTrait, SoftDeletes, HasFactory;

    protected $table = 'contacts_to_import';

    protected $guarded = ['id'];

    protected $dates = [
        'member_since',
        'end_date',
    ];
}
