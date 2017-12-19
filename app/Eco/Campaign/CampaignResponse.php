<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 19-12-2017
 * Time: 15:16
 */

namespace App\Eco\Campaign;


use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Model;

class CampaignResponse extends Model
{

    protected $dates = [
        'date_responded',
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