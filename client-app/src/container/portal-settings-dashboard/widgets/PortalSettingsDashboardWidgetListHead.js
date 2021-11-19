import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';

const PortalSettingsDashboardWidgetListHead = props => {
    return (
        <tr className="thead-title">
            <DataTableHeadTitle title={'Volgorde'} width={'7.5%'} />
            <DataTableHeadTitle title={'Titel'} width={props.edit ? '17.5%' : '20%'} />
            <DataTableHeadTitle title={'Tekst'} width={props.edit ? '25%' : '27.5%'} />
            <DataTableHeadTitle title={'Knoptekst'} width={'15%'} />
            <DataTableHeadTitle title={'Knoplink'} width={'15%'} />
            {props.edit && <DataTableHeadTitle title={''} width={'5%'} />}
        </tr>
    );
};

export default PortalSettingsDashboardWidgetListHead;
