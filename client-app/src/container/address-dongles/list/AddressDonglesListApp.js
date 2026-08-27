import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAddressDongles, clearAddressDongles } from '../../../actions/address-dongle/AddressDonglesActions';
import { clearFilterAddressDongles } from '../../../actions/address-dongle/AddressDonglesFiltersActions';
import { setAddressDonglesPagination } from '../../../actions/address-dongle/AddressDonglesPaginationActions';

import AddressDonglesListToolbar from './AddressDonglesListToolbar';
import AddressDonglesList from './AddressDonglesList';
// import AddressDonglesListExtraFilters from './ AddressDonglesListExtraFilters';
import filterHelper from '../../../helpers/FilterHelper';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

// import AddressDongleAPI from '../../../api/address-dongle/AddressDongleAPI';
// import fileDownload from 'js-file-download';
// import moment from 'moment/moment';
import { blockUI, unblockUI } from '../../../actions/general/BlockUIActions';

const recordsPerPage = 20;

class AddressDonglesListApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showExtraFilters: false,
            extraFilters: [],
            checkedAll: false,
            showCheckboxList: false,
            addressDongleIds: [],
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleShowExtraFilters = this.toggleShowExtraFilters.bind(this);
    }

    componentDidMount() {
        this.fetchAddressDonglesData();
    }

    componentWillUnmount() {
        this.props.clearAddressDongles();
    }

    fetchAddressDonglesData = () => {
        setTimeout(() => {
            const extraFilters = this.state.extraFilters;
            const filters = filterHelper(this.props.addressDonglesFilters);
            const sorts = this.props.addressDonglesSorts;
            const pagination = { limit: recordsPerPage, offset: this.props.addressDonglesPagination.offset };

            this.props.fetchAddressDongles(filters, extraFilters, sorts, pagination);
        }, 100);
    };

    // getExcelAddressDongles = () => {
    //     this.props.blockUI();
    //     setTimeout(() => {
    //         const extraFilters = this.state.extraFilters;
    //         const filters = filterHelper(this.props.addressDonglesFilters);
    //         const sorts = this.props.addressDonglesSorts;
    //
    //         AddressDongleAPI.getExcelAddressDongles({ filters, extraFilters, sorts })
    //             .then(payload => {
    //                 fileDownload(payload.data, 'Adres-dongles-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx');
    //                 this.props.unblockUI();
    //             })
    //             .catch(error => {
    //                 this.props.unblockUI();
    //             });
    //     }, 100);
    // };

    resetAddressDongleFilters = () => {
        this.props.clearFilterAddressDongles();

        this.setState({
            extraFilters: [],
        });

        this.fetchAddressDonglesData();
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.addressDonglesFilters);
        const sorts = this.props.addressDonglesSorts;

        this.props.setAddressDonglesPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchAddressDonglesData();
        }, 100);
    }

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * recordsPerPage);

        this.props.setAddressDonglesPagination({ page, offset });

        setTimeout(() => {
            this.fetchAddressDonglesData();
        }, 100);
    }

    handleExtraFiltersChange = extraFilters => {
        this.setState({
            extraFilters: extraFilters,
        });

        this.props.setAddressDonglesPagination({ page: 0, offset: 0 });

        setTimeout(() => {
            this.fetchAddressDonglesData();
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
                addressDongleIds: [],
            });
        } else {
            this.setState({
                showCheckboxList: true,
                addressDongleIds: [],
            });
        }
    };

    toggleCheckedAll = event => {
        const isChecked = event.target.checked;
        let specificationIds = [];

        if (isChecked) {
            specificationIds = this.props.addressDongles.meta.addressDongleIdsTotal;
        }

        this.setState({
            specificationIds: addressDongleIds,
            checkedAll: isChecked,
        });
    };

    toggleAddressDongleCheck = event => {
        const isChecked = event.target.checked;
        const addressDongleId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    addressDongleIds: [...this.state.addressDongleIds, addressDongleId],
                },
                this.checkAllAddressDonglesAreChecked
            );
        } else {
            this.setState({
                addressDongleIds: this.state.addressDongleIds.filter(item => item !== addressDongleId),
                checkedAll: false,
            });
        }
    };

    checkAllAddressDonglesAreChecked() {
        this.setState({
            checkedAll: this.state.addressDongleIds.length === this.props.addressDongles.length,
        });
    }

    render() {
        let numberSelectedNumberTotal = 0;
        if (this.state.addressDongleIds.length) {
            if (
                this.props &&
                this.props.addressDongles &&
                this.props.addressDongles.meta &&
                this.props.addressDongles.meta.addressDongleIdsTotal
            ) {
                numberSelectedNumberTotal =
                    this.state.addressDongleIds.length +
                    '/' +
                    this.props.addressDongles.meta.addressDongleIdsTotal.length;
            } else {
                numberSelectedNumberTotal = this.state.addressDongleIds.length;
            }
        }

        return (
            <Panel>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        <AddressDonglesListToolbar
                            resetAddressDongleFilters={() => this.resetAddressDongleFilters()}
                            // getExcelAddressDongles={this.getExcelAddressDongles}
                            // toggleShowExtraFilters={this.toggleShowExtraFilters}
                            showCheckboxList={this.state.showCheckboxList}
                            toggleShowCheckboxList={this.toggleShowCheckboxList}
                            numberOfSelected={this.state.addressDongleIds.length}
                        />
                    </div>

                    <div className="col-md-12 margin-10-top">
                        <AddressDonglesList
                            addressDongles={this.props.addressDongles}
                            addressDonglesPagination={this.props.addressDonglesPagination}
                            onSubmitFilter={() => this.onSubmitFilter()}
                            refreshAddressDonglesData={() => this.fetchAddressDonglesData()}
                            handlePageClick={this.handlePageClick}
                            checkedAll={this.state.checkedAll}
                            showCheckboxList={this.state.showCheckboxList}
                            toggleCheckedAll={this.toggleCheckedAll}
                            toggleAddressDongleCheck={this.toggleAddressDongleCheck}
                            addressDongleIds={this.state.addressDongleIds}
                            numberSelectedNumberTotal={numberSelectedNumberTotal}
                        />
                    </div>

                    {/*{this.state.showExtraFilters && (*/}
                    {/*    <AddressDonglesListExtraFilters*/}
                    {/*        toggleShowExtraFilters={this.toggleShowExtraFilters}*/}
                    {/*        onSubmitFilter={() => this.onSubmitFilter()}*/}
                    {/*    />*/}
                    {/*)}*/}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        addressDongles: state.addressDongles.list,
        addressDonglesFilters: state.addressDongles.filters,
        addressDonglesSorts: state.addressDongles.sorts,
        addressDonglesPagination: state.addressDongles.pagination,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchAddressDongles,
            clearAddressDongles,
            setAddressDonglesPagination,
            clearFilterAddressDongles,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressDonglesListApp);
