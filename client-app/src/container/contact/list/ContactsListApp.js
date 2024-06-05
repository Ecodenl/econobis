import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import moment from 'moment';

moment.locale('nl');

import { fetchContacts, clearContacts, setCheckedContactAll } from '../../../actions/contact/ContactsActions';
import { setTypeFilter, clearFilterContacts } from '../../../actions/contact/ContactsFiltersActions';
import { setContactsPagination } from '../../../actions/contact/ContactsPaginationActions';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';
import ContactsList from './ContactsList';
import ContactsListToolbar from './ContactsListToolbar';
import filterHelper from '../../../helpers/FilterHelper';
import ContactsAPI from '../../../api/contact/ContactsAPI';
import fileDownload from 'js-file-download';
import { hashHistory } from 'react-router';
import ContactsListSaveAsGroup from './ContactsListSaveAsGroup';
import ContactsListExtraFilters from './ContactsListExtraFilters';
import CampaignsAPI from '../../../api/campaign/CampaignsAPI';

class ContactsListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campaigns: '',
            showCheckboxList: false,
            showCheckboxListMerge: false,
            checkedAllCheckboxes: false,
            showSaveAsGroup: false,
            showExtraFilters: false,
            filterType: 'and',
            dataControleType: '',
            amountOfFilters: 0,
            extraFilters: [],
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleExtraFiltersChange = this.handleExtraFiltersChange.bind(this);
        this.getCSV = this.getCSV.bind(this);
        this.getFreeFieldsCSV = this.getFreeFieldsCSV.bind(this);
        this.getEnergySuppliersCSV = this.getEnergySuppliersCSV.bind(this);
        this.toggleShowExtraFilters = this.toggleShowExtraFilters.bind(this);
        this.getDataControleType = this.getDataControleType.bind(this);
    }

    getDataControleType(params) {
        return params && params.filter === 'data-controle' ? params.value : '';
    }

    componentDidMount() {
        if (!isEmpty(this.props.params)) {
            switch (this.props.params.filter) {
                case 'type':
                    this.props.clearFilterContacts();
                    this.props.setTypeFilter(this.props.params.value);
                    break;
                case 'data-controle':
                    this.setState({ dataControleType: this.getDataControleType(this.props.params) });
                    break;
                default:
                    break;
            }
        } else {
            this.props.clearFilterContacts();
            this.setState({
                filterType: 'and',
                dataControleType: '',
            });
        }

        this.fetchContactsData();

        CampaignsAPI.peekNotFinishedCampaigns().then(payload => {
            this.setState({ campaigns: payload });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.value !== prevProps.params.value) {
            this.props.clearFilterContacts();
            this.setState({
                filterType: 'and',
                dataControleType: '',
            });
            if (!isEmpty(this.props.params)) {
                switch (this.props.params.filter) {
                    case 'type':
                        this.props.setTypeFilter(this.props.params.value);
                        break;
                    case 'data-controle':
                        this.setState({ dataControleType: this.getDataControleType(this.props.params) });
                        break;
                    default:
                        break;
                }
            }

            setTimeout(() => {
                this.fetchContactsData();
            }, 100);
        }
    }

    componentWillUnmount() {
        this.props.clearContacts();
    }

    fetchContactsData = () => {
        setTimeout(() => {
            const { extraFilters, filterType, dataControleType } = this.state;
            const filters = filterHelper(this.props.contactsFilters);
            const sorts = this.props.contactsSorts;
            const pagination = { limit: 20, offset: this.props.contactsPagination.offset };

            this.props.fetchContacts(filters, extraFilters, sorts, pagination, filterType, dataControleType);
        }, 100);
    };

    saveAsGroup = () => {
        const { extraFilters, filterType } = this.state;
        const filters = filterHelper(this.props.contactsFilters);

        ContactsAPI.saveAsGroup({ filters, extraFilters, filterType }).then(payload => {
            hashHistory.push(`/contact-groep/${payload.data.data.id}/edit`);
        });
    };

    toggleSaveAsGroup = () => {
        this.setState(prevState => ({
            showSaveAsGroup: !prevState.showSaveAsGroup,
        }));
    };

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const { extraFilters, filterType, dataControleType } = this.state;
            const filters = filterHelper(this.props.contactsFilters);
            const sorts = this.props.contactsSorts;

            ContactsAPI.getCSV({ filters, extraFilters, sorts, filterType, dataControleType })
                .then(payload => {
                    fileDownload(payload.data, `Contacten-${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`);
                    this.props.unblockUI();
                })
                .catch(() => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    getFreeFieldsCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const { extraFilters, filterType } = this.state;
            const filters = filterHelper(this.props.contactsFilters);
            const sorts = this.props.contactsSorts;

            ContactsAPI.getFreeFieldsCSV({ filters, extraFilters, sorts, filterType })
                .then(payload => {
                    fileDownload(payload.data, `Contacten-Vrije-Velden-${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`);
                    this.props.unblockUI();
                })
                .catch(() => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    getEnergySuppliersCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const { extraFilters, filterType } = this.state;
            const filters = filterHelper(this.props.contactsFilters);
            const sorts = this.props.contactsSorts;

            ContactsAPI.getEnergySuppliersCSV({ filters, extraFilters, sorts, filterType })
                .then(payload => {
                    fileDownload(
                        payload.data,
                        `Contacten-energieleveranciers-${moment().format('YYYY-MM-DD HH:mm:ss')}.csv`
                    );
                    this.props.unblockUI();
                })
                .catch(() => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    getExcelAddressEnergyConsumptionGas = () => {
        this.props.blockUI();
        setTimeout(() => {
            const maxContacts = 10000;
            const amountFiles = Math.ceil(this.props.contacts.meta.total / maxContacts);
            const splitsExcel = this.props.contacts.meta.total > maxContacts;
            let counter = 1;

            for (let i = 1; i <= amountFiles; i++) {
                const offset = i * maxContacts - maxContacts;
                const pagination = { limit: maxContacts, offset };
                const { extraFilters } = this.state;
                const filters = filterHelper(this.props.contactsFilters);
                const sorts = this.props.contactsSorts;

                ContactsAPI.getExcelAddressEnergyConsumptionGas({ filters, extraFilters, sorts, pagination })
                    .then(payload => {
                        const excelFileName = splitsExcel
                            ? `Contacten-verbruik-gas-${moment().format(
                                  'YYYY-MM-DD HH:mm:ss'
                              )} (${counter} van ${amountFiles}).xlsx`
                            : `Contacten-verbruik-gas-${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`;

                        fileDownload(payload.data, excelFileName);
                        counter++;
                        this.props.unblockUI();
                    })
                    .catch(() => {
                        this.props.unblockUI();
                    });
            }
        }, 100);
    };

    getExcelAddressEnergyConsumptionElectricity = () => {
        this.props.blockUI();
        setTimeout(() => {
            const maxContacts = 10000;
            const amountFiles = Math.ceil(this.props.contacts.meta.total / maxContacts);
            const splitsExcel = this.props.contacts.meta.total > maxContacts;
            let counter = 1;

            for (let i = 1; i <= amountFiles; i++) {
                const offset = i * maxContacts - maxContacts;
                const pagination = { limit: maxContacts, offset };
                const { extraFilters } = this.state;
                const filters = filterHelper(this.props.contactsFilters);
                const sorts = this.props.contactsSorts;

                ContactsAPI.getExcelAddressEnergyConsumptionElectricity({ filters, extraFilters, sorts, pagination })
                    .then(payload => {
                        const excelFileName = splitsExcel
                            ? `Contacten-verbruik-elektriciteit-${moment().format(
                                  'YYYY-MM-DD HH:mm:ss'
                              )} (${counter} van ${amountFiles}).xlsx`
                            : `Contacten-verbruik-elektriciteit-${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`;

                        fileDownload(payload.data, excelFileName);
                        counter++;
                        this.props.unblockUI();
                    })
                    .catch(() => {
                        this.props.unblockUI();
                    });
            }
        }, 100);
    };

    resetContactFilters = () => {
        this.props.clearFilterContacts();

        this.setState({
            filterType: 'and',
            amountOfFilters: 0,
            extraFilters: [],
        });

        this.fetchContactsData();
    };

    onSubmitFilter = () => {
        this.props.clearContacts();
        this.props.setContactsPagination({ page: 0, offset: 0 });
        this.fetchContactsData();
    };

    handlePageClick(data) {
        const page = data.selected;
        const offset = Math.ceil(page * 20);

        this.props.setContactsPagination({ page, offset });
        this.fetchContactsData();
    }

    toggleShowCheckboxList = () => {
        this.setState(prevState => ({
            showCheckboxList: !prevState.showCheckboxList,
        }));
    };

    toggleShowCheckboxListMerge = () => {
        this.setState(prevState => ({
            showCheckboxListMerge: !prevState.showCheckboxListMerge,
        }));
    };

    selectAllCheckboxes = () => {
        this.setState(prevState => ({
            checkedAllCheckboxes: !prevState.checkedAllCheckboxes,
        }));

        this.props.setCheckedContactAll(!this.state.checkedAllCheckboxes);
    };

    handleExtraFiltersChange(extraFilters, amountOfFilters, filterType) {
        this.setState({
            filterType,
            amountOfFilters,
            extraFilters,
        });

        this.props.setContactsPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchContactsData();
        }, 100);
    }

    prefillExtraFilter = () => {
        this.setState({
            filterType: 'and',
            amountOfFilters: 1,
            extraFilters: [{ field: 'name', type: 'eq', data: '' }],
        });
    };

    toggleShowExtraFilters = () => {
        if (this.state.extraFilters.length === 0 && !this.state.showExtraFilters) {
            this.prefillExtraFilter();
        }

        this.setState(prevState => ({
            showExtraFilters: !prevState.showExtraFilters,
        }));
    };

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <ContactsListToolbar
                                dataControleType={this.state.dataControleType}
                                showCheckboxList={this.state.showCheckboxList}
                                showCheckboxListMerge={this.state.showCheckboxListMerge}
                                toggleShowCheckboxList={this.toggleShowCheckboxList}
                                toggleShowCheckboxListMerge={this.toggleShowCheckboxListMerge}
                                resetContactFilters={this.resetContactFilters}
                                selectAllCheckboxes={this.selectAllCheckboxes}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                                getCSV={this.getCSV}
                                getFreeFieldsCSV={this.getFreeFieldsCSV}
                                getEnergySuppliersCSV={this.getEnergySuppliersCSV}
                                getExcelAddressEnergyConsumptionGas={this.getExcelAddressEnergyConsumptionGas}
                                getExcelAddressEnergyConsumptionElectricity={
                                    this.getExcelAddressEnergyConsumptionElectricity
                                }
                                toggleSaveAsGroup={this.toggleSaveAsGroup}
                                saveAsGroup={this.saveAsGroup}
                                toggleShowExtraFilters={this.toggleShowExtraFilters}
                                fetchContactsData={this.fetchContactsData}
                            />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <ContactsList
                                dataControleType={this.state.dataControleType}
                                contacts={this.props.contacts}
                                contactsPagination={this.props.contactsPagination}
                                showCheckboxList={this.state.showCheckboxList}
                                showCheckboxListMerge={this.state.showCheckboxListMerge}
                                selectAllCheckboxes={this.selectAllCheckboxes}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                                onSubmitFilter={this.onSubmitFilter}
                                fetchContactsData={this.fetchContactsData}
                                handlePageClick={this.handlePageClick}
                            />
                        </div>
                    </div>
                </div>
                {this.state.showSaveAsGroup && (
                    <ContactsListSaveAsGroup
                        saveAsGroup={this.saveAsGroup}
                        closeDeleteItemModal={this.toggleSaveAsGroup}
                    />
                )}
                {this.state.showExtraFilters && (
                    <ContactsListExtraFilters
                        campaigns={this.state.campaigns}
                        saveAsGroup={this.saveAsGroup}
                        filterType={this.state.filterType}
                        toggleShowExtraFilters={this.toggleShowExtraFilters}
                        handleExtraFiltersChange={this.handleExtraFiltersChange}
                        contactType={this.props.contactsFilters.typeId.data}
                        extraFilters={this.state.extraFilters}
                        amountOfFilters={this.state.amountOfFilters}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contacts: state.contacts.list,
    contactsFilters: state.contacts.filters,
    contactsSorts: state.contacts.sorts,
    contactsPagination: state.contacts.pagination,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchContacts,
            clearContacts,
            setCheckedContactAll,
            setTypeFilter,
            clearFilterContacts,
            setContactsPagination,
            blockUI,
            unblockUI,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListApp);
