import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import {
    setFilterOpportunityAmountOfQuotationRequests,
    setFilterOpportunityCampaign,
    setFilterOpportunityCreatedAt,
    setFilterOpportunityMeasureCategory,
    setFilterOpportunityName,
    setFilterOpportunityNumber,
    setFilterOpportunityStatusId,
} from '../../../actions/opportunity/OpportunitiesFiltersActions';
import DataTableFilterDate from "../../../components/dataTable/DataTableFilterDate";

const OpportunitiesListFilter = props => {

    const onNumberChange = (e) => {
        props.setFilterOpportunityNumber(e.target.value);
    };

    const onCreatedAtChange = (selectedDay) => {
        if(selectedDay === undefined){
            props.setFilterOpportunityCreatedAt('');
        }else{
            props.setFilterOpportunityCreatedAt(moment(selectedDay).format('Y-MM-DD'));
        }
    };

    const onNameChange = (e) => {
        props.setFilterOpportunityName(e.target.value);
    };

    const onMeasureCategoryChange = (e) => {
        props.setFilterOpportunityMeasureCategory(e.target.value);
    };

    const onCampaignChange = (e) => {
        props.setFilterOpportunityCampaign(e.target.value);
    };

    const onStatusIdChange = (e) => {
        props.setFilterOpportunityStatusId(e.target.value);

        setTimeout(() => {
            props.onSubmitFilter();
        }, 100);
    };

    const onAmountOfQuotationRequestsChange = (e) => {
        props.setFilterOpportunityAmountOfQuotationRequests(e.target.value);
    };

    return (
        <tr className="thead-filter">
            { (props.showCheckboxList ?
                <th width="3%"><input type="checkbox" value={ props.checkedAllCheckboxes } onChange={props.selectAllCheckboxes} /></th>
                :
                    <th><input type="text" className="form-control input-sm" value={ props.filters.number.data} onChange={onNumberChange} /></th>
            ) }

            <DataTableFilterDate value={ props.filters.createdAt.data && props.filters.createdAt.data } onChangeAction={onCreatedAtChange} />

            <th><input type="text" className="form-control input-sm" value={ props.filters.name.data} onChange={onNameChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.measureCategory.data} onChange={onMeasureCategoryChange} /></th>
            <th><input type="text" className="form-control input-sm" value={ props.filters.campaign.data} onChange={onCampaignChange} /></th>

            <th>
                <select className="form-control input-sm" value={ props.filters.statusId.data } onChange={onStatusIdChange}>
                    <option/>
                    {
                        props.opportunityStatusses.map((opportunityStatus) => {
                            return <option key={opportunityStatus.id } value={ opportunityStatus.id }>{ opportunityStatus.name }</option>
                        })
                    }
                </select>
            </th>
            {/*<th><input type="text" className="form-control input-sm" value={ props.filters.amountOfQuotationRequests.data} onChange={onAmountOfQuotationRequestsChange} /></th>*/}

            <th/>
            <th/>
        </tr>
    );
};

const mapStateToProps = (state) => ({
    filters: state.opportunities.filters,
    opportunityStatusses: state.systemData.opportunityStatus,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setFilterOpportunityAmountOfQuotationRequests,
        setFilterOpportunityCampaign,
        setFilterOpportunityCreatedAt,
        setFilterOpportunityMeasureCategory,
        setFilterOpportunityName,
        setFilterOpportunityNumber,
        setFilterOpportunityStatusId,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesListFilter);