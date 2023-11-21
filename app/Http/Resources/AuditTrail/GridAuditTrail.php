<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\AuditTrail;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class GridAuditTrail extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'model' => array_values(array_slice(explode('\\', $this->revisionable_type), -1))[0],
            'revisionableId' => $this->revisionable_id,
            'field' => $this->key,
            'oldValue' => $this->old_value,
            'newValue' => $this->new_value,
            'valueChanged' => $this->value_changed,
            'changedBy' => FullUser::make($this->whenLoaded('user')),
            'changedAt' => $this->updated_at,
        ];
    }
}