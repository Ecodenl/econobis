<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-12-2018
 * Time: 12:59
 */

namespace App\Eco\QuotationRequest;



use App\Eco\Contact\Contact;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class QuotationRequestActionsLog extends Model
{
    protected $table = 'quotation_request_actions_log';
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded
        = [
            'id'
        ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quotationRequest()
    {
        return $this->belongsTo(QuotationRequest::class);
    }

    public function oldStatus()
    {
        return $this->belongsTo(QuotationRequestStatus::class);
    }

    public function newStatus()
    {
        return $this->belongsTo(QuotationRequestStatus::class);
    }

}