import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';

function StepTwo({ previous, next }) {
    return (
        <div>
            Stap twee
            <Row className="justify-content-center justify-content-md-end">
                <ButtonGroup aria-label="Steps">
                    <Button className={'w-button'} size="sm" onClick={previous}>
                        Terug
                    </Button>
                    <Button className={'w-button'} size="sm" onClick={next}>
                        Ga naar voorwaarden
                    </Button>
                </ButtonGroup>
            </Row>
        </div>
    );
}

export default StepTwo;
