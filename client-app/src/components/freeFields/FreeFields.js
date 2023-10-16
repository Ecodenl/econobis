import React, { useEffect, useState } from 'react';

import FreeFieldsView from './FreeFieldsView';
import FreeFieldsEdit from './FreeFieldsEdit';
import FreeFieldsAPI from '../../api/free-fields/FreeFieldsAPI';

function FreeFields({ table, recordId }) {
    const [isLoading, setLoading] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
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
        FreeFieldsAPI.fetchFreeFieldsFieldRecords(table, recordId)
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

    return isLoading ? null : freeFieldsFieldRecords.length > 0 ? (
        <div className={`panel panel-default `}>
            <div className="panel-heading">
                <span className="h5 text-bold">Vrije velden</span>
            </div>
            {showEdit ? (
                <FreeFieldsEdit
                    freeFieldsFieldRecords={freeFieldsFieldRecords}
                    setFreeFieldsFieldRecords={setFreeFieldsFieldRecords}
                    switchToView={switchToView}
                    recordId={recordId}
                    fetchFreeFieldsFieldRecords={fetchFreeFieldsFieldRecords}
                />
            ) : (
                <FreeFieldsView freeFieldsFieldRecords={freeFieldsFieldRecords} switchToEdit={switchToEdit} />
            )}
        </div>
    ) : null;
}
export default FreeFields;
