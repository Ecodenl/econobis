import React, { useEffect, useReducer } from 'react';
import Container from 'react-bootstrap/Container';
import ParticipantProjectAPI from '../../../api/participant-project/ParticipantProjectAPI';
import LoadingView from '../../../components/general/LoadingView';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MutationTable from './mutation-table';

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
                    <Row>
                        <Col>
                            <h1 className="content-heading">
                                Deelname van {state.result.basicInformation.contactName} in de{' '}
                                {state.result.basicInformation.projectName}
                            </h1>
                            <span className="content-subheading">
                                Uitgevende instantie {state.result.basicInformation.administrationName}
                            </span>
                        </Col>
                    </Row>

                    <Table className={'my-4'}>
                        <tbody>
                            {state.result.fields.map(field => (
                                <tr>
                                    <td>
                                        <strong>{field.label}</strong>
                                    </td>
                                    <td>{field.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <MutationTable participantMutations={state.result.participantMutations} />
                </>
            )}
        </Container>
    );
}

export default RegistrationDetails;
