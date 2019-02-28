import React from 'react';
import * as PropTypes from 'prop-types';
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormViewPostalcodeLinkCapital({
    participationWorth,
    participationsDefinitive,
    participationsDefinitiveWorth,
    powerKwhConsumption,
    valueCourses,
    onClick,
}) {
    const activeValueCourse = valueCourses ? valueCourses.find(valueCourse => valueCourse.active) : [];

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Postcoderoos kapitaal</h4>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige aantal participaties'} value={participationsDefinitive} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Nominale waarde per participatie'} value={moneyPresenter(participationWorth)} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText
                    label={'Huidige boekwaarde per participatie'}
                    value={activeValueCourse && moneyPresenter(activeValueCourse.bookWorth)}
                />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Huidige totale waarde'} value={moneyPresenter(participationsDefinitiveWorth)} />
            </div>
            <hr style={{ margin: '10px 0' }} />
            <h4>Postcoderoos</h4>
            <div className="row" onClick={onClick}>
                <ViewText label={'Total opbrengsten kWh'} value={'???'} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Totale indicatie teruggave energie belasting'} value={'???'} />
            </div>
            <div className="row" onClick={onClick}>
                <ViewText label={'Jouw jaarlijks verbruik'} value={powerKwhConsumption} />
            </div>
        </React.Fragment>
    );
}

ParticipantFormViewPostalcodeLinkCapital.propTypes = {
    onClick: PropTypes.func.isRequired,
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
    powerKwhConsumption: PropTypes.number.isRequired,
};

export default ParticipantFormViewPostalcodeLinkCapital;
