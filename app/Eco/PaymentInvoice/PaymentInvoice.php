<?php

namespace App\Eco\PaymentInvoice;

use App\Eco\Administration\Administration;
use App\Eco\Administration\Sepa;
use App\Eco\ProductionProject\ProductionProjectRevenueDistribution;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class PaymentInvoice extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function revenueDistribution()
    {
        return $this->belongsTo(ProductionProjectRevenueDistribution::class, 'revenue_distribution_id');
    }

    public function sepa()
    {
        return $this->belongsTo(Sepa::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function getStatus()
    {
        if(!$this->status_id) return null;

        return PaymentInvoiceStatus::get($this->status_id);
    }
}
