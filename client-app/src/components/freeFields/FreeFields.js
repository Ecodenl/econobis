import React, { useEffect, useState } from 'react';

import FreeFieldsView from './FreeFieldsView';
import FreeFieldsEdit from './FreeFieldsEdit';
import FreeFieldsAPI from '../../api/free-fields/FreeFieldsAPI';

function FreeFields({ table, id }) {
    const [isLoading, setLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(true);
    const [freeFieldsFieldRecords, setFreeFieldsFieldRecords] = useState({});

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
        setLoading(true);
        FreeFieldsAPI.fetchFreeFieldsFieldRecords(table, id)
            .then(payload => {
                setFreeFieldsFieldRecords(payload);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
                alert('Er is iets misgegaan met ophalen van de gegevens.');
            });
    };

    return (
        <div>
            {isLoading ? (
                <p>Bezig met gegevens laden</p>
            ) : freeFieldsFieldRecords.length > 0 ? (
                <>
                    {showEdit ? (
                        <FreeFieldsEdit
                            freeFieldsFieldRecords={freeFieldsFieldRecords}
                            setFreeFieldsFieldRecords={setFreeFieldsFieldRecords}
                            switchToView={switchToView}
                            objectId={id}
                            fetchFreeFieldsFieldRecords={fetchFreeFieldsFieldRecords}
                        />
                    ) : (
                        <FreeFieldsView freeFieldsFieldRecords={freeFieldsFieldRecords} switchToEdit={switchToEdit} />
                    )}
                </>
            ) : (
                <p>Bezig met gegevens laden</p>
            )}
        </div>
    );
}
export default FreeFields;
