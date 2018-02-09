import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
    setFilterFullName,
    setIntakeDateFilter,
    setFilterIntakeSource,
    setFilterIntakeStatus,
    setFilterMeasureRequested,
} from '../../../actions/intake/IntakesFiltersActions';
import DataTableFilterDate from "../../../components/dataTable/DataTableFilterDate";

const IntakesListFilter = props => {
    const onFullNameChange = (e) => {
        props.setFilterFullName(e.target.value);
    };

    const onIntakeChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setIntakeDateFilter('');
        }else{
            props.setIntakeDateFilter(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onSourceChange = (e) => {
        props.setFilterIntakeSource(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onStatusChange = (e) => {
        props.setFilterIntakeStatus(e.target.value);

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
            <DataTableFilterDate value={ props.filters.createdAt.data && props.filters.createdAt.data } onChangeAction={onIntakeChange} />
            <th>
                <select className="form-control input-sm" value={ props.filters.sourceId.data } onChange={onSourceChange}>
                    <option/>
                    {
                        props.intakeSources.map((intakeSource) => {
                            return <option key={intakeSource.id } value={ intakeSource.id }>{ intakeSource.name }</option>
                        })
                    }
                </select>
            </th>
            <th>
                <select className="form-control input-sm" value={ props.filters.statusId.data } onChange={onStatusChange}>
                    <option/>
                    {
                        props.intakeStatuses.map((intakeStatus) => {
                            return <option key={intakeStatus.id } value={ intakeStatus.id }>{ intakeStatus.name }</option>
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
    filters: state.intakes.filters,
    intakeSources: state.systemData.intakeSources,
    intakeStatuses: state.systemData.intakeStatuses,
    measures: state.systemData.measures,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterFullName,
        setIntakeDateFilter,
        setFilterIntakeSource,
        setFilterIntakeStatus,
        setFilterMeasureRequested,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(IntakesListFilter);