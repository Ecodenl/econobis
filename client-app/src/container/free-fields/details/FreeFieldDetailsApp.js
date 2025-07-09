import React, { useEffect, useState } from 'react';
import FreeFieldsAPI from '../../../api/free-fields/FreeFieldsAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import { useNavigate, useParams } from 'react-router-dom';
import FreeFieldDetailsFormGeneral from './general/FreeFieldDetailsFormGeneral';
import FreeFieldsDeleteItem from '../list/FreeFieldsDeleteItem';
import { isEmpty } from 'lodash';

function FreeFieldDetailsApp(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [freeField, setFreeField] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [showDeleteItem, setShowDeleteItem] = useState(false);

    function showDeleteItemModal() {
        setShowDeleteItem(true);
    }

    function closeDeleteItemModal() {
        setShowDeleteItem(false);
    }

    useEffect(() => {
        fetchFreeField();
    }, []);

    function deleteFreeFieldsField(freeField) {
        FreeFieldsAPI.deleteFreeFieldsField(freeField)
            .then(() => {
                navigate(`/vrije-velden`);
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets misgegaan bij verwijderen. Probeer het opnieuw.');
            });
    }

    function fetchFreeField() {
        setIsLoading(true);
        FreeFieldsAPI.fetchFreeFieldDetails(params.id)
            .then(data => {
                setFreeField(data);
                setIsLoading(false);
                setHasError(false);
            })
            .catch(() => {
                alert('Er is iets misgegaan met ophalen van het vrije veld.');
                setIsLoading(false);
                setHasError(true);
            });
    }

    let loadingText = '';
    if (hasError) {
        loadingText = 'Fout bij het ophalen van het vrije veld.';
    } else if (isLoading) {
        loadingText = 'Gegevens aan het laden.';
    } else if (isEmpty(freeField)) {
        loadingText = 'Geen vrij veld gevonden!';
    }

    return isLoading || hasError ? (
        <div>{loadingText}</div>
    ) : (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="btn-group" role="group">
                                        <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                                        {!freeField.hasFreeFieldsFieldRecords && (
                                            <ButtonIcon iconName={'trash'} onClickAction={showDeleteItemModal} />
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center">
                                        Vrij veld: {freeField.table.name} / {freeField.fieldName}
                                    </h4>
                                </div>
                                <div className="col-md-4" />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12">
                    <FreeFieldDetailsFormGeneral freeField={freeField} fetchFreeField={fetchFreeField} />
                </div>

                <div className="col-md-12 margin-10-top"></div>
            </div>
            {showDeleteItem && (
                <FreeFieldsDeleteItem
                    closeDeleteItemModal={closeDeleteItemModal}
                    deleteFreeFieldsField={deleteFreeFieldsField}
                    description={freeField.fieldName}
                    id={freeField.id}
                />
            )}
        </div>
    );
}

export default FreeFieldDetailsApp;
