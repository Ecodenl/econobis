import React from 'react';
import * as PropTypes from 'prop-types';
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormViewObligation({
    participationWorth,
    participationsDefinitive,
    participationsDefinitiveWorth,
    currentBookWorth,
    onClick,
}) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligaties</h4>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige aantal obligaties'} value={participationsDefinitive} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Nominale waarde per obligatie'} value={moneyPresenter(participationWorth)} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText
                    label={'Huidige hoofdsom per obligatie'}
                    value={moneyPresenter(currentBookWorth)}
                    textToolTip={'De huidige hoofdsom per obligatie is een administratieve boekwaarde van een deelname, die afhankelijk is van de waarde van het project en de gemaakte kosten en wordt vastgesteld o.b.v. de jaarrekening van de coöperatie. De boekwaarde per 1 januari van een jaar gebruik je bij je aangifte inkomstenbelasting.'}
                />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige totale hoofdsom'} value={moneyPresenter(participationsDefinitiveWorth)} />
            </div>
        </React.Fragment>
    );
}

ParticipantFormViewObligation.propTypes = {
    onClick: PropTypes.func.isRequired,
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
};

export default ParticipantFormViewObligation;
