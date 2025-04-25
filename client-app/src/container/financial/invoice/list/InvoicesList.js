import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import DataTable from '../../../../components/dataTable/DataTable';
import DataTableHead from '../../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../../components/dataTable/DataTableBody';
import InvoicesListHead from './InvoicesListHead';
import InvoicesListFilter from './InvoicesListFilter';
import InvoicesListItem from './InvoicesListItem';
import DataTablePagination from '../../../../components/dataTable/DataTablePagination';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchInvoices, clearInvoices, previewSend } from '../../../../actions/invoice/InvoicesActions';
import { blockUI, unblockUI } from '../../../../actions/general/BlockUIActions';
import { clearFilterInvoices } from '../../../../actions/invoice/InvoicesFiltersActions';
import { setInvoicesPagination } from '../../../../actions/invoice/InvoicesPaginationActions';
import filterHelper from '../../../../helpers/FilterHelper';
import ButtonIcon from '../../../../components/button/ButtonIcon';

import {
    setStatusIdFilterInvoices,
    setPaymentTypeIdFilterInvoices,
} from '../../../../actions/invoice/InvoicesFiltersActions';
import InvoicesAPI from '../../../../api/invoice/InvoicesAPI';
import fileDownload from 'js-file-download';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import ButtonText from '../../../../components/button/ButtonText';
import InvoiceDetailsAPI from '../../../../api/invoice/InvoiceDetailsAPI';
import InvoiceListSetMultiplePaid from './InvoiceListSetMultiplePaid';
import InvoiceListDeleteItem from './InvoiceListDeleteItem';
import ErrorModal from '../../../../components/modal/ErrorModal';

const initialState = {
    showSelectInvoicesToSend: false,
    checkedAll: false,
    invoiceIds: [],
    onlyEmailInvoices: false,
    onlyPostInvoices: false,
    showErrorMessagePost: false,
    emailInvoicesText: "Selecteer preview e-mail nota's",
    postInvoicesText: "Selecteer preview post nota's",
    sendRemindersTextEmail: 'Selecteer e-mail herinneringen',
    sendRemindersTextPost: 'Selecteer post herinneringen',
    setInvoicesPaidText: "Selecteer betaalde nota's",
    setInvoicesPaid: false,
    showSetInvoicesPaid: false,
    deleteItem: {
        id: '',
        fullName: '',
    },
};

// Functionele wrapper voor de class component
const InvoicesListWrapper = props => {
    const navigate = useNavigate();
    return <InvoicesList {...props} navigate={navigate} />;
};

class InvoicesList extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        this.setFilter(props.filter);

        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleInvoiceCheck = this.toggleInvoiceCheck.bind(this);
    }

    componentDidMount() {
        this.fetchInvoicesData();
    }

    componentWillUnmount() {
        this.props.clearInvoices();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.setFilter(this.props.filter);

            setTimeout(() => {
                this.fetchInvoicesData();
            }, 100);

            this.setState({
                ...initialState,
            });
        }
    }

    setFilter = filter => {
        if (!isEmpty(filter)) {
            switch (filter) {
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
                case 'fout-verzenden-incasso':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('error-sending');
                    this.props.setPaymentTypeIdFilterInvoices('collection');
                    break;
                case 'fout-verzenden-overboeken':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('error-sending');
                    this.props.setPaymentTypeIdFilterInvoices('transfer');
                    break;
                case 'verzonden':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('sent');
                    break;
                case 'wordt-gemaakt':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('in-progress');
                    break;
                case 'wordt-verstuurd':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('is-sending');
                    break;
                case 'wordt-opnieuw-verstuurd':
                    this.props.clearFilterInvoices();
                    this.props.setStatusIdFilterInvoices('is-resending');
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
        } else {
            this.props.clearFilterInvoices();
        }
    };

    fetchInvoicesData = () => {
        this.props.clearInvoices();

        setTimeout(() => {
            const filters = filterHelper(this.props.invoicesFilters);
            const sorts = this.props.invoicesSorts;
            // Pagination op 50
            const pagination = { limit: 50, offset: this.props.invoicesPagination.offset };
            const administrationId = this.props.administrationId;

            const onlyEmailInvoices = this.state.onlyEmailInvoices;
            const onlyPostInvoices = this.state.onlyPostInvoices;
            const setInvoicesPaid = this.state.setInvoicesPaid;
            this.props.fetchInvoices(
                filters,
                sorts,
                pagination,
                administrationId,
                onlyEmailInvoices,
                onlyPostInvoices,
                setInvoicesPaid
            );
        }, 100);

        this.props.fetchTotalsInfoAdministration(this.props.administrationId);
    };

    getCSV = () => {
        this.props.blockUI();
        setTimeout(() => {
            const filters = filterHelper(this.props.invoicesFilters);
            const sorts = this.props.invoicesSorts;
            const administrationId = this.props.administrationId;
            const administrationCode = this.props.administrationCode;

            InvoicesAPI.getCSV({ filters, sorts, administrationId })
                .then(payload => {
                    fileDownload(
                        payload.data,
                        'Notas-' + administrationCode + '-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv'
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
            const filters = filterHelper(this.props.invoicesFilters);
            const sorts = this.props.invoicesSorts;
            const administrationId = this.props.administrationId;
            const administrationCode = this.props.administrationCode;

            InvoicesAPI.getCSVWithProducts({ filters, sorts, administrationId })
                .then(payload => {
                    fileDownload(
                        payload.data,
                        'Notas-' + administrationCode + '-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.csv'
                    );
                    this.props.unblockUI();
                })
                .catch(error => {
                    this.props.unblockUI();
                });
        }, 100);
    };

    previewSend = paymentType => {
        this.setState({
            emailInvoicesText: "Preview e-mail nota's",
            onlyEmailInvoices: true,
        });

        this.fetchInvoicesData();

        if (this.state.invoiceIds.length > 0) {
            this.props.previewSend(this.state.invoiceIds);
            this.props.navigate(
                `/financieel/${this.props.administrationId}/notas/te-verzenden/verzenden/email/${paymentType}`
            );
        } else {
            this.toggleShowCheckboxList();
        }
    };

    previewSendPost = paymentType => {
        this.setState({
            postInvoicesText: "Preview post nota's",
            onlyPostInvoices: true,
        });

        this.fetchInvoicesData();

        // Bij verzenden post voorlopig even max 50 tegelijk (worden in 1 PDF samengevoegd en anders wordt PDF wel erg groot)
        if (this.state.invoiceIds.length > 50) {
            this.toggleErrorMessagePost();
        } else {
            if (this.state.invoiceIds.length > 0) {
                this.props.previewSend(this.state.invoiceIds);
                this.props.navigate(
                    `/financieel/${this.props.administrationId}/notas/te-verzenden/verzenden/post/${paymentType}`
                );
            } else {
                this.toggleShowCheckboxList();
            }
        }
    };
    toggleErrorMessagePost = () => {
        this.setState({
            showErrorMessagePost: !this.state.showErrorMessagePost,
        });
    };

    sendReminders = () => {
        this.setState({
            sendRemindersTextEmail: 'Verstuur e-mail herinneringen',
            onlyEmailInvoices: true,
        });

        this.fetchInvoicesData();

        if (this.state.invoiceIds.length > 0) {
            this.props.previewSend(this.state.invoiceIds);
            InvoiceDetailsAPI.sendNotifications(this.state.invoiceIds).then(payload => {});
            this.toggleShowCheckboxList();
        } else {
            this.toggleShowCheckboxList();
        }
    };

    sendRemindersPost = () => {
        this.setState({
            sendRemindersTextPost: 'Verstuur post herinneringen',
            onlyPostInvoices: true,
        });

        this.fetchInvoicesData();

        if (this.state.invoiceIds.length > 0) {
            InvoiceDetailsAPI.sendNotificationsPost(this.state.invoiceIds).then(payload => {
                fileDownload(payload.data, payload.headers['x-filename']);
            });
            this.toggleShowCheckboxList();
        } else {
            this.toggleShowCheckboxList();
        }
    };

    toggleSetInvoicesPaid = () => {
        if (this.state.invoiceIds.length > 0) {
            this.setState({
                showSetInvoicesPaid: true,
                setInvoicesPaidText: "Selecteer betaalde nota's",
            });
        } else {
            this.setState({
                setInvoicesPaid: true,
                showSetInvoicesPaid: false,
                setInvoicesPaidText: "Zet nota's betaald",
            });
            this.fetchInvoicesData();
            this.toggleShowCheckboxList();
        }
    };

    closeSetMultiplePaidModel = () => {
        this.setState({
            showSetInvoicesPaid: false,
            invoiceIds: [],
            setInvoicesPaidText: "Zet nota's betaald",
        });
        this.toggleShowCheckboxList();
    };

    toggleShowCheckboxList = () => {
        if (this.state.showSelectInvoicesToSend) {
            this.setState({
                showSelectInvoicesToSend: false,
                invoiceIds: [],
            });
        } else {
            this.setState({
                showSelectInvoicesToSend: true,
                invoiceIds: [],
            });
        }
    };

    resetInvoiceFilters = () => {
        this.props.clearFilterInvoices();
        this.setFilter(this.props.filter);

        this.fetchInvoicesData();

        this.setState({ ...initialState });
    };

    onSubmitFilter = () => {
        this.props.clearInvoices();

        this.props.setInvoicesPagination({ page: 0, offset: 0 });

        this.fetchInvoicesData();
    };

    handlePageClick(data) {
        let page = data.selected;
        // Pagination is 50
        let offset = Math.ceil(page * 50);

        this.props.setInvoicesPagination({ page, offset });

        this.fetchInvoicesData();
    }

    // On key Enter filter form will submit
    handleKeyUp = e => {
        if (e.keyCode === 13) {
            this.onSubmitFilter();
        }
    };

    toggleCheckedAll = () => {
        const isChecked = event.target.checked;
        let invoiceIds = [];

        if (isChecked) {
            invoiceIds = this.props.invoices.meta.invoiceIdsTotal;
        }

        this.setState({
            invoiceIds: invoiceIds,
            checkedAll: isChecked,
        });
    };

    toggleInvoiceCheck = event => {
        const isChecked = event.target.checked;
        const invoiceId = Number(event.target.name);

        if (isChecked) {
            this.setState(
                {
                    invoiceIds: [...this.state.invoiceIds, invoiceId],
                },
                this.checkAllInvoicesAreChecked
            );
        } else {
            this.setState({
                invoiceIds: this.state.invoiceIds.filter(item => item !== invoiceId),
                checkedAll: false,
            });
        }
    };

    checkAllInvoicesAreChecked() {
        this.setState({
            checkedAll: this.state.invoiceIds.length === this.props.invoices.meta.invoiceIdsTotal.length,
        });
    }

    showDeleteItemModal = (id, number) => {
        this.setState({
            ...this.state,
            showDeleteItem: true,
            deleteItem: {
                ...this.state.deleteItem,
                id: id,
                number: number,
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
                number: '',
            },
        });
    };

    render() {
        const { data = [], meta = {} } = this.props.invoices;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = "Fout bij het ophalen van nota's.";
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (data.length === 0) {
            loadingText = "Geen nota's gevonden!";
        } else {
            loading = false;
        }

        let messageText = null;
        if (this.props.filter == 'fout-verzenden-incasso' || this.props.filter == 'fout-verzenden-overboeken') {
            messageText =
                'Een fout verzonden nota is definitief aangemaakt in Econobis, maar kon niet worden verzonden. Dit omdat het contact een fout e-mailadres heeft of omdat de mailbox niet werkte. Corrigeer het e-mailadres of zorg er voor dat de mail box weer werkt. Vervolgens kan je met bovenstaande knoppen de nota opnieuw verzenden. Omdat de nota definitief is kan je deze niet verwijderen.';
        }

        let numberSelectedNumberTotal = 0;

        if (this.state.invoiceIds) {
            if (
                this.props &&
                this.props.invoices &&
                this.props.invoices.meta &&
                this.props.invoices.meta.invoiceIdsTotal
            ) {
                numberSelectedNumberTotal =
                    this.state.invoiceIds.length + '/' + this.props.invoices.meta.invoiceIdsTotal.length;
            } else {
                numberSelectedNumberTotal = this.state.invoiceIds.length;
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
                (this.props.filter == 'te-verzenden-incasso' ||
                    this.props.filter == 'te-verzenden-overboeken' ||
                    this.props.filter == 'fout-verzenden-incasso' ||
                    this.props.filter == 'fout-verzenden-overboeken' ||
                    this.props.filter == 'verzonden')
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
                        <div className="btn-group btn-group-flex" role="group">
                            <ButtonIcon iconName={'refresh'} onClickAction={this.resetInvoiceFilters} />
                            <ButtonIcon iconName={'download'} onClickAction={this.getCSV} title="Exporteer nota's" />
                            <ButtonIcon
                                iconName={'download'}
                                onClickAction={this.getCSVWithProducts}
                                title="Exporteer nota's met notaregels"
                            />
                            {(this.props.invoicesFilters.statusId.data == 'to-send' ||
                                this.props.invoicesFilters.statusId.data == 'error-sending') &&
                                this.props.invoicesFilters.paymentTypeId.data == 'collection' &&
                                !this.state.onlyPostInvoices &&
                                meta.total > 0 && (
                                    <ButtonText
                                        buttonText={this.state.emailInvoicesText}
                                        onClickAction={() => this.previewSend('incasso')}
                                    />
                                )}
                            {(this.props.invoicesFilters.statusId.data == 'to-send' ||
                                this.props.invoicesFilters.statusId.data == 'error-sending') &&
                                this.props.invoicesFilters.paymentTypeId.data == 'transfer' &&
                                !this.state.onlyPostInvoices &&
                                meta.total > 0 && (
                                    <ButtonText
                                        buttonText={this.state.emailInvoicesText}
                                        onClickAction={() => this.previewSend('overboeken')}
                                    />
                                )}
                            {(this.props.invoicesFilters.statusId.data == 'to-send' ||
                                this.props.invoicesFilters.statusId.data == 'error-sending') &&
                                this.props.invoicesFilters.paymentTypeId.data == 'collection' &&
                                !this.state.onlyEmailInvoices &&
                                meta.total > 0 && (
                                    <ButtonText
                                        buttonText={this.state.postInvoicesText}
                                        onClickAction={() => this.previewSendPost('incasso')}
                                    />
                                )}
                            {(this.props.invoicesFilters.statusId.data == 'to-send' ||
                                this.props.invoicesFilters.statusId.data == 'error-sending') &&
                                this.props.invoicesFilters.paymentTypeId.data == 'transfer' &&
                                !this.state.onlyEmailInvoices &&
                                meta.total > 0 && (
                                    <ButtonText
                                        buttonText={this.state.postInvoicesText}
                                        onClickAction={() => this.previewSendPost('overboeken')}
                                    />
                                )}
                            {(this.props.invoicesFilters.statusId.data == 'reminder' ||
                                this.props.invoicesFilters.statusId.data == 'to-remind' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_1' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_2' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_3') &&
                                !this.state.onlyPostInvoices &&
                                meta.total > 0 && (
                                    <ButtonText
                                        buttonText={this.state.sendRemindersTextEmail}
                                        onClickAction={() => this.sendReminders()}
                                    />
                                )}
                            {(this.props.invoicesFilters.statusId.data == 'reminder' ||
                                this.props.invoicesFilters.statusId.data == 'to-remind' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_1' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_2' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_3') &&
                                !this.state.onlyEmailInvoices &&
                                meta.total > 0 && (
                                    <ButtonText
                                        buttonText={this.state.sendRemindersTextPost}
                                        onClickAction={() => this.sendRemindersPost()}
                                    />
                                )}
                            {(this.props.invoicesFilters.statusId.data == 'sent' ||
                                this.props.invoicesFilters.statusId.data == 'exported' ||
                                this.props.invoicesFilters.statusId.data == 'reminder' ||
                                this.props.invoicesFilters.statusId.data == 'to-remind' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_1' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_2' ||
                                this.props.invoicesFilters.statusId.data === 'reminder_3' ||
                                this.props.invoicesFilters.statusId.data === 'exhortation') &&
                                meta.total > 0 && (
                                    <ButtonText
                                        buttonText={this.state.setInvoicesPaidText}
                                        onClickAction={() => this.toggleSetInvoicesPaid()}
                                    />
                                )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-center table-title">Nota's</h3>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="pull-right">Resultaten: {meta.total || 0}</div>
                            </div>
                            <div className="col-sm-12">
                                {/*<div className="pull-right">*/}
                                {/*    Totaal:{' '}*/}
                                {/*    {meta.totalPrice*/}
                                {/*        ? '€ ' +*/}
                                {/*          meta.totalPrice.toLocaleString('nl', {*/}
                                {/*              minimumFractionDigits: 2,*/}
                                {/*              maximumFractionDigits: 2,*/}
                                {/*          })*/}
                                {/*        : '€ 0,00'}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    {messageText ? <div className="alert alert-danger">{messageText}</div> : null}
                </div>
                {!this.state.showSelectInvoicesToSend ? (
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
                    <div className="col-md-12">
                        {numberSelectedNumberTotal ? (
                            <div className="alert alert-success">Geselecteerde nota's: {numberSelectedNumberTotal}</div>
                        ) : null}
                    </div>
                )}
                <div className="col-md-12">
                    {this.state.showErrorMessagePost ? (
                        <ErrorModal
                            closeModal={this.toggleErrorMessagePost}
                            title={"Te veel nota's geselecteerd"}
                            errorMessage={"Er kunnen maximaal 50 post nota's tegelijk aangemaakt worden."}
                        />
                    ) : null}
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
                                toggleCheckedAll={this.toggleCheckedAll}
                            />
                        </DataTableHead>
                        <DataTableBody>
                            {loading ? (
                                <tr>
                                    <td colSpan={12}>{loadingText}</td>
                                </tr>
                            ) : (
                                data.map(invoice => {
                                    return (
                                        <InvoicesListItem
                                            showSelectInvoicesToSend={this.state.showSelectInvoicesToSend}
                                            checkedAll={this.props.checkedAll}
                                            toggleInvoiceCheck={this.toggleInvoiceCheck}
                                            invoiceIds={this.state.invoiceIds}
                                            key={invoice.id}
                                            {...invoice}
                                            showDeleteItemModal={this.showDeleteItemModal}
                                            administrationId={this.props.administrationId}
                                            fetchInvoicesData={this.fetchInvoicesData}
                                            onlyEmailInvoices={this.state.onlyEmailInvoices}
                                            onlyPostInvoices={this.state.onlyPostInvoices}
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
                            initialPage={this.props.invoicesPagination.page}
                            recordsPerPage={50}
                        />
                    </div>
                </form>
                {this.state.showSetInvoicesPaid && (
                    <InvoiceListSetMultiplePaid
                        invoiceIds={this.state.invoiceIds}
                        administrationId={this.props.administrationId}
                        closeModal={this.closeSetMultiplePaidModel}
                    />
                )}
                {this.state.showDeleteItem && (
                    <InvoiceListDeleteItem
                        closeDeleteItemModal={this.closeDeleteItemModal}
                        fetchInvoices={this.fetchInvoicesData}
                        {...this.state.deleteItem}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        invoices: state.invoices.list,
        invoicesFilters: state.invoices.filters,
        invoicesSorts: state.invoices.sorts,
        invoicesPagination: state.invoices.pagination,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            previewSend,
            fetchInvoices,
            clearInvoices,
            clearFilterInvoices,
            setInvoicesPagination,
            setStatusIdFilterInvoices,
            setPaymentTypeIdFilterInvoices,
            blockUI,
            unblockUI,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesListWrapper);
