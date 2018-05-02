import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from "moment/moment";

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

                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        // productDetails: state.productDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    // fetchTeamDetails: (id) => {
    //     dispatch(fetchTeamDetails(id));
    // },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsForm);
