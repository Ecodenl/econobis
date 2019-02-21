import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');
import MutationFormDefault from './MutationFormDefault';

const MutationFormEdit = props => {
    const {
        type,
        dateCreation,
        typeId,
        datePayment,
        account,
        quantity,
        returns,
        createdAt,
        createdBy,
    } = props.participantMutation;

    return (
        <div>
            <MutationFormDefault
                editForm={true}
                typeId={type.id}
                type={type}
                dateCreation={dateCreation}
                datePayment={datePayment}
                account={account}
                quantity={quantity}
                returns={returns}
                createdAt={createdAt}
                createdBy={createdBy}
                errors={props.errors}
                handleSubmit={props.handleSubmit}
                handleInputChange={props.handleInputChange}
                handleInputChangeDate={props.handleInputChangeDate}
                toggleShow={props.cancelEdit}
            />
        </div>
    );
};

export default MutationFormEdit;
