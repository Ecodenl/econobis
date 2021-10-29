import React, { Component } from 'react';

import Modal from '../../../components/modal/Modal';
import DataTableCustomFilter from '../../../components/dataTable/DataTableCustomFilter';
import ButtonText from '../../../components/button/ButtonText';
import { connect } from 'react-redux';

class ContactsListExtraFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterType: props.filterType,
            contactType: props.contactType,
            amountOfFilters: props.amountOfFilters,
            filters: props.extraFilters,
            yesNoOptions: [
                {
                    id: 0,
                    name: 'Nee',
                },
                {
                    id: 1,
                    name: 'Ja',
                },
            ],
        };

        this.closeModal = this.closeModal.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
        this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this);
        this.handleFilterTypeChange = this.handleFilterTypeChange.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.addFilterRow = this.addFilterRow.bind(this);
        this.deleteFilterRow = this.deleteFilterRow.bind(this);
    }

    closeModal() {
        this.props.toggleShowExtraFilters();
    }

    confirmAction() {
        this.props.handleExtraFiltersChange(this.state.filters, this.state.amountOfFilters, this.state.filterType);
    }

    handleFilterFieldChange(data, filterNumber) {
        let filters = this.state.filters;
        let amountOfFilters = this.state.amountOfFilters;

        if (filters[filterNumber].field === 'product' || filters[filterNumber].field === 'opportunityMeasureCategory') {
            filters = filters.filter(filter => filter.connectedTo !== filters[filterNumber].connectName);
            delete filters[filterNumber].connectName;
            amountOfFilters = filters.length;
        }

        if (data === 'product') {
            filters[filterNumber] = {
                field: 'product',
                type: 'eq',
                data: '',
                connectName: data + filterNumber,
            };

            filters.splice(filterNumber + 1, 0, {
                field: 'dateStart',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            filters.splice(filterNumber + 2, 0, {
                field: 'dateFinish',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            filters.splice(filterNumber + 3, 0, {
                field: 'orderStatus',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            amountOfFilters = filters.length;
        } else if (data === 'opportunityMeasureCategory') {
            filters[filterNumber] = {
                field: 'opportunityMeasureCategory',
                type: 'eq',
                data: '',
                connectName: data + filterNumber,
            };

            filters.splice(filterNumber + 1, 0, {
                field: 'opportunityStatus',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            filters.splice(filterNumber + 2, 0, {
                field: 'opportunityMeasure',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            filters.splice(filterNumber + 3, 0, {
                field: 'opportunityEvaluationRealised',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            amountOfFilters = filters.length;
        } else {
            filters[filterNumber].field = data;
            filters[filterNumber].data = '';
        }

        this.setState({
            ...this.state,
            filters,
            amountOfFilters,
        });
    }

    handleFilterTypeChange(type) {
        this.setState({
            ...this.state,
            filterType: type,
        });
    }

    handleFilterValueChange(field, data, filterNumber) {
        let filters = this.state.filters;

        filters[filterNumber][field] = data;

        this.setState({
            ...this.state,
            filters,
        });
    }

    addFilterRow() {
        let filters = this.state.filters;

        filters[this.state.amountOfFilters] = {
            field: 'name',
            type: 'eq',
            data: '',
        };

        setTimeout(() => {
            this.setState({
                ...this.state,
                filters,
            });
        }, 300);

        setTimeout(() => {
            this.setState({
                amountOfFilters: this.state.amountOfFilters + 1,
            });
        }, 300);
    }

    deleteFilterRow(filterNumber) {
        let newFilters = this.state.filters;

        if (
            newFilters[filterNumber].field === 'product' ||
            newFilters[filterNumber].field === 'opportunityMeasureCategory'
        ) {
            newFilters = newFilters.filter(filter => filter.connectedTo !== newFilters[filterNumber].connectName);
        }

        newFilters.splice(filterNumber, 1);

        this.setState({
            ...this.state,
            filters: newFilters,
            amountOfFilters: newFilters.length,
        });
    }

    render() {
        const fields = {
            name: {
                name: 'Naam',
                type: 'stringWithoutNull',
            },
            postalCode: {
                name: 'Postcode',
                type: 'numberOrString',
            },
            country: {
                name: 'Land',
                type: 'dropdown',
                dropDownOptions: this.props.countries,
            },
            createdAt: {
                name: 'Gemaakt op',
                type: 'date',
            },
            currentObligations: {
                name: 'Huidig aantal obligaties',
                type: 'number',
            },
            currentParticipations: {
                name: 'Huidig aantal participaties',
                type: 'number',
            },
            currentPostalcodeLinkCapital: {
                name: 'Huidig aantal postcoderoos',
                type: 'number',
            },
            currentLoan: {
                name: 'Huidig bedrag lening',
                type: 'number',
            },
            staticContactGroup: {
                name: 'Statische groep',
                type: 'dropdownHas',
                dropDownOptions: this.props.staticContactGroups,
            },
            occupation: {
                name: 'Verbinding',
                type: 'dropdownRelations',
                dropDownOptions: this.props.primaryOccupations,
            },
            occupationPrimary: {
                name: 'Primaire verbinding',
                type: 'dropdownRelations',
                dropDownOptions: this.props.primaryOccupations,
            },
            campaign: {
                name: 'Campagne',
                type: 'dropdownHas',
                dropDownOptions: this.props.campaigns,
            },
            opportunityMeasureCategory: {
                name: 'Kans maatregel categorie',
                type: 'dropdownHas',
                dropDownOptions: this.props.measureCategories,
            },
            product: {
                name: 'Product',
                type: 'dropdownHas',
                dropDownOptions: this.props.products,
            },
            dateOfBirth: {
                name: 'Geboortedatum',
                type: 'date',
            },
            energySupplier: {
                name: 'Primaire Energie leverancier',
                type: 'dropdown',
                dropDownOptions: this.props.energySuppliers,
            },
            didAgreeAvg: {
                name: 'Akkoord privacybeleid',
                type: 'boolean',
                dropDownOptions: this.state.yesNoOptions,
            },
            portalUser: {
                name: 'Portal gebruiker actief',
                type: 'boolean',
                dropDownOptions: this.state.yesNoOptions,
            },
        };

        // Options only if product is set
        const customProductFields = {
            dateStart: {
                name: 'Begin datum',
                type: 'date',
            },
            dateFinish: {
                name: 'Eind datum',
                type: 'date',
            },
            orderStatus: {
                name: 'Order status',
                type: 'dropdownHas',
                dropDownOptions: this.props.orderStatuses,
            },
        };

        // Options only if kans is set
        const customOpportunityFields = {
            opportunityStatus: {
                name: 'Kans status',
                type: 'dropdownHas',
                dropDownOptions: this.props.opportunityStatus,
            },
            opportunityMeasure: {
                name: 'Kans maatregel specifiek',
                type: 'dropdownHas',
                dropDownOptions: this.props.measures,
            },
            opportunityEvaluationRealised: {
                name: 'Kans status evaluatie uitgevoerd',
                type: 'dropdownHas',
                dropDownOptions: this.props.opportunityEvaluationStatuses,
            },
        };

        return (
            <Modal
                title="Extra filters"
                buttonConfirmText="Toepassen"
                confirmAction={this.confirmAction}
                closeModal={this.closeModal}
                buttonCancelText={'Sluiten'}
                extraButtonLabel={'Maak groep'}
                extraButtonClass={'btn-success'}
                extraButtonAction={this.props.saveAsGroup}
            >
                <div className={'row filter-row'}>
                    <h5>
                        <div className={'col-xs-6'}>
                            <input
                                onChange={() => this.handleFilterTypeChange('and')}
                                type="radio"
                                name="type"
                                value="and"
                                id="and"
                                checked={this.state.filterType === 'and'}
                            />
                            <label htmlFor="and">Alle extra filters zijn "EN"</label>
                        </div>
                        <div className={'col-xs-6'}>
                            <input
                                onChange={() => this.handleFilterTypeChange('or')}
                                type="radio"
                                name="type"
                                value="or"
                                id="or"
                                checked={this.state.filterType === 'or'}
                            />
                            <label htmlFor="or">Alle extra filters zijn "OF"</label>
                        </div>
                    </h5>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-md-4">Zoekveld</th>
                            <th className="col-md-3" />
                            <th className="col-md-4">Waarde</th>
                            <th className="col-md-1" />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filters.length === 0 ? (
                            <tr>
                                <td colSpan={4}>Geen filters gezet.</td>
                            </tr>
                        ) : (
                            this.state.filters.map((filter, i) => {
                                return (
                                    <DataTableCustomFilter
                                        key={i}
                                        filter={filter}
                                        filterNumber={i}
                                        fields={{ ...fields, ...customProductFields, ...customOpportunityFields }}
                                        handleFilterFieldChange={this.handleFilterFieldChange}
                                        deleteFilterRow={this.deleteFilterRow}
                                        handleFilterValueChange={this.handleFilterValueChange}
                                        contactType={this.state.contactType}
                                    />
                                );
                            })
                        )}
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-xs-12 text-right">
                        <ButtonText buttonText={'Extra filter'} onClickAction={this.addFilterRow} />
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactStatuses: state.systemData.contactStatuses,
        staticContactGroups: state.systemData.staticContactGroups,
        primaryOccupations: state.systemData.primaryOccupations,
        measureCategories: state.systemData.measureCategories,
        measures: state.systemData.measures,
        opportunityStatus: state.systemData.opportunityStatus,
        opportunityEvaluationStatuses: state.systemData.opportunityEvaluationStatuses,
        campaigns: state.systemData.campaigns,
        products: state.systemData.products,
        energySuppliers: state.systemData.energySuppliers,
        countries: state.systemData.countries,
        orderStatuses: state.systemData.orderStatuses,
    };
};

export default connect(mapStateToProps)(ContactsListExtraFilters);
