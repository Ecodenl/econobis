import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const ViewTextLong = props => {
    const { label, id, value, link, hidden, textToolTip } = props;

    if (link.length > 0) {
        return (
            <>
                <div className="col-sm-3" style={hidden ? { display: 'none' } : {}}>
                    <label htmlFor={id} className="col-sm-12">
                        {label}
                    </label>
                </div>
                <div className="col-sm-9" id={id} onClick={null} style={hidden ? { display: 'none' } : {}}>
                    <Link to={link} className="link-underline">
                        {value}
                    </Link>{' '}
                    {textToolTip && (
                        <span>
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={textToolTip}
                                data-for={`tooltip-${name}`}
                            />
                            <ReactTooltip
                                id={`tooltip-${name}`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </span>
                    )}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="col-sm-3" style={hidden ? { display: 'none' } : {}}>
                    <label htmlFor={id} className="col-sm-12">
                        {label}
                    </label>
                </div>
                <div className="col-sm-9" id={id} style={hidden ? { display: 'none' } : {}}>
                    {value}{' '}
                    {textToolTip && (
                        <span>
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={textToolTip}
                                data-for={`tooltip-${name}`}
                            />
                            <ReactTooltip
                                id={`tooltip-${name}`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </span>
                    )}
                </div>
            </>
        );
    }
};

ViewTextLong.defaultProps = {
    value: '',
    link: '',
    hidden: false,
    textToolTip: '',
};

ViewTextLong.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    link: PropTypes.string,
    hidden: PropTypes.bool,
    textToolTip: PropTypes.string,
};

export default ViewTextLong;
