import React, { Component } from 'react';

import InvoiceProductsFormList from './InvoiceProductsFormList';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import InvoiceProductsFormNewProduct from './InvoiceProductsFormNewProduct';
import InvoiceProductsFormNew from './InvoiceProductsFormNew';
import InvoiceProductsFormNewProductOneTime from './InvoiceProductsFormNewProductOneTime';

class InvoiceProductsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            showNewProduct: false,
            showNewProductOneTime: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    toggleShowNewProduct = () => {
        this.setState({
            showNewProduct: !this.state.showNewProduct,
        });
    };

    toggleShowNewProductOneTime = () => {
        this.setState({
            showNewProductOneTime: !this.state.showNewProductOneTime,
        });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <div className={'row'}>
                        <div className={'col-xs-10'}>
                            <span className="h5 text-bold">Notaregels</span>
                        </div>
                        {this.props.permissions.manageFinancial && this.props.invoice.statusId == 'to-send' && (
                            <div className={'col-xs-2'}>
                                <div className="pull-right">
                                    <span className="glyphicon glyphicon-plus" data-toggle="dropdown" role="button" />
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="btn" onClick={this.toggleShowNew}>
                                                Bestaand product
                                            </a>
                                        </li>
                                        <li>
                                            <a className="btn" onClick={this.toggleShowNewProduct}>
                                                Nieuw product
                                            </a>
                                        </li>
                                        <li>
                                            <a className="btn" onClick={this.toggleShowNewProductOneTime}>
                                                Nieuw eenmalig product
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <InvoiceProductsFormList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <InvoiceProductsFormNew toggleShowNew={this.toggleShowNew} />}
                        {this.state.showNewProduct && (
                            <InvoiceProductsFormNewProduct toggleShowNewProduct={this.toggleShowNewProduct} />
                        )}
                        {this.state.showNewProductOneTime && (
                            <InvoiceProductsFormNewProductOneTime
                                toggleShowNewProductOneTime={this.toggleShowNewProductOneTime}
                            />
                        )}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        invoice: state.invoiceDetails,
    };
};

export default connect(mapStateToProps)(InvoiceProductsForm);
