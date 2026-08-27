<?php

namespace App\Eco\PhoneNumber;

use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class PhoneNumber extends Model
{

    use RevisionableTrait, SoftDeletes, HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'primary' => 'boolean',
        'type_id' => PhoneNumberType::class,
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function getType(): ?PhoneNumberType
    {
        if (!$this->type_id) {
            return null;
        }

        if ($this->type_id instanceof PhoneNumberType) {
            return $this->type_id;
        }

        return PhoneNumberType::get($this->type_id);
    }
}
