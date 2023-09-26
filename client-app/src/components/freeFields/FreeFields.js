import React, { useEffect, useState } from 'react';

import FreeFieldsView from './FreeFieldsView';
import FreeFieldsEdit from './FreeFieldsEdit';
import FreeFieldsAPI from '../../api/free-fields/FreeFieldsAPI';

export default function FreeFields({ table, id }) {
    const [showEdit, setShowEdit] = useState(false);
    const [freeFieldsFieldRecords, setFreeFieldsFieldRecords] = useState(null);

    useEffect(() => {
        fetchFreeFieldsFieldRecords();
    }, []);

    function switchToView() {
        setShowEdit(false);
    }
    function switchToEdit() {
        setShowEdit(true);
    }

    const fetchFreeFieldsFieldRecords = () => {
        FreeFieldsAPI.fetchFreeFieldsFieldRecords(table, id)
            .then(payload => {
                setFreeFieldsFieldRecords(payload);
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    };

    return (
        <div>
            {freeFieldsFieldRecords && (
                <>
                    {showEdit ? (
                        <FreeFieldsEdit freeFieldsFieldRecords={freeFieldsFieldRecords} switchToView={switchToView} />
                    ) : (
                        <FreeFieldsView freeFieldsFieldRecords={freeFieldsFieldRecords} switchToEdit={switchToEdit} />
                    )}
                </>
            )}
        </div>
    );
}
