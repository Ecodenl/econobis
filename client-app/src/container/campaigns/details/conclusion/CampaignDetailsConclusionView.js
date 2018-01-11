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
                    label={"Verantwoordelijke"}
                    value={ownedBy ? ownedBy.fullName: 'Onbekend'}
                    link={ownedBy ? 'gebruiker/' + ownedBy.id : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt ? moment(createdAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Gemaakt door"}
                    value={createdBy ? createdBy.fullName: 'Onbekend'}
                    link={createdBy ? 'gebruiker/' + createdBy.id : ''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        campaign: state.campaign,
    };
};

export default connect(mapStateToProps)(CampaignDetailsFormConclusionView);