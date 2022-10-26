<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Team;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Helpers\Settings\PortalSettings;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Team\Grid\RequestQuery;

use App\Http\Resources\ContactGroup\ContactGroupPeek;
use App\Http\Resources\Mailbox\MailboxPeek;
use App\Http\Resources\Team\FullTeam;
use App\Http\Resources\Team\PeekTeam;
use App\Http\Resources\User\UserPeek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TeamController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', Team::class);

        $teams = $requestQuery->get();

// todo WM: team_mailbox niet nodig (autorisatie kan via mailbox_user)
// Wellicht hebben we later wel team_document_created_from nodig.
//        $teams->load([
//            'users', 'contactGroups', 'mailboxes'
//        ]);
        $teams->load([
            'users', 'contactGroups'
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

// todo WM: team_mailbox niet nodig (autorisatie kan via mailbox_user)
// Wellicht hebben we later wel team_document_created_from nodig.
//        $team->load([
//            'users', 'contactGroups', 'mailboxes'
//        ]);
        $team->load([
            'users', 'contactGroups'
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

// todo WM: team_mailbox niet nodig (autorisatie kan via mailbox_user)
// Wellicht hebben we later wel team_document_created_from nodig.
//    public function attachMailbox(Team $team, Mailbox $mailbox)
//    {
//        $this->authorize('create', Team::class);
//
//        $team->mailboxes()->attach($mailbox->id);
//
//        return MailboxPeek::make($mailbox);
//    }

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

// todo WM: team_mailbox niet nodig (autorisatie kan via mailbox_user)
// Wellicht hebben we later wel team_document_created_from nodig.
//    public function detachMailbox(Team $team, Mailbox $mailbox)
//    {
//        $this->authorize('create', Team::class);
//
//        $team->mailboxes()->detach($mailbox->id);
//    }

    public function destroy(Team $team)
    {
        $this->authorize('create', Team::class);

        // Team can not be deleted if it is used in portalsettings
        $checkContactTaskResponsibleTeamId = PortalSettings::get('checkContactTaskResponsibleTeamId');
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