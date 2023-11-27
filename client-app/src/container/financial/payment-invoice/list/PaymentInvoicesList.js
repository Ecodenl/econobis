import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import PaymentInvoicesListHead from './PaymentInvoicesListHead';
import PaymentInvoicesListFilter from './PaymentInvoicesListFilter';
import PaymentInvoicesListItem from './PaymentInvoicesListItem';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearPaymentInvoices, fetchPaymentInvoices } from '../../../../actions/payment-invoice/PaymentInvoicesActions';
import {
    clearFilterPaymentInvoices,
    setStatusIdFilterPaymentInvoices,
} from '../../../../actions/payment-invoice/PaymentInvoicesFiltersActions';
import { setPaymentInvoicesPagination } from '../../../../actions/payment-invoice/PaymentInvoicesPaginationActions';
import filterHelper from '../../../../helpers/FilterHelper';
import ButtonIcon from '../../../../components/button/ButtonIcon';

class PaymentInvoicesList extends Component {
    constructor(props) {
        super(props);

        this.setFilter(props.filter);

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchPaymentInvoicesData();
    }

    componentWillUnmount() {
        this.props.clearPaymentInvoices();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.setFilter(this.props.filter);

            setTimeout(() => {
                this.fetchPaymentInvoicesData();
            }, 100);
        }
    }

    setFilter = filter => {
        if (!isEmpty(filter)) {
            switch (filter) {
                case 'verzonden':
                    this.props.clearFilterPaymentInvoices();
                    this.props.setStatusIdFilterPaymentInvoices('sent');
                    break;
                case 'niet-betaald':
                    this.props.clearFilterPaymentInvoices();
                    this.props.setStatusIdFilterPaymentInvoices('not-paid');
                    break;
                default:
                    break;
            }
        } else {
            this.props.clearFilterPaymentInvoices();
        }
    };

    fetchPaymentInvoicesData = () => {
        this.props.clearPaymentInvoices();

        setTimeout(() => {
            const filters = filterHelper(this.props.paymentInvoicesFilters);
            const sorts = this.props.paymentInvoicesSorts;
            const pagination = { limit: 20, offset: this.props.paymentInvoicesPagination.offset };
            const administrationId = this.props.administrationId;

            this.props.fetchPaymentInvoices(filters, sorts, pagination, administrationId);
        }, 100);
    };

    resetPaymentInvoiceFilters = () => {
        this.props.clearFilterPaymentInvoices();
        this.setFilter(this.props.filter);

        this.fetchPaymentInvoicesData();
    };

    onSubmitFilter = () => {
        this.props.clearPaymentInvoices();

        this.props.setPaymentInvoicesPagination({ page: 0, offset: 0 });

        this.fetchPaymentInvoicesData();
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setPaymentInvoicesPagination({ page, offset });

        this.fetchPaymentInvoicesData();
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.onSubmitFilter();
        }
    };

    render() {
        const { data = [], meta = {} } = this.props.paymentInvoices;

        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="btn-group btn-group-flex" role="group">
                            <ButtonIcon iconName={'refresh'} onClickAction={this.resetPaymentInvoiceFilters} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-center table-title">Uitkering nota's.</h3>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="pull-right">Resultaten: {meta.total || 0}</div>
                            </div>
                            <div className="col-sm-12">
                                <div className="pull-right">
                                    Totaal:{' '}
                                    {meta.totalPrice
                                        ? '€ ' +
                                          meta.totalPrice.toLocaleString('nl', {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                          })
                                        : '€ 0,00'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form onKeyUp={this.handleKeyUp} className={'margin-10-top'}>
                    <DataTable>
                        <DataTableHead>
                            <PaymentInvoicesListHead fetchPaymentInvoicesData={this.fetchPaymentInvoicesData} />
                            <PaymentInvoicesListFilter onSubmitFilter={this.onSubmitFilter} />
                        </DataTableHead>
                        <DataTableBody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>Geen uitkering nota's gevonden!</td>
                                </tr>
                            ) : (
                                data.map(invoice => {
                                    return (
                                        <PaymentInvoicesListItem
                                            key={invoice.id}
                                            {...invoice}
                                            administrationId={this.props.administrationId}
                                            fetchPaymentInvoicesData={this.fetchPaymentInvoicesData}
                                        />
                                    );
                                })
                            )}
                        </DataTableBody>
                    </DataTable>
                    <div className="col-md-6 col-md-offset-3">
                        <DataTablePagination
                            onPageChangeAction={this.handlePageClick}
                            totalRecords={meta.total}
                            initialPage={this.props.paymentInvoicesPagination.page}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        paymentInvoices: state.paymentInvoices.list,
        paymentInvoicesFilters: state.paymentInvoices.filters,
        paymentInvoicesSorts: state.paymentInvoices.sorts,
        paymentInvoicesPagination: state.paymentInvoices.pagination,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchPaymentInvoices,
            clearPaymentInvoices,
            clearFilterPaymentInvoices,
            setPaymentInvoicesPagination,
            setStatusIdFilterPaymentInvoices,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInvoicesList);
