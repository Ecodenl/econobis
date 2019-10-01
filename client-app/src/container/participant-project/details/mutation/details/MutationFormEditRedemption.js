import PanelBody from '../../../../../components/panel/PanelBody';
import ViewText from '../../../../../components/form/ViewText';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import moment from 'moment';
import ButtonText from '../../../../../components/button/ButtonText';
import * as PropTypes from 'prop-types';
import React from 'react';
import ParticipantDetailsMutationConclusion from './conclusion';

function MutationFormEditRedemption({ participantMutationFromProps, cancelEdit }) {
    const {
        type,
        amount,
        entry,
        datePayment,
        paidOn,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
    } = participantMutationFromProps;

    return (
        <PanelBody>
            <div className="row">
                <ViewText label={'Type'} id={'type'} className={'col-sm-6 form-group'} value={type.name} />
            </div>
            <div className="row">
                <ViewText
                    label={'Bedrag aflossing'}
                    id={'returns'}
                    className={'col-sm-6 form-group'}
                    value={MoneyPresenter(amount)}
                />
                <ViewText label={'Boekstuk'} id={'entry'} className={'col-sm-6 form-group'} value={entry} />
            </div>

            <div className="row">
                <ViewText
                    label={'Betaal datum'}
                    id={'datePayment'}
                    className={'col-sm-6 form-group'}
                    value={datePayment ? moment(datePayment.date).format('L') : ''}
                />
                <ViewText
                    label={'Uitgekeerd op of via'}
                    id={'paidOn'}
                    className={'col-sm-6 form-group'}
                    value={paidOn}
                />
            </div>

            <ParticipantDetailsMutationConclusion
                createdAt={createdAt}
                createdBy={createdBy}
                updatedAt={updatedAt}
                updatedBy={updatedBy}
            />

            <div className="pull-right btn-group" role="group">
                <ButtonText buttonText={'Sluiten'} onClickAction={cancelEdit} />
            </div>
        </PanelBody>
    );
}

MutationFormEditRedemption.propTypes = {
    type: PropTypes.object,
    originalStatus: PropTypes.object,
    returns: PropTypes.string,
    datePayment: PropTypes.object,
    entry: PropTypes.string,
    paidOn: PropTypes.string,
    cancelEdit: PropTypes.func,
    createdAt: PropTypes.object,
    createdBy: PropTypes.object,
    updatedAt: PropTypes.object,
    updatedBy: PropTypes.object,
};

export default MutationFormEditRedemption;
