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
                <div className="col-sm-2">Aangevraagd</div>
                <div className="col-sm-2">Datum opname</div>
                <div className="col-sm-2">Datum uitvoering</div>
            </div>
            {
                props.quotations.length > 0 ?
                    props.quotations.map(quotation => {
                        return <ContactDetailsQuotationItem
                            key={quotation.id}
                            quotation={quotation}
                        />;
                    })
                    :
                    <div>Geen offertes bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        quotations: state.contactDetails.organisation.quotations,
    };
};
export default connect(mapStateToProps)(ContactDetailsQuotationsList);

