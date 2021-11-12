import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

const PortalSettingsDashboardWidgetListHead = props => {
    return (
        <tr className="thead-title">
            <DataTableHeadTitle title={'ID'} width={'15%'} />
            <DataTableHeadTitle title={'#'} width={'7.5%'} />
            <DataTableHeadTitle title={'Titel'} width={'20%'} />
            <DataTableHeadTitle title={'Tekst'} width={'27.5%'} />
            <DataTableHeadTitle title={'Knoptekst'} width={'15%'} />
            <DataTableHeadTitle title={'Knoplink'} width={'15%'} />
        </tr>
    );
};

export default PortalSettingsDashboardWidgetListHead;
