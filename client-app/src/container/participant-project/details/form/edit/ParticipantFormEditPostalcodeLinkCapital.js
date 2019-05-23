import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('nl');
import InputText from '../../../../../components/form/InputText';
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormEditPostalcodeLinkCapital({
    participationWorth,
    participationsDefinitiveWorth,
    participationsDefinitive,
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
                <ViewText
                    label={'Huidige aantal participaties'}
                    value={participationsDefinitive}
                    className={'col-sm-6 form-group'}
                />
                <ViewText label={'Totale opbrengsten kWh'} value={'0'} className={'col-sm-6 form-group'} />
            </div>
            <div className="row">
                <ViewText
                    label={'Nominale waarde per participatie'}
                    value={moneyPresenter(participationWorth)}
                    className={'col-sm-6 form-group'}
                />
                <ViewText
                    label={'Totale indicatie teruggave energie belasting'}
                    value={'0'}
                    className={'col-sm-6 form-group'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige boekwaarde per participatie'}
                    value={activeValueCourse && moneyPresenter(activeValueCourse.bookWorth)}
                    className={'col-sm-6 form-group'}
                />
                <ViewText label={'Jaarlijks verbruik'} value={powerKwhConsumption} className={'col-sm-6 form-group'} />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige totale waarde'}
                    value={moneyPresenter(participationsDefinitiveWorth)}
                    className={'col-sm-6 form-group'}
                />
                <InputText
                    type={'number'}
                    label={'Jaarlijks verbruik'}
                    name={'powerKwhConsumption'}
                    id={'powerKwhConsumption'}
                    value={powerKwhConsumption}
                    onChangeAction={handleInputChange}
                />
            </div>
        </React.Fragment>
    );
}

ParticipantFormEditPostalcodeLinkCapital.propTypes = {
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
    powerKwhConsumption: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default ParticipantFormEditPostalcodeLinkCapital;
