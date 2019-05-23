import React from 'react';
import * as PropTypes from 'prop-types';
import ViewText from '../../../../../components/form/ViewText';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

function ParticipantFormViewCapital({
    participationWorth,
    participationsDefinitive,
    participationsDefinitiveWorth,
    valueCourses,
    onClick,
}) {
    const activeValueCourse = valueCourses ? valueCourses.find(valueCourse => valueCourse.active) : [];

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Kapitaal</h4>
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
        </React.Fragment>
    );
}

ParticipantFormViewCapital.propTypes = {
    onClick: PropTypes.func.isRequired,
    participationWorth: PropTypes.number.isRequired,
    participationsDefinitive: PropTypes.number.isRequired,
    participationsDefinitiveWorth: PropTypes.number.isRequired,
};

export default ParticipantFormViewCapital;
