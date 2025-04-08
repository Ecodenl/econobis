import React, { useEffect, useState } from 'react';

import FreeFieldsView from './FreeFieldsView';
import FreeFieldsEdit from './FreeFieldsEdit';

function FreeFields({
    showEdit,
    freeFieldsFieldRecords,
    touched,
    errors,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    values,
    layout = 'single',
}) {
    return freeFieldsFieldRecords && freeFieldsFieldRecords.length > 0 ? (
        <>
            {showEdit ? (
                <FreeFieldsEdit
                    freeFieldsFieldRecords={freeFieldsFieldRecords}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    setFieldError={setFieldError}
                    setFieldTouched={setFieldTouched}
                    values={values}
                    layout={layout}
                />
            ) : (
                <FreeFieldsView freeFieldsFieldRecords={freeFieldsFieldRecords} values={values} layout={layout} />
            )}
        </>
    ) : null;
}
export default FreeFields;
