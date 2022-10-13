import React from 'react';
import { connect } from 'react-redux';

import ContactDetailsQuotationItem from './ContactDetailsQuotationItem';

const ContactDetailsQuotationsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Kansnummer</div>
                <div className="col-sm-2">Kans</div>
                <div className="col-sm-2">Status</div>
                <div className="col-sm-2">Datum opname</div>
                <div className="col-sm-2">Offerte uitgebracht</div>
                <div className="col-sm-2">Contact</div>
            </div>
            {props.organisationQuotationRequests.length > 0 ? (
                props.organisationQuotationRequests.map(quotation => {
                    return <ContactDetailsQuotationItem key={quotation.id} quotation={quotation} />;
                })
            ) : (
                <div>Geen offertes bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        organisationQuotationRequests: state.contactDetails.organisationQuotationRequests,
    };
};
export default connect(mapStateToProps)(ContactDetailsQuotationsList);
