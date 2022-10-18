import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TwoFactorSettings from "./TwoFactorSettings";

const Account = function () {
    return (
        <div className="content-section">
            <div className="content-container w-container">
                <Row>
                    <Col>
                        <h1 className="content-heading mt-0">Accountinstellingen</h1>
                    </Col>
                </Row>
                <TwoFactorSettings/>
            </div>
        </div>
    );
};

export default Account;