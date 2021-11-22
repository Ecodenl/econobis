import { Card, CardImg } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DashboardWidget = function({ id, image, title, text, buttonText, buttonLink }) {
    const history = useHistory();
    const key = 'widget-' + id;

    return (
        <Card key={key} id={key} style={{ marginTop: '30px' }}>
            <CardImg src={image} variant={'top'} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>
                    {text}
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => history.push(buttonLink)}>
                    {buttonText}
                </button>
            </div>
        </Card>
    );
};

export default DashboardWidget;
