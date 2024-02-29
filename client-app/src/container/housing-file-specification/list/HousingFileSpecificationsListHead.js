import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setHousingFileSpecificationsSortsFilter } from '../../../actions/housing-file-specification/HousingFileSpecificationsSortsActions';

const HousingFileSpecificationsListHead = props => {
    const setSorts = (field, order) => {
        props.setHousingFileSpecificationsSortsFilter(field, order);

        setTimeout(() => {
            props.refreshHousingFileSpecificationsData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            {props.showCheckboxList ? (
                <th width="3%">
                    <div>
                        <input type="checkbox" onChange={props.toggleCheckedAll} />
                    </div>
                </th>
            ) : null}
            <DataTableHeadTitleAndSort sortColumn={'typeBrand'} title={'Type/merk'} width={'10%'} setSorts={setSorts} />

            <DataTableHeadTitleAndSort
                sortColumn={'fullName'}
                title={'Contact'}
                width={props.showCheckboxList ? '12%' : '10%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'postalCode'} title={'Postcode'} width={'5%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'city'} title={'Woonplaats'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'measureCategoryName'}
                title={'Categorie'}
                width={'15%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'measureName'}
                title={'Specificatie'}
                width={'15%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'status'} title={'Status'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'measureDate'}
                title={'Datum realisatie'}
                width={'10%'}
                setSorts={setSorts}
            />
            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setHousingFileSpecificationsSortsFilter: (field, order) => {
        dispatch(setHousingFileSpecificationsSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(HousingFileSpecificationsListHead);
