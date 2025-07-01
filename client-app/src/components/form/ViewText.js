import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const ViewText = props => {
    const { label, className, id, value, link, hidden, name, textToolTip, labelSize, valueSize, url } = props;

    if (link.length > 0) {
        return (
            <div className={className} style={hidden ? { display: 'none' } : {}}>
                <label htmlFor={id} className={labelSize}>
                    {label}
                </label>
                <div className={valueSize} id={id} onClick={null}>
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
            </div>
        );
    } else if (url) {
        const handleChildElementClick = e => {
            e.stopPropagation();
        };

        return (
            <div className={className} style={hidden ? { display: 'none' } : {}}>
                <label htmlFor={id} className={labelSize}>
                    {label}
                </label>
                <div className={valueSize} id={id}>
                    <a href={url} target={'_blank'} rel={'noreferrer'} onClick={e => handleChildElementClick(e)}>
                        {value}{' '}
                    </a>
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
            </div>
        );
    } else {
        return (
            <div className={className} style={hidden ? { display: 'none' } : {}}>
                <label htmlFor={id} className={labelSize}>
                    {label}
                </label>
                <div className={valueSize} id={id}>
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
            </div>
        );
    }
};

ViewText.defaultProps = {
    label: '',
    className: 'col-sm-6',
    labelSize: 'col-sm-6',
    valueSize: 'col-sm-6',
    value: '',
    name: '',
    textToolTip: '',
    link: '',
    hidden: false,
    url: '',
};

ViewText.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    className: PropTypes.string,
    labelSize: PropTypes.string,
    valueSize: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    textToolTip: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    link: PropTypes.string,
    hidden: PropTypes.bool,
    url: PropTypes.string,
};

export default ViewText;
