import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';

const CampaignDetailsExternalPartyView = ({
    externalParty: { id, number, name, address },
    highlightLine,
    onLineEnter,
    onLineLeave,
    permissions,
    showActionButtons,
    toggleDelete,
}) => {
    return (
        <div className={`row border ${highlightLine}`} onMouseEnter={onLineEnter} onMouseLeave={onLineLeave}>
            <div onClick={() => hashHistory.push(`/contact/${id}`)}>
                <div className="col-sm-2">{number}</div>
                <div className="col-sm-4">{name}</div>
                <div className="col-sm-4">{address ? address.city : ''}</div>
            </div>
            <div className="col-sm-1">
                {showActionButtons && permissions.manageMarketing ? (
                    <a role="button" onClick={toggleDelete}>
                        <Icon class="mybtn-danger" size={14} icon={trash} />
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

export default connect(mapStateToProps)(CampaignDetailsExternalPartyView);
