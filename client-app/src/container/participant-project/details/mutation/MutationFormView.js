import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
moment.locale('nl');

const MutationFormView = ({
    highlightLine,
    onLineEnter,
    onLineLeave,
    openEdit,
    showActionButtons,
    toggleDelete,
    permissions,
    projectTypeCodeRef,
    participantMutation,
}) => {
    const {
        type,
        dateCreation,
        entry,
        status,
        datePayment,
        account,
        quantity,
        returns,
        payoutKwh,
        indicationOfRestitutionEnergyTax,
        paidOn,
        deletedAt,
    } = participantMutation;

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <div onClick={openEdit}>
                <div className="col-sm-1">{dateCreation ? moment(dateCreation).format('L') : ''}</div>
                <div className="col-sm-1">{entry}</div>
                <div className="col-sm-1">{type.name}</div>
                <div className="col-sm-1">{status.name}</div>
                <div className="col-sm-1">{datePayment ? moment(datePayment).format('L') : ''}</div>
                <div className="col-sm-2">{type.description}</div>
                {(projectTypeCodeRef === 'loan' ||
                    projectTypeCodeRef === 'capital' ||
                    projectTypeCodeRef === 'postalcode_link_capital') && <div className="col-sm-1">{account}</div>}
                {(projectTypeCodeRef === 'obligation' ||
                    projectTypeCodeRef === 'capital' ||
                    projectTypeCodeRef === 'postalcode_link_capital') && <div className="col-sm-1">{quantity}</div>}
                <div className="col-sm-1">{returns}</div>
                {projectTypeCodeRef === 'postalcode_link_capital' && <div className="col-sm-1">{payoutKwh}</div>}
                {projectTypeCodeRef === 'postalcode_link_capital' && (
                    <div className="col-sm-1">{indicationOfRestitutionEnergyTax}</div>
                )}
                <div className="col-sm-2">{paidOn}</div>
            </div>
            {!deletedAt && (
                <div className="col-sm-1">
                    {showActionButtons && permissions.manageFinancial ? (
                        <a role="button" onClick={openEdit}>
                            <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                    {showActionButtons && permissions.manageFinancial ? (
                        <a role="button" onClick={toggleDelete}>
                            <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
                        </a>
                    ) : (
                        ''
                    )}
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
    };
};

export default connect(mapStateToProps)(MutationFormView);
