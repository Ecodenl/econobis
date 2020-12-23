import React, { useEffect, useReducer } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import CooperationDetailsToolbar from './Toolbar';
import CooperationDetailsAPI from '../../../api/cooperation/CooperationDetailsAPI';
import CooperationDetailsForm from './form';

const INITIAL_STATE = {
    result: {
        name: '',
        address: '',
        postalCode: '',
        city: '',
        kvkNumber: '',
        btwNumber: '',
        iban: '',
        ibanAttn: '',
        email: '',
        website: '',
        logoFilename: '',
        logoName: '',
        hoomLink: '',
        hoomKey: '',
        hoomEmailTemplateId: '',
        hoomGroupId: '',
    },
    isLoading: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateIsLoading':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'updateResult':
            return {
                ...state,
                result: action.payload,
            };
        default:
            return INITIAL_STATE;
    }
};

function CooperationDetailsApp() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(
        function() {
            setIsLoading(true);
            CooperationDetailsAPI.fetchDetails()
                .then(function(payload) {
                    if (payload.data && payload.data.data && payload.data.data.id) {
                        dispatch({
                            type: 'updateResult',
                            payload: payload.data.data,
                        });
                    }
                    setIsLoading(false);
                })
                .catch(function(error) {
                    alert('Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina.');
                    setIsLoading(false);
                });
        },
        [state.filter]
    );

    function setIsLoading(isLoading) {
        dispatch({
            type: 'updateIsLoading',
            payload: isLoading,
        });
    }

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <CooperationDetailsToolbar />
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    {state.isLoading ? 'Laden...' : <CooperationDetailsForm formData={state.result} />}
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
}

export default CooperationDetailsApp;
