import React from 'react';

import TaskDetailsFormConclusionView from './TaskDetailsFormConclusionView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

const TaskDetailsFormConclusion = props => {
    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Afsluiting gegevens</span>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <TaskDetailsFormConclusionView />
                </div>
            </PanelBody>
        </Panel>
    );
};

export default TaskDetailsFormConclusion;
