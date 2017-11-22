<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 15:49
 */

namespace App\Http\Controllers\Api\ContactNote;


use App\Eco\ContactNote\ContactNote;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactNote\FullContactNote;
use Illuminate\Http\Request;

class ContactNoteController extends ApiController
{

    public function store(Request $request)
    {

        $data = $request->validate([
            'contactId' => ['required', 'exists:contacts,id'],
            'note' => '',
        ]);

        $contactNote = new ContactNote($this->arrayKeysToSnakeCase($data));

        $this->authorize('create', $contactNote);

        $contactNote->save();

        return new FullContactNote($contactNote->fresh());
    }

    public function update(Request $request, ContactNote $contactNote)
    {
        $this->authorize('update', $contactNote);

        $data = $request->validate([
            'contactId' => 'exists:contacts,id',
            'note' => '',
        ]);

        $contactNote->fill($this->arrayKeysToSnakeCase($data));
        $contactNote->save();

        return new FullContactNote($contactNote->fresh());
    }

    public function destroy(ContactNote $contactNote)
    {
        $this->authorize('delete', $contactNote);

        $contactNote->forceDelete();
    }

}