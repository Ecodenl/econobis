import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {
    setFilterFullName,
    setRegistrationDateFilter,
    setFilterRegistrationSource,
    setFilterRegistrationStatus,
    setFilterMeasureRequested,
} from '../../../actions/registration/RegistrationsFiltersActions';

const RegistrationsListFilter = props => {
    const onFullNameChange = (e) => {
        props.setFilterFullName(e.target.value);
    };

    const onRegistrationChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setRegistrationDateFilter('');
        }else{
            props.setRegistrationDateFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onSourceChange = (e) => {
        props.setFilterRegistrationSource(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onStatusChange = (e) => {
        props.setFilterRegistrationStatus(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onMeasureRequestedChange = (e) => {
        props.setFilterMeasureRequested(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    return (
        <tr className="thead-filter">
            <th><input type="text" className="form-control input-sm" value={ props.filters.fullName.data} onChange={onFullNameChange} /></th>
            <th className="DayPicker-overflow hidden-xs hidden-sm">
                <DayPickerInput value={ props.filters.createdAt.data && moment(props.filters.createdAt.data).format('DD-MM-Y') } onDayChange={onRegistrationChange} />
            </th>
            <th>
                <select className="form-control input-sm" value={ props.filters.sourceId.data } onChange={onSourceChange}>
                    <option/>
                    {
                        props.registrationSources.map((registrationSource) => {
                            return <option key={registrationSource.id } value={ registrationSource.id }>{ registrationSource.name }</option>
                        })
                    }
                </select>
            </th>
            <th>
                <select className="form-control input-sm" value={ props.filters.statusId.data } onChange={onStatusChange}>
                    <option/>
                    {
                        props.registrationStatuses.map((registrationStatus) => {
                            return <option key={registrationStatus.id } value={ registrationStatus.id }>{ registrationStatus.name }</option>
                        })
                    }
                </select>
            </th>
            <th>
                <select className="form-control input-sm" value={ props.filters.measureRequested.data } onChange={onMeasureRequestedChange}>
                    <option/>
                    {
                        props.measures.map((measure) => {
                            return <option key={measure.id } value={ measure.id }>{ measure.name }</option>
                        })
                    }
                </select>
            </th>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.registrationsFilters,
    registrationSources: state.systemData.registrationSources,
    registrationStatuses: state.systemData.registrationStatuses,
    measures: state.systemData.measures,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterFullName,
        setRegistrationDateFilter,
        setFilterRegistrationSource,
        setFilterRegistrationStatus,
        setFilterMeasureRequested,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationsListFilter);