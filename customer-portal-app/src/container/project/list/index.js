import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProjectAPI from '../../../api/project/ProjectAPI';
import { Link } from 'react-router-dom';

function ProjectList() {
    const [projectData, setProjectData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (function callFetchProjects() {
            setLoading(true);
            ProjectAPI.fetchProjects()
                .then(payload => {
                    setProjectData(payload.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();
    }, []);

    return (
        <Container className={'content-section'}>
            <Row>
                <Col>
                    <h1 className="content-heading">Overzicht projecten</h1>
                </Col>
            </Row>
            {isLoading
                ? 'Laden...'
                : projectData.map(project => (
                      <Row>
                          <Col>
                              <Link to={`/project/${project.id}`}>{project.name}</Link>
                          </Col>
                      </Row>
                  ))}
        </Container>
    );
}

export default ProjectList;
