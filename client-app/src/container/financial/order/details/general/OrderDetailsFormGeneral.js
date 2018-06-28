import React, { Component} from 'react';
import {connect} from 'react-redux';

import OrderDetailsFormGeneralEdit from './OrderDetailsFormGeneralEdit';
import OrderDetailsFormGeneralView from './OrderDetailsFormGeneralView';
import OrderDetailsAPI from "../../../../../api/order/OrderDetailsAPI";

class OrderDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactPerson: '',
            contactEmail: '',
            showEdit: false,
            activeDiv: '',
        };
    }

    componentWillMount() {
        this.props.orderDetails.contactId &&
        OrderDetailsAPI.fetchContactInfoForOrder(this.props.orderDetails.contactId).then((payload) => {
            this.setState({
                ...this.state,
                contactPerson: payload.data.contactPerson,
                contactEmail: payload.data.email,
            });
        });
    };

    componentWillReceiveProps(nextProps) {

        if (this.props.orderDetails.id !== nextProps.orderDetails.id) {
            nextProps.orderDetails.contactId &&
            OrderDetailsAPI.fetchContactInfoForOrder(nextProps.orderDetails.contactId).then((payload) => {
                this.setState({
                    ...this.state,
                    contactPerson: payload.data.contactPerson,
                    contactEmail: payload.data.email,
                });
            });
        }
    };

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        })
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        if(!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    };

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                {
                    this.state.showEdit && permissions.manageFinancial ?
                        <OrderDetailsFormGeneralEdit
                            switchToView={this.switchToView}
                            contactPerson={this.state.contactPerson}
                            contactEmail={this.state.contactEmail}
                        />
                        :
                        <OrderDetailsFormGeneralView
                            switchToEdit={this.switchToEdit}
                            contactPerson={this.state.contactPerson}
                            contactEmail={this.state.contactEmail}
                        />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        orderDetails: state.orderDetails,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(OrderDetailsFormGeneral);