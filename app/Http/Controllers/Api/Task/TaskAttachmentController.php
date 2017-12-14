<?php

namespace App\Http\Controllers\Api\Task;

use App\Eco\Task\Jobs\DeleteTaskAttachment;
use App\Eco\Task\Task;
use App\Eco\Task\TaskAttachment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Storage;

class TaskAttachmentController extends Controller
{

    public function store(Request $request, Task $task)
    {
        $file = $request->file('file');
        if($file == null || !$file->isValid()) abort('422', 'Error uploading file');

        $filename = $file->store('task_' . $task->id, 'task_attachments');

        $taskAttachment = new TaskAttachment();
        $taskAttachment->filename = $filename;
        $taskAttachment->name = $file->getClientOriginalName();
        $taskAttachment->task_id = $task->id;
        $taskAttachment->save();
    }

    public function download(TaskAttachment $taskAttachment)
    {
        $filePath = Storage::disk('task_attachments')->getDriver()->getAdapter()->applyPathPrefix($taskAttachment->filename);

        return response()->download($filePath, $taskAttachment->name);
    }

    public function destroy(TaskAttachment $taskAttachment)
    {
        DeleteTaskAttachment::single($taskAttachment, true);
    }
}
