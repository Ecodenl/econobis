import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';

const CampaignDetailsOrganisationView = ({
    organisation: { id, contactId, address, contact, name, amountOfQuotations, amountOfWonQuotations },
    highlightLine,
    onLineEnter,
    onLineLeave,
    permissions,
    showActionButtons,
    toggleDelete,
}) => {
    const navigate = useNavigate();

    return (
        <div className={`row border ${highlightLine}`} onMouseEnter={onLineEnter} onMouseLeave={onLineLeave}>
            <div onClick={() => navigate(`/contact/${contactId}`)}>
                <div className="col-sm-1">{contact.number}</div>
                <div className="col-sm-2">{name}</div>
                <div className="col-sm-2">{address?.city || ''}</div>
                <div className="col-sm-2">{contact.contactPerson?.contact?.fullName || ''}</div>
                <div className="col-sm-2">{amountOfQuotations}</div>
                <div className="col-sm-2">{amountOfWonQuotations}</div>
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

export default connect(mapStateToProps)(CampaignDetailsOrganisationView);
