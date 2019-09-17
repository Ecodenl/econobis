<?php


namespace App\Http\Controllers\Portal\ParticipantProject;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ParticipantProjectController extends Controller
{
    public function create(ParticipantProject $participantProject, Request $request)
    {
        dd($participantProject);
        dd($request);
    }

}