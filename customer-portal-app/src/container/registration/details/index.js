import React, { useEffect, useReducer } from 'react';
import Container from 'react-bootstrap/Container';
import ParticipantProjectAPI from '../../../api/participant-project/ParticipantProjectAPI';
import LoadingView from '../../../components/general/LoadingView';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MutationTable from './mutation-table';
import RegistrationDetailsTitle from './Title';
import RegistrationDetailsProjectTable from './project-table';
import RegistrationDetailsMutationTable from './mutation-table';

const INITIAL_STATE = {
    result: [],
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

function RegistrationDetails({ match: { params } }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(
        function() {
            ParticipantProjectAPI.show(params.id)
                .then(payload => {
                    dispatch({
                        type: 'updateResult',
                        payload: payload.data.data,
                    });
                    setIsLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setIsLoading(false);
                });
        },
        [params.id]
    );

    function setIsLoading(isLoading) {
        dispatch({
            type: 'updateIsLoading',
            payload: isLoading,
        });
    }

    return (
        <Container className={'content-section'}>
            {state.isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <RegistrationDetailsTitle {...state.result.basicInformation} />
                    <RegistrationDetailsProjectTable fields={state.result.fields} />
                    <RegistrationDetailsMutationTable participantMutations={state.result.participantMutations} />
                </>
            )}
        </Container>
    );
}

export default RegistrationDetails;
