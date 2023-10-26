import React, {useState} from 'react';
import Modal from '../../../components/modal/Modal';
import Icon from "react-icons-kit";
import {pencil} from 'react-icons-kit/fa/pencil';
import InputSelect from "../../../components/form/InputSelect";
import {useSelector} from "react-redux";
import InputSelectGroup from "../../../components/form/InputSelectGroup";
import EmailGenericAPI from "../../../api/email/EmailGenericAPI";

export default function EmailSplitViewBulkEditModal({emailIds, onSaved}) {
    const statusses = useSelector((state) => state.systemData.emailStatuses);
    const teams = useSelector((state) => state.systemData.teams);
    const users = useSelector((state) => state.systemData.users);

    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState(-1);
    const [responsibleUserId, setResponsibleUserId] = useState(-1);
    const [responsibleTeamId, setResponsibleTeamId] = useState(-1);

    const setResonsibleValue = (val) => {
        if(val === 'general-1') {
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
    }

    const getResponsibleValue = () => {
        if(responsibleUserId === -1 && responsibleTeamId === -1) {
            return 'general-1';
        }

        if (responsibleUserId) {
            return 'user' + responsibleUserId;
        }
        if (responsibleTeamId) {
            return 'team' + responsibleTeamId;
        }

        return 'general0'; // Geen
    }

    const save = () => {
        let values = {};

        if(parseInt(status) !== -1) {
            values.status = status;
        }

        if(responsibleUserId !== -1) {
            values.responsibleUserId = responsibleUserId;
        }

        if(responsibleTeamId !== -1) {
            values.responsibleTeamId = responsibleTeamId;
        }

        EmailGenericAPI.updateMultiple(emailIds, values).then(() => {
            setShowModal(false);
            onSaved();
        });
    }

    return (
        <>
            <button
                type="button"
                title="Bewerken"
                className={'btn btn-success btn-sm'}
                onClick={() => {
                    setShowModal(true);
                }}
            >
                <Icon icon={pencil} size={13}/>
            </button>
            {showModal && (
                <Modal
                    buttonConfirmText="Opslaan"
                    closeModal={() => setShowModal(false)}
                    confirmAction={save}
                    title="Bulk bewerken"
                    modalClassName="modal-lg"
                >
                    <div className="row" style={{marginTop: '12px'}}>
                        <InputSelect
                            label={'Status'}
                            size={'col-sm-6'}
                            name={'status'}
                            options={[
                                {id: -1, name: '--- niet wijzigen ---'},
                                ...statusses,
                            ]}
                            value={status}
                            onChangeAction={(e) => setStatus(e.target.value)}
                            emptyOption={false}
                        />
                        <InputSelectGroup
                            label={'Verantwoordelijke'}
                            size={'col-sm-6'}
                            name={'responsible'}
                            optionsInGroups={[
                                {
                                    name: 'general',
                                    label: 'Algemeen',
                                    options: [
                                        {id: '-1', name: '--- niet wijzigen ---'},
                                        {id: '0', name: '--- geen ---'},
                                    ],
                                },
                                {
                                    name: 'user',
                                    label: 'Gebruikers',
                                    options: users,
                                    optionName: 'fullName',
                                },
                                {name: 'team', label: 'Teams', options: teams},
                            ]}
                            value={getResponsibleValue()}
                            onChangeAction={(e) => setResonsibleValue(e.target.value)}
                            emptyOption={false}
                        />
                    </div>
                </Modal>
            )}
        </>
    );
}

