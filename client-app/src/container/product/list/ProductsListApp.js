import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts, clearProducts } from '../../../actions/product/ProductsActions';
import ProductsList from './ProductsList';
import ProductsListToolbar from './ProductsListToolbar';
import Panel from "../../../components/panel/Panel";
import PanelBody from "../../../components/panel/PanelBody";

class ProductsListApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts();
    };

    componentWillUnmount() {
        this.props.clearProducts();
    };

    refreshProductsData = () => {
        this.props.clearProducts();
        this.props.fetchProducts();
    };

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <ProductsListToolbar
                            refreshProductsData={() => this.refreshProductsData()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ProductsList
                            products={this.props.products}
                        />
                    </div>
                </PanelBody>
            </Panel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => {
        dispatch(fetchProducts());
    },
    clearProducts: () => {
        dispatch(clearProducts());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListApp);