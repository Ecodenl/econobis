<?php

namespace App\Eco\Opportunity;

use App\Eco\Organisation\Organisation;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class OpportunityQuotation extends Model
{
    use RevisionableTrait;

    protected $table = 'quotations_opportunities';

    protected $guarded = ['id'];

    public function opportunity(){
        return $this->belongsTo(Opportunity::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function organisation(){
        return $this->belongsTo(Organisation::class);
    }

}
