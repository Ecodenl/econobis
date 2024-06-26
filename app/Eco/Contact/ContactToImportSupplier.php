<?php

namespace App\Eco\Contact;

use Illuminate\Database\Eloquent\Model;

class ContactToImportSupplier extends Model
{
    protected $table = 'contacts_to_import_suppliers';

    protected $guarded = ['id'];
}
