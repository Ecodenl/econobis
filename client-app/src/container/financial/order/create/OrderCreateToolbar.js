import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../../components/button/ButtonIcon';
import OrderCreateConfirm from './OrderCreateConfirm';
import ButtonText from '../../../../components/button/ButtonText';

// Functionele wrapper voor de class component
const OrderCreateToolbarWrapper = props => {
    const navigate = useNavigate();
    return <OrderCreateToolbar {...props} navigate={navigate} />;
};

class OrderCreateToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreate: false,
        };
    }

    showCreate = () => {
        this.setState({ showCreate: !this.state.showCreate });
    };

    render() {
        const { navigate } = this.props;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                        {this.props.amountOfOrders > 0 && (
                            <ButtonText buttonText={"Maak concept nota's"} onClickAction={this.showCreate} />
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <h4 className="text-center">Concept nota's aanmaken ({this.props.amountOfOrders})</h4>
                </div>
                <div className="col-md-4" />
                {this.state.showCreate && (
                    <OrderCreateConfirm
                        closeModal={this.showCreate}
                        administrationId={this.props.administrationId}
                        amountOfOrders={this.props.amountOfOrders}
                        orderIds={this.props.orderIds}
                    />
                )}
            </div>
        );
    }
}

export default OrderCreateToolbarWrapper;
