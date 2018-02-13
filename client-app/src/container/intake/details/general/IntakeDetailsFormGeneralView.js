import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const IntakeDetailsFormGeneralView = props => {
    const { address, contact, status, sources, campaign, reasons, note } = props.intakeDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Contact"}
                    value={contact.fullName}
                />
                <ViewText
                    label={"Adres"}
                    value={address && address.street + ' ' + address.number}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Campagne"
                    value={ campaign && campaign.name }
                />
                <ViewText
                    label="Status"
                    value={status && status.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Aanmeldingsbron"}
                    value={ sources && sources.map((source) => source.name).join(', ') }
                />
                <ViewText
                    label={"Wat is belangrijk"}
                    value={ reasons && reasons.map((reason) => reason.name).join(', ') }
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="note" className="col-sm-12">Opmerkingen van bewoner</label>
                </div>
                <div className="col-sm-9" id="note">
                    {note}
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        intakeDetails: state.intakeDetails,
    };
};

export default connect(mapStateToProps)(IntakeDetailsFormGeneralView);