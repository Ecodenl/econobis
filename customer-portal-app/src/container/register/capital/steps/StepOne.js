import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputText from '../../../../components/form/InputText';
import Col from 'react-bootstrap/Col';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';
import TextBlock from '../../../../components/general/TextBlock';

function StepOne({ next, project }) {
    const field = null;

    return (
        <>
            <Row>
                <Col xs={12} md={6}>
                    <FormLabel>Minimale aantal participaties</FormLabel>
                    <TextBlock>{project.minParticipations}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Maximale aantal participaties</FormLabel>
                    <TextBlock>{project.maxParticipations}</TextBlock>
                </Col>

                <Col xs={12} md={6}>
                    <FormLabel>Nominale waarde per participatie</FormLabel>
                    <TextBlock>{MoneyPresenter(project.participationWorth)}</TextBlock>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Gewenst aantal participaties</FormLabel>
                    <div>
                        <InputText field={{ ...field, value: 4 }} id="quantity_requested" />
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <FormLabel>Te betalen bedrag</FormLabel>
                    <TextBlock>{MoneyPresenter(4 * project.participationWorth)}</TextBlock>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ButtonGroup aria-label="Steps" className="float-right">
                        <Button className={'w-button'} size="sm" onClick={next}>
                            Ga naar gegevens
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </>
    );
}

export default StepOne;
