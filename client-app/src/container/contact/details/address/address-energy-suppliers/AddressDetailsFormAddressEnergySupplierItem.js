import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import AddressEnergySupplierAPI from '../../../../../api/contact/AddressEnergySupplierAPI';
import { updateAddressEnergySupplier } from '../../../../../actions/contact/ContactDetailsActions';
import AddressDetailsFormAddressEnergySupplierView from './AddressDetailsFormAddressEnergySupplierView';
import AddressDetailsFormAddressEnergySupplierEdit from './AddressDetailsFormAddressEnergySupplierEdit';
import AddressDetailsFormAddressEnergySupplierDelete from './AddressDetailsFormAddressEnergySupplierDelete';
import { isEqual } from 'lodash';
import { hashHistory } from 'react-router';

class AddressDetailsFormAddressEnergySupplierItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            addressEnergySupplier: {
                ...props.addressEnergySupplier,
            },
            address: { ...props.address },
            errors: {
                memberSince: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.addressEnergySupplier, nextProps.addressEnergySupplier)) {
            this.setState({
                ...this.state,
                addressEnergySupplier: {
                    ...nextProps.addressEnergySupplier,
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
            addressEnergySupplier: { ...this.props.addressEnergySupplier },
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
            addressEnergySupplier: {
                ...this.state.addressEnergySupplier,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            addressEnergySupplier: {
                ...this.state.addressEnergySupplier,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { addressEnergySupplier } = this.state;

        let errors = {};
        let hasErrors = false;

        if (
            addressEnergySupplier.isCurrentSupplier &&
            (!addressEnergySupplier.memberSince || validator.isEmpty(addressEnergySupplier.memberSince))
        ) {
            errors.memberSince = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            AddressEnergySupplierAPI.updateAddressEnergySupplier(addressEnergySupplier).then(payload => {
                this.props.updateAddressEnergySupplier(payload);
                this.closeEdit();
            });
    };

    render() {
        return (
            <div>
                <AddressDetailsFormAddressEnergySupplierView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    addressEnergySupplier={this.state.addressEnergySupplier}
                />
                {this.state.showEdit &&
                    (this.props.permissions.updatePerson || this.props.permissions.updateOrganisation) && (
                        <AddressDetailsFormAddressEnergySupplierEdit
                            addressEnergySupplier={this.state.addressEnergySupplier}
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
                    <AddressDetailsFormAddressEnergySupplierDelete
                        closeDeleteItemModal={this.toggleDelete}
                        address={this.state.address}
                        {...this.state.addressEnergySupplier}
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
    updateAddressEnergySupplier: addressEnergySupplier => {
        dispatch(updateAddressEnergySupplier(addressEnergySupplier));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierItem);
