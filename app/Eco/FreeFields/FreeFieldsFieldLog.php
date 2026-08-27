<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-12-2018
 * Time: 12:59
 */

namespace App\Eco\FreeFields;

use App\Eco\Portal\PortalUser;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class FreeFieldsFieldLog extends Model
{
    protected $table = 'free_fields_field_log';
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded
        = [
            'id'
        ];

    public function freeFieldsFieldRecord()
    {
        return $this->belongsTo(FreeFieldsFieldRecord::class);
    }

    public function portalUser()
    {
        return $this->belongsTo(PortalUser::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}