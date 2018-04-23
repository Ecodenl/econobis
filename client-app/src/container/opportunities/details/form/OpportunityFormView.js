import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const OpportunityFormView = props => {
    const { status, quotationText, evaluationAgreedDate, desiredDate, intake, measureCategory, measures } = props.opportunity;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Contact"}
                    value={intake && intake.contact.fullName}
                />
                <ViewText
                    label={"Adres"}
                    value={intake && intake.fullAddress}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Maatregel - categorie"}
                    value={measureCategory && measureCategory.name}
                />
                <ViewText
                    label={"Campagne"}
                    value={(intake && intake.campaign)  ? intake.campaign.name : ''}
                />
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Maatregel - specifiek"}
                    value={ measures && measures.map((measure) => measure.name).join(', ') }
                />
                <ViewText
                    label={"Status"}
                    value={status && status.name}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="quotationText" className="col-sm-12">Toelichting op maatregel</label>
                </div>
                <div className="col-sm-9" id="quotationText">
                    {quotationText}
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Datum uitvoering gepland"}
                    value={desiredDate ? moment(desiredDate).format('L') : ''}
                />
                <ViewText
                    label={"Datum evaluatie akkoord"}
                    value={evaluationAgreedDate ? moment(evaluationAgreedDate).format('L') : ''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        opportunity: state.opportunityDetails,
    }
};

export default connect(mapStateToProps)(OpportunityFormView);