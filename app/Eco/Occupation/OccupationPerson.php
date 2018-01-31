<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-11-2017
 * Time: 16:27
 */

namespace App\Eco\Occupation;


use App\Eco\Address\Address;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class OccupationPerson extends Model
{
    protected $table = 'occupation_person';

    protected $guarded = ['id'];

    protected $dates = [
        'start_date',
        'end_date',
    ];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function occupation()
    {
        return $this->belongsTo(Occupation::class);
    }

    /**
     * Set the keys for a save update query.
     * This is a fix for tables with composite keys
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function setKeysForSaveQuery(Builder $query)
    {
        $query
            //Put appropriate values for your keys here:
            ->where('occupation_id', '=', $this->occupation_id)
            ->where('person_id', '=', $this->person_id)
            ->where('organisation_id', '=', $this->organisation_id);

        return $query;
    }

    protected function setKeysForRefreshQuery(Builder $query)
    {
        $query
            //Put appropriate values for your keys here:
            ->where('occupation_id', '=', $this->occupation_id)
            ->where('person_id', '=', $this->person_id)
            ->where('organisation_id', '=', $this->organisation_id);

        return $query;
    }
}