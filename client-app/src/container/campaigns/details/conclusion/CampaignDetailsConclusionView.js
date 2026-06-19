import React from 'react';
import moment from 'moment';
import ViewText from '../../../../components/form/ViewText';

moment.locale('nl');

const CampaignDetailsFormConclusionView = ({ campaign: { createdBy, createdAt, ownedBy }, switchToEdit }) => {
    return (
        <div>
            <div className="row" onClick={switchToEdit}>
                <ViewText
                    label={'Gemaakt door'}
                    value={createdBy?.fullName || 'Onbekend'}
                    link={createdBy ? 'gebruiker/' + createdBy.id : ''}
                />
                <ViewText
                    label={'Verantwoordelijke'}
                    value={ownedBy?.fullName || 'Onbekend'}
                    link={ownedBy ? '/gebruiker/' + ownedBy.id : ''}
                />
            </div>
            <div className="row" onClick={switchToEdit}>
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
            </div>
        </div>
    );
};

export default CampaignDetailsFormConclusionView;
