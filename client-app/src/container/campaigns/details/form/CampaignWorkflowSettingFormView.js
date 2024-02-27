import React from 'react';
import moment from 'moment';
import ViewText from '../../../../components/form/ViewText';

moment.locale('nl');

const CampaignWorkflowSettingFormView = ({ campaign: { defaultWorkflowMailbox }, switchToEdit }) => {
    return (
        <div>
            <div className="row" onClick={switchToEdit}>
                <ViewText
                    size={'col-sm-6'}
                    label={'Standaard mailbox'}
                    value={defaultWorkflowMailbox && defaultWorkflowMailbox.name}
                />
            </div>
        </div>
    );
};

export default CampaignWorkflowSettingFormView;
