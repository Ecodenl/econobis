import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const ContactToImportsListHead = props => {
    return (
        <tr className="thead-title">
            <th width={'6%'}>
                {props.selectAllNew ? (
                    <>
                        <input type="checkbox" checked={props.checkedAllNew} onChange={props.toggleAllCheckboxesNew} />
                        {' Nieuw'}
                    </>
                ) : null}
                {props.selectAllUpdate ? (
                    <>
                        <input
                            type="checkbox"
                            checked={props.checkedAllUpdate}
                            onChange={props.toggleAllCheckboxesUpdate}
                        />
                        {' Bijwerken'}
                    </>
                ) : null}
            </th>
            <DataTableHeadTitle title={'Match'} width={'8%'} />
            <DataTableHeadTitle title={'Contact nr'} width={'5%'} />
            <DataTableHeadTitleAndSort
                sortColumn={'initials'}
                title={'Initialen'}
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'firstName'}
                title={'Voornaam'}
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitle
                sortColumn={'lastNamePrefix'}
                title={'Tussen voegsel'}
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'lastName'}
                title={'Achternaam'}
                width={'9%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'street'}
                title={'Adres'}
                width={'9%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitle title={'Huis nr'} width={'4%'} />
            <DataTableHeadTitle title={'Toev.'} width={'3%'} />
            <DataTableHeadTitleAndSort
                sortColumn={'postalCode'}
                title={'Postcode'}
                width={'4%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'city'}
                title={'Woonplaats'}
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'emailContact'}
                title={'Email primair'}
                width={'9%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitle title={'Telefoon'} width={'5%'} />
            <DataTableHeadTitle title={'Energie leverancier'} width={'5%'} />
            <DataTableHeadTitle title={'Ean type'} width={'5%'} />
            <DataTableHeadTitle title={'Ean'} width={'8%'} />
            <DataTableHeadTitle title={'Klant nr'} width={'5%'} />
        </tr>
    );
};

export default ContactToImportsListHead;
