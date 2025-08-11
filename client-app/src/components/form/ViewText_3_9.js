import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const ViewText_3_9 = props => {
    const { label, id, value, link, hidden, name, textToolTip } = props;

    if (link.length > 0) {
        return (
            <div className={'form-group col-sm-12'} style={hidden ? { display: 'none' } : {}}>
                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor={id} className="col-sm-12">
                            {label}
                        </label>
                    </div>
                    <div className="col-sm-6" id={id} onClick={null}>
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
            </div>
        );
    } else {
        return (
            <div className={'form-group col-sm-12'} style={hidden ? { display: 'none' } : {}}>
                <div className="row">
                    <div className="col-sm-3">
                        <label htmlFor={id} className="col-sm-12">
                            {label}
                        </label>
                    </div>
                    <div className="col-sm-6" id={id}>
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
            </div>
        );
    }
};

ViewText_3_9.defaultProps = {
    label: '',
    value: '',
    name: '',
    textToolTip: '',
    link: '',
    hidden: false,
};

ViewText_3_9.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    textToolTip: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    link: PropTypes.string,
    hidden: PropTypes.bool,
};

export default ViewText_3_9;
