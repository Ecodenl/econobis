<?php

namespace App\Http\Controllers\Api\Measure;

use App\Eco\Measure\Jobs\DeleteMeasureAttachment;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureAttachment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class MeasureAttachmentController extends Controller
{

    public function store(Request $request, Measure $measure)
    {
        $this->authorize('manage', Measure::class);

        $file = $request->file('file');
        if($file == null || !$file->isValid()) abort('422', 'Error uploading file');

        $filename = $file->store('measure_' . $measure->id, 'measure_attachments');

        $measureAttachment = new MeasureAttachment();
        $measureAttachment->filename = $filename;
        $measureAttachment->name = $file->getClientOriginalName();
        $measureAttachment->measure_id = $measure->id;
        $measureAttachment->save();
    }

    public function download(MeasureAttachment $measureAttachment)
    {
        $filePath = Storage::disk('measure_attachments')->getDriver()->getAdapter()->applyPathPrefix($measureAttachment->filename);

        return response()->download($filePath, $measureAttachment->name);
    }

    public function destroy(MeasureAttachment $measureAttachment)
    {
        $this->authorize('manage', Measure::class);

        DeleteMeasureAttachment::single($measureAttachment, true);
    }
}