import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import OrdersListHead from './OrdersListHead';
import OrdersListFilter from './OrdersListFilter';
import OrdersListItem from './OrdersListItem';
import OrdersDeleteItem from './OrdersDeleteItem';
import DataTablePagination from "../../../../components/dataTable/DataTablePagination";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { fetchOrders, clearOrders } from '../../../../actions/order/OrdersActions';
import { clearFilterOrders } from '../../../../actions/order/OrdersFiltersActions';
import { setOrdersPagination } from '../../../../actions/order/OrdersPaginationActions';
import filterHelper from '../../../../helpers/FilterHelper';
import ButtonIcon from "../../../../components/button/ButtonIcon";

import {
    setPaymentTypeIdFilterOrders,
    setStatusIdFilterOrders,
} from '../../../../actions/order/OrdersFiltersActions';

class OrdersList extends Component {
    constructor(props){
        super(props);

        if (!isEmpty(props.filter)) {
            switch (props.filter) {
                case 'concepten':
                    this.props.clearFilterOrders();
                    this.props.setStatusIdFilterOrders('concept');
                    break;
                case 'facturen':
                    this.props.clearFilterOrders();
                    this.props.setPaymentTypeIdFilterOrders('transfer');
                    this.props.setStatusIdFilterOrders('active');
                    break;
                case 'incassos':
                    this.props.clearFilterOrders();
                    this.props.setPaymentTypeIdFilterOrders('collection');
                    this.props.setStatusIdFilterOrders('active');
                    break;
                case 'beeindigd':
                    this.props.clearFilterOrders();
                    this.props.setStatusIdFilterOrders('closed');
                    break;
                default:
                    break;
            };
        } else {
            this.props.clearFilterOrders();
        }

        this.state = {
            showDeleteItem: false,
            deleteItem: {
                id: '',
                subject: ''
            }
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchOrdersData();
    };

    componentWillUnmount() {
        this.props.clearOrders();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.filter !== nextProps.filter){
            if(!isEmpty(nextProps.filter)) {
                switch(nextProps.filter){
                    case 'concepten':
                        this.props.clearFilterOrders();
                        this.props.setStatusIdFilterOrders('concept');
                        break;
                    case 'facturen':
                        this.props.clearFilterOrders();
                        this.props.setPaymentTypeIdFilterOrders('transfer');
                        this.props.setStatusIdFilterOrders('active');
                        break;
                    case 'incassos':
                        this.props.clearFilterOrders();
                        this.props.setPaymentTypeIdFilterOrders('collection');
                        this.props.setStatusIdFilterOrders('active');
                        break;
                    case 'beeindigd':
                        this.props.clearFilterOrders();
                        this.props.setStatusIdFilterOrders('closed');
                        break;
                    default:
                        break;
                }
            }
            else {
                this.props.clearFilterOrders();
            }

            setTimeout(() => {
                this.fetchOrdersData();
            }, 100);
        }
    }

    fetchOrdersData = () => {
        this.props.clearOrders();

        setTimeout(() => {
            const filters = filterHelper(this.props.ordersFilters);
            const sorts = this.props.ordersSorts.reverse();
            const pagination = { limit: 20, offset: this.props.ordersPagination.offset };
            const administrationId = this.props.administrationId;

            this.props.fetchOrders(filters, sorts, pagination, administrationId);
        },100 );
    };

    resetOrderFilters = () => {
        this.props.clearFilterOrders();

        this.fetchOrdersData();
    };

    onSubmitFilter = () => {
        this.props.clearOrders();

        this.props.setOrdersPagination({page: 0, offset: 0});

        this.fetchOrdersData();
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setOrdersPagination({page, offset});

        this.fetchOrdersData();
    };

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.onSubmitFilter();
        }
    };

    showDeleteItemModal = (id, name) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem:{
                ...this.state.deleteItem,
                id: id,
                subject: name
            }
        });
    };

    closeDeleteItemModal = () => {
        this.setState({
            ...this.state,
            showDeleteItem: false,
            deleteItem:{
                ...this.state.deleteItem,
                id: '',
                subject: ''
            }
        });
    };

    render() {
        const { data = [], meta = {} } = this.props.orders;

        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="btn-group" role="group">
                            <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.resetOrderFilters} />
                        </div>
                    </div>
                    <div className="col-md-4"><h3 className="text-center table-title">Orders</h3></div>
                    <div className="col-md-4">
                        <div className="pull-right">Resultaten: { meta.total || 0 }</div>
                    </div>
                </div>

                <form onKeyUp={this.handleKeyUp} className={'margin-10-top'}>
                    <DataTable>
                        <DataTableHead>
                            <OrdersListHead
                                fetchOrdersData={this.fetchOrdersData}
                            />
                            <OrdersListFilter
                                onSubmitFilter={this.onSubmitFilter}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {
                                data.length === 0 ? (
                                    <tr><td colSpan={8}>Geen orders gevonden!</td></tr>
                                ) : (
                                    data.map((order) => {
                                        return <OrdersListItem
                                            key={order.id}
                                            {...order}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                        />
                                    })
                                )
                            }
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.ordersPagination.page}
                        />
                    </div>
                </form>
                {
                    this.state.showDeleteItem &&
                        <OrdersDeleteItem
                            closeDeleteItemModal={this.closeDeleteItemModal}
                            {...this.state.deleteItem}
                        />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        orders: state.orders.list,
        ordersFilters: state.orders.filters,
        ordersSorts: state.orders.sorts,
        ordersPagination: state.orders.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchOrders, clearOrders, clearFilterOrders, setOrdersPagination, setPaymentTypeIdFilterOrders, setStatusIdFilterOrders }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);