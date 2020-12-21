import React, { useEffect, useReducer } from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import CooperationDetailsToolbar from './Toolbar';

const INITIAL_STATE = {
    result: {},
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
            EmployeeAPI.fetchEmployeeFinancialResultReport({ ...state.filter })
                .then(function(payload) {
                    dispatch({
                        type: 'updateResult',
                        payload: payload.data.data,
                    });
                    setIsLoading(false);
                })
                .catch(function(error) {
                    showNotification('Er is iets misgegaan met het laden van de gegevens. Herlaad de pagina.');
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
                    {/*<PortalSettingsForm*/}
                    {/*    portalSettings={this.state.portalSettings}*/}
                    {/*    isLoading={this.state.isLoading}*/}
                    {/*    hasError={this.state.hasError}*/}
                    {/*    updateState={this.updateState}*/}
                    {/*/>*/}
                    Formulier
                </div>
            </div>
            <div className="col-md-3" />
        </div>
    );
}

export default CooperationDetailsApp;
