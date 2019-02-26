import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../components/form/InputText';

function ParticipantFormDefaultPostalcodeLinkCapital({
    participationWorth,
    participationsWorthTotal,
    participationsGranted,
    valueCourses,
    powerKwhConsumption,
    handleInputChange,
}) {
    const activeValueCourse = valueCourses ? valueCourses.find(valueCourse => valueCourse.active) : [];

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Postcoderoos kapitaal</h4>
            <div className="row">
                <InputText
                    label={'Huidig aantal participaties'}
                    name={'participationsGranted'}
                    id={'participationsGranted'}
                    value={participationsGranted}
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
                {/*name={'participationsGranted'}*/}
                {/*id={'participationsGranted'}*/}
                {/*value={participationsGranted}*/}
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
                    name={'participationsWorthTotal'}
                    id={'participationsWorthTotal'}
                    value={participationsWorthTotal}
                    readOnly={true}
                />
            </div>
            <hr style={{ margin: '10px 0' }} />
            <h4>Postcoderoos</h4>
            <div className="row">
                <InputText
                    label={'Total opbrengsten kWh'}
                    name={'participationsGranted'}
                    id={'participationsGranted'}
                    value={'???'}
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
                    label={'Totale indicatie teruggave energie belasting'}
                    name={'participationWorth'}
                    id={'participationWorth'}
                    value={'???'}
                    readOnly={true}
                />
                {/*<InputText*/}
                {/*type={'number'}*/}
                {/*label={'Participaties toegekend'}*/}
                {/*name={'participationsGranted'}*/}
                {/*id={'participationsGranted'}*/}
                {/*value={participationsGranted}*/}
                {/*onChangeAction={handleInputChange}*/}
                {/*/>*/}
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Jouw jaarlijks verbruik'}
                    name={'powerKwhConsumption'}
                    id={'powerKwhConsumption'}
                    value={powerKwhConsumption}
                    onChangeAction={handleInputChange}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormDefaultPostalcodeLinkCapital.propTypes = {
    participationWorth: PropTypes.number.isRequired,
    participationsGranted: PropTypes.number.isRequired,
    participationsWorthTotal: PropTypes.number.isRequired,
    powerKwhConsumption: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default ParticipantFormDefaultPostalcodeLinkCapital;
