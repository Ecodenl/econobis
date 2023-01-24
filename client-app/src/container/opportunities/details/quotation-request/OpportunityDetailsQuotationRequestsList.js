import React from 'react';
import { connect } from 'react-redux';

import OpportunityDetailsQuotationRequestsItem from './OpportunityDetailsQuotationRequestsItem';

const OpportunityDetailsQuotationRequestsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Organisatie/Coach</div>
                <div className="col-sm-2">Datum aanvraag</div>
                <div className="col-sm-2">Actie</div>
                <div className="col-sm-2">Datum opname</div>
                <div className="col-sm-2">Datum afspraak</div>
                <div className="col-sm-2">Status</div>
            </div>
            {props.quotationRequests.length > 0 ? (
                props.quotationRequests.map(quotationRequest => {
                    return (
                        <OpportunityDetailsQuotationRequestsItem
                            key={quotationRequest.id}
                            quotationRequest={quotationRequest}
                        />
                    );
                })
            ) : (
                <div>Geen kansacties bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        quotationRequests: state.opportunityDetails.quotationRequests,
    };
};
export default connect(mapStateToProps)(OpportunityDetailsQuotationRequestsList);
