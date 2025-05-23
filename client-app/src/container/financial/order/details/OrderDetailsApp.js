import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrderDetails } from '../../../../actions/order/OrderDetailsActions';
import OrderDetailsToolbar from './OrderDetailsToolbar';
import OrderDetailsForm from './OrderDetailsForm';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import OrderDetailsHarmonica from './OrderDetailsHarmonica';
import { useParams } from 'react-router-dom';

// Functionele wrapper voor de class component
const OrderDetailsAppWrapper = props => {
    const params = useParams();
    return <OrderDetailsApp {...props} params={params} />;
};

class OrderDetailsApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchOrderDetails(this.props.params.id);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12 margin-10-top">
                        <Panel>
                            <PanelBody className={'panel-small'}>
                                <OrderDetailsToolbar />
                            </PanelBody>
                        </Panel>
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <OrderDetailsForm />
                    </div>
                </div>
                <Panel className="col-md-3 harmonica">
                    <PanelBody>
                        <OrderDetailsHarmonica />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchOrderDetails: id => {
        dispatch(fetchOrderDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsAppWrapper);
