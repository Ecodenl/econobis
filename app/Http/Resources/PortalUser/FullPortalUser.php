<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 23-10-2019
 * Time: 14:10
 */

namespace App\Http\Resources\PortalUser;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class FullPortalUser extends JsonResource
{
    public function toArray($request)
    {
        return [
           'id' => $this->id,
            'email' => $this->email,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'hasTwoFactorEnabled' => $this->hasEnabledTwoFactorAuthentication(),
            'failedLogins' => $this->failed_logins,
            'blocked' => $this->blocked_permanent || ($this->blocked_until !== null && Carbon::parse($this->blocked_until) > Carbon::now()),
            'blockedUntil' => $this->blocked_until,
            'blockedUntilFormatted' => $this->blocked_permanent ? 'Permanent' : ($this->blocked_until ? $this->blocked_until->locale('nl_NL')->isoFormat('dddd D MMMM YYYY HH:mm') : ''),
            'blockedPermanent' => $this->blocked_permanent,
        ];
    }
}