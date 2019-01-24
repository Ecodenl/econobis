import React from 'react';
import moment from 'moment/moment';
import { Link } from 'react-router';
moment.locale('nl');

const ContactDetailsFormOccupationsView = props => {
    const { primaryContact, contact, occupation, startDate, endDate, primary } = props.occupation;

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
                <div className="col-sm-2">{primary ? <span className="h6 pull-right">Primair</span> : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                    </a>
                ) : (
                    ''
                )}
                {props.showActionButtons ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default ContactDetailsFormOccupationsView;
