import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const QuotationRequestDetailsFormGeneralView = props => {
    const {organisation, dateRecorded, status, dateReleased, dateValid, quotationText, opportunity} = props.quotationRequestDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Organisatie"}
                    value={organisation && organisation.name}
                />
                <ViewText
                    label={"Organisatie contactpersoon"}
                    value={organisation.contactPerson ? organisation.contactPerson.person.fullName : 'Onbekend'}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Verzoek voor"}
                    value={opportunity.intake && opportunity.intake.contact.fullName}
                />
                <ViewText
                    label={"Adres voor"}
                    value={opportunity.intake && opportunity.intake.fullAddress}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Maatregel categorie"}
                    value={opportunity.measure && opportunity.measure.measureCategory.name}
                />
                <ViewText
                    label={"Maatregel specifiek"}
                    value={opportunity.measure && opportunity.measure.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Datum opname"}
                    value={dateRecorded ? moment(dateRecorded).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Offerte status"}
                    value={status && status.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Offerte uitgebracht"}
                    value={dateReleased ? moment(dateReleased).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Offerte geldig tot"}
                    value={dateValid ? moment(dateValid).format('L') : 'Onbekend'}
                />
            </div>

            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="quotationText" className="col-sm-12">Offerte text</label>
                </div>
                <div className="col-sm-9" id="quotationText">
                    {quotationText}
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
    };
};

export default connect(mapStateToProps)(QuotationRequestDetailsFormGeneralView);