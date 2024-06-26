import React from 'react';

import DataTableHeadTitle from '../../../components/dataTable/DataTableHeadTitle';
import DataTableHeadTitleAndSort from '../../../components/dataTable/DataTableHeadTitleAndSort';

const ContactsToImportListHead = props => {
    return (
        <tr className="thead-title">
            <DataTableHeadTitleAndSort
                sortColumn={'number'}
                title={'Contactnummer'}
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'firstName'}
                title={'Voornaam'}
                width={'10%'}
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
            <DataTableHeadTitle title={'Huisnummer'} width={'5%'} />
            <DataTableHeadTitle title={'Toevoeging'} width={'5%'} />
            <DataTableHeadTitleAndSort
                sortColumn={'postalCode'}
                title={'Postcode'}
                width={'5%'}
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
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitleAndSort
                sortColumn={'emailInvoices'}
                title={'Email nota'}
                width={'5%'}
                setSorts={props.handleChangeSort}
            />
            <DataTableHeadTitle title={'Telefoon'} width={'5%'} />
            <DataTableHeadTitle title={'Ean'} width={'5%'} />
            <DataTableHeadTitle title={'Huidige energielevereancier'} width={'5%'} />
            <DataTableHeadTitle title={'Huidige klantnummer'} width={'5%'} />
            <th width={'5%'} />
        </tr>
    );
};

export default ContactsToImportListHead;
