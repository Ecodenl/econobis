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
    usesWfNewTask,
    emailTemplateWorkflowNewTask,
    switchToEdit,
    explanationWfNewTask,
    explanationWfCompletedTask,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Omschrijving'}
                            divSize={'col-sm-10'}
                            value={name}
                            className={'col-sm-10 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Gebruikt workflow verlopen taak'}
                            divSize={'col-sm-10'}
                            value={usesWfExpiredTask ? 'Ja' : 'Nee'}
                            className={'col-sm-10 form-group'}
                        />
                    </div>

                    {usesWfExpiredTask == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText
                                    label={'Uitleg workflow verlopen taak'}
                                    divSize={'col-sm-10'}
                                    value={explanationWfExpiredTask}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Template email verlopen taak'}
                                    divSize={'col-sm-10'}
                                    value={
                                        emailTemplateWorkflowExpiredTask ? emailTemplateWorkflowExpiredTask.name : ''
                                    }
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    <div className="row">
                        <ViewText
                            label={'Gebruikt workflow afgehandelde taak'}
                            divSize={'col-sm-10'}
                            value={usesWfCompletedTask ? 'Ja' : 'Nee'}
                            className={'col-sm-10 form-group'}
                        />
                    </div>

                    {usesWfCompletedTask == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText
                                    label={'Uitleg workflow afgehandelde taak'}
                                    divSize={'col-sm-10'}
                                    value={explanationWfCompletedTask}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Template email afgehandelde taak'}
                                    divSize={'col-sm-10'}
                                    value={
                                        emailTemplateWorkflowCompletedTask
                                            ? emailTemplateWorkflowCompletedTask.name
                                            : ''
                                    }
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Aantal dagen email na afgehandelde taak'}
                                    divSize={'col-sm-10'}
                                    value={numberOfDaysToSendEmailCompletedTask}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                        </React.Fragment>
                    )}

                    <div className="row">
                        <ViewText
                            label={'Gebruikt workflow nieuwe taak'}
                            divSize={'col-sm-10'}
                            value={usesWfNewTask ? 'Ja' : 'Nee'}
                            className={'col-sm-10 form-group'}
                        />
                    </div>

                    {usesWfNewTask == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText
                                    label={'Uitleg workflow nieuwe taak'}
                                    divSize={'col-sm-10'}
                                    value={explanationWfNewTask}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Template email nieuwe taak'}
                                    divSize={'col-sm-10'}
                                    value={emailTemplateWorkflowNewTask ? emailTemplateWorkflowNewTask.name : ''}
                                    className={'col-sm-10 form-group'}
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
