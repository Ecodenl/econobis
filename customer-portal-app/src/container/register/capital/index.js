import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MasterForm from './MasterForm';
import ProjectAPI from '../../../api/project/ProjectAPI';
import LoadingView from '../../../components/general/LoadingView';
import ContactAPI from '../../../api/contact/ContactAPI';
import rebaseContact from '../../../helpers/RebaseContact';

function RegisterCapital({ match }) {
    const [registerValues, setRegisterValues] = useState({
        projectId: null,
        participationsInteressed: 0,
    });
    const [project, setProject] = useState({});
    const [contact, setContact] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (function callFetchProject() {
            setLoading(true);
            ProjectAPI.fetchProject(match.params.id)
                .then(payload => {
                    setProject(payload.data.data);
                    setRegisterValues({ ...registerValues, projectId: payload.data.data.id });
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();

        (function callFetchContact() {
            setLoading(true);
            ContactAPI.fetchContact(11)
                .then(payload => {
                    const contactData = rebaseContact(payload.data.data);

                    setContact(contactData);
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();
    }, [match]);

    function handleSubmitRegisterValues(values) {
        setRegisterValues({ ...registerValues, ...values });
    }

    function handleSubmitContactValues(values) {
        // TODO Do Api request to update contact values

        setContact({ ...contact, ...values });
    }

    return (
        <Container className={'content-section'}>
            {isLoading ? (
                <LoadingView />
            ) : (
                <Row>
                    <Col>
                        <h1 className="content-heading">
                            Schrijf je in voor project <strong>{project.name}</strong>
                        </h1>
                        <MasterForm
                            project={project}
                            initialRegisterValues={registerValues}
                            handleSubmitRegisterValues={handleSubmitRegisterValues}
                            initialContact={contact}
                            handleSubmitContactValues={handleSubmitContactValues}
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default RegisterCapital;
