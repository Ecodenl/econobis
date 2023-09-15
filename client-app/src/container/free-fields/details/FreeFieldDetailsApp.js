import React, { useEffect, useState } from 'react';
import FreeFieldsAPI from '../../../api/free-fields/FreeFieldsAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';
import { browserHistory } from 'react-router';
import FreeFieldDetailsForm from '../../free-fields/details/FreeFieldDetailsForm';

function FreeFieldDetailsApp(props) {
    const [freeField, setFreeField] = useState(null);

    useEffect(() => {
        fetchFreeField();
    }, []);

    function fetchFreeField() {
        FreeFieldsAPI.fetchFreeFieldDetails(props.params.id)
            .then(data => {
                setFreeField(data);
            })
            .catch(error => {
                alert('Er is iets misgegaan met ophalen van het vrije veld.');
            });
    }

    if (!freeField) {
        return null;
    }

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="btn-group" role="group">
                                        <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center">Vrij veld: {freeField.table.name} / {freeField.fieldName}</h4>
                                </div>
                                <div className="col-md-4" />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12">
                    <FreeFieldDetailsForm freeField={freeField} fetchFreeField={fetchFreeField} />
                </div>

                <div className="col-md-12 margin-10-top"></div>
            </div>
        </div>
    );
}

export default FreeFieldDetailsApp;
