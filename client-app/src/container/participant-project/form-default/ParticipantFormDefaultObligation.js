import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../components/form/InputText';

function ParticipantFormDefaultObligation({ participationWorth, participationsWorthTotal, participationsGranted }) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligaties</h4>
            <div className="row">
                <InputText
                    label={'Huidig aantal obligaties'}
                    name={'participationsGranted'}
                    id={'participationsGranted'}
                    value={participationsGranted}
                    readOnly={true}
                />
                {/*<InputText*/}
                {/*type={'number'}*/}
                {/*label={'Obligaties aangevraagd'}*/}
                {/*name={'participationsRequested'}*/}
                {/*id={'participationsRequested'}*/}
                {/*value={participationsRequested}*/}
                {/*onChangeAction={handleInputChange}*/}
                {/*/>*/}
            </div>
            <div className="row">
                <InputText
                    label={'Nominale waarde per obligatie'}
                    name={'participationWorth'}
                    id={'participationWorth'}
                    value={participationWorth}
                    readOnly={true}
                />
                {/*<InputText*/}
                {/*type={'number'}*/}
                {/*label={'Obligaties toegekend'}*/}
                {/*name={'participationsGranted'}*/}
                {/*id={'participationsGranted'}*/}
                {/*value={participationsGranted}*/}
                {/*onChangeAction={handleInputChange}*/}
                {/*/>*/}
            </div>
            <div className="row">
                <InputText
                    label={'Huidige boekwaarde per participatie'}
                    name={'currentValueParticipation'}
                    id={'currentValueParticipation'}
                    value={'???'}
                    readOnly={true}
                />
            </div>
            <div className="row">
                <InputText
                    label={'Huidige totale waarde'}
                    name={'participationsWorthTotal'}
                    id={'participationsWorthTotal'}
                    value={participationsWorthTotal}
                    readOnly={true}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormDefaultObligation.propTypes = {
    participationWorth: PropTypes.number.isRequired,
    participationsGranted: PropTypes.number.isRequired,
    participationsWorthTotal: PropTypes.number.isRequired,
};

export default ParticipantFormDefaultObligation;
