import { Card, CardImg } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DashboardWidget = function({ id, title, text, image, buttonText, buttonLink }) {
    const history = useHistory();
    const key = 'widget-' + id;

    return (
        <Card key={key} id={key} style={{ marginTop: '30px' }}>
            <CardImg src={image.includes('images/') ? image : 'images/' + image} variant={'top'} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>
                    {text}
                </p>
                {/* todo hier buttonlink externe url ook mogelijk maken !! */}
                <button className="w-button btn btn-primary btn-sm" onClick={() => history.push(buttonLink)}>
                    {buttonText}
                </button>
            </div>
        </Card>
    );
};

export default DashboardWidget;
