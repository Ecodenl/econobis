import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    fetchHousingFileSpecifications,
    clearHousingFileSpecifications,
} from '../../../actions/housing-file-specification/HousingFileSpecificationsActions';
import { clearFilterHousingFileSpecifications } from '../../../actions/housing-file-specification/HousingFileSpecificationsFiltersActions';
import { setHousingFileSpecificationsPagination } from '../../../actions/housing-file-specification/HousingFileSpecificationsPaginationActions';

import HousingFileSpecificationsList from './HousingFileSpecificationsList';
import HousingFileSpecificationsListToolbar from './HousingFileSpecificationsListToolbar';
import HousingFileSpecificationsListExtraFilters from './HousingFileSpecificationsListExtraFilters';
import HousingFileSpecificationsListCreateOpportunity from './HousingFileSpecificationsListCreateOpportunity';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

import HousingFileSpecificationsAPI from '../../../api/housing-file-specification/HousingFileSpecificationsAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';
import HousingFileSpecificationsListCreateQuotationRequest from './HousingFileSpecificationsListCreateQuotationRequest';

class HousingFileSpecificationsListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showExtraFilters: false,
            extraFilters: [],
            checkedAll: false,
            showCheckboxList: false,
            showCreateOpportunitiesFromSpecifications: false,
            showCreateQuotationRequestsFromSpecifications: false,
            specificationIds: [],
            campaignId: '',
            opportunityIds: [],
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleShowExtraFilters = this.toggleShowExtraFilters.bind(this);
    }

    componentDidMount() {
        this.fetchHousingFileSpecificationsData();
    }

    componentWillUnmount() {
        this.props.clearHousingFileSpecifications();
    }

    fetchHousingFileSpecificationsData = () => {
        setTimeout(() => {
            const extraFilters = this.state.extraFilters;
            const filters = filterHelper(this.props.housingFileSpecificationsFilters);
            const sorts = this.props.housingFileSpecificationsSorts;
            const pagination = { limit: 20, offset: this.props.housingFileSpecificationsPagination.offset };

            this.props.fetchHousingFileSpecifications(filters, extraFilters, sorts, pagination);
        }, 100);
    };

    getExcelSpecifications = () => {
        this.props.blockUI();
        setTimeout(() => {
            const extraFilters = this.state.extraFilters;
            const filters = filterHelper(this.props.housingFileSpecificationsFilters);
            const sorts = this.props.housingFileSpecificationsSorts;

            HousingFileSpecificationsAPI.getExcelSpecifications({ filters, extraFilters, sorts })
                .then(payload => {
                    fileDownload(
                        payload.data,
                        'Woningdossiers-specificaties-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx'
                    );
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    resetHousingFileSpecificationFilters = () => {
        this.props.clearFilterHousingFileSpecifications();

        this.setState({
            extraFilters: [],
        });

        this.fetchHousingFileSpecificationsData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.housingFileSpecificationsFilters);
        const sorts = this.props.housingFileSpecificationsSorts;

        this.props.setHousingFileSpecificationsPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchHousingFileSpecificationsData();
        }, 100);
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setHousingFileSpecificationsPagination({ page, offset });

        setTimeout(() => {
            this.fetchHousingFileSpecificationsData();
        }, 100);
    }

    handleExtraFiltersChange = extraFilters => {
        this.setState({
            extraFilters: extraFilters,
        });

        this.props.setHousingFileSpecificationsPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchHousingFileSpecificationsData();
        }, 100);
    };

    prefillExtraFilter() {
        this.setState({
            extraFilters: [
                {
                    field: 'name',
                    type: 'eq',
                    data: '',
                },
            ],
        });
    }

    toggleShowExtraFilters() {
        this.state.extraFilters.length === 0 && !this.state.showExtraFilters && this.prefillExtraFilter();

        this.setState({
            showExtraFilters: !this.state.showExtraFilters,
        });
    }

    toggleShowCheckboxList = () => {
        if (this.state.showCheckboxList) {
            this.setState({
                showCheckboxList: false,
                specificationIds: [],
            });
        } else {
            this.setState({
                showCheckboxList: true,
                specificationIds: [],
            });
        }
    };

    toggleCheckedAll = event => {
        const isChecked = event.target.checked;
        let specificationIds = [];

        if (isChecked) {
            specificationIds = this.props.housingFileSpecifications.meta.specificationIdsTotal;
        }

        this.setState({
            specificationIds: specificationIds,
            checkedAll: isChecked,
        });
    };

    toggleSpecificationCheck = event => {
        const isChecked = event.target.checked;
        const specificationId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    specificationIds: [...this.state.specificationIds, specificationId],
                },
                this.checkAllSpecificationsAreChecked
            );
        } else {
            this.setState({
                specificationIds: this.state.specificationIds.filter(item => item !== specificationId),
                checkedAll: false,
            });
        }
    };

    checkAllSpecificationsAreChecked() {
        this.setState({
            checkedAll: this.state.specificationIds.length === this.props.housingFileSpecifications.length,
        });
    }

    showModalCreateOpportunity = () => {
        this.setState({
            showCreateOpportunitiesFromSpecifications: true,
        });
    };

    closeModalCreateOpportunity = () => {
        this.setState({
            showCreateOpportunitiesFromSpecifications: false,
        });
    };

    showModalCreateQuotationRequest = (campaignId, opportunityIds) => {
        this.setState({
            showCheckboxList: false,
            showCreateQuotationRequestsFromSpecifications: true,
            specificationIds: [],
            campaignId: campaignId,
            opportunityIds: opportunityIds,
        });
    };

    closeModalCreateQuotationRequest = () => {
        this.setState({
            showCreateQuotationRequestsFromSpecifications: false,
            specificationIds: [],
            campaignId: '',
            opportunityIds: [],
        });
    };

    render() {
        let numberSelectedNumberTotal = 0;
        if (this.state.specificationIds.length) {
            if (
                this.props &&
                this.props.housingFileSpecifications &&
                this.props.housingFileSpecifications.meta &&
                this.props.housingFileSpecifications.meta.specificationIdsTotal
            ) {
                numberSelectedNumberTotal =
                    this.state.specificationIds.length +
                    '/' +
                    this.props.housingFileSpecifications.meta.specificationIdsTotal.length;
            } else {
                numberSelectedNumberTotal = this.state.specificationIds.length;
            }
        }

        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <HousingFileSpecificationsListToolbar
                            // housingFileSpecificationsCount={
                            //     this.state.housingFileSpecifications ? this.state.housingFileSpecifications.length : 0
                            // }
                            // refreshHousingFileSpecificationsData={this.callFetchHousingFileSpecificationsData}
                            resetHousingFileSpecificationFilters={() => this.resetHousingFileSpecificationFilters()}
                            getExcelSpecifications={this.getExcelSpecifications}
                            toggleShowExtraFilters={this.toggleShowExtraFilters}
                            showCheckboxList={this.state.showCheckboxList}
                            toggleShowCheckboxList={this.toggleShowCheckboxList}
                            showModalCreateOpportunity={this.showModalCreateOpportunity}
                            numberOfSelected={this.state.specificationIds.length}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <HousingFileSpecificationsList
                            housingFileSpecifications={this.props.housingFileSpecifications}
                            housingFileSpecificationsPagination={this.props.housingFileSpecificationsPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshHousingFileSpecificationsData={() => this.fetchHousingFileSpecificationsData()}
                            handlePageClick={this.handlePageClick}
                            checkedAll={this.state.checkedAll}
                            showCheckboxList={this.state.showCheckboxList}
                            toggleCheckedAll={this.toggleCheckedAll}
                            toggleSpecificationCheck={this.toggleSpecificationCheck}
                            specificationIds={this.state.specificationIds}
                            numberSelectedNumberTotal={numberSelectedNumberTotal}
                        />
                    </div>

                    {this.state.showExtraFilters && (
                        <HousingFileSpecificationsListExtraFilters
                            toggleShowExtraFilters={this.toggleShowExtraFilters}
                            onSubmitFilter={() => this.onSubmitFilter()}
                        />
                    )}
                    {this.state.showCreateOpportunitiesFromSpecifications && (
                        <HousingFileSpecificationsListCreateOpportunity
                            closeModalCreateOpportunity={this.closeModalCreateOpportunity}
                            specificationIds={this.state.specificationIds}
                            showModalCreateQuotationRequest={this.showModalCreateQuotationRequest}
                            fetchHousingFileSpecificationsData={this.fetchHousingFileSpecificationsData}
                        />
                    )}
                    {this.state.showCreateQuotationRequestsFromSpecifications && (
                        <HousingFileSpecificationsListCreateQuotationRequest
                            closeModalCreateQuotationRequest={this.closeModalCreateQuotationRequest}
                            campaignId={this.state.campaignId}
                            opportunityIds={this.state.opportunityIds}
                        />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        housingFileSpecifications: state.housingFileSpecifications.list,
        housingFileSpecificationsFilters: state.housingFileSpecifications.filters,
        housingFileSpecificationsSorts: state.housingFileSpecifications.sorts,
        housingFileSpecificationsPagination: state.housingFileSpecifications.pagination,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchHousingFileSpecifications,
            clearHousingFileSpecifications,
            setHousingFileSpecificationsPagination,
            clearFilterHousingFileSpecifications,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingFileSpecificationsListApp);
