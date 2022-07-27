import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchContactGroups, clearContactGroups } from '../../../actions/contact/ContactGroupsActions';
import { setContactGroupPagination } from '../../../actions/contact/ContactGroupPaginationActions';
import { clearFilterContactGroups } from '../../../actions/contact/ContactGroupsFiltersActions';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';
import ContactGroupsList from './ContactGroupsList';
import ContactGroupsListToolbar from './ContactGroupsListToolbar';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import filterHelper from '../../../helpers/FilterHelper';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import fileDownload from 'js-file-download';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';

class ContactGroupsListApp extends Component {
    constructor(props) {
        super(props);

        this.fetchContactGroupsData = this.fetchContactGroupsData.bind(this);
        this.resetContactGroupsFilters = this.resetContactGroupsFilters.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchContactGroupsData();
    }

    componentWillUnmount() {
        this.props.clearContactGroups();
    }

    refreshContactGroupsData = () => {
        this.props.clearContactGroups();
        this.props.fetchContactGroups();
    };

    fetchContactGroupsData() {
        setTimeout(() => {
            const filters = filterHelper(this.props.contactGroupsFilters);
            const sorts = this.props.contactGroupsSorts;
            const pagination = { limit: 20, offset: this.props.contactGroupsPagination.offset };

            this.props.fetchContactGroups(filters, sorts, pagination);
        }, 100);
    }

    resetContactGroupsFilters() {
        this.props.clearFilterContactGroups();

        this.fetchContactGroupsData();
    }

    getExcelExportGroupReport() {
        this.props.blockUI();

        setTimeout(() => {
            ContactGroupAPI.getExcelExportGroupReport()
                .then(payload => {
                    var excelFileName = `Contacten-groepen-rapportage-${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`;
                    fileDownload(payload.data, excelFileName);
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    }

    onSubmitFilter() {
        this.props.clearContactGroups();

        this.props.setContactGroupPagination({ page: 0, offset: 0 });

        this.fetchContactGroupsData();
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setContactGroupPagination({ page, offset });

        this.fetchContactGroupsData();
    }

    render() {
        return (
            <Panel className="col-md-12">
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <ContactGroupsListToolbar
                            resetContactGroupsFilters={() => this.resetContactGroupsFilters()}
                            getExcelExportGroupReport={() => this.getExcelExportGroupReport()}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <ContactGroupsList
                            contactGroups={this.props.contactGroups}
                            contactGroupsPagination={this.props.contactGroupsPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            fetchContactGroupsData={() => this.fetchContactGroupsData()}
                            handlePageClick={this.handlePageClick}
                            resetContactGroupsFilters={() => this.resetContactGroupsFilters()}
                        />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactGroups: state.contactGroups.list,
        contactGroupsFilters: state.contactGroups.filters,
        contactGroupsSorts: state.contactGroups.sorts,
        contactGroupsPagination: state.contactGroups.pagination,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchContactGroups,
            clearContactGroups,
            clearFilterContactGroups,
            setContactGroupPagination,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactGroupsListApp);
