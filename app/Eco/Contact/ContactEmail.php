<?php

namespace App\Eco\Contact;

use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use Illuminate\Database\Eloquent\Model;

class ContactEmail extends Model
{
    protected $table = 'contact_email';

    protected $fillable = [
        'contact_id',
        'email_id',
        'email_address_id',
        'status_code',
    ];

    public $timestamps = true;

    // Handige constants voor statussen
    public const STATUS_TO_SEND = 'to-send';
    public const STATUS_SENT    = 'sent';
    public const STATUS_ERROR   = 'error';

    /* -----------------------
     * Relaties
     * --------------------- */

    public function email()
    {
        return $this->belongsTo(Email::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function emailAddress()
    {
        return $this->belongsTo(EmailAddress::class);
    }
}
