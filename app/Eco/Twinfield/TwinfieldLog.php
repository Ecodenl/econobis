<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-12-2018
 * Time: 12:59
 */

namespace App\Eco\Twinfield;

use App\Eco\Contact\Contact;
use App\Eco\Invoice\Invoice;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class TwinfieldLog extends Model
{
    protected $table = 'twinfield_log';
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded
        = [
            'id'
        ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getTwinfieldLogMessageType()
    {
        if (!$this->message_type) return null;

        return TwinfieldLogMessageType::get($this->message_type);
    }

    public function getTwinfieldLogMessageTypeNameAttribute()
    {
        if (!$this->message_type) return '';

        return TwinfieldLogMessageType::get($this->message_type)->name;
    }
}