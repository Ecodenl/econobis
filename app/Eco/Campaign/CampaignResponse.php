<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 19-12-2017
 * Time: 15:16
 */

namespace App\Eco\Campaign;


use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class CampaignResponse extends Model
{

    use RevisionableTrait, HasFactory;

    protected $guarded = [
        'id',
    ];

    /**
     * required
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * required
     */
    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}