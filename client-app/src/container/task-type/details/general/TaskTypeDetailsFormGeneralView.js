import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const TaskTypeDetailsFormGeneralView = ({
    name,
    usesWfCompletedTask,
    emailTemplateWorkflowCompletedTask,
    numberOfDaysToSendEmailCompletedTask,
    usesWfExpiredTask,
    emailTemplateWorkflowExpiredTask,
    switchToEdit,
    explanationWfExpiredTask,
    explanationWfCompletedTask,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Omschrijving'} value={name} />
                    </div>
                    <div className="row">
                        <ViewText label={'Gebruikt workflow verlopen taak'} value={usesWfExpiredTask ? 'Ja' : 'Nee'} />
                    </div>

                    {usesWfExpiredTask == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText label={'Uitleg workflow'} value={explanationWfExpiredTask} />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Template email verlopen taak'}
                                    value={
                                        emailTemplateWorkflowExpiredTask ? emailTemplateWorkflowExpiredTask.name : ''
                                    }
                                />
                            </div>
                        </React.Fragment>
                    )}

                    <div className="row">
                        <ViewText
                            label={'Gebruikt workflow afgehandelde taak'}
                            value={usesWfCompletedTask ? 'Ja' : 'Nee'}
                        />
                    </div>

                    {usesWfCompletedTask == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText label={'Uitleg workflow'} value={explanationWfCompletedTask} />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Template email afgehandelde taak'}
                                    value={
                                        emailTemplateWorkflowCompletedTask
                                            ? emailTemplateWorkflowCompletedTask.name
                                            : ''
                                    }
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Aantal dagen email na afgehandelde taak'}
                                    value={numberOfDaysToSendEmailCompletedTask}
                                />
                            </div>
                        </React.Fragment>
                    )}
                </PanelBody>
            </Panel>
        </div>
    );
};

export default TaskTypeDetailsFormGeneralView;
