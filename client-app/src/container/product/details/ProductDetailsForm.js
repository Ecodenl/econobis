import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import ProductDetailsFormGeneral from './general/ProductDetailsFormGeneral';
import PriceHistory from './price-history/PriceHistory';
import moment from "moment/moment";
import PanelDeletedItem from "../../../components/panel/PanelDeletedItem";
import ProductDetailsFormConclusion from "./conclusion/ProductDetailsFormConclusion";
moment.locale('nl');

class ProductDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        const { deletedAt } = this.props.productDetails;
        return (
            isEmpty(this.props.productDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    { deletedAt &&
                    <PanelDeletedItem
                        text={`Dit product is verwijderd op ${moment(deletedAt).format('L')}.`}
                    />
                    }
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
