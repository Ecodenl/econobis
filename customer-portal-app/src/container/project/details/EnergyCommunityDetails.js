import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import moment from 'moment';
import TextBlock from '../../../components/general/TextBlock';

function EnergyCommunityDetails({ project }) {
    return (
        <Row>
            <Col xs={12} md={6}>
                <FormLabel>Inschrijving voor</FormLabel>
                <TextBlock>{project.name}</TextBlock>
            </Col>
            <Col xs={12} md={6}>
                <FormLabel>Omschrijving</FormLabel>
                <TextBlock>{project.description ? project.description : ' '}</TextBlock>
            </Col>
            <Col xs={12} md={6}>
                <FormLabel>Start inschrijving</FormLabel>
                <TextBlock>
                    {project.dateStartRegistrations ? moment(project.dateStartRegistrations).format('LL') : ''}
                </TextBlock>
            </Col>
        </Row>
    );
}

export default EnergyCommunityDetails;
