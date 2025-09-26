import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const OpportunityFormView = props => {
    const {
        status,
        datePlannedToSendWfEmailStatus,
        quotationText,
        evaluationAgreedDate,
        desiredDate,
        intake,
        measureCategory,
        measures,
        amount,
    } = props.opportunity;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Contact'}
                    value={intake && intake.contact.fullName}
                    link={intake ? '/contact/' + intake.contact.id : ''}
                />
                <ViewText label={'Adres'} value={intake && intake.fullAddress} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Maatregel - categorie'} value={measureCategory && measureCategory.name} />
                <ViewText label={'Postcode'} value={(intake && intake.address) && intake.address.postalCode} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={'Maatregel - specifiek'}
                    value={measures && measures.map(measure => measure.name).join(', ')}
                />
                <ViewText label={'Campagne'} value={intake && intake.campaign ? intake.campaign.name : ''} />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Status'} value={status && status.name} />
                {status && status.usesWf ? (
                    <ViewText
                        label={'Datum workflow email'}
                        value={datePlannedToSendWfEmailStatus ? moment(datePlannedToSendWfEmailStatus).format('L') : ''}
                    />
                ) : (
                    ''
                )}
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Aantal'} size={'col-sm-5'} value={amount} textToolTip={`aantal, m2 of Wattpiek`} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="quotationText" className="col-sm-12">
                        Toelichting op maatregel
                    </label>
                </div>
                <div className="col-sm-9" id="quotationText">
                    {quotationText}
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Datum uitvoering'} value={desiredDate ? moment(desiredDate).format('L') : ''} />
                <ViewText
                    label={'Datum evaluatie'}
                    value={evaluationAgreedDate ? moment(evaluationAgreedDate).format('L') : ''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        opportunity: state.opportunityDetails,
    };
};

export default connect(mapStateToProps)(OpportunityFormView);
