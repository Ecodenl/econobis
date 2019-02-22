import React from 'react';
import * as PropTypes from 'prop-types';
import ViewText from '../../../../../components/form/ViewText';

function ParticipantFormViewObligation({ participationWorth, participationsGranted, onClick }) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligaties</h4>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige aantal obligaties'} value={'????'} />
                {/*<ViewText label={'Obligaties aangevraagd'} value={participationsRequested} />*/}
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Nominale waarde per obligatie'} value={participationWorth} />
                {/*<ViewText label={'Obligaties toegekend'} value={participationsGranted} />*/}
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige boekwaarde per obligatie'} value={'????'} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige totale waarde'} value={'????'} />
            </div>
        </React.Fragment>
    );
}

ParticipantFormViewObligation.propTypes = {
    onClick: PropTypes.func.isRequired,
    participationsRequested: PropTypes.number.isRequired,
    participationsGranted: PropTypes.number.isRequired,
};

export default ParticipantFormViewObligation;
