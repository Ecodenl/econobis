<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 15:23
 */

namespace App\Http\Resources\User;


use App\Http\Resources\LastNamePrefix\FullLastNamePrefix;
use App\Http\Resources\Title\FullTitle;
use Illuminate\Http\Resources\Json\Resource;
use Spatie\Permission\Models\Permission;

class FullUser extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'titleId' => $this->title_id,
            'title' => FullTitle::make($this->whenLoaded('title')),
            'fullName' => $this->present()->fullName(),
            'lastNamePrefixId' => $this->last_name_prefix_id,
            'lastNamePrefix' => FullLastNamePrefix::make($this->whenLoaded('lastNamePrefix')),
            'lastName' => $this->last_name,
            'email' => $this->email,
            'phoneNumber' => $this->phone_number,
            'mobile' => $this->mobile,
            'occupation' => $this->occupation,
            'lastVisit' => $this->last_visit,
            'visitCount' => $this->visit_count,
            'active' => $this->active,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'permissions' => $this->getPermissions(),
        ];
    }

    private function getPermissions()
    {
        $result = [];
        foreach(Permission::all() as $permission){
            $result[$permission->name] = $this->hasPermissionTo($permission);
        }
        return $result;
    }

}