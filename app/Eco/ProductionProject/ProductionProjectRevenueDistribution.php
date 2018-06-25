<?php

namespace App\Eco\ProductionProject;

use App\Eco\Contact\Contact;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\PaymentInvoice\PaymentInvoice;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ProductionProjectRevenueDistribution extends Model
{
    use RevisionableTrait;

    protected $table = 'production_project_revenue_distribution';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function participation()
    {
        return $this->belongsTo(ParticipantProductionProject::class,'participation_id');
    }

    public function revenue()
    {
        return $this->belongsTo(ProductionProjectRevenue::class, 'revenue_id');
    }

    public function paymentInvoices(){
        return $this->hasMany(PaymentInvoice::class, 'revenue_distribution_id');
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
