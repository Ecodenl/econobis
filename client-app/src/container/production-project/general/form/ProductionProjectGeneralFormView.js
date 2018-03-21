import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const ProductionProjectGeneralFormView = props => {
    const {name, dateStart, participationWorth, totalParticipations, issuedParticipations, participationsInOption,
        issuableParticipations, participationsWorthTotal, amountOfParticipants} = props.productionProject;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Naam"}
                    value={name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Totaal aantal participaties"}
                    value={totalParticipations && totalParticipations}
                />
                <ViewText
                    label={"Start datum"}
                    value={dateStart ? moment(dateStart).format('L') : ''}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Uitgegeven participaties"}
                    value={issuedParticipations && issuedParticipations}
                />
                <ViewText
                    label={"Waarde per participatie"}
                    value={participationWorth ? '€ ' + participationWorth : ''}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Participaties in optie"}
                    value={participationsInOption && participationsInOption}
                />
                <ViewText
                    label={"Waarde participaties totaal"}
                    value={participationsWorthTotal ? '€ ' + participationsWorthTotal : ''}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Uit te geven participaties"}
                    value={issuableParticipations && issuableParticipations}
                />
                <ViewText
                    label={"Aantal participanten"}
                    value={amountOfParticipants && amountOfParticipants}
                />
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        productionProject: state.productionProjectDetails,
    }
};

export default connect(mapStateToProps)(ProductionProjectGeneralFormView);