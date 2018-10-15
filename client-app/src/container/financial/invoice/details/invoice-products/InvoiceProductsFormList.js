import React from 'react';
import {connect} from 'react-redux';

import InvoiceProductsFormItem from "./InvoiceProductsFormItem";

const InvoiceProductsFormList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Productcode</div>
                <div className="col-sm-3">Productnaam</div>
                <div className="col-sm-3">Omschrijving</div>
                <div className="col-sm-2">Aantal</div>
                <div className="col-sm-2">Prijs incl. BTW</div>
            </div>
            {
                props.invoiceProducts.length > 0 ?
                    props.invoiceProducts.map(invoiceProduct => {
                        return <InvoiceProductsFormItem
                            key={invoiceProduct.id}
                            invoiceProduct={invoiceProduct}
                        />;
                    })
                    :
                    <div>Geen factuurregels bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        invoiceProducts: state.invoiceDetails.invoiceProducts,
    };
};

export default connect(mapStateToProps)(InvoiceProductsFormList);
