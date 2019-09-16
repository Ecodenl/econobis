import React from 'react';
import Row from 'react-bootstrap/Row';
import { ClipLoader } from 'react-spinners';

function Loading() {
    return (
        <Row className="justify-content-center align-content-center flex-wrap" style={{ height: '40vh' }}>
            <ClipLoader color={'#3898EC'} size={48} />
        </Row>
    );
}

export default Loading;
