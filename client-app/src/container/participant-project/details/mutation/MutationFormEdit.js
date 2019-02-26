import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');
import MutationFormDefault from './MutationFormDefault';
import { connect } from 'react-redux';

const MutationFormEdit = props => {
    const {
        type,
        dateCreation,
        statusId,
        datePayment,
        account,
        quantity,
        returns,
        updatedAt,
        updatedBy,
    } = props.participantMutation;

    return (
        <div>
            <MutationFormDefault
                editForm={true}
                projectTypeCodeRef={props.projectTypeCodeRef}
                type={type}
                statusId={statusId}
                dateCreation={dateCreation}
                datePayment={datePayment}
                account={account}
                quantity={quantity}
                returns={returns}
                updatedAt={updatedAt}
                updatedBy={updatedBy}
                errors={props.errors}
                participantMutationStatuses={props.participantMutationStatuses}
                handleSubmit={props.handleSubmit}
                handleInputChange={props.handleInputChange}
                handleInputChangeDate={props.handleInputChangeDate}
                toggleShow={props.cancelEdit}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        participantMutationStatuses: state.systemData.participantMutationStatuses,
        projectTypeCodeRef: state.participantProjectDetails.project.projectType.codeRef,
    };
};

export default connect(mapStateToProps)(MutationFormEdit);
