<?php

namespace App\Eco\ContactGroup;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class ContactGroupBuilder extends Builder
{
    public function whereTeamContactGroupIds(User $user)
    {
// todo WM: cleanup
//        Log::info('test whereTeamContactGroupIds');
//
// todo WM: Hier de globalscope boot aanpassing doen uit ContactGroup en dan kan als het goed is
//  die globalscope boot aanpassing weer weg en de $user->getTeamContactGroupIds?!
//        if($user->getTeamContactGroupIds()){
//            $this->whereIn('contact_groups.id', $user->getTeamContactGroupIds());
//        }
        $userHasTeams = $user->teams()->whereHas('contactGroups')->exists();
        if($userHasTeams){
//            Log::info('userHasTeams');
//            Log::info($user->id);
//            Log::info($user->teams()->whereHas('contactGroups')->get());
            $this->whereHas('teams.users', function($query) use($user) {
                $query->where('users.id', $user->id);
            });
        }
        return $this;
    }
}