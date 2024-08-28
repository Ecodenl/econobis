import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const ContactToImportsListHead = props => {
    return (
        <tr className="thead-title">
            <th width={'6%'}>
                {props.selectAllNew ? (
                    <>
                        <input type="checkbox" onChange={props.selectAllCheckboxesNew} />
                        {' Nieuw'}
                    </>
                ) : null}
                {props.selectAllUpdate ? (
                    <>
                        <input type="checkbox" onChange={props.selectAllCheckboxesUpdate} />
                        {' Bijwerken'}
                    </>
                ) : null}
            </th>
            <DataTableHeadTitle title={'Match'} width={'8%'} />
            <DataTableHeadTitleAndSort
                sortColumn={'number'}
                title={'Contactnr'}
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'firstName'}
                title={'Voornaam'}
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'lastName'}
                title={'Achternaam'}
                width={'10%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'street'}
                title={'Adres'}
                width={'10%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitle title={'Huisnr'} width={'4%'} />
            <DataTableHeadTitle title={'Toevoeging'} width={'3%'} />
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
                width={'10%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitle title={'Telefoon'} width={'5%'} />
            <DataTableHeadTitle title={'Ean'} width={'5%'} />
            <DataTableHeadTitle title={'Energielevereancier'} width={'10%'} />
            <DataTableHeadTitle title={'Klantnr'} width={'10%'} />
            {/*<DataTableHeadTitle title={'Match'} width={'10%'} />*/}
            {/*<th width={'4%'}>*/}
            {/*    <input type="checkbox" onChange={props.selectAllCheckboxesNew} />*/}
            {/*    nieuw*/}
            {/*    <br />*/}
            {/*    <input type="checkbox" onChange={props.selectAllCheckboxesUpdate} />*/}
            {/*    update*/}
            {/*</th>*/}
        </tr>
    );
};

export default ContactToImportsListHead;
