import React from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
import { setAddressDonglesSortsFilter } from '../../../actions/address-dongle/AddressDonglesSortsActions';

const AddressDonglesListHead = props => {
    const setSorts = (field, order) => {
        props.setAddressDonglesSortsFilter(field, order);

        setTimeout(() => {
            props.refreshAddressDonglesData();
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

            <DataTableHeadTitleAndSort
                sortColumn={'fullName'}
                title={'Contact'}
                width={props.showCheckboxList ? '10%' : '13%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'address'} title={'Adres'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'postalCode'} title={'Postcode'} width={'7%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort sortColumn={'city'} title={'Woonplaats'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'typeReadOutId'}
                title={'Type uitlezing'}
                width={'10%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'dateStart'}
                title={'Start datum'}
                width={'10%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'dateEnd'} title={'Eind datum'} width={'10%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                sortColumn={'typeDongleId'}
                title={'Type dongel'}
                width={'10%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'energyId'}
                title={'Energie ID koppeling'}
                width={'10%'}
                setSorts={setSorts}
            />

            <th width="5%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setAddressDonglesSortsFilter: (field, order) => {
        dispatch(setAddressDonglesSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(AddressDonglesListHead);
