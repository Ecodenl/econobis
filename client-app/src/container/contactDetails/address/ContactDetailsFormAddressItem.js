import React, {Component} from 'react';
import { connect } from 'react-redux';

import AddressAPI from '../../../api/AddressAPI';
import * as contactDetailsActions from '../../../actions/ContactDetailsActions';
import ContactDetailsFormAddressView from './ContactDetailsFormAddressView';
import ContactDetailsFormAddressEdit from './ContactDetailsFormAddressEdit';
import ContactDetailsFormAddressDelete from './ContactDetailsFormAddressDelete';

class ContactDetailFormAddressItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            errorNumber: false,
            errorType: false,
            address: {
                ...props.address,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    toggleEdit = () => {
        this.setState({showEdit: !this.state.showEdit});
    };

    closeEdit = () => {
        this.setState({
            ...this.state,
            address: {...this.props.address}
        });

        this.toggleEdit();
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { address } = this.state;

        AddressAPI.updateAddress(address).then((payload) => {
            if(payload.status === 422) {
                payload.data.errors.type ? this.setState({errorType: true}) : this.setState({errorType: false});
            }else{
                this.props.dispatch(contactDetailsActions.updateAddress(payload));
                this.toggleEdit();
            }
        });
    };

    render() {
        return (
            <div>
                <ContactDetailsFormAddressView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleEdit={this.toggleEdit}
                    toggleDelete={this.toggleDelete}
                    address={this.state.address}
                />
                {
                    this.state.showEdit &&
                    <ContactDetailsFormAddressEdit
                        address={this.state.address}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        errorType={this.state.errorType}
                        closeEdit={this.closeEdit}
                    />
                }
                {
                    this.state.showDelete &&
                    <ContactDetailsFormAddressDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.address}
                    />
                }
            </div>
        );
    }
};

export default connect()(ContactDetailFormAddressItem);
