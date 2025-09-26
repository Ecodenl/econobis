import { Card, CardImg } from 'react-bootstrap';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const DashboardWidget = function({
    id,
    title,
    text,
    image,
    buttonText,
    buttonLink,
    backgroundColorUsed,
    textColorUsed,
    hideGroupId,
}) {
    const history = useHistory();
    const key = 'widget-' + id;
    const [imageHash, setImageHash] = useState(Date.now());

    let externalLink = null;
    if (buttonLink.toLowerCase().startsWith('www')) {
        externalLink = 'https://' + buttonLink;
    } else if (buttonLink.toLowerCase().startsWith('http') || buttonLink.toLowerCase().startsWith('https')) {
        externalLink = buttonLink;
    } else if (buttonLink.toLowerCase() === "toevoegen-aan-groep") {
        buttonLink = buttonLink + '/' + hideGroupId;
    }

    return (
        <Card
            key={key}
            id={key}
            style={{ marginTop: '30px', backgroundColor: backgroundColorUsed, color: textColorUsed }}
        >
            <CardImg
                src={image && image.includes('images/') ? image + '?' + imageHash : 'images/' + image + '?' + imageHash}
                variant={'top'}
            />
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
