import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../components/form/ViewText';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const ContactDetailsFormPortalUserView = props => {
    const { email, hasTwoFactorEnabled } = props.portalUser;
    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div onClick={props.switchToEdit} className="col-sm-6">
                    <ViewText className={'col-sm-12'} label="Inlog emailadres" value={email} />
                </div>
                <div onClick={props.switchToEdit} className="col-sm-5">
                    <ViewText className={'col-sm-12'} label="Twee factor authenticatie" value={hasTwoFactorEnabled ? 'Ja' : 'Nee'} />
                </div>
                <div className="col-sm-1">
                    {props.permissions.updateContactPortalUser && props.showActionButtons ? (
                        <a role="button" onClick={props.switchToEdit}>
                            <Icon class="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {props.permissions.deleteContactPortalUser && props.showActionButtons ? (
                        <a role="button" onClick={props.toggleDelete}>
                            <Icon class="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                </div>
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
