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
import {fetchInvoices, clearInvoices, setCheckedInvoiceAll, previewSend} from '../../../../actions/invoice/InvoicesActions';
import { blockUI, unblockUI } from '../../../../actions/general/BlockUIActions';
import {clearFilterInvoices} from '../../../../actions/invoice/InvoicesFiltersActions';
import {setInvoicesPagination} from '../../../../actions/invoice/InvoicesPaginationActions';
import filterHelper from '../../../../helpers/FilterHelper';
import ButtonIcon from "../../../../components/button/ButtonIcon";

import {setStatusIdFilterInvoices, setPaymentTypeIdFilterInvoices}from '../../../../actions/invoice/InvoicesFiltersActions';
import InvoicesAPI from "../../../../api/invoice/InvoicesAPI";
import fileDownload from "js-file-download";
import moment from "moment/moment";
import {hashHistory} from "react-router";
import ButtonText from "../../../../components/button/ButtonText";
import InvoiceDetailsAPI from "../../../../api/invoice/InvoiceDetailsAPI";

class InvoicesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSelectInvoicesToSend: false,
            checkedAllCheckboxes: false,
        };

        if (!isEmpty(props.filter)) {
            switch (props.filter) {
                case 'te-verzenden-incasso':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('to-send');
                    this.props.setPaymentTypeIdFilterInvoices('collection');
                    break;
                case 'te-verzenden-overboeken':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('to-send');
                    this.props.setPaymentTypeIdFilterInvoices('transfer');
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
                    case 'te-verzenden-incasso':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('to-send');
                        this.props.setPaymentTypeIdFilterInvoices('collection');
                        break;
                    case 'te-verzenden-overboeken':
                        this.props.clearFilterInvoices();
                        this.props.setStatusIdFilterInvoices('to-send');
                        this.props.setPaymentTypeIdFilterInvoices('transfer');
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
            const sorts = this.props.invoicesSorts;
            const pagination = {limit: 50, offset: this.props.invoicesPagination.offset};
            const administrationId = this.props.administrationId;

            this.props.fetchInvoices(filters, sorts, pagination, administrationId);
        }, 100);
    };

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const filters = filterHelper(this.props.invoicesFilters);
            const sorts = this.props.invoicesSorts;
            const administrationId = this.props.administrationId;

            InvoicesAPI.getCSV({filters, sorts, administrationId}).then((payload) => {
                fileDownload(payload.data, 'Facturen-' + moment().format("YYYY-MM-DD HH:mm:ss") +  '.csv');
                this.props.unblockUI();
            }).catch((error) => {
                this.props.unblockUI();
            });
        },100 );
    };

    previewSend = (paymentType) => {
        const sendInvoiceIds = [];

        this.props.invoices.data.map((invoice) => (invoice.checked === true && sendInvoiceIds.push(invoice.id)));

        if(sendInvoiceIds.length > 0){
            this.props.previewSend(sendInvoiceIds);
            hashHistory.push(`/financieel/${this.props.administrationId}/facturen/te-verzenden/verzenden/email/${paymentType}`);
        }
        else{
            this.setState({showSelectInvoicesToSend: !this.state.showSelectInvoicesToSend});
        }
    };

    previewSendPost = (paymentType) => {
        InvoiceDetailsAPI.getAllPost(this.props.administrationId).then((payload) => {
            this.props.previewSend(payload);
            hashHistory.push(`/financieel/${this.props.administrationId}/facturen/te-verzenden/verzenden/post/${paymentType}`);
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
        let offset = Math.ceil(page * 50);

        this.props.setInvoicesPagination({page, offset});

        this.fetchInvoicesData();
    };

    // On key Enter filter form will submit
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.onSubmitFilter();
        }
    };

    selectAllCheckboxes = () => {
        this.setState({
            checkedAllCheckboxes: !this.state.checkedAllCheckboxes
        });

        this.props.setCheckedInvoiceAll(!this.state.checkedAllCheckboxes);
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
                            {(this.props.filter === 'te-verzenden-incasso' && meta.total > 0) &&
                            <ButtonText buttonText={"Facturen e-mailen"}
                                        onClickAction={() => this.previewSend('incasso')}/>
                            }
                            {(this.props.filter === 'te-verzenden-overboeken' && meta.total > 0) &&
                            <ButtonText buttonText={"Facturen e-mailen"}
                                        onClickAction={() => this.previewSend('overboeken')}/>
                            }
                            {(this.props.filter === 'te-verzenden-incasso' && meta.total > 0) &&
                            <ButtonText buttonText={"Post facturen versturen"} onClickAction={() => this.previewSendPost('incasso')}/>
                            }
                            {( this.props.filter === 'te-verzenden-overboeken' && meta.total > 0) &&
                            <ButtonText buttonText={"Post facturen versturen"} onClickAction={() => this.previewSendPost('overboeken')}/>
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
                                showSelectInvoicesToSend={this.state.showSelectInvoicesToSend}
                                fetchInvoicesData={this.fetchInvoicesData}
                            />
                            <InvoicesListFilter
                                showSelectInvoicesToSend={this.state.showSelectInvoicesToSend}
                                onSubmitFilter={this.onSubmitFilter}
                                selectAllCheckboxes={this.selectAllCheckboxes}
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
                                            showSelectInvoicesToSend={this.state.showSelectInvoicesToSend}
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
                            recordsPerPage={50}
                        />
                    </div>
                </form>
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
        previewSend,
        setCheckedInvoiceAll,
        fetchInvoices,
        clearInvoices,
        clearFilterInvoices,
        setInvoicesPagination,
        setStatusIdFilterInvoices,
        setPaymentTypeIdFilterInvoices,
        blockUI,
        unblockUI
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesList);