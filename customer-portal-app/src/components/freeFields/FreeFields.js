import React, { useEffect, useState } from 'react';

import FreeFieldsView from './FreeFieldsView';
import FreeFieldsEdit from './FreeFieldsEdit';

function FreeFields({ freeFieldsFieldRecords, showEdit }) {
    return freeFieldsFieldRecords && freeFieldsFieldRecords.length > 0 ? (
        <>
            {showEdit ? (
                <FreeFieldsEdit freeFieldsFieldRecords={freeFieldsFieldRecords} />
            ) : (
                <FreeFieldsView freeFieldsFieldRecords={freeFieldsFieldRecords} />
            )}
        </>
    ) : null;
}
export default FreeFields;
