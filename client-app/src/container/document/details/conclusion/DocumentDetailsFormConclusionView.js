import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from 'moment/moment';

const DocumentDetailsFormConclusionView = props => {
    const { owner = {}, updatedBy = {}, createdBy = {}, createdAt = {}, updatedAt = {} } = props.documentDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={'Gemaakt door'}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                    link={createdBy ? '/gebruiker/' + createdBy.id : ''}
                />
            </div>

            <div className="row">
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
                <ViewText label={'Laatste update op'} value={updatedAt ? moment(updatedAt).format('L') : 'Onbekend'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        documentDetails: state.documentDetails,
    };
};

export default connect(mapStateToProps)(DocumentDetailsFormConclusionView);
