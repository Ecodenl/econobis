import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ParticipantMutationAPI from '../../../api/participant-mutation/ParticipantMutationAPI';
import LoadingView from '../../../components/general/LoadingView';
import {PortalUserConsumer} from '../../../context/PortalUserContext';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function ProjectMollieRedirect({match, currentSelectedContact}) {
    const [participantMutation, setParticipantMutation] = useState({});
    const [isLoading, setLoading] = useState(true);

    const handlePaymentRetry = () => {
        window.location.href = participantMutation.econobisPaymentLink;
    }

    useEffect(() => {
        (function fetchContactAndProject() {
            setLoading(true);

            axios
                .all([
                    ParticipantMutationAPI.fetchByCode(match.params.code),
                ])
                .then(
                    axios.spread((payloadParticipantMutation) => {
                        if(payloadParticipantMutation.data.data.length !== 1){
                            alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                            setLoading(false);
                            return;
                        }

                        setParticipantMutation(payloadParticipantMutation.data.data[0]);
                        setLoading(false);
                    })
                )
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();
    }, [match]);

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView/>
            ) : (
                <>
                    <Row className={'mb-4'}>
                        <Col>
                            <h1 className="content-heading">
                                {
                                    participantMutation.isPaidByMollie ? (
                                        <>Ingeschreven voor
                                            project <strong>{participantMutation.participation.project.name}</strong></>
                                    ) : (
                                        <>Betaling voor
                                            project <strong>{participantMutation.participation.project.name}</strong> nog
                                            niet gelukt.</>
                                    )
                                }

                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            {participantMutation.isPaidByMollie ? (
                                <>
                                    <p>
                                        { participantMutation.participation.project.textRegistrationFinished.split('\n').map((item, key) => {
                                            return <span key={key}>{item}<br/></span>
                                        }) }
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        Uw inschrijving kon nog niet worden afgerond doordat de betaling niet is gelukt,
                                        gebruik onderstaande betaal button om de betaling alsnog uit te voeren.</p>
                                </>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <ButtonGroup className="float-right">
                                <Link to={`/inschrijvingen-projecten`}>
                                    <Button className={'w-button'} size="sm">
                                        Naar mijn huidige deelnames
                                    </Button>
                                </Link>
                                {!participantMutation.isPaidByMollie && (
                                    <Button className={'w-button'} size="sm" onClick={handlePaymentRetry}>
                                        Betalen
                                    </Button>
                                )}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}

export default function ProjectMollieRedirectWithContext(props) {
    return (
        <PortalUserConsumer>
            {({currentSelectedContact}) => (
                <ProjectMollieRedirect {...props} currentSelectedContact={currentSelectedContact}/>
            )}
        </PortalUserConsumer>
    );
}
