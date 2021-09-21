import React, { useState } from 'react';
import { hashHistory } from 'react-router';

import TaskHarmonica from './harmonica/TaskHarmonica';
import NoteHarmonica from './harmonica/NoteHarmonica';
import DocumentHarmonica from './harmonica/DocumentHarmonica';

function CampaignDetailsHarmonica({ campaign }) {
    const [showList, setShowList] = useState({
        tasks: false,
        notes: false,
        documents: false,
    });

    function toggleShowList(name) {
        setShowList(prev => {
            return { ...prev, [name]: !prev[name] };
        });
    }

    function newTask() {
        hashHistory.push(`/taak/nieuw/campagne/${campaign.id}`);
    }

    function newNote() {
        hashHistory.push(`/taak/nieuw/afgehandeld/campagne/${campaign.id}`);
    }

    function newDocument(type) {
        hashHistory.push(`/document/nieuw/${type}/campagne/${campaign.id}`);
    }

    return (
        <div className="margin-10-top">
            <TaskHarmonica
                toggleShowList={() => toggleShowList('tasks')}
                showTasksList={showList.tasks}
                taskCount={campaign.taskCount}
                newTask={newTask}
                relatedTasks={campaign.relatedTasks}
            />

            <NoteHarmonica
                toggleShowList={() => toggleShowList('notes')}
                showNotesList={showList.notes}
                noteCount={campaign.noteCount}
                newNote={newNote}
                relatedNotes={campaign.relatedNotes}
            />

            <DocumentHarmonica
                toggleShowList={() => toggleShowList('documents')}
                showDocumentsList={showList.documents}
                documentCount={campaign.documentCount}
                newDocument={newDocument}
                relatedDocuments={campaign.relatedDocuments}
            />
        </div>
    );
}

export default CampaignDetailsHarmonica;
