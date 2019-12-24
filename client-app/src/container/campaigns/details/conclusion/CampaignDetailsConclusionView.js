import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const CampaignDetailsFormConclusionView = props => {
    const { createdBy = {}, createdAt = {}, ownedBy = {} } = props.campaign;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Gemaakt door'}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                    link={createdBy ? 'gebruiker/' + createdBy.id : ''}
                />
                <ViewText
                    label={'Verantwoordelijke'}
                    value={ownedBy ? ownedBy.fullName : 'Onbekend'}
                    link={ownedBy ? 'gebruiker/' + ownedBy.id : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        campaign: state.campaignDetails,
    };
};

export default connect(mapStateToProps)(CampaignDetailsFormConclusionView);
