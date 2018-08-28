import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import ProductDetailsFormGeneral from './general/ProductDetailsFormGeneral';
import PriceHistory from './price-history/PriceHistory';
import moment from "moment/moment";
import ProductDetailsFormConclusion from "./conclusion/ProductDetailsFormConclusion";
moment.locale('nl');

class ProductDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.productDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <ProductDetailsFormGeneral />
                    <PriceHistory />
                    <ProductDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productDetails: state.productDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTeamDetails: (id) => {
        dispatch(fetchTeamDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsForm);
