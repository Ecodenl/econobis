import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../../../components/form/InputText';
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormEditObligation({
    participationWorth,
    participationsDefinitiveWorth,
    participationsDefinitive,
    currentBookWorth,
}) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligaties</h4>
            <div className="row">
                <ViewText
                    label={'Huidige aantal obligaties'}
                    value={participationsDefinitive}
                    className={'col-sm-6 form-group'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Nominale waarde per obligatie'}
                    value={moneyPresenter(participationWorth)}
                    className={'col-sm-6 form-group'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige hoofdsom per obligatie'}
                    value={moneyPresenter(currentBookWorth)}
                    className={'col-sm-6 form-group'}
                    textToolTip={'De huidige hoofdsom per obligatie is een administratieve boekwaarde van een deelname, die afhankelijk is van de waarde van het project en de gemaakte kosten en wordt vastgesteld o.b.v. de jaarrekening van de coöperatie. De boekwaarde per 1 januari van een jaar gebruik je bij je aangifte inkomstenbelasting.'}
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

ParticipantFormEditObligation.propTypes = {
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
};

export default ParticipantFormEditObligation;
