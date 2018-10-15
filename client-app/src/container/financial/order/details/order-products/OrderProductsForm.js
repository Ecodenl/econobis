import React, {Component} from 'react';

import OrderProductsFormList from './OrderProductsFormList';
import OrderProductsFormNew from './OrderProductsFormNew';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import {connect} from "react-redux";
import OrderProductsFormNewProduct from "./OrderProductsFormNewProduct";

class OrderProductsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            showNewProduct: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        })
    };

    toggleShowNewProduct = () => {
        this.setState({
            showNewProduct: !this.state.showNewProduct,
        })
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <div className={"row"}>
                        <div className={"col-xs-10"}>
                            <span className="h5 text-bold">Orderregels</span>
                        </div>
                        {this.props.permissions.manageFinancial &&
                        <div className={"col-xs-2"}>
                            <div className="pull-right">
                                <span className="glyphicon glyphicon-plus" data-toggle="dropdown" role="button"/>
                                <ul className="dropdown-menu">
                                    <li><a className="btn" onClick={this.toggleShowNew}>Bestaand product</a></li>
                                    <li><a className="btn" onClick={this.toggleShowNewProduct}>Nieuw product</a></li>
                                </ul>
                            </div>
                        </div>
                        }
                    </div>
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12">
                        <OrderProductsFormList/>
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <OrderProductsFormNew toggleShowNew={this.toggleShowNew}/>}
                        {this.state.showNewProduct && <OrderProductsFormNewProduct toggleShowNewProduct={this.toggleShowNewProduct}/>}
                    </div>
                </PanelBody>
            </Panel>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(OrderProductsForm);
