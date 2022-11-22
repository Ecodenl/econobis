<?php

namespace App\Eco\Email;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class EmailAttachment extends Model
{
    protected $guarded = ['id'];

    public function email()
    {
        return $this->belongsTo(Email::class);
    }

    public function getBase64Image()
    {
        return 'data:image/jpeg;base64,' . base64_encode(Storage::disk('mail_attachments')->get($this->filename));
    }
}

