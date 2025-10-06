import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../components/form/ViewText';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const ContactDetailsFormPortalUserView = props => {
    const { email, hasTwoFactorEnabled, failedLogins, blockedUntilFormatted } = props.portalUser;
    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText label="Inlog emailadres" value={email} />
                <ViewText
                    className={'col-sm-5'}
                    label="Twee factor authenticatie"
                    value={hasTwoFactorEnabled ? 'Ja' : 'Nee'}
                />
                <div className="col-sm-1">
                    {props.permissions.updateContactPortalUser && props.showActionButtons ? (
                        <a role="button" onClick={props.switchToEdit}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {props.permissions.deleteContactPortalUser && props.showActionButtons ? (
                        <a role="button" onClick={props.toggleDelete}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className="row">
                <ViewText label={'Geblokkeerd tot'} value={blockedUntilFormatted} />
                <ViewText label={'Foutieve loginpogingen'} value={failedLogins} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        portalUser: state.contactDetails.portalUser,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPortalUserView);
