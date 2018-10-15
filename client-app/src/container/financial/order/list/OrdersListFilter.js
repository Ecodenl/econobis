import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setNumberFilterOrders,
    setContactFilterOrders,
    setDateRequestedFilterOrders,
    setPaymentTypeIdFilterOrders,
    setStatusIdFilterOrders,
    setSubjectFilterOrders
} from '../../../../actions/order/OrdersFiltersActions';
import DataTableFilterDate from "../../../../components/dataTable/DataTableFilterDate";

const OrdersListFilter = props => {
    const onNumberChange = (e) => {
        props.setNumberFilterOrders(e.target.value);
    };

    const onDateRequestedChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setDateRequestedFilterOrders('');
        }else{
            props.setDateRequestedFilterOrders(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onSubjectChange = (e) => {
        props.setSubjectFilterOrders(e.target.value);
    };

    const onContactChange = (e) => {
        props.setContactFilterOrders(e.target.value);
    };

    const onPaymentTypeChange = (e) => {
        props.setPaymentTypeIdFilterOrders(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onStatusChange = (e) => {
        props.setStatusIdFilterOrders(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };
    return (
        <tr className="thead-filter">
            <th><input type="text" className="form-control input-sm" value={ props.filters.number.data} onChange={onNumberChange} /></th>
            <DataTableFilterDate value={ props.filters.dateRequested.data && props.filters.dateRequested.data } onChangeAction={onDateRequestedChange} />
            <th><input type="text" className="form-control input-sm" value={ props.filters.subject.data} onChange={onSubjectChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.contact.data} onChange={onContactChange} /></th>
            <th/>
            <th>
                <select className="form-control input-sm" value={ props.filters.paymentTypeId.data } onChange={onPaymentTypeChange}>
                    <option/>
                    {
                        props.orderPaymentTypes.map((orderPaymentType) => {
                            return <option key={orderPaymentType.id } value={ orderPaymentType.id }>{ orderPaymentType.name }</option>
                        })
                    }
                </select>
            </th>
            <th>
                <select className="form-control input-sm" value={props.filters.statusId.data} onChange={onStatusChange}>
                    <option/>
                    <option key={'concept'} value={'concept'}>{'Concept'}</option>
                    <option key={'upcoming'} value={'upcoming'}>{'Aankomende'}</option>
                    <option key={'to-create'} value={'create'}>{'Te factureren'}</option>
                    <option key={'to-send'} value={'send'}>{'Te verzenden'}</option>
                    <option key={'closed'} value={'closed'}>{'Beëindigd'}</option>
                </select>
            </th>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.orders.filters,
    orderStatuses: state.systemData.orderStatuses,
    orderPaymentTypes: state.systemData.orderPaymentTypes,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setNumberFilterOrders,
        setContactFilterOrders,
        setDateRequestedFilterOrders,
        setPaymentTypeIdFilterOrders,
        setStatusIdFilterOrders,
        setSubjectFilterOrders

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListFilter);