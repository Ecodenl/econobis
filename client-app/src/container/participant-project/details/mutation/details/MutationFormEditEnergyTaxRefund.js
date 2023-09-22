import PanelBody from '../../../../../components/panel/PanelBody';
import ViewText from '../../../../../components/form/ViewText';
import ButtonText from '../../../../../components/button/ButtonText';
import * as PropTypes from 'prop-types';
import React from 'react';
import ParticipantDetailsMutationConclusion from './conclusion';

function MutationFormEditEnergyTaxRefund({ participantMutationFromProps, cancelDetails }) {
    const {
        type,
        paidOn,
        payoutKwhPrice,
        createdAt,
        createdWith,
        createdBy,
        updatedAt,
        updatedWith,
        updatedBy,
    } = participantMutationFromProps;

    return (
        <PanelBody>
            <div className="row">
                <ViewText label={'Type'} id={'type'} className={'col-sm-6 form-group'} value={type.name} />
                <ViewText label={'Energieleverancier'} id={'paidOn'} className={'col-sm-6 form-group'} value={paidOn} />
            </div>
            <div className="row">
                <ViewText
                    label={'Teruggave EB per kWh €'}
                    id={'payoutKwhPrice'}
                    className={'col-sm-6 form-group'}
                    value={payoutKwhPrice}
                />
            </div>

            <ParticipantDetailsMutationConclusion
                createdAt={createdAt}
                createdWith={createdWith}
                createdBy={createdBy}
                updatedAt={updatedAt}
                updatedWith={updatedWith}
                updatedBy={updatedBy}
            />

            <div className="pull-right btn-group" role="group">
                <ButtonText buttonText={'Sluiten'} onClickAction={cancelDetails} />
            </div>
        </PanelBody>
    );
}

MutationFormEditEnergyTaxRefund.propTypes = {
    type: PropTypes.object,
    originalStatus: PropTypes.object,
    paidOn: PropTypes.string,
    cancelDetails: PropTypes.func,
    createdAt: PropTypes.object,
    createdWith: PropTypes.object,
    createdBy: PropTypes.object,
    updatedAt: PropTypes.object,
    updatedWith: PropTypes.object,
    updatedBy: PropTypes.object,
};

export default MutationFormEditEnergyTaxRefund;
