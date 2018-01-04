import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ViewHtmlAsText = props => {
    const { label, className, id, value } = props;

    const createMarkup = () => {
        return {__html: value};
    }

    return (
        <div className={className}>
            <label htmlFor={ id } className="col-sm-3">{ label }</label>
            <div className="col-sm-9" id={ id } dangerouslySetInnerHTML={createMarkup()} />
        </div>
    );
};

ViewHtmlAsText.defaultProps = {
    className: 'col-sm-12',
    value: '',
};

ViewHtmlAsText.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};

export default ViewHtmlAsText;