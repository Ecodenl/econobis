import React from 'react';
import ContactsToImportAPI from '../../../api/contacts-to-import/ContactsToImportAPI';

function ContactsToImportListFilter({ filter, handleChangeFilter }) {
    let tr = (
        <>
            {/*<tr className="thead-filter">*/}
            {/*    <th>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            className="form-control input-sm"*/}
            {/*            value={filter.fieldName}*/}
            {/*            onChange={e => handleChangeFilter('fieldName', e.target.value)}*/}
            {/*        />*/}
            {/*    </th>*/}

            {/*    <th>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            className="form-control input-sm"*/}
            {/*            value={filter.fieldName}*/}
            {/*            onChange={e => handleChangeFilter('fieldName', e.target.value)}*/}
            {/*        />*/}
            {/*    </th>*/}
            {/*    <th>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            className="form-control input-sm"*/}
            {/*            value={filter.fieldName}*/}
            {/*            onChange={e => handleChangeFilter('fieldName', e.target.value)}*/}
            {/*        />*/}
            {/*    </th>*/}
            {/*    <th />*/}
            {/*    <th />*/}
            {/*</tr>*/}
        </>
    );
    return tr;
}

export default ContactsToImportListFilter;
