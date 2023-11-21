<?php

namespace App\Eco\Webform;

use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Webform extends Model
{
    use Encryptable;
    use RevisionableTrait;

    protected $guarded = ['id'];

    protected $casts = [
        'date_start' => 'date',
        'date_end' => 'date',
        'api_key_date' => 'date',
        'created_at' => 'date',
        'updated_at' => 'date',
        'last_requests' => 'array',
    ];

    protected $encryptable = [
        'api_key'
    ];

    /**
     * optional
     */
    public function responsibleUser()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * optional
     */
    public function responsibleTeam()
    {
        return $this->belongsTo(Team::class);
    }
}
