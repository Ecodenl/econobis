import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { isEqual } from 'lodash';

import PhoneNumberApi from '../../../../api/contact/PhoneNumberAPI';
import {
    unsetPrimaryAddresses,
    unsetPrimaryPhoneNumbers,
    updatePhoneNumber,
} from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormPhoneView from './ContactDetailsFormPhoneView';
import ContactDetailsFormPhoneEdit from './ContactDetailsFormPhoneEdit';
import ContactDetailsFormPhoneDelete from './ContactDetailsFormPhoneDelete';
import ContactDetailsFormEmailDelete from '../email/ContactDetailsFormEmailItem';

class ContactDetailsFormPhoneItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            typeIdError: false,
            numberError: false,
            phoneNumber: {
                ...props.phoneNumber,
            },
            errors: {
                typeId: false,
                number: false,
            },
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.phoneNumber, nextProps.phoneNumber)) {
            this.setState({
                ...this.state,
                phoneNumber: {
                    ...nextProps.phoneNumber,
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
            phoneNumber: { ...this.props.phoneNumber },
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
            phoneNumber: {
                ...this.state.phoneNumber,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { phoneNumber } = this.state;
        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(phoneNumber.number)) {
            errors.number = true;
            hasErrors = true;
        }

        if (validator.isEmpty(phoneNumber.typeId)) {
            errors.typeId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PhoneNumberApi.updatePhoneNumber(phoneNumber).then(payload => {
                if (phoneNumber.primary) {
                    this.props.unsetPrimaryPhoneNumbers();
                }
                this.props.updatePhoneNumber(payload);
                this.closeEdit();
            });
    };

    render() {
        return (
            <div>
                <ContactDetailsFormPhoneView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    phoneNumber={this.state.phoneNumber}
                />
                {this.props.permissions.updateContactPhone && this.state.showEdit && (
                    <ContactDetailsFormPhoneEdit
                        phoneNumber={this.state.phoneNumber}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleSubmit}
                        typeIdError={this.state.errors.typeId}
                        numberError={this.state.errors.number}
                        cancelEdit={this.cancelEdit}
                    />
                )}
                {this.props.permissions.deleteContactPhone && this.state.showDelete && (
                    <ContactDetailsFormPhoneDelete
                        closeDeleteItemModal={this.toggleDelete}
                        numberOfPhoneNumbers={this.props.numberOfPhoneNumbers}
                        {...this.props.phoneNumber}
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
    updatePhoneNumber: id => {
        dispatch(updatePhoneNumber(id));
    },
    unsetPrimaryPhoneNumbers: () => {
        dispatch(unsetPrimaryPhoneNumbers());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormPhoneItem);
