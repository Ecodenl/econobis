import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

const CampaignDetailsResponseView = props => {
    const { id, contact, address, dateResponded } = props.response;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={() => hashHistory.push(`/contact/${id}`)}>
                <div className="col-sm-1">{contact ? contact.number : ''}</div>
                <div className="col-sm-1">{contact ? contact.type.name : ''}</div>
                <div className="col-sm-2">{contact ? contact.fullName : ''}</div>
                <div className="col-sm-2">{address ? address.street + address.number : ''}</div>
                <div className="col-sm-1">{address ? address.postal_code : ''}</div>
                <div className="col-sm-2">{address ? address.city : ''}</div>
                <div className="col-sm-2">{dateResponded ? moment(dateResponded).format('L') : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons && props.permissions.manageMarketing ? (
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(CampaignDetailsResponseView);
