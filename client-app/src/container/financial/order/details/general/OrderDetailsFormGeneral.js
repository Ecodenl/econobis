import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrderDetailsFormGeneralEdit from './OrderDetailsFormGeneralEdit';
import OrderDetailsFormGeneralView from './OrderDetailsFormGeneralView';
import OrderDetailsAPI from '../../../../../api/order/OrderDetailsAPI';
import { setError } from '../../../../../actions/general/ErrorActions';

class OrderDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactPerson: '',
            contactEmail: '',
            contactCollectMandate: false,
            contactCollectMandateFirstRun: '0000-00-00',
            showEdit: false,
            activeDiv: '',
        };
    }

    componentWillMount() {
        this.props.orderDetails.contactId &&
            OrderDetailsAPI.fetchContactInfoForOrder(this.props.orderDetails.contactId).then(payload => {
                this.setState({
                    ...this.state,
                    contactPerson: payload.data.contactPerson,
                    contactEmail: payload.data.email,
                    contactCollectMandate: payload.data.collectMandate,
                    contactCollectMandateFirstRun: payload.data.collectMandateFirstRun,
                });
            });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.orderDetails.id !== nextProps.orderDetails.id) {
            nextProps.orderDetails.contactId &&
                OrderDetailsAPI.fetchContactInfoForOrder(nextProps.orderDetails.contactId).then(payload => {
                    this.setState({
                        ...this.state,
                        contactPerson: payload.data.contactPerson,
                        contactEmail: payload.data.email,
                        contactCollectMandate: payload.data.collectMandate,
                        contactCollectMandateFirstRun: payload.data.collectMandateFirstRun,
                    });
                });
        }
    }

    switchToEdit = () => {
        if (this.props.orderDetails.canEdit) {
            this.setState({
                showEdit: true,
            });
        } else {
            this.props.setError(
                405,
                'Een order met daar aan gekoppeld een factuur met de status “Te verzenden” kan niet worden aangepast(de order zit in de map “Order – Te verzenden”). Wil je deze order toch aanpassen? Verwijder dan eerst de “Te verzenden” factuur. Dan kom deze order weer in de “Order – te factureren”.  Pas de order aan en maak vervolgens opnieuw de factuur.'
            );
        }
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && this.props.orderDetails.canEdit && permissions.manageFinancial ? (
                    <OrderDetailsFormGeneralEdit
                        switchToView={this.switchToView}
                        contactPerson={this.state.contactPerson}
                        contactEmail={this.state.contactEmail}
                        contactCollectMandate={this.state.contactCollectMandate}
                        contactCollectMandateFirstRun={this.state.contactCollectMandateFirstRun}
                    />
                ) : (
                    <OrderDetailsFormGeneralView
                        switchToEdit={this.switchToEdit}
                        contactPerson={this.state.contactPerson}
                        contactEmail={this.state.contactEmail}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetails,
        meDetails: state.meDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetailsFormGeneral);
