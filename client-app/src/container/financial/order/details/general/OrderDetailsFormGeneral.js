import React, { Component} from 'react';
import {connect} from 'react-redux';

import OrderDetailsFormGeneralEdit from './OrderDetailsFormGeneralEdit';
import OrderDetailsFormGeneralView from './OrderDetailsFormGeneralView';

class OrderDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

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
                        <OrderDetailsFormGeneralEdit switchToView={this.switchToView} />
                        :
                        <OrderDetailsFormGeneralView switchToEdit={this.switchToEdit}/>
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