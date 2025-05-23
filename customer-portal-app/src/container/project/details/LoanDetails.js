import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import moment from 'moment';
import TextBlock from '../../../components/general/TextBlock';
import MoneyPresenter from '../../../helpers/MoneyPresenter';

function LoanDetails({ project }) {
    return (
        <>
            <Row>
                <Col xs={12} md={6}>
                    <FormLabel>Inschrijving voor</FormLabel>
                    <TextBlock>{project.name}</TextBlock>
                    <FormLabel>Lening nodig</FormLabel>
                    <TextBlock>{MoneyPresenter(project.amountOfLoanNeeded)}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Omschrijving</FormLabel>
                    <TextBlock>{project.description ? project.description : ' '}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Minimaal bedrag per contact</FormLabel>
                    <TextBlock>{MoneyPresenter(project.minAmountLoan)}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Maximaal bedrag per contact</FormLabel>
                    <TextBlock>{MoneyPresenter(project.maxAmountLoan)}</TextBlock>
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

export default LoanDetails;
