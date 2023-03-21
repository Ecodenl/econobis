import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormEditCapital({
    participationWorth,
    participationsDefinitiveWorth,
    participationsDefinitive,
    currentBookWorth,
}) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Kapitaal</h4>
            <div className="row">
                <ViewText
                    label={'Huidige aantal participaties'}
                    value={participationsDefinitive}
                    className={'col-sm-6 form-group'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Nominale waarde per participatie'}
                    value={moneyPresenter(participationWorth)}
                    className={'col-sm-6 form-group'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige boekwaarde per participatie'}
                    value={moneyPresenter(currentBookWorth)}
                    className={'col-sm-6 form-group'}
                    textToolTip={'Elk jaar verdelen we de totale opgewekte kWh over de deelnemers. O.b.v. de vastgestelde teruggave energiebelasting € / kWh berekenen we de indicatie teruggave energiebelasting per deelnemer (euro per kWh x opgewekte kWh per deelnemer). De totale indicatie teruggave energiebelasting is het totaal per deelnemer van alle bedragen indicatie teruggave energiebelasting opgeteld over de jaren heen.'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige totale waarde'}
                    value={moneyPresenter(participationsDefinitiveWorth)}
                    className={'col-sm-6 form-group'}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormEditCapital.propTypes = {
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
};

export default ParticipantFormEditCapital;
