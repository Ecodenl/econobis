import React from 'react';
import {connect} from 'react-redux';

import ContactDetailsQuotationItem from "./ContactDetailsQuotationItem";

const ContactDetailsQuotationsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Kansnummer</div>
                <div className="col-sm-2">Kans</div>
                <div className="col-sm-2">Status</div>
                <div className="col-sm-2">Datum opname</div>
                <div className="col-sm-2">Offerte uitgebracht</div>
                <div className="col-sm-2">Offerte geldig tot</div>
            </div>
            {
                props.quotationRequests.length > 0 ?
                    props.quotationRequests.map(quotation => {
                        return <ContactDetailsQuotationItem
                            key={quotation.id}
                            quotation={quotation}
                        />;
                    })
                    :
                    <div>Geen offertes bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        quotationRequests: state.contactDetails.organisation.quotationRequests,
    };
};
export default connect(mapStateToProps)(ContactDetailsQuotationsList);

