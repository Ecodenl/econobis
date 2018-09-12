import React, {Component} from 'react';

import Modal from '../../../components/modal/Modal';
import DataTableCustomFilter from "../../../components/dataTable/DataTableCustomFilter";
import ButtonText from "../../../components/button/ButtonText";
import {connect} from "react-redux";

class ContactsListExtraFilters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterType: props.filterType ? props.filterType : 'and',
            amountOfFilters: props.amountOfFilters !== undefined ? props.amountOfFilters : 1,
            filters: props.extraFilters !== undefined ? props.extraFilters : [{
                field: 'name',
                type: 'eq',
                data: '',
            }],
        };

        this.closeModal = this.closeModal.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
        this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this);
        this.handleFilterTypeChange = this.handleFilterTypeChange.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.addFilterRow = this.addFilterRow.bind(this);
        this.deleteFilterRow = this.deleteFilterRow.bind(this);
    };

    closeModal() {
        this.props.toggleShowExtraFilters();
    };

    confirmAction() {
        this.props.handleExtraFiltersChange(this.state.filters, this.state.amountOfFilters, this.state.filterType);
    };

    handleFilterFieldChange(field, data, filterNumber) {
        let filters = this.state.filters;
        let amountOfFilters = this.state.amountOfFilters;

        if(filters[filterNumber].field === 'product') {
            filters = filters.filter(filter => filter.connectedTo !== filters[filterNumber].connectName);
            delete filters[filterNumber].connectName;
            amountOfFilters = filters.length;
        }

        if(data === 'product') {
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
                }
            );

            filters.splice(filterNumber + 2, 0, {
                    field: 'dateFinish',
                    type: 'eq',
                    data: '',
                    connectedTo: data + filterNumber,
                }
            );

            filters.splice(filterNumber + 3, 0, {
                    field: 'orderStatus',
                    type: 'eq',
                    data: '',
                    connectedTo: data + filterNumber,
                }
            );

            amountOfFilters = filters.length;
        } else {
            filters[filterNumber][field] = data;
        }

        this.setState({
            ...this.state,
            filters,
            amountOfFilters,
        });
    };

    handleFilterTypeChange(type) {
        this.setState({
            ...this.state,
            filterType: type,
        });
    };

    handleFilterValueChange(field, data, filterNumber) {
        let filters = this.state.filters;

        filters[filterNumber][field] = data;

        this.setState({
            ...this.state,
            filters,
        });
    };

    addFilterRow() {
        let filters = this.state.filters;

        filters[this.state.amountOfFilters] =
            {
                field: 'name',
                type: 'eq',
                data: ''
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
    };

    deleteFilterRow(filterNumber) {
        let newFilters = this.state.filters;

        if(newFilters[filterNumber].field === 'product') {
            newFilters = newFilters.filter(filter => filter.connectedTo !== newFilters[filterNumber].connectName);
        }

        newFilters.splice(filterNumber, 1);

        this.setState({
            ...this.state,
            filters: newFilters,
            amountOfFilters: newFilters.length,
        });
    };

    render() {
        console.log(this.state.filters);
        const fields = {
            name: {
                name: 'Naam',
                type: 'string',
            },
            postalCodeNumber: {
                name: 'Postcode nummer',
                type: 'number',
            },
            createdAt: {
                name: 'Gemaakt op',
                type: 'date',
            },
            currentParticipations: {
                name: 'Aantal participaties',
                type: 'number',
            },
            occupation: {
                name: 'Verbinding',
                type: 'dropdownHas',
                dropDownOptions: this.props.occupations,
            },
            opportunity: {
                name: 'Kans',
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
                name: 'Energie leverancier',
                type: 'dropdown',
                dropDownOptions: this.props.energySuppliers,
            },
        };

        // Options only if product is set
        const customProductFields = {
            dateStart: {
                name: 'Begin datum',
                type: 'date'
            },
            dateFinish: {
                name: 'Eind datum',
                type: 'date'
            },
            orderStatus: {
                name: 'Order status',
                type: 'dropdownHas',
                dropDownOptions: this.props.orderStatuses,
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
                        <div className={'col-xs-4'}>
                            <input
                                onChange={() => this.handleFilterTypeChange('and')}
                                type="radio" name='type' value="and" id='and'
                                checked={this.state.filterType === 'and'}/>
                            <label htmlFor='and'>Alle filters zijn "EN"</label>
                        </div>
                        <div className={'col-xs-4'}>
                            <input
                                onChange={() => this.handleFilterTypeChange('or')}
                                type="radio" name='type' value="or" id='or'
                                checked={this.state.filterType === 'or'}/>
                            <label htmlFor='or'>Alle filters zijn "OF"</label>
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
                    {
                        this.state.filters.length === 0 ? (
                            <tr><td colSpan={4}>Geen filters gezet.</td></tr>
                        ) : (
                            this.state.filters.map((filter, i) => {
                                return <DataTableCustomFilter key={i} filter={filter} filterNumber={i} fields={{...fields, ...customProductFields}}
                                                       handleFilterFieldChange={this.handleFilterFieldChange} deleteFilterRow={this.deleteFilterRow}
                                                       handleFilterValueChange={this.handleFilterValueChange} />
                            })
                        )
                    }
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-xs-12 text-right'>
                        <ButtonText buttonText={'Extra filter'} onClickAction={this.addFilterRow}/>
                    </div>
                </div>
            </Modal>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        participantProductionProjectStatus: state.systemData.participantProductionProjectStatus,
        contactStatuses: state.systemData.contactStatuses,
        occupations: state.systemData.occupations,
        measureCategories: state.systemData.measureCategories,
        products: state.systemData.products,
        energySuppliers: state.systemData.energySuppliers,
        orderStatuses: state.systemData.orderStatuses,
    };
};

export default connect(mapStateToProps)(ContactsListExtraFilters);