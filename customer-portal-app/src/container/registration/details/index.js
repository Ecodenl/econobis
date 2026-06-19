import React, { useEffect, useReducer, useContext, useState } from 'react';
import ParticipantProjectAPI from '../../../api/participant-project/ParticipantProjectAPI';
import LoadingView from '../../../components/general/LoadingView';
import RegistrationDetailsTitle from './Title';
import RegistrationDetailsProjectTable from './project-table';
import RegistrationDetailsMutationTable from './mutation-table';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ThemeSettingsContext } from '../../../context/ThemeSettingsContext';
import { PortalUserContext } from '../../../context/PortalUserContext';
import Col from 'react-bootstrap/Col';
import RegistrationDetailsDocumentTable from './document-table';
import ErrorPage from '../../../components/general/ErrorPage';

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
    const { setCurrentThemeSettings } = useContext(ThemeSettingsContext);
    const { currentSelectedContact } = useContext(PortalUserContext);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (currentSelectedContact.id) {
            (function() {
                ParticipantProjectAPI.show(params.id)
                    .then(payload => {
                        dispatch({
                            type: 'updateResult',
                            payload: payload.data.data,
                        });
                        setCurrentThemeSettings(payload.data.data.basicInformation.portalSettingsLayoutAssigned);
                        setIsLoading(false);
                    })
                    .catch(() => {
                        // alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                        setIsLoading(false);
                        setHasError(true);
                    });
            })();
        }
    }, [params.id, currentSelectedContact]);

    function setIsLoading(isLoading) {
        dispatch({
            type: 'updateIsLoading',
            payload: isLoading,
        });
    }

    return (
        <div className={'content-section'}>
            {state.isLoading ? (
                <LoadingView />
            ) : hasError ? (
                <ErrorPage />
            ) : (
                <>
                    <div className="content-container w-container">
                        <Row>
                            <ButtonGroup aria-label="current-participations" className="w-button-group-left">
                                <Link to={`/inschrijvingen-projecten`}>
                                    <Button className={'w-button'} size="sm">
                                        Huidige deelnames
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </Row>

                        <RegistrationDetailsTitle {...state.result.basicInformation} />
                        {state.result.length === 0 ? (
                            <Row>
                                <Col>Geen huidige deelname aanwezig.</Col>
                            </Row>
                        ) : (
                            <>
                                <RegistrationDetailsProjectTable fields={state.result.fields} />
                                <RegistrationDetailsMutationTable
                                    participantMutations={state.result.participantMutations}
                                />
                                {state.result.basicInformation.allowIncreaseParticipations ? (
                                    <Row>
                                        <Col>
                                            <ButtonGroup className="float-right">
                                                <Link
                                                    to={`/inschrijven/verhogen/${state.result.basicInformation.projectId}/${state.result.basicInformation.participantId}`}
                                                >
                                                    <Button className={'w-button'} size="sm">
                                                        Deelname verhogen
                                                    </Button>
                                                </Link>
                                            </ButtonGroup>
                                        </Col>
                                    </Row>
                                ) : null}

                                <RegistrationDetailsDocumentTable
                                    participantId={params.id}
                                    documents={state.result.documents}
                                />
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default RegistrationDetails;
