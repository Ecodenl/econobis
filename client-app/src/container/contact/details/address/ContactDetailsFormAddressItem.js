import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { setError } from '../../../../actions/general/ErrorActions';
import AddressAPI from '../../../../api/contact/AddressAPI';
import { unsetPrimaryAddresses, updateAddress } from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormAddressView from './ContactDetailsFormAddressView';
import ContactDetailsFormAddressEdit from './ContactDetailsFormAddressEdit';
import ContactDetailsFormAddressDelete from './ContactDetailsFormAddressDelete';
import { isEqual } from 'lodash';

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
                countryId: false,
                endDate: false,
            },
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.address, nextProps.address)) {
            this.setState({
                ...this.state,
                address: {
                    ...nextProps.address,
                },
            });
        }
    }

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
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            address: { ...this.props.address },
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { address } = this.state;

        // Postalcode always to uppercase
        if (address.postalCode) {
            address.postalCode = address.postalCode.toUpperCase();
        }

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(address.postalCode + '')) {
            errors.postalCode = true;
            hasErrors = true;
        }

        let countryId = address.countryId;
        if (validator.isEmpty(address.countryId + '')) {
            countryId = 'NL';
        }

        let postalCodeValid = true;
        if (!validator.isEmpty(address.postalCode + '')) {
            if (countryId == 'NL') {
                postalCodeValid = validator.isPostalCode(address.postalCode, 'NL');
            } else {
                postalCodeValid = validator.isPostalCode(address.postalCode, 'any');
            }
            if (!postalCodeValid) {
                errors.postalCode = true;
                errors.countryId = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty(address.number + '')) {
            errors.number = true;
            hasErrors = true;
        }

        if (validator.isEmpty(address.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }

        if (address.typeId === 'old' && (address.endDate === null || validator.isEmpty(address.endDate))) {
            errors.endDate = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });
        // If no errors send form
        !hasErrors &&
            AddressAPI.updateAddress(address)
                .then(payload => {
                    if (address.primary) {
                        this.props.unsetPrimaryAddresses();
                    }
                    this.props.updateAddress(payload.data.data);
                    this.closeEdit();
                })
                .catch(error => {
                    this.props.setError(error.response.status, error.response.data.message);
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
                {this.state.showEdit && (
                    <ContactDetailsFormAddressEdit
                        address={this.state.address}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        typeIdError={this.state.errors.typeId}
                        endDateError={this.state.errors.endDate}
                        postalCodeError={this.state.errors.postalCode}
                        numberError={this.state.errors.number}
                        countryIdError={this.state.errors.countryId}
                        cancelEdit={this.cancelEdit}
                    />
                )}
                {this.state.showDelete && (
                    <ContactDetailsFormAddressDelete
                        closeDeleteItemModal={this.toggleDelete}
                        numberOfAddresses={this.props.numberOfAddresses}
                        {...this.props.address}
                    />
                )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateAddress: id => {
        dispatch(updateAddress(id));
    },
    unsetPrimaryAddresses: () => {
        dispatch(unsetPrimaryAddresses());
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(null, mapDispatchToProps)(ContactDetailFormAddressItem);
