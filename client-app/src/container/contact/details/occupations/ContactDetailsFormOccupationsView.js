import React from 'react';
import moment from 'moment/moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
moment.locale('nl');

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const ContactDetailsFormOccupationsView = props => {
    const { primaryContact, contact, occupation, startDate, endDate, primary, allowManageInPortal } = props.occupation;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-3">
                    {props.primaryOccupation ? (
                        <Link to={`/contact/${contact.id}`} className="link-underline">
                            {contact.fullName}
                        </Link>
                    ) : (
                        <Link to={`/contact/${primaryContact.id}`} className="link-underline">
                            {primaryContact.fullName}
                        </Link>
                    )}
                </div>
                <div className="col-sm-2">
                    {props.primaryOccupation ? occupation.primaryOccupation : occupation.secondaryOccupation}
                </div>
                <div className="col-sm-2">{startDate ? moment(startDate).format('DD-MM-Y') : ''}</div>
                <div className="col-sm-2">{endDate ? moment(endDate).format('DD-MM-Y') : ''}</div>
                <div className="col-sm-1">{primary ? 'Primair' : ''}</div>
                <div className="col-sm-1">{allowManageInPortal ? 'Ja' : 'Nee'}</div>
            </div>
            <div className="col-sm-1">
                {props.permissions.updateContactOccupation && props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                {props.permissions.deleteContactOccupation && props.showActionButtons ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormOccupationsView);
