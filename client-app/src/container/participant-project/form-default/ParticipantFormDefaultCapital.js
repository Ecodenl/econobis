import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../components/form/InputText';

function ParticipantFormDefaultCapital({
    participationWorth,
    participationsDefinitiveWorth,
    participationsDefinitive,
    valueCourses,
}) {
    const activeValueCourse = valueCourses ? valueCourses.find(valueCourse => valueCourse.active) : [];

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Kapitaal</h4>
            <div className="row">
                <InputText
                    label={'Huidig aantal participaties'}
                    name={'participationsDefinitive'}
                    id={'participationsDefinitive'}
                    value={participationsDefinitive}
                    readOnly={true}
                />
                {/*<InputText*/}
                {/*type={'number'}*/}
                {/*label={'Participaties aangevraagd'}*/}
                {/*name={'participationsRequested'}*/}
                {/*id={'participationsRequested'}*/}
                {/*value={participationsRequested}*/}
                {/*onChangeAction={handleInputChange}*/}
                {/*/>*/}
            </div>
            <div className="row">
                <InputText
                    label={'Nominale waarde per participatie'}
                    name={'participationWorth'}
                    id={'participationWorth'}
                    value={participationWorth}
                    readOnly={true}
                />
                {/*<InputText*/}
                {/*type={'number'}*/}
                {/*label={'Participaties toegekend'}*/}
                {/*name={'participationsDefinitive'}*/}
                {/*id={'participationsDefinitive'}*/}
                {/*value={participationsDefinitive}*/}
                {/*onChangeAction={handleInputChange}*/}
                {/*/>*/}
            </div>
            <div className="row">
                <InputText
                    label={'Huidige boekwaarde per participatie'}
                    name={'valueCourseBookWorth'}
                    id={'valueCourseBookWorth'}
                    value={activeValueCourse && activeValueCourse.bookWorth}
                    readOnly={true}
                />
            </div>
            <div className="row">
                <InputText
                    label={'Huidige totale waarde'}
                    name={'participationsDefinitiveWorth'}
                    id={'participationsDefinitiveWorth'}
                    value={participationsDefinitiveWorth}
                    readOnly={true}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormDefaultCapital.propTypes = {
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
};

export default ParticipantFormDefaultCapital;
