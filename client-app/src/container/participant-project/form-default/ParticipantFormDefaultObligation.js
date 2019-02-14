import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../components/form/InputText';

function ParticipantFormDefaultObligation({ participationsRequested, participationsGranted, handleInputChange }) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligaties</h4>
            <div className="row">
                <InputText
                    label={'Huidig aantal obligaties'}
                    name={'participationsCurrent'}
                    id={'participationsCurrent'}
                    value={'???'}
                    onChangeAction={() => {}}
                    readOnly={true}
                />
                <InputText
                    type={'number'}
                    label={'Obligaties aangevraagd'}
                    name={'participationsRequested'}
                    id={'participationsRequested'}
                    value={participationsRequested}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    label={'Nominale waarde per obligatie'}
                    name={'currentValueParticipation'}
                    id={'currentValueParticipation'}
                    value={'???'}
                    onChangeAction={() => {}}
                    readOnly={true}
                />
                <InputText
                    type={'number'}
                    label={'Obligaties toegekend'}
                    name={'participationsGranted'}
                    id={'participationsGranted'}
                    value={participationsGranted}
                    onChangeAction={handleInputChange}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormDefaultObligation.propTypes = {
    participationsRequested: PropTypes.number.isRequired,
    participationsGranted: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default ParticipantFormDefaultObligation;
