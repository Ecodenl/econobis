import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { setError } from '../../../../../actions/general/ErrorActions';
import { fetchContactDetails, updateStateAddressDongle } from '../../../../../actions/contact/ContactDetailsActions';
import AddressDetailsFormAddressDongleView from './AddressDetailsFormAddressDongleView';
import AddressDetailsFormAddressDongleDelete from './AddressDetailsFormAddressDongleDelete';
import { isEqual } from 'lodash';
import AddressDetailsFormAddressDongleEdit from './AddressDetailsFormAddressDongleEdit';
import AddressDongleAPI from '../../../../../api/contact/AddressDongleAPI';

class AddressDetailsFormAddressDongleItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,

            addressDongle: {
                ...props.addressDongle,
            },
            address: { ...props.address },
            errors: {
                typeReadOutId: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.addressDongle, nextProps.addressDongle)) {
            this.setState({
                ...this.state,
                addressDongle: {
                    ...nextProps.addressDongle,
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
        this.props.setAddressDongleNewOrEditOpen(true);
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
        this.props.setAddressDongleNewOrEditOpen(false);
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            addressDongle: { ...this.props.addressDongle },
        });
        this.setState({ showEdit: false });
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
            addressDongle: {
                ...this.state.addressDongle,
                [name]: value,
            },
        });
    };

    handleInputChangeReadOutId = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            addressDongle: {
                ...this.state.addressDongle,
                [name]: value,
                typeDongleId: '',
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            addressDongle: {
                ...this.state.addressDongle,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { addressDongle } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(addressDongle.typeReadOutId + '')) {
            errors.typeReadOutId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            this.doUpdateAddressDongle(addressDongle);
        }
    };

    doUpdateAddressDongle = addressDongle => {
        AddressDongleAPI.updateAddressDongle(addressDongle)
            .then(payload => {
                this.props.updateStateAddressDongle(payload.data.addressDongle);
                this.closeEdit();
            })
            .catch(error => {
                if (error.response) {
                    this.props.setError(error.response.status, error.response.data.message);
                } else {
                    console.log(error);
                }
            });
    };

    render() {
        return (
            <div>
                <AddressDetailsFormAddressDongleView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    addressDongle={this.state.addressDongle}
                    addressDongleNewOrEditOpen={this.props.addressDongleNewOrEditOpen}
                />
                {this.props.permissions.manageDongles && this.state.showEdit && (
                    <AddressDetailsFormAddressDongleEdit
                        addressDongle={this.state.addressDongle}
                        errors={this.state.errors}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleInputChangeReadOutId={this.handleInputChangeReadOutId}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                    />
                )}
                {this.props.permissions.manageDongles && this.state.showDelete && (
                    <AddressDetailsFormAddressDongleDelete
                        closeDeleteItemModal={this.toggleDelete}
                        address={this.state.address}
                        {...this.state.addressDongle}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => ({
    updateStateAddressDongle: addressDongle => {
        dispatch(updateStateAddressDongle(addressDongle));
    },
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressDongleItem);
