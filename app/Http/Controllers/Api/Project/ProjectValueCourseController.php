<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Project;

use App\Eco\Project\ProjectValueCourse;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Project\FullProjectValueCourse;

class ProjectValueCourseController extends ApiController
{
    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ProjectValueCourse::class);

        $data = $requestInput
            ->integer('projectId')->validate('required|exists:projects,id')->alias('project_id')->next()
            ->date('date')->validate('required|date')->next()
            ->double('bookWorth')->onEmpty(null)->alias('book_worth')->next()
            ->double('transferWorth')->onEmpty(null)->alias('transfer_worth')->next()
            ->boolean('active')->next()
            ->get();

        $data['book_worth'] = round($data['book_worth'], 2);

        if($data['transfer_worth']){
            $data['transfer_worth'] = round($data['transfer_worth'], 2);
        }

        $projectValueCourse = new ProjectValueCourse();

        $projectValueCourse->fill($data);

        $projectValueCourse->save();

        // If project value course is active, call function that turn other project value courses into not active
        if($projectValueCourse->active) {
            $this->makeActive($projectValueCourse);
        }

        $projectValueCourse->load('createdBy', 'project');

        return FullProjectValueCourse::collection(ProjectValueCourse::where('project_id', $projectValueCourse->project_id)->with('createdBy', 'project')->orderBy('date')->get());
    }


    public function update(RequestInput $requestInput, ProjectValueCourse $projectValueCourse)
    {
        $this->authorize('manage', ProjectValueCourse::class);

        $data = $requestInput
            ->date('date')->validate('required|date')->next()
            ->double('bookWorth')->onEmpty(null)->alias('book_worth')->next()
            ->double('transferWorth')->onEmpty(null)->alias('transfer_worth')->next()
            ->boolean('active')->next()
            ->get();

        $data['book_worth'] = round($data['book_worth'], 2);

        if($data['transfer_worth']){
            $data['transfer_worth'] = round($data['transfer_worth'], 2);
        }

        $projectValueCourse->fill($data);

        $projectValueCourse->save();

        // If project value course is active, call function that turn other project value courses into not active
        if($projectValueCourse->active) {
            $this->makeActive($projectValueCourse);
        }

        return FullProjectValueCourse::collection(ProjectValueCourse::where('project_id', $projectValueCourse->project_id)->with('createdBy', 'project')->orderBy('date')->get());
    }

    public function destroy(ProjectValueCourse $projectValueCourse)
    {
        $this->authorize('manage', ProjectValueCourse::class);
        
        $projectValueCourse->forceDelete();
    }

    public function makeActive(ProjectValueCourse $projectValueCourse)
    {
        // Make other active project value course inactive within the same project
        foreach (ProjectValueCourse::where('project_id', $projectValueCourse->project_id)->where('active', 1)
                     ->where('id', '<>', $projectValueCourse->id) // Exclude this project value course
            ->get() as $pvc){
            $pvc->active = false;
            $pvc->save();
        }

        $projectValueCourse->active = true;
        $projectValueCourse->save();
    }
}