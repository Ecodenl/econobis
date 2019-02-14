import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../components/form/InputText';

function ParticipantFormDefaultCapital({ participationsRequested, participationsGranted, handleInputChange }) {
    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Kapitaal</h4>
            <div className="row">
                <InputText
                    label={'Huidig aantal participaties'}
                    name={'participationsCurrent'}
                    id={'participationsCurrent'}
                    value={'???'}
                    onChangeAction={() => {}}
                    readOnly={true}
                />
                <InputText
                    type={'number'}
                    label={'Participaties aangevraagd'}
                    name={'participationsRequested'}
                    id={'participationsRequested'}
                    value={participationsRequested}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    label={'Nominale waarde per participatie'}
                    name={'currentValueParticipation'}
                    id={'currentValueParticipation'}
                    value={'???'}
                    onChangeAction={() => {}}
                    readOnly={true}
                />
                <InputText
                    type={'number'}
                    label={'Participaties toegekend'}
                    name={'participationsGranted'}
                    id={'participationsGranted'}
                    value={participationsGranted}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Boekwaarde per participatie'}
                    name={'participationsGranted'}
                    id={'participationsGranted'}
                    value={'???'}
                    onChangeAction={handleInputChange}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormDefaultCapital.propTypes = {
    participationsRequested: PropTypes.number.isRequired,
    participationsGranted: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default ParticipantFormDefaultCapital;
