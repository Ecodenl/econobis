import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import OrderDetailsFormGeneral from './general/OrderDetailsFormGeneral';
import moment from "moment/moment";
import PanelDeletedItem from "../../../../components/panel/PanelDeletedItem";
import OrderDetailsFormConclusion from "./conclusion/OrderDetailsFormConclusion";
moment.locale('nl');

class OrderDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        const { deletedAt } = this.props.orderDetails;
        return (
            isEmpty(this.props.orderDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    { deletedAt &&
                    <PanelDeletedItem
                        text={`Deze order is verwijderd op ${moment(deletedAt).format('L')}.`}
                    />
                    }
                    <OrderDetailsFormGeneral />
                    <OrderDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
    };
};

export default connect(mapStateToProps)(OrderDetailsForm);
