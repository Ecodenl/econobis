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
                    label={'Totale indicatie teruggave energiebelasting'}
                    value={moneyPresenter(participationsIndicationOfRestitutionEnergyTaxTotal)}
                    textToolTip={'Elk jaar verdelen we de totale opgewekte kWh over de deelnemers. O.b.v. de vastgestelde teruggave energiebelasting € / kWh berekenen we de indicatie teruggave energiebelasting per deelnemer (euro per kWh x opgewekte kWh per deelnemer). De totale indicatie teruggave energiebelasting is het totaal per deelnemer van alle bedragen indicatie teruggave energiebelasting opgeteld over de jaren heen.'}
                />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText
                    label={'Huidige boekwaarde per participatie'}
                    value={moneyPresenter(currentBookWorth)}
                    textToolTip={'De huidige boekwaarde per participatie is een administratieve boekwaarde van een deelname, die afhankelijk is van de waarde van het project en de gemaakte kosten en wordt vastgesteld o.b.v. de jaarrekening van de coöperatie. De boekwaarde per 1 januari van een jaar gebruik je bij je aangifte inkomstenbelasting.'}
                />
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
    powerKwhConsumption: PropTypes.number,
};

export default ParticipantFormViewPostalcodeLinkCapital;
