import React, { useEffect, useState } from 'react';

import Modal from '../../../components/modal/Modal';
import IntakeDetailsAPI from '../../../api/intake/IntakeDetailsAPI';
import { useSelector } from 'react-redux';
import InputSelect from '../../../components/form/InputSelect';
import CampaignsAPI from '../../../api/campaign/CampaignsAPI';

function IntakesBulkUpdate({ confirmActionsBulkUpdate, closeBulkUpdateModal, intakeIds }) {
    const statusses = useSelector(state => state.systemData.intakeStatuses);
    const [intakeCampaigns, setIntakeCampaigns] = useState([]);

    const [intakeStatusId, setIntakeStatusId] = useState(-1);
    const [campaignId, setCampaignId] = useState(-1);

    useEffect(() => {
        CampaignsAPI.peekNotFinishedCampaigns().then(payload => {
            setIntakeCampaigns(payload);
        });
    }, []);

    const confirmAction = () => {
        if (intakeIds && intakeIds.length > 0) {
            let values = {};

            if (parseInt(intakeStatusId) !== -1) {
                values.intakeStatusId = intakeStatusId;
            }

            if (parseInt(campaignId) !== -1) {
                values.campaignId = campaignId;
            }

            IntakeDetailsAPI.updateBulkIntakes(intakeIds, values).then(() => {
                confirmActionsBulkUpdate();
            });
        }
    };

    return (
        <Modal
            buttonConfirmText="Bijwerken intakes"
            buttonClassName={'btn-danger'}
            modalClassName="modal-lg"
            closeModal={closeBulkUpdateModal}
            confirmAction={() => confirmAction()}
            title="Bijwerken intakes"
        >
            <div className="row">
                <div className="col-md-12">
                    <InputSelect
                        label={'Status'}
                        size={'col-sm-12'}
                        name={'intakeStatusId'}
                        options={[{ id: -1, name: '--- niet wijzigen ---' }, ...statusses]}
                        value={intakeStatusId}
                        onChangeAction={e => setIntakeStatusId(e.target.value)}
                        emptyOption={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <InputSelect
                        label={'Campagne'}
                        size={'col-sm-12'}
                        name={'campaignId'}
                        options={[{ id: -1, name: '--- niet wijzigen ---' }, ...intakeCampaigns]}
                        value={campaignId}
                        onChangeAction={e => setCampaignId(e.target.value)}
                        emptyOption={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    Bijwerken alle <strong>{intakeIds.length} geselecteerde intakes.</strong> Weet je het zeker?
                </div>
            </div>
        </Modal>
    );
}

export default IntakesBulkUpdate;
