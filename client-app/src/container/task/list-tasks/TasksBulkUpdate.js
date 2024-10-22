import React, { useState } from 'react';

import Modal from '../../../components/modal/Modal';
import TaskDetailsAPI from '../../../api/task/TaskDetailsAPI';
import InputToggle from '../../../components/form/InputToggle';
import InputSelectGroup from '../../../components/form/InputSelectGroup';
import { useSelector } from 'react-redux';

function TasksBulkUpdate({ confirmActionsBulkUpdate, closeBulkUpdateModal, taskIds }) {
    const teams = useSelector(state => state.systemData.teams);
    const users = useSelector(state => state.systemData.users);

    const [finished, setFinished] = useState(0);
    const [responsibleUserId, setResponsibleUserId] = useState(-1);
    const [responsibleTeamId, setResponsibleTeamId] = useState(-1);

    const setResonsibleValue = val => {
        if (val === 'general-1') {
            setResponsibleUserId(-1);
            setResponsibleTeamId(-1);
            return;
        }

        setResponsibleUserId(null);
        setResponsibleTeamId(null);

        if (val.indexOf('user') === 0) {
            setResponsibleUserId(val.replace('user', ''));
        }

        if (val.indexOf('team') === 0) {
            setResponsibleTeamId(val.replace('team', ''));
        }
    };

    const getResponsibleValue = () => {
        if (responsibleUserId === -1 && responsibleTeamId === -1) {
            return 'general-1';
        }

        if (responsibleUserId) {
            return 'user' + responsibleUserId;
        }
        if (responsibleTeamId) {
            return 'team' + responsibleTeamId;
        }

        return 'general-1'; // Niet wijzigen
    };

    const confirmAction = () => {
        if (taskIds && taskIds.length > 0) {
            let values = {};

            if (finished) {
                values.finished = finished;
            }

            if (responsibleUserId !== -1) {
                values.responsibleUserId = responsibleUserId;
            }

            if (responsibleTeamId !== -1) {
                values.responsibleTeamId = responsibleTeamId;
            }

            TaskDetailsAPI.updateBulkTasks(taskIds, values).then(() => {
                confirmActionsBulkUpdate();
            });
        }
    };

    return (
        <Modal
            buttonConfirmText="Bijwerken taken"
            buttonClassName={'btn-danger'}
            closeModal={closeBulkUpdateModal}
            confirmAction={() => confirmAction()}
            title="Bijwerken taken"
        >
            <div className="row">
                <div className="col-md-12">
                    <InputToggle
                        label={'Afgehandeld?'}
                        divSize={'col-sm-12'}
                        name={'finished'}
                        value={finished}
                        onChangeAction={e => setFinished(e.target.checked)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <InputSelectGroup
                        label={'Verantwoordelijke'}
                        divSize={'col-sm-12'}
                        name={'responsible'}
                        optionsInGroups={[
                            {
                                name: 'general',
                                label: 'Algemeen',
                                options: [{ id: '-1', name: '--- niet wijzigen ---' }],
                            },
                            {
                                name: 'user',
                                label: 'Gebruikers',
                                options: users,
                                optionName: 'fullName',
                            },
                            { name: 'team', label: 'Teams', options: teams },
                        ]}
                        value={getResponsibleValue()}
                        onChangeAction={e => setResonsibleValue(e.target.value)}
                        emptyOption={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    Bijwerken alle <strong>{taskIds.length} geselecteerde taken.</strong> Weet je het zeker?
                </div>
            </div>
        </Modal>
    );
}

export default TasksBulkUpdate;
