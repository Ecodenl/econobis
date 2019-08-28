import React from 'react';
import * as PropTypes from 'prop-types';
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormViewPostalcodeLinkCapital({
    participationWorth,
    participationsDefinitive,
    participationsDefinitiveWorth,
    powerKwhConsumption,
    currentBookWorth,
    participationsReturnsKwhTotal,
    participationsIndicationOfRestitutionEnergyTaxTotal,
    onClick,
}) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Postcoderoos kapitaal</h4>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige aantal participaties'} value={participationsDefinitive} />
                <ViewText label={'Totale opbrengsten kWh'} value={participationsReturnsKwhTotal} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Nominale waarde per participatie'} value={moneyPresenter(participationWorth)} />
                <ViewText
                    label={'Totale indicatie teruggave energie belasting'}
                    value={moneyPresenter(participationsIndicationOfRestitutionEnergyTaxTotal)}
                />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige boekwaarde per participatie'} value={moneyPresenter(currentBookWorth)} />
                <ViewText label={'Jaarlijks verbruik'} value={powerKwhConsumption} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText
                    label={'Huidige totale waarde participaties'}
                    value={moneyPresenter(participationsDefinitiveWorth)}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormViewPostalcodeLinkCapital.propTypes = {
    onClick: PropTypes.func.isRequired,
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
    powerKwhConsumption: PropTypes.number.isRequired,
};

export default ParticipantFormViewPostalcodeLinkCapital;
