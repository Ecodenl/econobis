import { Card, CardImg } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DashboardWidget = function({ id, title, text, image, buttonText, buttonLink }) {
    const history = useHistory();
    const key = 'widget-' + id;

    let externalLink = null;
    if (buttonLink.toLowerCase().startsWith('www')) {
        externalLink = 'https://' + buttonLink;
    } else if (buttonLink.toLowerCase().startsWith('http') || buttonLink.toLowerCase().startsWith('https')) {
        externalLink = buttonLink;
    }

    return (
        <Card key={key} id={key} style={{ marginTop: '30px' }}>
            <CardImg src={image && image.includes('images/') ? image : 'images/' + image} variant={'top'} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>
                    {text}
                </p>
                {externalLink === null ? (
                    <button className="w-button btn btn-primary btn-sm" onClick={() => history.push(buttonLink)}>
                        {buttonText}
                    </button>
                ) : (
                    <a href={externalLink} target="_blank">
                        <button className="w-button btn btn-primary btn-sm">{buttonText}</button>
                    </a>
                )}
            </div>
        </Card>
    );
};

export default DashboardWidget;
