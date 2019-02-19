import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const ProductsListToolbar = props => {
    const newProduct = () => {
        hashHistory.push(`/product/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.refreshProductsData} />
                    {props.permissions.manageFinancial && (
                        <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newProduct} />
                    )}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Producten</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {props.products ? props.products.length : 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        products: state.products,
    };
};

export default connect(
    mapStateToProps,
    null
)(ProductsListToolbar);
