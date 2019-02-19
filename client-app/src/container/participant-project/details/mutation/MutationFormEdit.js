import React from 'react';
import moment from 'moment/moment';
moment.locale('nl');
import MutationFormDefault from './MutationFormDefault';

const MutationFormEdit = props => {
    const {
        type,
        dateCreation,
        entry,
        typeId,
        datePayment,
        description,
        account,
        quantity,
        returns,
        payoutKwh,
        indicationOfRestitutionEnergyTax,
        paidOn,
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
                entry={entry}
                datePayment={datePayment}
                description={description}
                account={account}
                quantity={quantity}
                returns={returns}
                payoutKwh={payoutKwh}
                indicationOfRestitutionEnergyTax={indicationOfRestitutionEnergyTax}
                paidOn={paidOn}
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
