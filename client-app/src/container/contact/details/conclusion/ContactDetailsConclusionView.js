import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsConclusionView = props => {
    const {
        owner = {},
        status = {},
        createdBy = {},
        updatedBy = {},
        createdAt = {},
        updatedAt = {},
        createdWith = {},
        updatedWith = {},
    } = props.contact;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Eigenaar'}
                    value={owner ? owner.fullName : 'Onbekend'}
                    link={owner ? '/gebruiker/' + owner.id : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Gemaakt door'}
                    value={
                        createdWith == 'portal'
                            ? 'Portaal'
                            : createdWith == 'webform'
                            ? 'Webformulier'
                            : createdBy
                            ? createdBy.fullName
                            : 'Onbekend'
                    }
                    link={
                        createdWith == 'portal' || createdWith == 'webform'
                            ? ''
                            : createdBy
                            ? '/gebruiker/' + createdBy.id
                            : ''
                    }
                />
                <ViewText
                    label={'Laatste update door'}
                    value={
                        updatedWith == 'portal'
                            ? 'Portaal'
                            : updatedWith == 'webform'
                            ? 'Webformulier'
                            : updatedBy
                            ? updatedBy.fullName
                            : 'Onbekend'
                    }
                    link={
                        updatedWith == 'portal' || updatedWith == 'webform'
                            ? ''
                            : updatedBy
                            ? '/gebruiker/' + updatedBy.id
                            : ''
                    }
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
