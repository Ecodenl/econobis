import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import ContactEnergySupplierAPI from '../../../../api/contact/ContactEnergySupplierAPI';
import { updateContactEnergySupplier } from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormContactEnergySupplierView from './ContactDetailsFormContactEnergySupplierView';
import ContactDetailsFormContactEnergySupplierEdit from './ContactDetailsFormContactEnergySupplierEdit';
import ContactDetailsFormContactEnergySupplierDelete from './ContactDetailsFormContactEnergySupplierDelete';
import { isEqual } from 'lodash';
import { hashHistory } from 'react-router';

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
            errors: {
                memberSince: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.contactEnergySupplier, nextProps.contactEnergySupplier)) {
            this.setState({
                ...this.state,
                contactEnergySupplier: {
                    ...nextProps.contactEnergySupplier,
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
            contactEnergySupplier: { ...this.props.contactEnergySupplier },
        });

        this.closeEdit();
    };

    //todo: WM even als test. ik denk dat we voor Tussenstijdse opbrengstverdelingen een list moeten maken over deelnames, wellicht in harmonica ??
    // revenueKwhSplit = () => {
    //     console.log('do revenueKwhSplit');
    //
    //     const revenueKwhSplitCategoryId = this.props.projectRevenueCategories.find(
    //         projectRevenueCategory => projectRevenueCategory.codeRef === 'revenueKwhSplit'
    //     ).id;
    //
    //     // const participationId = 348;
    //     // const projectId = 48;
    //     // const hrefNewRevenueKwhSplit = `/project/deelnemer/opbrengst/nieuw/${participationId}/${revenueKwhSplitCategoryId}`;
    //     const revenueId = 121;
    //     const hrefNewRevenueKwhSplit = `/project/deelnemer/opbrengst/${revenueId}`;
    //
    //     hashHistory.push(hrefNewRevenueKwhSplit);
    // };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            contactEnergySupplier: {
                ...this.state.contactEnergySupplier,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            contactEnergySupplier: {
                ...this.state.contactEnergySupplier,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { contactEnergySupplier } = this.state;

        let errors = {};
        let hasErrors = false;

        if (
            contactEnergySupplier.isCurrentSupplier &&
            (!contactEnergySupplier.memberSince || validator.isEmpty(contactEnergySupplier.memberSince))
        ) {
            errors.memberSince = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ContactEnergySupplierAPI.updateContactEnergySupplier(contactEnergySupplier).then(payload => {
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
                {this.state.showEdit &&
                    (this.props.permissions.updatePerson || this.props.permissions.updateOrganisation) && (
                        <ContactDetailsFormContactEnergySupplierEdit
                            contactEnergySupplier={this.state.contactEnergySupplier}
                            errors={this.state.errors}
                            handleInputChange={this.handleInputChange}
                            handleInputChangeDate={this.handleInputChangeDate}
                            handleSubmit={this.handleSubmit}
                            cancelEdit={this.cancelEdit}
                            //todo: WM even als test. ik denk dat we voor Tussenstijdse opbrengstverdelingen een list moeten maken over deelnames, wellicht in harmonica ??
                            // revenueKwhSplit={this.revenueKwhSplit}
                        />
                    )}
                {this.state.showDelete && (
                    <ContactDetailsFormContactEnergySupplierDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.contactEnergySupplier}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        //todo: WM even als test. ik denk dat we voor Tussenstijdse opbrengstverdelingen een list moeten maken over deelnames, wellicht in harmonica ??
        // projectRevenueCategories: state.systemData.projectRevenueCategories,
    };
};

const mapDispatchToProps = dispatch => ({
    updateContactEnergySupplier: contactEnergySupplier => {
        dispatch(updateContactEnergySupplier(contactEnergySupplier));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormContactEnergySupplierItem);
