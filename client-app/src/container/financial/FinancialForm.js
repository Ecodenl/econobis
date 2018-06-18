import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import OrdersList from "./order/list/OrdersList";
import InvoicesList from "./invoice/list/InvoicesList";
import Panel from "../../components/panel/Panel";
import PanelBody from "../../components/panel/PanelBody";
import PaymentInvoicesList from "./payment-invoice/list/PaymentInvoicesList";

class ProductDetailsForm extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.administrationDetails) ?
                <div></div>
                :
                <div>
                    {this.props.type === 'orders' &&
                    <Panel>
                        <PanelBody>
                            <OrdersList
                                administrationId={this.props.administrationDetails.id}
                                filter={this.props.filter}
                            />
                        </PanelBody>
                    </Panel>
                    }
                    {this.props.type === 'facturen' &&
                    <Panel>
                        <PanelBody>
                            <InvoicesList
                                administrationId={this.props.administrationDetails.id}
                                filter={this.props.filter}
                            />
                        </PanelBody>
                    </Panel>
                    }
                    {this.props.type === 'uitkering-facturen' &&
                    <Panel>
                        <PanelBody>
                            <PaymentInvoicesList
                                administrationId={this.props.administrationDetails.id}
                                filter={this.props.filter}
                            />
                        </PanelBody>
                    </Panel>
                    }
                    {this.props.type === undefined &&
                    <div>Selecteer orders of facturen.</div>
                    }
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

export default connect(mapStateToProps)(ProductDetailsForm);
