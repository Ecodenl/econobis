import PanelBody from '../../../../../components/panel/PanelBody';
import ViewText from '../../../../../components/form/ViewText';
import ButtonText from '../../../../../components/button/ButtonText';
import * as PropTypes from 'prop-types';
import React from 'react';
import ParticipantDetailsMutationConclusion from './conclusion';

function MutationFormEditEnergyTaxRefund({ participantMutationFromProps, cancelEdit }) {
    const { type, paidOn, payoutKwhPrice, createdAt, createdBy, updatedAt, updatedBy } = participantMutationFromProps;

    return (
        <PanelBody>
            <div className="row">
                <ViewText label={'Type'} id={'type'} className={'col-sm-6 form-group'} value={type.name} />
                <ViewText label={'Energieleverancier'} id={'paidOn'} className={'col-sm-6 form-group'} value={paidOn} />
            </div>
            <div className="row">
                <ViewText
                    label={'Opbrengst kWh'}
                    id={'payoutKwhPrice'}
                    className={'col-sm-6 form-group'}
                    value={payoutKwhPrice}
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

MutationFormEditEnergyTaxRefund.propTypes = {
    type: PropTypes.object,
    originalStatus: PropTypes.object,
    paidOn: PropTypes.string,
    cancelEdit: PropTypes.func,
    createdAt: PropTypes.object,
    createdBy: PropTypes.object,
    updatedAt: PropTypes.object,
    updatedBy: PropTypes.object,
};

export default MutationFormEditEnergyTaxRefund;
