import React from 'react';
import Frame from 'react-frame-component';
import PropTypes from 'prop-types';

const ViewHtmlAsText = ({ id, value }) => {
    const createMarkup = () => {
        return { __html: value };
    };

    return (
        <Frame>
            <div id={id} dangerouslySetInnerHTML={createMarkup()} />
        </Frame>
    );
};

ViewHtmlAsText.defaultProps = {
    value: '',
};

ViewHtmlAsText.propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViewHtmlAsText;
