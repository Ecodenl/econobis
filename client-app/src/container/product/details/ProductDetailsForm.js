import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import ProductDetailsFormGeneral from './general/ProductDetailsFormGeneral';
import PriceHistory from './price-history/PriceHistory';
import moment from 'moment/moment';
import ProductDetailsFormConclusion from './conclusion/ProductDetailsFormConclusion';
moment.locale('nl');

class ProductDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van product.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.productDetails)) {
            loadingText = 'Geen product gevonden!';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <ProductDetailsFormGeneral />
                <PriceHistory />
                <ProductDetailsFormConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        productDetails: state.productDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTeamDetails: id => {
        dispatch(fetchTeamDetails(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsForm);
