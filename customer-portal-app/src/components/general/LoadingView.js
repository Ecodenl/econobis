import React from 'react';
import Row from 'react-bootstrap/Row';
import { BeatLoader } from 'react-spinners';

function Loading() {
    return (
        <Row className="justify-content-center align-content-center flex-wrap" style={{ height: '40vh' }}>
            <BeatLoader color={'#d6d6d6'} size={14} />
        </Row>
    );
}

export default Loading;
