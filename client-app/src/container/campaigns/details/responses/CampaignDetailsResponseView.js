import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';

const CampaignDetailsResponseView = ({
    response: { id, contact, address, dateResponded },
    permissions,
    highlightLine,
    onLineEnter,
    onLineLeave,
    showActionButtons,
    toggleDelete,
}) => {
    const navigate = useNavigate();

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <div onClick={() => navigate(`/contact/${contact.id}`)}>
                <div className="col-sm-1">{contact?.number || ''}</div>
                <div className="col-sm-1">{contact?.type?.name || ''}</div>
                <div className="col-sm-2">{contact?.fullName || ''}</div>
                <div className="col-sm-2">
                    {address ? address.street + address.number + (address.addition ? '-' + address.addition : '') : ''}
                </div>
                <div className="col-sm-1">{address?.postal_code || ''}</div>
                <div className="col-sm-2">{address?.city || ''}</div>
                <div className="col-sm-2">{dateResponded ? moment(dateResponded).format('L') : ''}</div>
            </div>
            <div className="col-sm-1">
                {showActionButtons && permissions.manageMarketing ? (
                    <a role="button" onClick={toggleDelete}>
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

export default connect(mapStateToProps)(CampaignDetailsResponseView);
