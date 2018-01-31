import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import {
    setFilterEmailDate,
    setFilterEmailMailbox,
    setFilterEmailSentBy,
    setFilterEmailStatusId,
    setFilterEmailSubject,
} from '../../../actions/email/EmailFiltersActions';

import DataTableFilterDate from "../../../components/dataTable/DataTableFilterDate";

const EmailsInListFilter = props => {

    const onDateChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterEmailDate('');
        }else{
            props.setFilterEmailDate(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onMailboxChange = (e) => {
        props.setFilterEmailMailbox(e.target.value);
    };

    const onSentByChange = (e) => {
        props.setFilterEmailSentBy(e.target.value);
    };

    const onStatusIdChange = (e) => {
        props.setFilterEmailStatusId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onSubjectChange = (e) => {
        props.setFilterEmailSubject(e.target.value);
    };

    return (
        <tr className="thead-filter">

            <DataTableFilterDate value={ props.filters.date.data && props.filters.date.data } onChangeAction={onDateChange} />

            <th><input type="text" className="form-control input-sm" value={ props.filters.mailbox.data} onChange={onMailboxChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.sentBy.data} onChange={onSentByChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.subject.data} onChange={onSubjectChange} /></th>

            <th>
                <select className="form-control input-sm" value={ props.filters.statusId.data } onChange={onStatusIdChange}>
                    <option/>
                    {
                        props.emailStatuses.map((emailStatus) => {
                            return <option key={emailStatus.id } value={ emailStatus.id }>{ emailStatus.name }</option>
                        })
                    }
                </select>
            </th>


            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.emails.filters,
    emailStatuses: state.systemData.emailStatuses,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterEmailDate,
        setFilterEmailMailbox,
        setFilterEmailSentBy,
        setFilterEmailStatusId,
        setFilterEmailSubject,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsInListFilter);