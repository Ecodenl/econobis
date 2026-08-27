import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import moment from 'moment';
import TextBlock from '../../../components/general/TextBlock';
import MoneyPresenter from '../../../helpers/MoneyPresenter';
import { capitalizeFirstLetter, lowerCaseFirstLetter } from '../../../helpers/ModifyText';

function ObligationDetails({ project }) {
    const textRegisterCurrentBookWorth = project.textRegisterCurrentBookWorth ?? 'Huidige hoofdsom';
    const textRegisterParticipationSingular = project.textRegisterParticipationSingular ?? 'obligatie';
    const textRegisterParticipationPlural = project.textRegisterParticipationPlural ?? 'obligaties';

    return (
        <>
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
                    <FormLabel>
                        {capitalizeFirstLetter(textRegisterCurrentBookWorth)} per{' '}
                        {lowerCaseFirstLetter(textRegisterParticipationSingular)}
                    </FormLabel>
                    <TextBlock>{MoneyPresenter(project.currentBookWorth)}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Aantal {lowerCaseFirstLetter(textRegisterParticipationPlural)} nodig</FormLabel>
                    <TextBlock>{project.totalParticipations}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>
                        Minimaal aantal {lowerCaseFirstLetter(textRegisterParticipationPlural)} per contact
                    </FormLabel>
                    <TextBlock>{project.minParticipations}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>
                        Maximaal aantal {lowerCaseFirstLetter(textRegisterParticipationPlural)} per contact
                    </FormLabel>
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

export default ObligationDetails;
