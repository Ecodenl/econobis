import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setHousingFilesSortsFilter } from '../../../actions/housing-file/HousingFilesSortsActions';

const HousingFilesListHead = props => {
    const setSorts = (field, order) => {
        props.setHousingFilesSortsFilter(field, order);

        setTimeout(() => {
            props.refreshHousingFilesData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort sortColumn={'createdAt'} title={'Datum'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'postalCode'} title={'Postcode'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'city'} title={'Woonplaats'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'fullName'} title={'Contact'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'buildYear'} title={'Bouwjaar'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'buildingType'} title={'Type woning'} width={'15%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'isHouseForSale'} title={'Koophuis'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'energyLabel'} title={'Energielabel'} width={'5%'} setSorts={setSorts} />
            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setHousingFilesSortsFilter: (field, order) => {
        dispatch(setHousingFilesSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(HousingFilesListHead);
