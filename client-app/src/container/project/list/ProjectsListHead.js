import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setProjectsSortsFilter } from '../../../actions/project/ProjectsSortsActions';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

const ProjectsListHead = props => {
    const setSorts = (field, order) => {
        props.setProjectsSortsFilter(field, order);

        setTimeout(() => {
            props.fetchProjectsListData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'code'} title={'Projectcode'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'name'} title={'Project'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'projectTypeId'}
                title={'Type project'}
                width={'10%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitle title={'# deelnames nodig'} width={'8%'} />
            <DataTableHeadTitle title={'Uitgegeven deelnames'} width={'8%'} />
            <DataTableHeadTitle title={'Uit te geven deelnames'} width={'8%'} />
            <DataTableHeadTitleAndSort
                sortColumn={'amountOfLoanNeeded'}
                title={'Lening nodig'}
                width={'8%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'amountDefinitive'}
                title={'Lening opgehaald'}
                width={'8%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitle title={'Lening uit te geven'} width={'8%'} />
            <DataTableHeadTitle
                sortColumn={'percentageSpent'}
                title={'Percentage uitgegeven'}
                width={'8%'}
                setSorts={setSorts}
            />
            <th width="6%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setProjectsSortsFilter: (field, order) => {
        dispatch(setProjectsSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(ProjectsListHead);
