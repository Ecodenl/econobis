import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../../../components/form/InputText';
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormEditPostalcodeLinkCapital({
    participationWorth,
    participationsDefinitiveWorth,
    participationsDefinitive,
    currentBookWorth,
    powerKwhConsumption,
    handleInputChange,
    participationsReturnsKwhTotal,
    participationsIndicationOfRestitutionEnergyTaxTotal,
}) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Postcoderoos kapitaal</h4>
            <div className="row">
                <ViewText
                    label={'Huidige aantal participaties'}
                    value={participationsDefinitive}
                    className={'col-sm-6 form-group'}
                />
                <ViewText
                    label={'Totale opbrengsten kWh'}
                    value={participationsReturnsKwhTotal}
                    className={'col-sm-6 form-group'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Nominale waarde per participatie'}
                    value={moneyPresenter(participationWorth)}
                    className={'col-sm-6 form-group'}
                />
                <ViewText
                    label={'Totale indicatie teruggave energiebelasting'}
                    value={moneyPresenter(participationsIndicationOfRestitutionEnergyTaxTotal)}
                    className={'col-sm-6 form-group'}
                    textToolTip={
                        'Elk jaar verdelen we de totale opgewekte kWh over de deelnemers. O.b.v. de vastgestelde teruggave energiebelasting € / kWh berekenen we de indicatie teruggave energiebelasting per deelnemer (euro per kWh x opgewekte kWh per deelnemer). De totale indicatie teruggave energiebelasting is het totaal per deelnemer van alle bedragen indicatie teruggave energiebelasting opgeteld over de jaren heen.'
                    }
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige boekwaarde per participatie'}
                    value={moneyPresenter(currentBookWorth)}
                    className={'col-sm-6 form-group'}
                    textToolTip={
                        // origineel         // 'De huidige boekwaarde per participatie is een administratieve boekwaarde van een deelname, die afhankelijk is van de waarde van het project en de gemaakte kosten en wordt vastgesteld o.b.v. de jaarrekening van de coöperatie. De boekwaarde per 1 januari van een jaar gebruik je bij je aangifte inkomstenbelasting.'
                        'De huidige boekwaarde per participatie is een administratieve boekwaarde van een deelname, die afhankelijk is van de waarde van het project en de gemaakte kosten en wordt vastgesteld op basis van de jaarrekening van de coöperatie. Voor de waardestaat wordt de boekwaarde gehanteerd zoals die geldt op 1 januari om 00:00 uur (dit is de waarde aan het einde van 31 december).'
                        // of variant        // 'De huidige boekwaarde per participatie is een administratieve boekwaarde van een deelname, gebaseerd op de waarde van het project en de gemaakte kosten zoals vastgesteld in de jaarrekening van de coöperatie. Voor de waardestaat en de aangifte inkomstenbelasting geldt de peildatum van 1 januari om 00:00 uur. Dit komt overeen met de boekwaarde zoals die op 31 december aan het einde van de dag gold.'
                        // of variant        // 'Voor je belastingaangifte telt de boekwaarde zoals die geldt op 1 januari. Dat is de waarde die aan het einde van het voorgaande jaar (31 december) van toepassing was.'
                    }
                />
                <InputText
                    type={'number'}
                    label={'Jaarlijks verbruik'}
                    name={'powerKwhConsumption'}
                    id={'powerKwhConsumption'}
                    value={powerKwhConsumption}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige totale waarde participaties'}
                    value={moneyPresenter(participationsDefinitiveWorth)}
                    className={'col-sm-6 form-group'}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormEditPostalcodeLinkCapital.propTypes = {
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
    powerKwhConsumption: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default ParticipantFormEditPostalcodeLinkCapital;
