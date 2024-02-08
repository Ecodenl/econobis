import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const CampaignDetailsWorkflowView = ({
    campaignWorkflow: { id, status, emailTemplateIdWf, numberOfDaysToSendEmail },
    highlightLine,
    onLineEnter,
    onLineLeave,
    permissions,
    showActionButtons,
    openEdit,
    toggleDelete,
}) => {
    return (
        <div className={`row border ${highlightLine}`} onMouseEnter={onLineEnter} onMouseLeave={onLineLeave}>
            <div onClick={() => hashHistory.push(`/contact/${id}`)}>
                <div className="col-sm-2">{status ? status : ''}</div>
                <div className="col-sm-4">{emailTemplateIdWf ? emailTemplateIdWf : ''}</div>
                <div className="col-sm-4">{numberOfDaysToSendEmail ? numberOfDaysToSendEmail : ''}</div>
            </div>
            <div className="col-sm-1">
                {showActionButtons && permissions.manageMarketing ? (
                    <>
                        <a role="button" onClick={openEdit}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                        <a role="button" onClick={toggleDelete}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    </>
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

export default connect(mapStateToProps)(CampaignDetailsWorkflowView);
