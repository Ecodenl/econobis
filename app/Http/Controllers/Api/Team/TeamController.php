<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Team;

use App\Eco\Team\Team;
use App\Eco\User\User;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Team\Grid\RequestQuery;

use App\Http\Resources\Team\FullTeam;
use App\Http\Resources\Team\PeekTeam;
use Illuminate\Http\Request;

class TeamController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $intakes = $requestQuery->get();

        return FullTeam::collection($intakes)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(Team $team)
    {
        $team->load([
            'users'
        ]);

        return FullTeam::make($team);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
        ]);

        //basic intake
        $team = new Team();

        $team->name = $data['name'];

        $team->save();

        return $this->show($team);
    }


    public function update(Request $request, Team $team)
    {
        $data = $request->validate([
            'name' => 'required',
        ]);

        $team->name = $data['name'];

        $team->save();

        return $this->show($team);
    }


    public function attachUser(Team $team, User $user)
    {
        $team->users()->attach($user->id);

        return FullTeam::make($team);
    }

    public function detachUser(Team $team, User $user)
    {
        $team->users()->detach($user->id);

        return FullTeam::make($team);
    }

    public function destroy(Team $team)
    {
        //delete many to many relations
        $team->users()->detach();

        //delete model itself
        $team->delete();

        return true;
    }

    public function peek(){
        $people = Team::all();

        return PeekTeam::collection($people);
    }
}