import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';
import DataTableCustomFilter from '../../../../components/dataTable/DataTableCustomFilter';
import ButtonText from '../../../../components/button/ButtonText';
import { connect } from 'react-redux';
import axios from 'axios/index';
import ProjectsAPI from '../../../../api/project/ProjectsAPI';
import ContactsAPI from '../../../../api/contact/ContactsAPI';

class ParticipantsListExtraFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterType: props.filterType,
            amountOfFilters: props.amountOfFilters,
            filters: props.extraFilters,
            yesNoOptions: [
                {
                    id: 1,
                    name: 'Ja',
                },
                {
                    id: 0,
                    name: 'Nee',
                },
            ],
            projects: [],
            contacts: [],
        };

        this.closeModal = this.closeModal.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
        this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this);
        this.handleFilterTypeChange = this.handleFilterTypeChange.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.addFilterRow = this.addFilterRow.bind(this);
        this.deleteFilterRow = this.deleteFilterRow.bind(this);
    }

    componentDidMount() {
        axios.all([ProjectsAPI.peekProjects(), ContactsAPI.getContactsPeek()]).then(
            axios.spread((projects, contacts) => {
                this.setState({
                    projects,
                    contacts,
                });
            })
        );
    }

    closeModal() {
        this.props.toggleShowExtraFilters();
    }

    confirmAction() {
        this.props.handleExtraFiltersChange(this.state.filters, this.state.amountOfFilters, this.state.filterType);
    }

    handleFilterFieldChange(data, filterNumber) {
        const filters = this.state.filters;

        filters[filterNumber].field = data;
        filters[filterNumber].data = '';

        this.setState({
            ...this.state,
            filters,
        });
    }

    handleFilterTypeChange(type) {
        this.setState({
            ...this.state,
            filterType: type,
        });
    }

    handleFilterValueChange(field, data, filterNumber) {
        const filters = this.state.filters;

        filters[filterNumber][field] = data;

        this.setState({
            ...this.state,
            filters,
        });
    }

    addFilterRow() {
        const filters = this.state.filters;

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
        const newFilters = this.state.filters;
        newFilters.splice(filterNumber, 1);

        this.setState({
            ...this.state,
            filters: newFilters,
            amountOfFilters: newFilters.length,
        });
    }

    render() {
        let fields = {
            name: {
                name: 'Naam',
                type: 'string',
            },
            postalCode: {
                name: 'Postcode',
                type: 'string',
            },
            postalCodeNumber: {
                name: 'Postcode nummer',
                type: 'number',
            },
            contactBirthday: {
                name: 'Contact geboortedatum',
                type: 'date',
            },
            giftedByContactId: {
                name: 'Geschonken door',
                type: 'dropdown',
                dropDownOptions: this.state.contacts,
                optionName: 'fullName',
            },
            didAcceptAgreement: {
                name: 'Akkoord reglement',
                type: 'dropdown',
                dropDownOptions: this.state.yesNoOptions,
            },
            projectId: {
                name: 'Project',
                type: 'dropdownHas',
                dropDownOptions: this.state.projects,
            },
            dateRegister: {
                name: 'Eerste ingangsdatum',
                type: 'date',
            },
            participantMutationTypeId: {
                name: 'Mutatie type (Mutaties)',
                type: 'dropdown',
                dropDownOptions: this.props.participantMutationTypes.filter(
                    participantMutationType => participantMutationType.projectTypeCodeRef === this.props.projectTypeRef
                ),
            },
            participantMutationStatusId: {
                name: 'Deelname status (Mutaties)',
                type: 'dropdown',
                dropDownOptions: this.props.participantMutationStatuses,
            },
            participantMutationDateContractRetour: {
                name: 'Datum contract retour (Mutaties)',
                type: 'date',
            },
            participantMutationDatePayment: {
                name: 'Betaaldatum (Mutaties)',
                type: 'date',
            },
        };

        switch (this.props.projectTypeRef) {
            case 'obligation':
                fields.obligationsDefinitive = {
                    name: 'Huidig aantal obligaties',
                    type: 'number',
                };
                break;
            case 'capital':
                fields.participationsDefinitive = {
                    name: 'Huidig aantal participaties',
                    type: 'number',
                };
                break;
            case 'postalcode_link_capital':
                fields.postalcodeLinkCapitalDefinitive = {
                    name: 'Huidig aantal postcoderoos',
                    type: 'number',
                };
                break;
            case 'loan':
                fields.payoutTypeId = {
                    name: 'Uitkeren op',
                    type: 'dropdown',
                    dropDownOptions: this.props.participantProjectPayoutTypes,
                };
                fields.loanDefinitive = {
                    name: 'Huidig bedrag lening',
                    type: 'number',
                };
                break;
        }

        return (
            <Modal
                title="Extra filters"
                buttonConfirmText="Toepassen"
                confirmAction={this.confirmAction}
                closeModal={this.closeModal}
                buttonCancelText="Sluiten"
                extraButtonLabel="Maak groep"
                extraButtonClass="btn-success"
                extraButtonAction={this.props.saveAsGroup}
            >
                <div className="row filter-row">
                    <h5>
                        <div className="col-xs-6">
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
                        <div className="col-xs-6">
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
                            this.state.filters.map((filter, i) => (
                                <DataTableCustomFilter
                                    key={i}
                                    filter={filter}
                                    filterNumber={i}
                                    fields={fields}
                                    handleFilterFieldChange={this.handleFilterFieldChange}
                                    deleteFilterRow={this.deleteFilterRow}
                                    handleFilterValueChange={this.handleFilterValueChange}
                                />
                            ))
                        )}
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-xs-12 text-right">
                        <ButtonText buttonText="Extra filter" onClickAction={this.addFilterRow} />
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    participantMutationStatuses: state.systemData.participantMutationStatuses,
    contactStatuses: state.systemData.contactStatuses,
    participantMutationTypes: state.systemData.participantMutationTypes,
    participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    projectTypeRef: state.projectDetails.projectType.codeRef,
});

export default connect(mapStateToProps)(ParticipantsListExtraFilters);
