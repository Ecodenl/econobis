import React from 'react';
import { isEmpty } from 'lodash';

import TaskTypeDetailsFormGeneral from './general/TaskTypeDetailsFormGeneral';

const TaskTypeDetailsForm = ({ taskType, hasError, isLoading, updateState }) => {
    let loadingText = '';
    let loading = true;

    if (hasError) {
        loadingText = 'Fout bij het ophalen van taak type.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(taskType)) {
        loadingText = 'Geen taak type gevonden!';
    } else {
        loading = false;
    }

    return loading ? (
        <div>{loadingText}</div>
    ) : (
        <div>
            <TaskTypeDetailsFormGeneral taskType={taskType} updateState={updateState} />
        </div>
    );
};

export default TaskTypeDetailsForm;
