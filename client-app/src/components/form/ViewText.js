import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ViewText = props => {
    const { label, className, id, value, link } = props;

    if(link.length > 0) {
        return (
            <div className={className}>
                <label htmlFor={ id } className="col-sm-6">{ label }</label>
                <div className="col-sm-6" id={ id } onClick={null}>
                    <Link to={link} className="link-underline">{value}</Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className={className}>
                <label htmlFor={ id } className="col-sm-6">{ label }</label>
                <div className="col-sm-6" id={ id }>
                    {value}
                </div>
            </div>
        );
    }
};

ViewText.defaultProps = {
    className: 'col-sm-6',
    value: '',
    link: '',
};

ViewText.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    link: PropTypes.string,
};

export default ViewText;