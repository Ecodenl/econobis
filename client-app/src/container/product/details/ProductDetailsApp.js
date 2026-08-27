import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProductDetails } from '../../../actions/product/ProductDetailsActions';
import ProductDetailsToolbar from './ProductDetailsToolbar';
import ProductDetailsForm from './ProductDetailsForm';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const ProductDetailsAppWrapper = props => {
    const params = useParams();
    return <ProductDetailsApp {...props} params={params} />;
};

class ProductDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProductDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <ProductDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ProductDetailsForm />
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productDetails: state.productDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProductDetails: id => {
        dispatch(fetchProductDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsAppWrapper);
