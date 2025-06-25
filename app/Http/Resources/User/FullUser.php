<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 15:23
 */

namespace App\Http\Resources\User;


use App\Http\Resources\Administration\AdministrationPeek;
use App\Http\Resources\GenericResource;
use App\Http\Resources\LastNamePrefix\FullLastNamePrefix;
use App\Http\Resources\Mailbox\MailboxPeek;
use App\Http\Resources\Title\FullTitle;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class FullUser extends JsonResource
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
            'occupation' =>  $this->occupation,
            'lastVisit' => $this->last_visit,
            'visitCount' => $this->visit_count,
            'active' => $this->active,
            'administrations' => AdministrationPeek::collection($this->whenLoaded('administrations')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'permissions' => $this->getPermissions(),
            'hasAlfrescoAccount' => $this->has_alfresco_account ? true : false,
            'roles' => $this->getRoles(),
            'requireTwoFactorAuthentication' => $this->require_two_factor_authentication,
            'hasTwoFactorActivated' => $this->hasTwoFactorActivated(),
            'showTwoFactorNotification' => $this->show_two_factor_notification,
            'defaultMailboxId' => $this->default_mailbox_id,
            'defaultMailbox' => MailboxPeek::make($this->whenLoaded('defaultMailbox')),
            'defaultMailboxWithFallback' => MailboxPeek::make($this->getDefaultMailboxWithFallback()),
//            'mailboxes' =>$this->whenLoaded('mailboxes'),
        ];
    }

    private function getPermissions()
    {
        $result = [];
        foreach(Permission::all() as $permission){
            $result[camel_case($permission->name)] = $this->hasPermissionTo($permission);
        }
        return $result;
    }

    private function getRoles()
    {
        $i = 0;
        $result = [];
        foreach(Role::all() as $role){
            $result[$i]['id'] = $role->id;
            $result[$i]['name'] = $role->name;
            $result[$i]['hasRole'] = $this->hasRole($role);
            $i++;
        }
        return $result;
    }

}