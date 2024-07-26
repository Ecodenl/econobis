import React from 'react';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

const CampaignDetailsWorkflowView = ({
    campaignWorkflow: { id, status, emailTemplateWorkflow, numberOfDaysToSendEmail, isActive },
    highlightLine,
    onLineEnter,
    onLineLeave,
    permissions,
    showActionButtons,
    openEdit,
    toggleDelete,
}) => {
    const notActiveLine = !status.usesWf || !isActive ? 'text-danger' : '';
    return (
        <div className={`row border ${highlightLine}`} onMouseEnter={onLineEnter} onMouseLeave={onLineLeave}>
            <div onClick={openEdit} className={`${notActiveLine}`}>
                <div className="col-sm-3">{status ? status.name : ''}</div>
                <div className="col-sm-3">{emailTemplateWorkflow ? emailTemplateWorkflow.name : ''}</div>
                <div className="col-sm-2">{numberOfDaysToSendEmail ? numberOfDaysToSendEmail : 'Direct'}</div>
                <div className="col-sm-1">{status.usesWf ? 'Ja' : 'Nee'}</div>
                <div className="col-sm-1">{isActive ? 'Ja' : 'Nee'}</div>
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
