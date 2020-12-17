import React, { useEffect, useReducer, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import LoadingView from '../../../components/general/LoadingView';
import ContactAPI from '../../../api/contact/ContactAPI';
import { PortalUserContext } from '../../../context/PortalUserContext';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { FaFileDownload } from 'react-icons/all';

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

function FinancialOverviewDocuments() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { currentSelectedContact } = useContext(PortalUserContext);

    useEffect(
        function() {
            if (currentSelectedContact.id) {
                ContactAPI.fetchContactFinancialOverviewDocuments(currentSelectedContact.id)
                    .then(payload => {
                        dispatch({
                            type: 'updateResult',
                            payload: payload.data.data,
                        });
                        setIsLoading(false);
                    })
                    .catch(() => {
                        alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setIsLoading(false);
                    });
            }
        },
        [currentSelectedContact.id]
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
                            <h1 className="content-heading mt-0">Waardestaat documenten</h1>
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Omschrijving</th>
                                <th>Downloaden</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.result.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <a href={'/#/waardestaat-documenten'}>
                                            <FaFileDownload /> downloaden
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}

export default FinancialOverviewDocuments;
