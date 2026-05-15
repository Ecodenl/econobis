<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\DataCleanup;

use App\Http\Resources\Cooperation\FullCooperationCleanupContactsExcludedGroup;
use Illuminate\Http\Resources\Json\JsonResource;

class FullCleanupContact extends JsonResource
{
    public function toArray($request)
    {
        return [
            'contactsToDelete' => FullCleanupItem::make($this['contactsToDelete'] ?? null),
            'contactsSoftDeleted' => FullCleanupItem::make($this['contactsSoftDeleted'] ?? null),
            'cleanupContactsExcludedGroups' =>
                FullCooperationCleanupContactsExcludedGroup::collection($this['cleanupContactsExcludedGroups'] ?? collect()),
        ];
    }
}
