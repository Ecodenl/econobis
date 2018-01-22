import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import AddressAPI from '../../../../api/contact/AddressAPI';
import { updateAddress } from '../../../../actions/contact/ContactDetailsActions';
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
            address: {
                ...props.address,
            },
            errors: {
                typeId: false,
                postalCode: false,
                number: false,
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

    openEdit = () => {
        this.setState({showEdit: true});
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            address: {...this.props.address},
        });

        this.closeEdit();
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

        let errors = {};
        let hasErrors = false;

        if(!validator.isPostalCode(address.postalCode, 'NL')){
            errors.postalCode = true;
            hasErrors = true;
        };

        if(validator.isEmpty(address.number)){
            errors.number = true;
            hasErrors = true;
        };

        if(validator.isEmpty(address.typeId)){
            errors.typeId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            AddressAPI.updateAddress(address).then((payload) => {
                this.props.updateAddress(payload);
                this.closeEdit();
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
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    address={this.state.address}
                />
                {
                    this.state.showEdit &&
                    <ContactDetailsFormAddressEdit
                        address={this.state.address}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        typeIdError={this.state.errors.typeId}
                        postalCodeError={this.state.errors.postalCode}
                        numberError={this.state.errors.number}
                        cancelEdit={this.cancelEdit}
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

const mapDispatchToProps = dispatch => ({
    updateAddress: (id) => {
        dispatch(updateAddress(id));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailFormAddressItem);
