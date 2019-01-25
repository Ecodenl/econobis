import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const ProjectGeneralFormView = props => {
    const {
        name,
        dateStart,
        participationWorth,
        totalParticipations,
        issuedParticipations,
        participationsInOption,
        issuableParticipations,
        participationsWorthTotal,
        amountOfParticipants,
    } = props.project;

    return (
        <div>
            <div className="row">
                <ViewText label={'Naam'} value={name} />
            </div>

            <div className="row">
                <ViewText label={'Totaal aantal deelnames'} value={totalParticipations && totalParticipations} />
                <ViewText label={'Startdatum'} value={dateStart ? moment(dateStart).format('L') : ''} />
            </div>

            <div className="row">
                <ViewText label={'Uitgegeven deelnames'} value={issuedParticipations && issuedParticipations} />
                <ViewText label={'Waarde per deelname'} value={participationWorth ? '€ ' + participationWorth : ''} />
            </div>

            <div className="row">
                <ViewText label={'Deelnames in optie'} value={participationsInOption && participationsInOption} />
                <ViewText
                    label={'Waarde deelnames totaal'}
                    value={participationsWorthTotal ? '€ ' + participationsWorthTotal : ''}
                />
            </div>

            <div className="row">
                <ViewText label={'Uit te geven deelnames'} value={issuableParticipations && issuableParticipations} />
                <ViewText label={'Aantal deelnemers'} value={amountOfParticipants && amountOfParticipants} />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
    };
};

export default connect(mapStateToProps)(ProjectGeneralFormView);
