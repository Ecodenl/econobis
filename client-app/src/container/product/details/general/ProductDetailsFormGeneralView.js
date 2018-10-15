import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import Panel from "../../../../components/panel/Panel";
import PanelBody from "../../../../components/panel/PanelBody";

const ProductDetailsFormGeneralView = props => {

    const { code, name, invoiceText, duration, invoiceFrequency, paymentType, administration} = props.productDetails;

    return (
        <div onClick={props.switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={"Productcode"}
                            value={code}
                        />
                        <ViewText
                            label={"Product"}
                            value={name}
                        />
                    </div>

                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="invoiceText" className="col-sm-12">Omschrijving</label>
                        </div>
                        <div className="col-sm-9" id="invoiceText">
                            {invoiceText}
                        </div>
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Looptijd"}
                            value={duration ? duration.name : ''}
                        />
                        <ViewText
                            label={"Prijs per"}
                            value={invoiceFrequency ? invoiceFrequency.name : ''}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            label={"Betaalwijze"}
                            value={paymentType ? paymentType.name : ''}
                        />
                        <ViewText
                            label={"Administratie"}
                            value={administration ? administration.name : ''}
                        />
                    </div>

                </PanelBody>
            </Panel>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        productDetails: state.productDetails,
    };
};

export default connect(mapStateToProps)(ProductDetailsFormGeneralView);