import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';

function StepFour({ previous }) {
    return (
        <div>
            Stap vier
            <Row className="justify-content-center justify-content-md-end">
                <ButtonGroup aria-label="Steps">
                    <Button className={'w-button'} size="sm" onClick={previous}>
                        Terug
                    </Button>
                    <Button className={'w-button'} size="sm">
                        Bevestigen inschrijving
                    </Button>
                </ButtonGroup>
            </Row>
        </div>
    );
}

export default StepFour;
