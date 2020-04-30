import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsConclusionView = props => {
    const { owner = {}, status = {}, updatedBy = {}, createdBy = {}, createdAt = {}, updatedAt = {} } = props.contact;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Eigenaar'}
                    value={owner ? owner.fullName : 'Onbekend'}
                    link={owner ? 'gebruiker/' + owner.id : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Gemaakt door'}
                    value={
                        status
                            ? status.id == 'portal' || status.id == 'webform'
                                ? status.name
                                : createdBy
                                ? createdBy.fullName
                                : 'Onbekend'
                            : 'Onbekend'
                    }
                    link={
                        status
                            ? status.id == 'portal' || status.id == 'webform'
                                ? ''
                                : createdBy
                                ? 'gebruiker/' + createdBy.id
                                : ''
                            : createdBy
                            ? 'gebruiker/' + createdBy.id
                            : ''
                    }
                />
                <ViewText
                    label={'Laatste update door'}
                    value={updatedBy ? updatedBy.fullName : 'Onbekend'}
                    link={updatedBy ? 'gebruiker/' + updatedBy.id : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Gemaakt op'} value={createdAt ? moment(createdAt).format('L') : 'Onbekend'} />
                <ViewText label={'Laatste update op'} value={updatedAt ? moment(updatedAt).format('L') : 'Onbekend'} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        contact: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsConclusionView);
