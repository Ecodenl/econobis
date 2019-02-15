import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';
moment.locale('nl');
import MutationFormDefault from './MutationFormDefault';

const MutationFormEdit = props => {
    const {
        type,
        dateMutation,
        amount,
        iban,
        referral,
        entry,
        dateBooking,
        createdAt,
        createdBy,
    } = props.participantMutation;

    return (
        <div>
            <MutationFormDefault
                editForm={true}
                typeId={type.id}
                type={type}
                dateMutation={dateMutation}
                amount={amount}
                iban={iban}
                referral={referral}
                entry={entry}
                dateBooking={dateBooking}
                createdAt={createdAt}
                createdBy={createdBy}
                errors={props.errors}
                participantMutationTypes={props.participantMutationTypes}
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
        participantMutationTypes: state.systemData.participantMutationTypes,
    };
};

export default connect(
    mapStateToProps,
    null
)(MutationFormEdit);
