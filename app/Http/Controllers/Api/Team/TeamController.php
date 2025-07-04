<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Team;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Eco\PortalSettings\PortalSettings;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Team\Grid\RequestQuery;

use App\Http\Resources\ContactGroup\ContactGroupPeek;
use App\Http\Resources\Document\FullDocumentCreatedFrom;
use App\Http\Resources\Team\FullTeam;
use App\Http\Resources\Team\PeekTeam;
use App\Http\Resources\User\UserPeek;
use Illuminate\Http\Request;

class TeamController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', Team::class);

        $teams = $requestQuery->get();

        $teams->load([
            'users', 'contactGroups', 'documentCreatedFroms'
        ]);

        return FullTeam::collection($teams)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(Team $team)
    {
        $this->authorize('view', Team::class);

        $team->load([
            'users', 'contactGroups', 'documentCreatedFroms'
        ]);

        return FullTeam::make($team);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Team::class);

        $data = $request->validate([
            'name' => 'required',
        ]);

        //basic team
        $team = new Team();

        $team->name = $data['name'];

        $team->save();

        return $this->show($team);
    }


    public function update(Request $request, Team $team)
    {
        $this->authorize('create', Team::class);

        $data = $request->validate([
            'name' => 'required',
        ]);

        $team->name = $data['name'];

        $team->save();

        return $this->show($team);
    }


    public function attachUser(Team $team, User $user)
    {
        $this->authorize('create', Team::class);

        $team->users()->attach($user->id);

        return UserPeek::make($user);
    }

    public function attachContactGroup(Team $team, ContactGroup $contactGroup)
    {
        $this->authorize('create', Team::class);

        $team->contactGroups()->attach($contactGroup->id);

        return ContactGroupPeek::make($contactGroup);
    }

    public function attachDocumentCreatedFrom(Team $team, DocumentCreatedFrom $documentCreatedFrom)
    {
        $this->authorize('create', Team::class);

        $team->documentCreatedFroms()->attach($documentCreatedFrom->id);

        return FullDocumentCreatedFrom::make($documentCreatedFrom);
    }

    public function detachUser(Team $team, User $user)
    {
        $this->authorize('create', Team::class);

        $team->users()->detach($user->id);
    }

    public function detachContactGroup(Team $team, ContactGroup $contactGroup)
    {
        $this->authorize('create', Team::class);

        $team->contactGroups()->detach($contactGroup->id);
    }

    public function detachDocumentCreatedFrom(Team $team, DocumentCreatedFrom $documentCreatedFrom)
    {
        $this->authorize('create', Team::class);

        $team->documentCreatedFroms()->detach($documentCreatedFrom->id);
    }

    public function destroy(Team $team)
    {
        $this->authorize('create', Team::class);

        // Team can not be deleted if it is used in portalsettings
        $checkContactTaskResponsibleTeamId = PortalSettings::first()?->check_contact_task_responsible_team_id;
        if($team->id == $checkContactTaskResponsibleTeamId){
            abort(412, 'Dit team wordt nog gebruikt in algemene portal instellingen.');
        }

        //delete many to many relations
        $team->users()->detach();

        foreach ($team->tasks as $task){
            $task->responsibleTeam()->dissociate();
            $task->save();
        }

        foreach ($team->emails as $email){
            $email->responsibleTeam()->dissociate();
            $email->save();
        }

        //delete model itself
        $team->delete();
    }

    public function peek(){
        $people = Team::all();

        return PeekTeam::collection($people);
    }
}