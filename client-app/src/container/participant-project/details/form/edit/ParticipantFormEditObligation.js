import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../../../components/form/InputText';

function ParticipantFormEditObligation({
    participationWorth,
    participationsDefinitiveWorth,
    participationsDefinitive,
    valueCourses,
}) {
    const activeValueCourse = valueCourses ? valueCourses.find(valueCourse => valueCourse.active) : [];

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligaties</h4>
            <div className="row">
                <InputText
                    label={'Huidig aantal obligaties'}
                    name={'participationsDefinitive'}
                    id={'participationsDefinitive'}
                    value={participationsDefinitive}
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
                {/*name={'participationsDefinitive'}*/}
                {/*id={'participationsDefinitive'}*/}
                {/*value={participationsDefinitive}*/}
                {/*onChangeAction={handleInputChange}*/}
                {/*/>*/}
            </div>
            <div className="row">
                <InputText
                    label={'Huidige boekwaarde per obligatie'}
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

ParticipantFormEditObligation.propTypes = {
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
};

export default ParticipantFormEditObligation;
