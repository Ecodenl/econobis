import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';
// import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import { setContactsSortsFilter } from '../../../actions/contact/ContactsSortsActions';
import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import Icon from 'react-icons-kit';
import { arrowDown } from 'react-icons-kit/fa/arrowDown';

const ContactsListHead = props => {
    useEffect(() => {
        switch (props.dataControleType) {
            case 'zelfde-email-naam':
                setSorts('fullName', 'ASC');
                setSorts('emailAddress', 'ASC');
                break;
            case 'zelfde-email-adres':
                setSorts('streetAndNumber', 'ASC');
                setSorts('postalCode', 'ASC');
                setSorts('emailAddress', 'ASC');
                break;
            case 'zelfde-email':
                setSorts('emailAddress', 'ASC');
                break;
            case 'zelfde-adres':
                setSorts('streetAndNumber', 'ASC');
                setSorts('postalCode', 'ASC');
                break;

            case 'zelfde-iban':
                setSorts('iban', 'ASC');
                break;
            case 'zelfde-btwnummer':
                setSorts('vatNumber', 'ASC');
                break;
            case 'zelfde-kvknummer':
                setSorts('chamberOfCommerceNumber', 'ASC');
                break;
        }
    }, [props.dataControleType]);
    const setSorts = (field, order) => {
        props.setContactsSortsFilter(field, order);

        setTimeout(() => {
            props.fetchContactsData();
        }, 100);
    };

    return (
        <tr className="thead-title">
            {props.showCheckbox || props.showCheckboxMerge ? <th width="3%" /> : null}
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'number'}
                title={'#'}
                width={'5%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs hidden-sm'}
                sortColumn={'typeName'}
                title={'Type'}
                width={'7%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'fullName'} title={'Naam'} width={'11%'} setSorts={setSorts} />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'streetAndNumber'}
                title={'Adres'}
                width={'12%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'postalCode'}
                title={'Postcode'}
                width={'7%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'city'}
                title={'Plaats'}
                width={'10%'}
                setSorts={setSorts}
            />
            {/*<DataTableHeadTitle*/}
            {/*    RowClassName={'hidden-xs'}*/}
            {/*    sortColumn={'areaName'}*/}
            {/*    title={'Buurt'}*/}
            {/*    width={'10%'}*/}
            {/*/>*/}
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs'}
                sortColumn={'emailAddress'}
                title={'E-mail'}
                width={'12%'}
                setSorts={setSorts}
            />
            <DataTableHeadTitleAndSort sortColumn={'phoneNumber'} title={'Telefoon'} width={'7%'} setSorts={setSorts} />
            {props.dataControleType === 'zelfde-iban' ? (
                // <DataTableHeadTitleAndSort sortColumn={'iban'} title={'IBAN'} width={'7%'} setSorts={setSorts} />
                <th width={'7%'}>
                    IBAN
                    <Icon
                        className="pull-right small"
                        size={14}
                        icon={arrowDown}
                        role="button"
                        onClick={setSorts.bind(this, 'iban', 'ASC')}
                    />
                </th>
            ) : (
                ''
            )}
            {props.dataControleType === 'zelfde-btwnummer' ? (
                <DataTableHeadTitleAndSort
                    sortColumn={'vatNumber'}
                    title={'BTW Nummer'}
                    width={'7%'}
                    setSorts={setSorts}
                />
            ) : (
                ''
            )}
            {props.dataControleType === 'zelfde-kvknummer' ? (
                <DataTableHeadTitleAndSort
                    sortColumn={'chamberOfCommerceNumber'}
                    title={'KVK Nummer'}
                    width={'7%'}
                    setSorts={setSorts}
                />
            ) : (
                ''
            )}
            <DataTableHeadTitleAndSort
                RowClassName={'hidden-xs hidden-sm'}
                sortColumn={'createdAt'}
                title={'Gemaakt op'}
                width={'8%'}
                setSorts={setSorts}
            />
            <th width="3%" />
        </tr>
    );
};

const mapDispatchToProps = dispatch => ({
    setContactsSortsFilter: (field, order) => {
        dispatch(setContactsSortsFilter(field, order));
    },
});

export default connect(null, mapDispatchToProps)(ContactsListHead);
