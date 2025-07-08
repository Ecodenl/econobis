<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-11-2017
 * Time: 16:27
 */

namespace App\Eco\Occupation;


use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class OccupationContact extends Model
{
    protected $table = 'occupation_contact';

    protected $guarded = ['id'];

    public function primaryContact()
    {
        return $this->belongsTo(Contact::class, 'primary_contact_id');
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function occupation()
    {
        return $this->belongsTo(Occupation::class);
    }
}