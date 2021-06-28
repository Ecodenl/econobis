import React, { Component } from 'react';

import OrderProductsFormList from './OrderProductsFormList';
import OrderProductsFormNew from './OrderProductsFormNew';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PanelHeader from '../../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';
import OrderProductsFormNewProduct from './OrderProductsFormNewProduct';
import OrderProductsFormNewProductOneTime from './OrderProductsFormNewProductOneTime';
import { setError } from '../../../../../actions/general/ErrorActions';

class OrderProductsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
            showNewProduct: false,
            showNewProductOneTime: false,
        };
    }

    toggleShowNew = () => {
        if (this.props.orderDetails.canEdit) {
            this.setState({
                showNew: !this.state.showNew,
            });
        } else {
            this.props.setError(
                405,
                'Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota.'
            );
        }
    };

    toggleShowNewProduct = () => {
        if (this.props.orderDetails.canEdit) {
            this.setState({
                showNewProduct: !this.state.showNewProduct,
            });
        } else {
            this.props.setError(
                405,
                'Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota.'
            );
        }
    };

    toggleShowNewProductOneTime = () => {
        if (this.props.orderDetails.canEdit) {
            this.setState({
                showNewProductOneTime: !this.state.showNewProductOneTime,
            });
        } else {
            this.props.setError(
                405,
                'Een order met daar aan gekoppeld een nota met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” nota. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de nota.'
            );
        }
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <div className={'row'}>
                        <div className={'col-xs-10'}>
                            <span className="h5 text-bold">Orderregels</span>
                        </div>
                        {this.props.permissions.manageFinancial && (
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
                        <OrderProductsFormList />
                    </div>
                    <div className="col-md-12 margin-10-top">
                        {this.state.showNew && <OrderProductsFormNew toggleShowNew={this.toggleShowNew} />}
                        {this.state.showNewProduct && (
                            <OrderProductsFormNewProduct toggleShowNewProduct={this.toggleShowNewProduct} />
                        )}
                        {this.state.showNewProductOneTime && (
                            <OrderProductsFormNewProductOneTime
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
        orderDetails: state.orderDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderProductsForm);
