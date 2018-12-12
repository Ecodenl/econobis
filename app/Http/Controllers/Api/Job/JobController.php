<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Job;

use App\Eco\Jobs\JobsLog;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\GenericResource;
use Illuminate\Support\Facades\Auth;

class JobController extends ApiController
{

   public function getLastJobs(){
       $jobLogs = JobsLog::where('user_id', Auth::id())->orderBy('created_at', 'desc')->limit(10)->get();

       return GenericResource::collection($jobLogs);
   }

}