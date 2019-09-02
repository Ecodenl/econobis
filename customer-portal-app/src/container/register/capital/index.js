import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MasterForm from './MasterForm';
import ProjectAPI from '../../../api/project/ProjectAPI';
import LoadingView from '../../../components/general/LoadingView';

function RegisterCapital({ match }) {
    const [project, setProject] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (function callFetchProject() {
            setLoading(true);
            ProjectAPI.fetchProject(match.params.id)
                .then(payload => {
                    setProject(payload.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        })();
    }, [match]);

    // TODO Fetch values from API
    const initialValues = {
        number: 'C2019-1',
        contactName: 'Rob Rollenberg',
        email: 'robennoortje@rollenberg.net',
        titleId: '1',
        firstName: 'Rob',
        lastNamePrefixId: '',
        lastName: 'Rollenberg',
        emailAddress1: '',
        emailAddress2: '',
        telephoneNumber1: '',
        telephoneNumber2: '',
        street: '',
        streetNumber: '',
        streetAddition: '',
        postalCode: '',
        city: '',
        countryId: '',
        iban: '',
        ibanName: '',
        didAgreeAvg: true,
        energySupplierId: '1',
        esNumber: '123',
        memberSince: '01-04-2019',
        eanElectricity: '871685900000546779',
        clientNr: '169572',
        clientSince: '01-04-2019',
    };

    // Todo fetch from API
    const energySuppliers = [
        { id: 1, name: 'OM' },
        { id: 2, name: 'Budget Energie' },
        { id: 3, name: 'E.on' },
        { id: 4, name: 'Eneco' },
        { id: 5, name: 'Energiedirect' },
        { id: 6, name: 'Engie' },
        { id: 7, name: 'Essent' },
        { id: 8, name: 'Greenchoice' },
        { id: 9, name: 'Holland Wind' },
    ];

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
                        <MasterForm initialValues={initialValues} energySuppliers={energySuppliers} project={project} />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default RegisterCapital;
