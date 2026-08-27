<?php

namespace App\Eco\ContactNote;

use App\Eco\Contact\Contact;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ContactNote extends Model
{
    use RevisionableTrait, SoftDeletes, HasFactory;

    protected $guarded = ['id'];

    protected $attributes = [
        'note' => '',
    ];

    public function contact(){
        return $this->belongsTo(Contact::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }
}
