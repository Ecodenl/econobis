import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function StepFour({ previous }) {
    return (
        <div>
            Stap vier
            <Row className="justify-content-end justify-content-sm-end">
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
