import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import OrderDeleteItem from './OrderDeleteItem';
import ButtonText from '../../../../components/button/ButtonText';
import { previewCreate } from '../../../../actions/order/OrdersActions';

// Functionele wrapper voor de class component
const OrderToolbarWrapper = props => {
    const navigate = useNavigate();
    return <OrderToolbar {...props} navigate={navigate} />;
};

class OrderToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
            showNewInvoice: false,
        };
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    preview = () => {
        this.props.navigate(`/order/inzien/${this.props.orderDetails.id}`);
    };

    newInvoice = () => {
        this.props.previewCreate([this.props.orderDetails.id]);
        this.props.navigate(`/financieel/${this.props.orderDetails.administrationId}/orders/aanmaken`);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                        {!this.props.orderDetails.canCreateInvoice && (
                            <ButtonIcon iconName={'eye'} onClickAction={this.preview} />
                        )}
                        {this.props.orderDetails.canCreateInvoice &&
                            this.props.orderDetails.orderProducts.length > 0 && (
                                <ButtonText buttonText={'Preview concept nota'} onClickAction={this.newInvoice} />
                            )}
                        {this.props.orderDetails.canCreateInvoice &&
                            this.props.orderDetails.orderProducts.length == 0 && (
                                <ButtonText
                                    buttonText={'Preview concept nota'}
                                    disabled
                                    title={'Deze order heeft nog geen orderregels'}
                                />
                            )}
                        <ButtonIcon iconName={'trash'} onClickAction={this.toggleDelete} />
                    </div>
                </div>
                {!this.props.isLoading && (
                    <div className="col-md-4">
                        <h4 className="text-center">
                            Order: {this.props.orderDetails.subject} / {this.props.orderDetails.number}
                        </h4>
                    </div>
                )}
                <div className="col-md-4" />
                {this.state.showDelete && (
                    <OrderDeleteItem
                        closeDeleteItemModal={this.toggleDelete}
                        subject={this.props.orderDetails.subject}
                        id={this.props.orderDetails.id}
                        administrationId={this.props.administrationId}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetails,
        administrationId: state.orderDetails.administrationId,
        isLoading: state.loadingData.isLoading,
    };
};

const mapDispatchToProps = dispatch => ({
    previewCreate: ids => {
        dispatch(previewCreate(ids));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderToolbarWrapper);
