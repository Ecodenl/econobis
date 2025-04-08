import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts, clearProducts } from '../../../actions/product/ProductsActions';
import ProductsList from './ProductsList';
import ProductsListToolbar from './ProductsListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import filterHelper from '../../../helpers/FilterHelper';
import { bindActionCreators } from 'redux';
import {
    clearFilterProducts,
    setActiveProductFilter,
    setProductCodeFilter,
    setProductFilter,
} from '../../../actions/product/ProductsFiltersActions';

class ProductsListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterType: 'and',
            amountOfFilters: 0,
        };

        this.fetchProductsData = this.fetchProductsData.bind(this);
    }

    componentDidMount() {
        this.fetchProductsData();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.params.value !== nextProps.params.value) {
            this.props.clearFilterProducts();

            setTimeout(() => {
                this.fetchProductsData();
            }, 100);
        }
    }

    componentWillUnmount() {
        this.props.clearProducts();
    }

    refreshProductsData = () => {
        this.props.clearProducts();
        this.fetchProductsData();
    };

    fetchProductsData = () => {
        setTimeout(() => {
            const filters = filterHelper(this.props.productsFilters);
            const filterType = this.state.filterType;

            this.props.fetchProducts(filters, filterType);
        }, 100);
    };

    onSubmitFilter() {
        this.props.clearProducts();

        this.fetchProductsData();
    }

    render() {
        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <ProductsListToolbar refreshProductsData={() => this.refreshProductsData()} />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ProductsList products={this.props.products} onSubmitFilter={() => this.onSubmitFilter()} />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFilters: state.products.filters,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchProducts,
            clearProducts,
            setProductCodeFilter,
            setProductFilter,
            setActiveProductFilter,
            clearFilterProducts,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListApp);
