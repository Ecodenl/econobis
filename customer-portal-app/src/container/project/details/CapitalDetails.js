import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import moment from 'moment';
import TextBlock from '../../../components/general/TextBlock';
import MoneyPresenter from '../../../helpers/MoneyPresenter';

function CapitalDetails({ project }) {
    return (
        <>
            <Row>
                <Col xs={12} md={6}>
                    <FormLabel>Project</FormLabel>
                    <TextBlock>{project.name}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Omschrijving project</FormLabel>
                    <TextBlock>{project.description ? project.description : ' '}</TextBlock>
                </Col>

                <Col xs={12} md={6}>
                    <FormLabel>Huidige boekwaarde per participatie</FormLabel>
                    <TextBlock>{MoneyPresenter(project.currentBookWorth)}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Aantal participaties nodig</FormLabel>
                    <TextBlock>{project.totalParticipations}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Minimaal aantal participaties per contact</FormLabel>
                    <TextBlock>{project.minParticipations}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Maximaal aantal participaties per contact</FormLabel>
                    <TextBlock>{project.maxParticipations}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Start inschrijving</FormLabel>
                    <TextBlock>
                        {project.dateStartRegistrations ? moment(project.dateStartRegistrations).format('LL') : ''}
                    </TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Eind inschrijving</FormLabel>
                    <TextBlock>
                        {project.dateEndRegistrations ? moment(project.dateEndRegistrations).format('LL') : ''}
                    </TextBlock>
                </Col>
            </Row>
        </>
    );
}

export default CapitalDetails;
