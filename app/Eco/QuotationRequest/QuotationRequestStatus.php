<?php

namespace App\Eco\QuotationRequest;

use Illuminate\Database\Eloquent\Model;

class QuotationRequestStatus extends Model
{
    protected $table = 'quotation_request_status';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function quotationRequests()
    {
        return $this->hasMany(QuotationRequest::class);
    }
}
