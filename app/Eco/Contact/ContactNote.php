<?php

namespace App\Eco\Contact;

use App\Eco\Measure\Measure;
use Illuminate\Database\Eloquent\Model;

class ContactNote extends Model
{
    protected $table = 'contact_notes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'note', 'created_user_id'
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
