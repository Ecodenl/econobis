<?php

namespace App\Eco\Document;

use App\Eco\Team\Team;
use Illuminate\Database\Eloquent\Model;

class DocumentCreatedFrom extends Model
{
    protected $table = 'document_created_froms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'code_ref'
    ];
    protected $dates
        = [
            'created_at',
            'updated_at',
        ];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_document_created_from');
    }
}
