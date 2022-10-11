import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');

import ViewText from '../../../../components/form/ViewText';

const QuotationRequestDetailsFormGeneralView = props => {
    const {
        organisationOrCoach,
        dateRecorded,
        status,
        datePlannedToSendWfEmailStatus,
        dateReleased,
        quotationText,
        opportunity,
    } = props.quotationRequestDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={'Organisatie/Coach'}
                    value={organisationOrCoach && organisationOrCoach.fullName}
                    link={organisationOrCoach ? 'contact/' + organisationOrCoach.id : ''}
                />
                <ViewText label={'Verzoek voor'} value={opportunity.intake && opportunity.intake.contact.fullName} />
            </div>

            {organisationOrCoach.typeId === 'organisation' && (
                <div className="row">
                    <ViewText
                        label={'Organisatie contactpersoon'}
                        value={
                            organisationOrCoach.contactPerson ? organisationOrCoach.contactPerson.contact.fullName : ''
                        }
                        link={
                            organisationOrCoach.contactPerson
                                ? 'contact/' + organisationOrCoach.contactPerson.contact.id
                                : ''
                        }
                    />
                </div>
            )}

            <div className="row">
                <ViewText label={'Adres voor'} value={opportunity.intake && opportunity.intake.fullAddress} />
                <ViewText
                    label={'Maatregel categorie'}
                    value={opportunity.measureCategory && opportunity.measureCategory.name}
                />
            </div>

            <div className="row">
                <ViewText
                    label={'Maatregelen specifiek'}
                    value={opportunity.measures && opportunity.measures.map(measure => measure.name).join(', ')}
                />
                <ViewText label={'Datum opname'} value={dateRecorded ? moment(dateRecorded).format('L') : ''} />
            </div>

            <div className="row">
                <ViewText label={'Offerte status'} value={status && status.name} />
                {status && status.usesWf ? (
                    <ViewText
                        label={'Datum workflow email'}
                        value={datePlannedToSendWfEmailStatus ? moment(datePlannedToSendWfEmailStatus).format('L') : ''}
                    />
                ) : (
                    ''
                )}
                ;
            </div>

            <div className="row">
                <ViewText label={'Offerte uitgebracht'} value={dateReleased ? moment(dateReleased).format('L') : ''} />
            </div>

            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="quotationText" className="col-sm-12">
                        Offerte omschrijving
                    </label>
                </div>
                <div className="col-sm-9" id="quotationText">
                    {quotationText}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
    };
};

export default connect(mapStateToProps)(QuotationRequestDetailsFormGeneralView);
