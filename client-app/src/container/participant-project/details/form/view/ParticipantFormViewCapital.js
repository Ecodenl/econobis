import React from 'react';
import * as PropTypes from 'prop-types';
import ViewText from '../../../../../components/form/ViewText';

function ParticipantFormViewCapital({ participationWorth, participationsRequested, participationsGranted, onClick }) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Kapitaal</h4>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige aantal participaties'} value={'????'} />
                {/*<ViewText label={'Participaties aangevraagd'} value={participationsRequested} />*/}
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Nominale waarde per participatie'} value={participationWorth} />
                {/*<ViewText label={'Participaties toegekend'} value={participationsGranted} />*/}
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Boekwaarde per participatie'} value={'????'} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige boekwaarde per participatie'} value={'????'} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige totale waarde'} value={'????'} />
            </div>
        </React.Fragment>
    );
}

ParticipantFormViewCapital.propTypes = {
    onClick: PropTypes.func.isRequired,
    participationsRequested: PropTypes.number.isRequired,
    participationsGranted: PropTypes.number.isRequired,
};

export default ParticipantFormViewCapital;
