import React, { Component } from 'react';

import Modal from '../../../components/modal/Modal';
import DataTableCustomFilter from '../../../components/dataTable/DataTableCustomFilter';
import ButtonText from '../../../components/button/ButtonText';
import { connect } from 'react-redux';
import FreeFieldsAPI from '../../../api/free-fields/FreeFieldsAPI';

class ContactsListExtraFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterType: props.filterType,
            contactType: props.contactType,
            amountOfFilters: props.amountOfFilters,
            filters: props.extraFilters,
            freeFieldsFields: null,
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

        this.fetchFilterFreeFieldsFieldsContact();

        this.closeModal = this.closeModal.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
        this.handleFilterFieldChange = this.handleFilterFieldChange.bind(this);
        this.handleFilterTypeChange = this.handleFilterTypeChange.bind(this);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.addFilterRow = this.addFilterRow.bind(this);
        this.deleteFilterRow = this.deleteFilterRow.bind(this);
    }

    fetchFilterFreeFieldsFieldsContact() {
        FreeFieldsAPI.fetchFilterFreeFieldsFieldsContact().then(payload => {
            this.setState({
                ...this.state,
                freeFieldsFields: payload.data.data,
            });
        });
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

        if (
            filters[filterNumber].field === 'product' ||
            filters[filterNumber].field === 'opportunityMeasureCategory' ||
            filters[filterNumber].field === 'intakeMeasureCategory' ||
            filters[filterNumber].field === 'housingFileFieldName' ||
            filters[filterNumber].field === 'freeFieldsFieldName'
        ) {
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

            filters.splice(filterNumber + 4, 0, {
                field: 'opportunityCampaign',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            amountOfFilters = filters.length;
        } else if (data === 'intakeMeasureCategory') {
            filters[filterNumber] = {
                field: 'intakeMeasureCategory',
                type: 'eq',
                data: '',
                connectName: data + filterNumber,
            };

            filters.splice(filterNumber + 1, 0, {
                field: 'intakeDateStart',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            filters.splice(filterNumber + 2, 0, {
                field: 'intakeDateFinish',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            filters.splice(filterNumber + 3, 0, {
                field: 'intakeStatus',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
            });

            amountOfFilters = filters.length;
        } else if (data === 'housingFileFieldName') {
            filters[filterNumber] = {
                field: 'housingFileFieldName',
                type: 'eq',
                data: '',
                connectName: data + filterNumber,
            };

            filters.splice(filterNumber + 1, 0, {
                field: 'housingFileFieldValue',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
                housingFileField: '',
            });

            amountOfFilters = filters.length;
        } else if (data === 'freeFieldsFieldName') {
            filters[filterNumber] = {
                field: 'freeFieldsFieldName',
                type: 'eq',
                data: '',
                connectName: data + filterNumber,
            };

            filters.splice(filterNumber + 1, 0, {
                field: 'freeFieldsFieldValue',
                type: 'eq',
                data: '',
                connectedTo: data + filterNumber,
                freeFieldFormatType: '',
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

        if (filters[filterNumber].field === 'housingFileFieldName') {
            if (filters[filterNumber].data) {
                let housingFileHoomLink = this.props.housingFileHoomLinks.find(
                    housingFileHoomLink => housingFileHoomLink.key === Number(filters[filterNumber].data)
                );
                if (housingFileHoomLink) {
                    let filterConnectName = filters[filterNumber].connectName;
                    filters.map(filter => {
                        if (filter.connectedTo === filterConnectName) {
                            filter.data = '';
                            filter.type = 'eq';
                            filter.housingFileField = housingFileHoomLink.externalHoomShortName;
                        }
                        return filter;
                    });
                }
            }
        }
        if (filters[filterNumber].field === 'freeFieldsFieldName') {
            if (filters[filterNumber].data) {
                let freeFieldsField = this.state.freeFieldsFields.find(
                    freeFieldsField => freeFieldsField.id === Number(filters[filterNumber].data)
                );
                if (freeFieldsField) {
                    let filterConnectName = filters[filterNumber].connectName;
                    filters.map(filter => {
                        if (filter.connectedTo === filterConnectName) {
                            filter.data = '';
                            filter.type = 'eq';
                            filter.freeFieldFormatType = freeFieldsField.formatType;
                        }
                        return filter;
                    });
                }
            }
        }

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
            newFilters[filterNumber].field === 'opportunityMeasureCategory' ||
            newFilters[filterNumber].field === 'intakeMeasureCategory' ||
            newFilters[filterNumber].field === 'housingFileFieldName' ||
            newFilters[filterNumber].field === 'freeFieldsFieldName'
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
            quotationRequestStatusOrganisationOrCoach: {
                name: 'Kansactie status (org/coach)',
                type: 'dropdownHas',
                dropDownOptions: this.props.quotationRequestStatus,
            },
            quotationRequestStatusOccupant: {
                name: 'Kansactie status (bewoner)',
                type: 'dropdownHas',
                dropDownOptions: this.props.quotationRequestStatus,
            },
            intakeMeasureCategory: {
                name: 'Intake interesse',
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
                name: 'Huidige Energie leverancier',
                type: 'dropdown',
                dropDownOptions: this.props.energySuppliers,
            },
            energySupplierType: {
                name: 'Type huidige energie leverancier',
                type: 'dropdownHas',
                dropDownOptions: this.props.energySupplierTypes,
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
            housingFileExists: {
                name: 'Woningdossier aanwezig',
                type: 'boolean',
                dropDownOptions: this.state.yesNoOptions,
            },
            housingFileFieldName: {
                name: 'Woningdossier kenmerk',
                type: 'dropdownHousingFileFields',
                dropDownOptions: this.props.housingFileHoomLinks,
            },
            freeFieldsFieldName: {
                name: 'Vrij veld contact',
                type: 'dropdownFreeFieldsFields',
                dropDownOptions: this.state.freeFieldsFields ? this.state.freeFieldsFields : [],
            },
            inspectionPersonType: {
                name: 'Rol in buurtaanpak',
                type: 'dropdownHas',
                dropDownOptions: this.props.inspectionPersonTypes,
            },
            sharedArea: {
                name: 'Buurt',
                type: 'searchWithAsync',
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
                dropDownOptions: this.props.measures.filter(measure => measure.visible === true),
            },
            opportunityEvaluationRealised: {
                name: 'Kans status evaluatie uitgevoerd',
                type: 'dropdownHas',
                dropDownOptions: this.props.opportunityEvaluationStatuses,
            },
            opportunityCampaign: {
                name: 'Kans campagne',
                type: 'dropdownHas',
                dropDownOptions: this.props.campaigns,
            },
        };

        // Options only if kans is set
        const customIntakeFields = {
            intakeDateStart: {
                name: 'Begin datum',
                type: 'date',
            },
            intakeDateFinish: {
                name: 'Eind datum',
                type: 'date',
            },
            intakeStatus: {
                name: 'Intake status',
                type: 'dropdownHas',
                dropDownOptions: this.props.intakeStatuses,
            },
        };

        // Options only if housingFileFieldName is set
        const customHousingFileFields = {
            housingFileFieldValue: {
                name: 'Status/waarde',
                type: 'housingFileFieldValue',
            },
        };

        // Options only if freeFieldsFieldName is set
        const customFreeFieldsFields = {
            freeFieldsFieldValue: {
                name: 'Status/waarde',
                type: 'freeFieldsFieldValue',
            },
        };

        return (
            <Modal
                title="Extra filters"
                modalClassName="modal-dialog-70vw"
                modalBodyClassName="scrollable-modal-body"
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
                                        fields={{
                                            ...fields,
                                            ...customProductFields,
                                            ...customOpportunityFields,
                                            ...customIntakeFields,
                                            ...customHousingFileFields,
                                            ...customFreeFieldsFields,
                                        }}
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
        intakeStatuses: state.systemData.intakeStatuses,
        products: state.systemData.products,
        energySuppliers: state.systemData.energySuppliers,
        energySupplierTypes: state.systemData.energySupplierTypes,
        countries: state.systemData.countries,
        orderStatuses: state.systemData.orderStatuses,
        quotationRequestStatus: state.systemData.quotationRequestStatus,
        inspectionPersonTypes: state.systemData.inspectionPersonTypes,
        housingFileHoomLinks: state.systemData.housingFileHoomLinks,
    };
};

export default connect(mapStateToProps)(ContactsListExtraFilters);
