import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import OrderDetailsFormGeneral from './general/OrderDetailsFormGeneral';
import OrderDetailsUsers from './order-users/OrderDetailsUsers';
import moment from "moment/moment";
import PanelDeletedItem from "../../../components/panel/PanelDeletedItem";
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
                        text={`Deze administratie is verwijderd op ${moment(deletedAt).format('L')}.`}
                    />
                    }
                    <OrderDetailsFormGeneral />
                    <OrderDetailsUsers />
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

const mapDispatchToProps = dispatch => ({
    fetchTeamDetails: (id) => {
        dispatch(fetchTeamDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsForm);
