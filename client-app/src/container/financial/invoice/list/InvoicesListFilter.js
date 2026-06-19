import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setNumberFilterInvoices,
    setContactFilterInvoices,
    setDateRequestedFilterInvoices,
    setPaymentTypeIdFilterInvoices,
    setStatusIdFilterInvoices,
    setSubjectFilterInvoices,
    setDaysToExpireFilterInvoices,
    setDaysLastReminderFilterInvoices,
} from '../../../../actions/invoice/InvoicesFiltersActions';
import DataTableFilterDate from '../../../../components/dataTable/DataTableFilterDate';

const InvoicesListFilter = props => {
    const onNumberChange = e => {
        props.setNumberFilterInvoices(e.target.value);
    };

    const onDateRequestedChange = selectedDay => {
        if (selectedDay === undefined) {
            props.setDateRequestedFilterInvoices('');
        } else {
            props.setDateRequestedFilterInvoices(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onSubjectChange = e => {
        props.setSubjectFilterInvoices(e.target.value);
    };

    const onDaysToExpireChange = e => {
        props.setDaysToExpireFilterInvoices(e.target.value);
    };

    const onDaysLastReminderChange = e => {
        props.setDaysLastReminderFilterInvoices(e.target.value);
    };

    const onContactChange = e => {
        props.setContactFilterInvoices(e.target.value);
    };

    const onPaymentTypeChange = e => {
        props.setPaymentTypeIdFilterInvoices(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onStatusChange = e => {
        props.setStatusIdFilterInvoices(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            {props.showSelectInvoicesToSend && (
                <th>
                    <input type="checkbox" onChange={props.toggleCheckedAll} />
                </th>
            )}
            <th>
                {!props.showSelectInvoicesToSend ? (
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.number.data}
                        onChange={onNumberChange}
                    />
                ) : null}
            </th>
            {!props.showSelectInvoicesToSend ? (
                <DataTableFilterDate
                    placeholder={'Kleiner'}
                    value={props.filters.dateRequested.data && props.filters.dateRequested.data}
                    onChangeAction={onDateRequestedChange}
                />
            ) : (
                <th>{null}</th>
            )}
            <th>
                {!props.showSelectInvoicesToSend ? (
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.contact.data}
                        onChange={onContactChange}
                    />
                ) : null}
            </th>
            <th>
                {!props.showSelectInvoicesToSend ? (
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={props.filters.subject.data}
                        onChange={onSubjectChange}
                    />
                ) : null}
            </th>
            <th>
                {!props.showSelectInvoicesToSend ? (
                    <input
                        type="number"
                        placeholder={'Kleiner'}
                        className="form-control input-sm"
                        value={props.filters.daysToExpire.data}
                        onChange={onDaysToExpireChange}
                    />
                ) : null}
            </th>
            <th>
                {!props.showSelectInvoicesToSend ? (
                    <input
                        type="number"
                        placeholder={'Groter'}
                        className="form-control input-sm"
                        value={props.filters.daysLastReminder.data}
                        onChange={onDaysLastReminderChange}
                    />
                ) : null}
            </th>
            <th />
            <th>
                {!props.showSelectInvoicesToSend ? (
                    <select
                        className="form-control input-sm"
                        value={props.filters.paymentTypeId.data}
                        onChange={onPaymentTypeChange}
                    >
                        <option />
                        {props.orderPaymentTypes.map(orderPaymentType => {
                            return (
                                <option key={orderPaymentType.id} value={orderPaymentType.id}>
                                    {orderPaymentType.name}
                                </option>
                            );
                        })}
                    </select>
                ) : null}
            </th>
            <th>
                {!props.showSelectInvoicesToSend ? (
                    <select
                        className="form-control input-sm"
                        value={props.filters.statusId.data}
                        onChange={onStatusChange}
                    >
                        <option />
                        <optgroup label={'Status'}>
                            <option key={'to-send'} value={'to-send'}>
                                {'Te verzenden'}
                            </option>
                            <option key={'sent'} value={'sent'}>
                                {'Verzonden'}
                            </option>
                            {(props.administrationDetails.totalInvoicesExported > 0 ||
                                props.administrationDetails.twinfieldIsValid) && (
                                <option key={'exported'} value={'exported'}>
                                    {'Geboekt in Twinfield'}
                                </option>
                            )}
                            <option key={'paid'} value={'paid'}>
                                {'Betaald'}
                            </option>
                            <option key={'irrecoverable'} value={'irrecoverable'}>
                                {'Oninbaar'}
                            </option>
                            <option key={'error-making'} value={'error-making'}>
                                {'Fout bij maken'}
                            </option>
                            <option key={'error-sending'} value={'error-sending'}>
                                {'Opnieuw te verzenden'}
                            </option>
                            <option key={'in-progress'} value={'in-progress'}>
                                {'Wordt definitief gemaakt'}
                            </option>
                            <option key={'is-sending'} value={'is-sending'}>
                                {'Wordt verstuurd'}
                            </option>
                            <option key={'is-resending'} value={'is-resending'}>
                                {'Wordt opnieuw verstuurd'}
                            </option>
                            {(props.administrationDetails.totalInvoicesExported > 0 ||
                                props.administrationDetails.twinfieldIsValid) && (
                                <>
                                    <option key={'is-exporting'} value={'is-exporting'}>
                                        {'Wordt gesynchroniseerd naar Twinfield'}
                                    </option>
                                    <option key={'error-exporting'} value={'error-exporting'}>
                                        {'Fout bij synchronisatie naar Twinfield'}
                                    </option>
                                </>
                            )}
                        </optgroup>
                        <optgroup label={'Substatus'}>
                            <option key={'reminder'} value={'reminder'}>
                                {'Herinnering'}
                            </option>
                            <option key={'to-remind'} value={'to-remind'}>
                                {'Te herinneren'}
                            </option>
                            <option key={'reminder_1'} value={'reminder_1'}>
                                {'Herinnering 1'}
                            </option>
                            <option key={'reminder_2'} value={'reminder_2'}>
                                {'Herinnering 2'}
                            </option>
                            <option key={'reminder_3'} value={'reminder_3'}>
                                {'Herinnering 3'}
                            </option>
                            <option key={'exhortation'} value={'exhortation'}>
                                {'Aanmaning'}
                            </option>
                            <option key={'payed-by-mollie'} value={'payed-by-mollie'}>
                                {'Mollie betaald'}
                            </option>
                        </optgroup>
                    </select>
                ) : null}
            </th>
            <th />
            <th />
            <th />
        </tr>
    );
};

const mapStateToProps = state => ({
    filters: state.invoices.filters,
    invoiceStatuses: state.systemData.invoiceStatuses,
    administrationDetails: state.administrationDetails,
    orderPaymentTypes: state.systemData.orderPaymentTypes,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setNumberFilterInvoices,
            setContactFilterInvoices,
            setDateRequestedFilterInvoices,
            setPaymentTypeIdFilterInvoices,
            setStatusIdFilterInvoices,
            setSubjectFilterInvoices,
            setDaysLastReminderFilterInvoices,
            setDaysToExpireFilterInvoices,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesListFilter);
