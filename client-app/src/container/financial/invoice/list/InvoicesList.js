import React, {Component} from 'react';
import {isEmpty} from 'lodash';

import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import InvoicesListHead from './InvoicesListHead';
import InvoicesListFilter from './InvoicesListFilter';
import InvoicesListItem from './InvoicesListItem';
import DataTablePagination from "../../../../components/dataTable/DataTablePagination";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchInvoices, clearInvoices} from '../../../../actions/invoice/InvoicesActions';
import {clearFilterInvoices} from '../../../../actions/invoice/InvoicesFiltersActions';
import {setInvoicesPagination} from '../../../../actions/invoice/InvoicesPaginationActions';
import filterHelper from '../../../../helpers/FilterHelper';
import ButtonIcon from "../../../../components/button/ButtonIcon";

import {
    setStatusIdFilterInvoices,
} from '../../../../actions/invoice/InvoicesFiltersActions';
import InvoicesAPI from "../../../../api/invoice/InvoicesAPI";
import fileDownload from "js-file-download";
import moment from "moment/moment";
import {hashHistory} from "react-router";
import InvoiceListSetCheckedAll from "./InvoiceListSetCheckedAll";
import ButtonText from "../../../../components/button/ButtonText";
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";

class InvoicesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCheckAll: false,
        };

        if (!isEmpty(props.filter)) {
            switch (props.filter) {
                case 'concepten':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('concept');
                    break;
                case 'gecontroleerd':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('checked');
                    break;
                case 'verzonden':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('sent');
                    break;
                case 'geexporteerd':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('exported');
                    break;
                case 'herinnering':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('reminder');
                    break;
                case 'aanmaning':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('exhortation');
                    break;
                case 'betaald':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('paid');
                    break;
                case 'oninbaar':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('irrecoverable');
                    break;
                default:
                    break;
            }
            ;
        } else {
            this.props.clearFilterInvoices();
        }

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.fetchInvoicesData();
    };

    componentWillUnmount() {
        this.props.clearInvoices();
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.filter !== nextProps.filter) {
            if (!isEmpty(nextProps.filter)) {
                switch (nextProps.filter) {
                    case 'concepten':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('concept');
                        break;
                    case 'gecontroleerd':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('checked');
                        break;
                    case 'verzonden':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('sent');
                        break;
                    case 'geexporteerd':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('exported');
                        break;
                    case 'herinnering':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('reminder');
                        break;
                    case 'aanmaning':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('exhortation');
                        break;
                    case 'betaald':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('paid');
                        break;
                    case 'oninbaar':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('irrecoverable');
                        break;
                    default:
                        break;
                }
            }
            else {
                this.props.clearFilterInvoices();
            }

            setTimeout(() => {
                this.fetchInvoicesData();
            }, 100);
        }
    }

    fetchInvoicesData = () => {
        this.props.clearInvoices();

        setTimeout(() => {
            const filters = filterHelper(this.props.invoicesFilters);
            const sorts = this.props.invoicesSorts.reverse();
            const pagination = {limit: 20, offset: this.props.invoicesPagination.offset};
            const administrationId = this.props.administrationId;

            this.props.fetchInvoices(filters, sorts, pagination, administrationId);
        }, 100);
    };

    getCSV = () => {
        setTimeout(() => {
            const filters = filterHelper(this.props.invoicesFilters);
            const sorts = this.props.invoicesSorts.reverse();
            const administrationId = this.props.administrationId;

            InvoicesAPI.getCSV({filters, sorts, administrationId}).then((payload) => {
                fileDownload(payload.data, 'Facturen-' + moment().format("YYYY-MM-DD HH:mm:ss") +  '.csv');
            });
        },100 );
    };

    previewSend = () => {
        hashHistory.push(`/financieel/${this.props.administrationId}/facturen/gecontroleerd/verzenden`);
    };

    downloadPostInvoices = () => {
        InvoiceDetailsAPI.sendAllPost(this.props.administrationId).then((payload) => {
            fileDownload(payload.data, 'test.pdf');
        });
    };

    resetInvoiceFilters = () => {
        this.props.clearFilterInvoices();

        this.fetchInvoicesData();
    };

    onSubmitFilter = () => {
        this.props.clearInvoices();

        this.props.setInvoicesPagination({page: 0, offset: 0});

        this.fetchInvoicesData();
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setInvoicesPagination({page, offset});

        this.fetchInvoicesData();
    };

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.onSubmitFilter();
        }
    };

    showCheckAll = () => {
        this.setState({showCheckAll: !this.state.showCheckAll});
    };

    render() {
        const {data = [], meta = {}} = this.props.invoices;

        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="btn-group btn-group-flex" role="group">
                            <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.resetInvoiceFilters}/>
                            <ButtonIcon iconName={"glyphicon-download-alt"} onClickAction={this.getCSV} />
                            {(this.props.filter === 'concepten' && meta.total > 0) &&
                            <ButtonIcon iconName={"glyphicon-ok"} onClickAction={this.showCheckAll}/>
                            }
                            {(this.props.filter === 'gecontroleerd' && meta.total > 0) &&
                            <ButtonText buttonText={"Facturen versturen"}
                                        onClickAction={() => this.previewSend()}/>
                            }
                            {(this.props.filter === 'gecontroleerd' && meta.total > 0) &&
                            <ButtonText buttonText={"Post facturen versturen"} onClickAction={() => this.downloadPostInvoices()}/>
                            }
                        </div>
                    </div>
                    <div className="col-md-4"><h3 className="text-center table-title">Facturen</h3></div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="pull-right">Resultaten: {meta.total || 0}</div>
                            </div>
                            <div className="col-sm-12">
                                <div
                                    className="pull-right">Totaal: {meta.totalPrice ? '€' + meta.totalPrice.toLocaleString('nl', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }) : '€0,00'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <form onKeyUp={this.handleKeyUp} className={'margin-10-top'}>
                    <DataTable>
                        <DataTableHead>
                            <InvoicesListHead
                                fetchInvoicesData={this.fetchInvoicesData}
                            />
                            <InvoicesListFilter
                                onSubmitFilter={this.onSubmitFilter}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {
                                data.length === 0 ? (
                                    <tr>
                                        <td colSpan={9}>Geen facturen gevonden!</td>
                                    </tr>
                                ) : (
                                    data.map((invoice) => {
                                        return <InvoicesListItem
                                            key={invoice.id}
                                            {...invoice}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                            administrationId={this.props.administrationId}
                                            fetchInvoicesData={this.fetchInvoicesData}
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
                            initialPage={this.props.invoicesPagination.page}
                        />
                    </div>
                </form>
                {
                    this.state.showCheckAll &&
                    <InvoiceListSetCheckedAll
                        closeModal={this.showCheckAll}
                        administrationId={this.props.administrationId}
                        amountOfInvoices={meta.total || 0}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        invoices: state.invoices.list,
        invoicesFilters: state.invoices.filters,
        invoicesSorts: state.invoices.sorts,
        invoicesPagination: state.invoices.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchInvoices,
        clearInvoices,
        clearFilterInvoices,
        setInvoicesPagination,
        setStatusIdFilterInvoices
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesList);