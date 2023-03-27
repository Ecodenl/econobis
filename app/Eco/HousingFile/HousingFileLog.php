<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-12-2018
 * Time: 12:59
 */

namespace App\Eco\HousingFile;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class HousingFileLog extends Model
{
    protected $table = 'housing_file_log';
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded
        = [
            'id'
        ];

    public function housingFile()
    {
        return $this->belongsTo(HousingFile::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getHousingFileLogMessageType()
    {
        if (!$this->message_type) return null;

        return HousingFileLogMessageType::get($this->message_type);
    }

    public function getHousingFileLogMessageTypeNameAttribute()
    {
        if (!$this->message_type) return '';

        return HousingFileLogMessageType::get($this->message_type)->name;
    }
}