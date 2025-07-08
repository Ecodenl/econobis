import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import ButtonIcon from '../../../components/button/ButtonIcon';

const ProductsListToolbar = props => {
    const navigate = useNavigate();

    const newProduct = () => {
        navigate(`/product/nieuw`);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'refresh'} onClickAction={props.refreshProductsData} />
                    {props.permissions.manageFinancial && <ButtonIcon iconName={'plus'} onClickAction={newProduct} />}
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
        products: state.products.list,
    };
};

export default connect(mapStateToProps)(ProductsListToolbar);
