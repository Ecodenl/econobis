import React from 'react';
import PropTypes from 'prop-types';

const GetNameByCodeHelper = ({ code, items }) => {
    let result = items.find((item) => {
        return item.code == code;
    });

    if(result === undefined) result = { name: 'Onbekend'};

    return (
        <span> { result.name } </span>
    )
};

GetNameByCodeHelper.propTypes = {
    code: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};

export default GetNameByCodeHelper;