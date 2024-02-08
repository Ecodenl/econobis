import React from 'react';
import moment from 'moment';
import ViewText from '../../../../components/form/ViewText';

moment.locale('nl');

const CampaignInspectionFormView = ({
    campaign: {
        inspectionPlannedEmailTemplate,
        inspectionPlannedMailbox,
        inspectionRecordedEmailTemplate,
        inspectionReleasedEmailTemplate,
    },
    switchToEdit,
}) => {
    return (
        <div>
            <div className="row" onClick={switchToEdit}>
                <ViewText
                    label={'Buurtaanpak afspraak e-mail template'}
                    value={inspectionPlannedEmailTemplate && inspectionPlannedEmailTemplate.name}
                />
                <ViewText
                    label={'Mailbox buurtaanpak e-mail bevestigingen'}
                    value={inspectionPlannedMailbox && inspectionPlannedMailbox.name}
                />
            </div>
            <div className="row" onClick={switchToEdit}>
                <ViewText
                    label={'Buurtaanpak opname e-mail template'}
                    value={inspectionRecordedEmailTemplate && inspectionRecordedEmailTemplate.name}
                />
            </div>
            <div className="row" onClick={switchToEdit}>
                <ViewText
                    label={'Buurtaanpak uitgebracht e-mail template'}
                    value={inspectionReleasedEmailTemplate && inspectionReleasedEmailTemplate.name}
                />
            </div>
        </div>
    );
};

export default CampaignInspectionFormView;
