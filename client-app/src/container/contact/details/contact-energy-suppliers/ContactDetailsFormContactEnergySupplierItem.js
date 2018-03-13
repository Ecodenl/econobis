import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import ContactEnergySupplierAPI from '../../../../api/contact/ContactEnergySupplierAPI';
import {updateContactEnergySupplier} from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormContactEnergySupplierView from './ContactDetailsFormContactEnergySupplierView';
import ContactDetailsFormContactEnergySupplierEdit from './ContactDetailsFormContactEnergySupplierEdit';
import ContactDetailsFormContactEnergySupplierDelete from './ContactDetailsFormContactEnergySupplierDelete';
import {isEqual} from "lodash";

class ContactDetailsFormContactEnergySupplierItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            contactEnergySupplier: {
                ...props.contactEnergySupplier,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if(!isEqual(this.state.contactEnergySupplier, nextProps.contactEnergySupplier)){
            this.setState({
                ...this.state,
                contactEnergySupplier: {
                    ...nextProps.contactEnergySupplier,
                },
            });
        }
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
            contactEnergySupplier: {...this.props.contactEnergySupplier},
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
            contactEnergySupplier: {
                ...this.state.contactEnergySupplier,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            contactEnergySupplier: {
                ...this.state.contactEnergySupplier,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {contactEnergySupplier} = this.state;

        ContactEnergySupplierAPI.updateContactEnergySupplier(contactEnergySupplier).then((payload) => {
            this.props.updateContactEnergySupplier(payload);
            this.closeEdit();
        });
    };

    render() {
        return (
            <div>
                <ContactDetailsFormContactEnergySupplierView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    contactEnergySupplier={this.state.contactEnergySupplier}
                />
                {
                    this.state.showEdit && (this.props.permissions.updatePerson || this.props.permissions.updateOrganisation) &&
                    <ContactDetailsFormContactEnergySupplierEdit
                        contactEnergySupplier={this.state.contactEnergySupplier}
                        handleInputChange={this.handleInputChange}
                        handleInputChangeDate={this.handleInputChangeDate}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                    />
                }
                {
                    this.state.showDelete &&
                    <ContactDetailsFormContactEnergySupplierDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.contactEnergySupplier}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

const mapDispatchToProps = dispatch => ({
    updateContactEnergySupplier: (contactEnergySupplier) => {
        dispatch(updateContactEnergySupplier(contactEnergySupplier));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormContactEnergySupplierItem);
