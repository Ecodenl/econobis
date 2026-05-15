<?php

namespace App\Eco\Cooperation;

use App\Eco\ContactGroup\ContactGroup;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class CooperationCleanupContactsExcludedGroup extends Model
{
    use RevisionableTrait;

    protected $table = 'cooperation_cleanup_contacts_excluded_groups';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function cooperation()
    {
        return $this->belongsTo(Cooperation::class);
    }
    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }
}
