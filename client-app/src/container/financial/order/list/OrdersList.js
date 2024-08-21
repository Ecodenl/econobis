import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import OrdersListHead from './OrdersListHead';
import OrdersListFilter from './OrdersListFilter';
import OrdersListItem from './OrdersListItem';
import OrdersDeleteItem from './OrdersDeleteItem';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchOrders, clearOrders, previewCreate } from '../../../../actions/order/OrdersActions';
import { clearFilterOrders } from '../../../../actions/order/OrdersFiltersActions';
import { setOrdersPagination } from '../../../../actions/order/OrdersPaginationActions';
import filterHelper from '../../../../helpers/FilterHelper';
import ButtonIcon from '../../../../components/button/ButtonIcon';
import { blockUI, unblockUI } from '../../../../actions/general/BlockUIActions';

import { setPaymentTypeIdFilterOrders, setStatusIdFilterOrders } from '../../../../actions/order/OrdersFiltersActions';
import OrdersAPI from '../../../../api/order/OrdersAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';
import { hashHistory } from 'react-router';
import ButtonText from '../../../../components/button/ButtonText';

const initialState = {
    showDeleteItem: false,
    showSelectOrdersToCreate: false,
    checkedAll: false,
    orderIds: [],
    previewOrderText: "Selecteer preview concept nota's",
    deleteItem: {
        id: '',
        subject: '',
    },
};

class OrdersList extends Component {
    constructor(props) {
        super(props);

        this.setFilter(props.filter);

        this.state = initialState;

        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleOrderCheck = this.toggleOrderCheck.bind(this);
    }

    componentDidMount() {
        this.fetchOrdersData();
    }

    componentWillUnmount() {
        this.props.clearOrders();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.setFilter(this.props.filter);

            this.setState({ ...initialState });

            setTimeout(() => {
                this.fetchOrdersData();
            }, 100);
        }
    }

    setFilter = filter => {
        if (!isEmpty(filter)) {
            switch (filter) {
                case 'concepten':
                    this.props.clearFilterOrders();
                    this.props.setStatusIdFilterOrders('concept');
                    break;
                case 'aankomend':
                    this.props.clearFilterOrders();
                    this.props.setStatusIdFilterOrders('upcoming');
                    break;
                case 'te-factureren':
                    this.props.clearFilterOrders();
                    this.props.setStatusIdFilterOrders('create');
                    break;
                case 'in-progress':
                    this.props.clearFilterOrders();
                    this.props.setStatusIdFilterOrders('in-progress');
                    break;
                case 'te-verzenden':
                    this.props.clearFilterOrders();
                    this.props.setStatusIdFilterOrders('send');
                    break;
                case 'beeindigd':
                    this.props.clearFilterOrders();
                    this.props.setStatusIdFilterOrders('closed');
                    break;
                default:
                    break;
            }
        } else {
            this.props.clearFilterOrders();
        }
    };

    fetchOrdersData = (showOrdersWithoutOrderlines = 'true') => {
        this.props.clearOrders();

        setTimeout(() => {
            const filters = filterHelper(this.props.ordersFilters);
            const sorts = this.props.ordersSorts;
            // Pagination op 50
            const pagination = { limit: 50, offset: this.props.ordersPagination.offset };
            const administrationId = this.props.administrationId;

            this.props.fetchOrders(filters, sorts, pagination, administrationId, showOrdersWithoutOrderlines);
        }, 100);

        this.props.fetchTotalsInfoAdministration(this.props.administrationId);
    };

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const filters = filterHelper(this.props.ordersFilters);
            const sorts = this.props.ordersSorts;
            const administrationId = this.props.administrationId;
            const administrationCode = this.props.administrationCode;

            OrdersAPI.getCSV({ filters, sorts, administrationId })
                .then(payload => {
                    fileDownload(
                        payload.data,
                        'Orders-' + administrationCode + '-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv'
                    );
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    getCSVWithProducts = () => {
        this.props.blockUI();
        setTimeout(() => {
            const filters = filterHelper(this.props.ordersFilters);
            const sorts = this.props.ordersSorts;
            const administrationId = this.props.administrationId;
            const administrationCode = this.props.administrationCode;

            OrdersAPI.getCSVWithProducts({ filters, sorts, administrationId })
                .then(payload => {
                    fileDownload(
                        payload.data,
                        'Orders-' + administrationCode + '-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv'
                    );
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    previewOrders = () => {
        this.setState({
            previewOrderText: "Preview concept nota's",
        });

        if (this.state.showSelectOrdersToCreate) {
            this.fetchOrdersData(true);
        } else {
            this.fetchOrdersData(false);
        }
        if (this.state.orderIds.length > 0) {
            this.props.previewCreate(this.state.orderIds);
            hashHistory.push(`/financieel/${this.props.administrationId}/orders/aanmaken`);
        } else {
            this.toggleShowCheckboxList();
        }
    };

    toggleShowCheckboxList = () => {
        if (this.state.showSelectOrdersToCreate) {
            this.setState({
                showSelectOrdersToCreate: false,
                orderIds: [],
            });
        } else {
            this.setState({
                showSelectOrdersToCreate: true,
                orderIds: [],
            });
        }
    };

    resetOrderFilters = () => {
        this.props.clearFilterOrders();
        this.setFilter(this.props.filter);

        this.fetchOrdersData();

        this.setState({ ...initialState });
    };

    onSubmitFilter = () => {
        this.props.clearOrders();

        this.props.setOrdersPagination({ page: 0, offset: 0 });

        this.fetchOrdersData();
    };

    handlePageClick(data) {
        let page = data.selected;
        // Pagination is 50
        let offset = Math.ceil(page * 50);

        this.props.setOrdersPagination({ page, offset });

        this.fetchOrdersData();
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.onSubmitFilter();
        }
    };

    toggleCheckedAll = () => {
        const isChecked = event.target.checked;
        let orderIds = [];

        if (isChecked) {
            orderIds = this.props.orders.meta.orderIdsTotal;
        }

        this.setState({
            orderIds: orderIds,
            checkedAll: isChecked,
        });
    };

    toggleOrderCheck = event => {
        const isChecked = event.target.checked;
        const orderId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    orderIds: [...this.state.orderIds, orderId],
                },
                this.checkAllOrdersAreChecked
            );
        } else {
            this.setState({
                orderIds: this.state.orderIds.filter(item => item !== orderId),
                checkedAll: false,
            });
        }
    };

    checkAllOrdersAreChecked() {
        this.setState({
            checkedAll: this.state.orderIds.length === this.props.orders.meta.orderIdsTotal.length,
        });
    }

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id: id,
                subject: name,
            },
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem: {
                ...this.state.deleteItem,
                id: '',
                subject: '',
            },
        });
    };

    render() {
        const { data = [], meta = {} } = this.props.orders;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van orders.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = 'Geen orders gevonden!';
        } else {
            loading = false;
        }

        let numberSelectedNumberTotal = 0;

        if (this.state.orderIds) {
            if (this.props && this.props.orders && this.props.orders.meta && this.props.orders.meta.orderIdsTotal) {
                numberSelectedNumberTotal =
                    this.state.orderIds.length + '/' + this.props.orders.meta.orderIdsTotal.length;
            } else {
                numberSelectedNumberTotal = this.state.orderIds.length;
            }
        }

        let totalOrdersInProgressInvoices = 0;
        let totalInvoicesInProgress = 0;
        let totalInvoicesIsSending = 0;
        let totalInvoicesIsResending = 0;
        let totalInvoicesErrorMaking = 0;
        let amountInProgress = 0;
        let inProgressStartText = null;
        let inProgressEndText = null;
        let ordersInProgressInvoicesText = null;
        let inProgressText = null;
        let isSendingText = null;
        let isResendingText = null;
        let errorMakingText = null;
        if (this.props.totalsInfoAdministration) {
            totalOrdersInProgressInvoices = this.props.totalsInfoAdministration.totalOrdersInProgressInvoices
                ? this.props.totalsInfoAdministration.totalOrdersInProgressInvoices
                : 0;
            totalInvoicesInProgress = this.props.totalsInfoAdministration.totalInvoicesInProgress
                ? this.props.totalsInfoAdministration.totalInvoicesInProgress
                : 0;
            totalInvoicesIsSending = this.props.totalsInfoAdministration.totalInvoicesIsSending
                ? this.props.totalsInfoAdministration.totalInvoicesIsSending
                : 0;
            totalInvoicesIsResending = this.props.totalsInfoAdministration.totalInvoicesIsResending
                ? this.props.totalsInfoAdministration.totalInvoicesIsResending
                : 0;
            totalInvoicesErrorMaking = this.props.totalsInfoAdministration.totalInvoicesErrorMaking
                ? this.props.totalsInfoAdministration.totalInvoicesErrorMaking
                : 0;

            amountInProgress +=
                totalOrdersInProgressInvoices +
                totalInvoicesErrorMaking +
                totalInvoicesInProgress +
                totalInvoicesIsResending +
                totalInvoicesIsSending;

            if (
                amountInProgress > 0 &&
                (this.props.filter == 'aankomend' ||
                    this.props.filter == 'te-factureren' ||
                    this.props.filter == 'te-verzenden')
            ) {
                inProgressStartText = "Overzicht status bij het maken en verzenden nota's";
                if (totalOrdersInProgressInvoices > 0) {
                    ordersInProgressInvoicesText =
                        "- Concept nota's die nu gemaakt worden van uit order: " + totalOrdersInProgressInvoices;
                }
                if (totalInvoicesInProgress > 0) {
                    inProgressText = "- Concept nota's die nu definitief gemaakt worden: " + totalInvoicesInProgress;
                }
                if (totalInvoicesIsSending > 0) {
                    isSendingText =
                        "- Definitieve nota's die nu verzonden (e-mail of PDF) worden: " + totalInvoicesIsSending;
                }
                if (totalInvoicesIsResending > 0) {
                    isResendingText =
                        "- Definitieve nota's die nu opnieuw verzonden worden: " + totalInvoicesIsResending;
                }
                if (totalInvoicesErrorMaking > 0) {
                    errorMakingText = '- Definitieve nota\'s met status "Fout bij maken": ' + totalInvoicesErrorMaking;
                }
                inProgressEndText =
                    'Gebruik blauwe refresh/vernieuwen knop of F5 (Command + R op Mac) om status overzicht te verversen.';
            }
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="btn-group" role="group">
                            <ButtonIcon iconName={'refresh'} onClickAction={this.resetOrderFilters} />
                            <ButtonIcon iconName={'download'} onClickAction={this.getCSV} title="Exporteer orders" />
                            <ButtonIcon
                                iconName={'download'}
                                onClickAction={this.getCSVWithProducts}
                                title="Exporteer orders met orderregels"
                            />
                            {this.props.ordersFilters.statusId.data == 'create' && meta.total > 0 && (
                                <ButtonText
                                    buttonText={this.state.previewOrderText}
                                    onClickAction={this.previewOrders}
                                />
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-center table-title">Orders</h3>
                    </div>
                    <div className="col-md-4">
                        <div className="pull-right">Resultaten: {meta.total || 0}</div>
                    </div>
                </div>
                <div className="col-md-12">&nbsp;</div>
                {!this.state.showSelectOrdersToCreate ? (
                    <div className="col-md-12">
                        {inProgressStartText ? (
                            <div className="alert alert-warning">
                                {inProgressStartText}
                                <br />
                                {ordersInProgressInvoicesText ? (
                                    <span>
                                        {ordersInProgressInvoicesText} <br />
                                    </span>
                                ) : null}
                                {inProgressText ? (
                                    <span>
                                        {inProgressText} <br />
                                    </span>
                                ) : null}
                                {isSendingText ? (
                                    <span>
                                        {isSendingText} <br />
                                    </span>
                                ) : null}
                                {isResendingText ? (
                                    <span>
                                        {isResendingText} <br />
                                    </span>
                                ) : null}
                                {errorMakingText ? (
                                    <span>
                                        {errorMakingText} <br />
                                    </span>
                                ) : null}
                                <br /> {inProgressEndText}
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <>
                        <div className="col-md-12">&nbsp;</div>
                        <div className="col-md-12">
                            {numberSelectedNumberTotal ? (
                                <div className="alert alert-success">
                                    Geselecteerde orders: {numberSelectedNumberTotal}
                                </div>
                            ) : null}
                        </div>
                    </>
                )}

                <form onKeyUp={this.handleKeyUp} className={'margin-10-top'}>
                    <DataTable>
                        <DataTableHead>
                            <OrdersListHead
                                showSelectOrdersToCreate={this.state.showSelectOrdersToCreate}
                                fetchOrdersData={this.fetchOrdersData}
                            />
                            <OrdersListFilter
                                showSelectOrdersToCreate={this.state.showSelectOrdersToCreate}
                                onSubmitFilter={this.onSubmitFilter}
                                toggleCheckedAll={this.toggleCheckedAll}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8}>{loadingText}</td>
                                </tr>
                            ) : (
                                data.map(order => {
                                    return (
                                        <OrdersListItem
                                            showSelectOrdersToCreate={this.state.showSelectOrdersToCreate}
                                            checkedAll={this.props.checkedAll}
                                            toggleOrderCheck={this.toggleOrderCheck}
                                            orderIds={this.state.orderIds}
                                            key={order.id}
                                            {...order}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                            fetchOrdersData={this.fetchOrdersData}
                                        />
                                    );
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        {/*Pagination is 50*/}
                        <DataTablePagination
                            onPageChangeAction={this.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.ordersPagination.page}
                            recordsPerPage={50}
                        />
                    </div>
                </form>
                {this.state.showDeleteItem && (
                    <OrdersDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        fetchOrders={this.fetchOrdersData}
                        {...this.state.deleteItem}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.list,
        ordersFilters: state.orders.filters,
        ordersSorts: state.orders.sorts,
        ordersPagination: state.orders.pagination,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            previewCreate,
            fetchOrders,
            clearOrders,
            clearFilterOrders,
            setOrdersPagination,
            setPaymentTypeIdFilterOrders,
            setStatusIdFilterOrders,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
