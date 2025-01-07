import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { setError } from '../../../../../actions/general/ErrorActions';
import { fetchContactDetails } from '../../../../../actions/contact/ContactDetailsActions';
import AddressDetailsFormAddressDongleView from './AddressDetailsFormAddressDongleView';
import AddressDetailsFormAddressDongleDelete from './AddressDetailsFormAddressDongleDelete';
import { isEqual } from 'lodash';

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
                endDate: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
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
        this.setState({ showEdit: true });
        this.props.setAddressDongleNewOrEditOpen(false);
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            addressDongle: { ...this.props.addressDongle },
        });
        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    reloadContact = () => {
        this.props.fetchContactDetails(this.props.address.contactId);
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

        let errors = {};

        this.setState({ ...this.state, errors: errors });
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
                {this.props.permissions.deleteContactAddress && this.state.showDelete && (
                    <AddressDetailsFormAddressDongleDelete
                        closeDeleteItemModal={this.toggleDelete}
                        reloadContact={this.reloadContact}
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
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressDongleItem);
